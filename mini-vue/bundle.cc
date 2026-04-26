#include <sys/wait.h>
#include <unistd.h>
#include <uv.h>

#include <cerrno>
#include <csignal>
#include <cstdint>
#include <cstdlib>
#include <cstring>
#include <expected>
#include <filesystem>
#include <fstream>
#include <functional>
#include <iostream>
#include <iterator>
#include <memory>
#include <optional>
#include <string>
#include <string_view>
#include <unordered_set>
#include <utility>
#include <vector>

#ifdef __APPLE__
#include <mach-o/dyld.h>
#endif

using namespace std;
namespace fs = filesystem;

namespace {

constexpr string_view kDefaultPort = "3000";
constexpr string_view kTemplatePlaceholder = "<!-- TEMPLATE -->";

struct BundleConfig {
  fs::path root_dir;
  fs::path template_html_path;
  fs::path index_html_path;
  fs::path vendor_ts_path;
  fs::path index_ts_path;
  fs::path vendor_js_path;
  fs::path index_js_path;
};

struct PreparedSources {
  fs::path entry_path;
  fs::path temp_dir;
};

struct HttpRequest {
  string method;
  string path;
};

struct HttpResponse {
  int status_code;
  string status_text;
  string content_type;
  string body;

  static HttpResponse Text(int status_code, string status_text, string body,
                           string content_type = "text/plain; charset=utf-8") {
    return {
        .status_code = status_code,
        .status_text = std::move(status_text),
        .content_type = std::move(content_type),
        .body = std::move(body),
    };
  }
};

struct ResolvedFile {
  fs::path path;
  string content_type;
};

expected<string, string> ReadFile(const fs::path &path) {
  ifstream input(path, ios::binary);
  if (!input) {
    return unexpected<string>("read " + path.string() + " failed");
  }
  return string(istreambuf_iterator<char>(input), istreambuf_iterator<char>());
}

expected<void, string> WriteFile(const fs::path &path, string_view content) {
  ofstream output(path, ios::binary | ios::trunc);
  if (!output) {
    return unexpected<string>("write " + path.string() + " failed");
  }
  output.write(content.data(), static_cast<streamsize>(content.size()));
  if (!output) {
    return unexpected<string>("write " + path.string() + " failed");
  }
  return {};
}

expected<fs::path, string> MakeTempDir(const string &prefix) {
  const fs::path base = fs::temp_directory_path() / (prefix + "XXXXXX");
  string pattern = base.string();
  vector<char> writable(pattern.begin(), pattern.end());
  writable.push_back('\0');

  char *created = ::mkdtemp(writable.data());
  if (created == nullptr) {
    return unexpected<string>(string("create temp dir") + ": " +
                              strerror(errno));
  }
  return fs::path(created);
}

expected<void, string> CopyFile(const fs::path &src, const fs::path &dst) {
  error_code ec;
  fs::copy_file(src, dst, fs::copy_options::overwrite_existing, ec);
  if (ec) {
    return unexpected<string>("write " + dst.string() + ": " + ec.message());
  }
  return {};
}

void RemoveIfExists(const fs::path &path) {
  error_code ec;
  fs::remove(path, ec);
}

optional<fs::path> FindExecutableInPath(const string &executable) {
  const char *path_env = getenv("PATH");
  if (path_env == nullptr) {
    return nullopt;
  }

  string_view search_path(path_env);
  size_t start = 0;
  while (start <= search_path.size()) {
    const size_t end = search_path.find(':', start);
    const string_view segment = search_path.substr(
        start,
        end == string_view::npos ? search_path.size() - start : end - start);
    fs::path candidate =
        segment.empty() ? fs::path(executable) : fs::path(segment) / executable;
    error_code ec;
    const auto status = fs::status(candidate, ec);
    if (!ec && fs::exists(status) && !fs::is_directory(status) &&
        ::access(candidate.c_str(), X_OK) == 0) {
      return candidate;
    }
    if (end == string_view::npos) {
      break;
    }
    start = end + 1;
  }
  return nullopt;
}

vector<string> ResolveTSCCommand(const fs::path &entry_path,
                                 const fs::path &out_dir) {
  vector<string> args = {
      "--target",           "ESNext",         "--module",    "ESNext",
      "--moduleResolution", "Bundler",           "--lib",       "ESNext,DOM",
      "--strict",           "--skipLibCheck", "--pretty",    "false",
      "--declaration",      "false",          "--sourceMap", "false",
      "--removeComments",   "false",          "--outDir",    out_dir.string(),
      entry_path.string(),
  };

  if (FindExecutableInPath("tsc").has_value()) {
    args.insert(args.begin(), "tsc");
    return args;
  }

  args.insert(args.begin(), {"npx", "--yes", "tsc"});
  return args;
}

expected<void, string> RunCommand(const vector<string> &command) {
  vector<char *> argv;
  argv.reserve(command.size() + 1);
  for (const string &part : command) {
    argv.push_back(const_cast<char *>(part.c_str()));
  }
  argv.push_back(nullptr);

  pid_t pid = ::fork();
  if (pid < 0) {
    return unexpected<string>(string("fork") + ": " + strerror(errno));
  }

  if (pid == 0) {
    ::execvp(argv[0], argv.data());
    cerr << "run typescript compiler: " << strerror(errno) << '\n';
    _exit(127);
  }

  int status = 0;
  if (::waitpid(pid, &status, 0) < 0) {
    return unexpected<string>(string("waitpid") + ": " + strerror(errno));
  }

  if (!WIFEXITED(status) || WEXITSTATUS(status) != 0) {
    return unexpected<string>("run typescript compiler: exit status " +
                              to_string(WEXITSTATUS(status)));
  }
  return {};
}

expected<void, string> RunTSC(const fs::path &entry_path,
                              const fs::path &out_dir) {
  return RunCommand(ResolveTSCCommand(entry_path, out_dir));
}

expected<fs::path, string> GetExecutablePath() {
#ifdef __APPLE__
  uint32_t size = 0;
  if (_NSGetExecutablePath(nullptr, &size) != -1) {
    return unexpected<string>("resolve executable path: unexpected size probe");
  }
  string buffer(size, '\0');
  if (_NSGetExecutablePath(buffer.data(), &size) != 0) {
    return unexpected<string>("resolve executable path failed");
  }
  return fs::weakly_canonical(fs::path(buffer.c_str()));
#else
  return fs::current_path();
#endif
}

expected<BundleConfig, string> NewBundleConfig() {
  // ./build/mini-vue/bundle
  // ./mini-vue
  auto executable_path = GetExecutablePath();
  if (!executable_path) {
    return unexpected<string>(executable_path.error());
  }

  error_code ec;
  const fs::path root_dir = fs::weakly_canonical(
      executable_path->parent_path().parent_path().parent_path() / "mini-vue",
      ec);
  if (ec) {
    return unexpected<string>("resolve project root failed: " + ec.message());
  }

  return BundleConfig{
      .root_dir = root_dir,
      .template_html_path = root_dir / "template.html",
      .index_html_path = root_dir / "index.html",
      .vendor_ts_path = root_dir / "vendor.ts",
      .index_ts_path = root_dir / "index.ts",
      .vendor_js_path = root_dir / "vendor.js",
      .index_js_path = root_dir / "index.js",
  };
}

expected<PreparedSources, string>
PrepareGeneratedSources(const BundleConfig &config) {
  auto template_content = ReadFile(config.template_html_path);
  if (!template_content) {
    return unexpected<string>(template_content.error());
  }
  auto vendor_ts_content = ReadFile(config.vendor_ts_path);
  if (!vendor_ts_content) {
    return unexpected<string>(vendor_ts_content.error());
  }
  auto index_ts_content = ReadFile(config.index_ts_path);
  if (!index_ts_content) {
    return unexpected<string>(index_ts_content.error());
  }

  const size_t placeholder_pos =
      index_ts_content->find(string(kTemplatePlaceholder));
  if (placeholder_pos == string::npos) {
    return unexpected<string>("placeholder \"" + string(kTemplatePlaceholder) +
                              "\" not found in index.ts");
  }

  string replaced = *index_ts_content;
  replaced.replace(placeholder_pos, kTemplatePlaceholder.size(),
                   *template_content);

  auto temp_dir = MakeTempDir("proxy-ts-src-");
  if (!temp_dir) {
    return unexpected<string>(temp_dir.error());
  }

  if (auto result = WriteFile(*temp_dir / "index.ts", replaced); !result) {
    error_code ec;
    fs::remove_all(*temp_dir, ec);
    return unexpected<string>(result.error());
  }

  if (auto result = WriteFile(*temp_dir / "vendor.ts", *vendor_ts_content);
      !result) {
    error_code ec;
    fs::remove_all(*temp_dir, ec);
    return unexpected<string>(result.error());
  }

  return PreparedSources{
      .entry_path = *temp_dir / "index.ts",
      .temp_dir = *temp_dir,
  };
}

expected<function<void()>, string>
CompileTypeScript(const BundleConfig &config, bool remove_output_on_cleanup) {
  auto cleanups = make_shared<vector<function<void()>>>();
  auto cleaned_up = make_shared<bool>(false);
  auto run_cleanup = [cleanups, cleaned_up]() mutable {
    if (*cleaned_up) {
      return;
    }
    for (auto it = cleanups->rbegin(); it != cleanups->rend(); ++it) {
      try {
        (*it)();
      } catch (...) {
      }
    }
    cleanups->clear();
    *cleaned_up = true;
  };

  auto generated = PrepareGeneratedSources(config);
  if (!generated) {
    return unexpected<string>(generated.error());
  }
  cleanups->push_back([temp_dir = generated->temp_dir]() {
    error_code ec;
    fs::remove_all(temp_dir, ec);
  });

  auto temp_output_dir = MakeTempDir("proxy-tsc-out-");
  if (!temp_output_dir) {
    run_cleanup();
    return unexpected<string>(temp_output_dir.error());
  }
  cleanups->push_back([temp_output_dir = *temp_output_dir]() {
    error_code ec;
    fs::remove_all(temp_output_dir, ec);
  });

  if (auto result = RunTSC(generated->entry_path, *temp_output_dir); !result) {
    run_cleanup();
    return unexpected<string>(result.error());
  }

  const fs::path compiled_index_js_path = *temp_output_dir / "index.js";
  const fs::path compiled_vendor_js_path = *temp_output_dir / "vendor.js";
  if (!fs::exists(compiled_index_js_path)) {
    run_cleanup();
    return unexpected<string>("compiled output missing: " +
                              compiled_index_js_path.string());
  }
  if (!fs::exists(compiled_vendor_js_path)) {
    run_cleanup();
    return unexpected<string>("compiled output missing: " +
                              compiled_vendor_js_path.string());
  }

  if (auto result = CopyFile(compiled_index_js_path, config.index_js_path);
      !result) {
    run_cleanup();
    return unexpected<string>(result.error());
  }
  if (auto result = CopyFile(compiled_vendor_js_path, config.vendor_js_path);
      !result) {
    run_cleanup();
    return unexpected<string>(result.error());
  }

  if (remove_output_on_cleanup) {
    cleanups->push_back(
        [path = config.index_js_path]() { RemoveIfExists(path); });
    cleanups->push_back(
        [path = config.vendor_js_path]() { RemoveIfExists(path); });
  }

  return run_cleanup;
}

expected<uint16_t, string> ParsePort(string_view port_text) {
  try {
    const unsigned long value = stoul(string(port_text));
    if (value > 65535) {
      return unexpected<string>("invalid port: out of range");
    }
    return static_cast<uint16_t>(value);
  } catch (const exception &) {
    return unexpected<string>("invalid port");
  }
}

string GuessContentType(const fs::path &path) {
  const string extension = path.extension().string();
  if (extension == ".html") {
    return "text/html; charset=utf-8";
  }
  if (extension == ".js") {
    return "text/javascript; charset=utf-8";
  }
  if (extension == ".css") {
    return "text/css; charset=utf-8";
  }
  if (extension == ".svg") {
    return "image/svg+xml";
  }
  if (extension == ".png") {
    return "image/png";
  }
  if (extension == ".jpg" || extension == ".jpeg") {
    return "image/jpeg";
  }
  if (extension == ".gif") {
    return "image/gif";
  }
  if (extension == ".webp") {
    return "image/webp";
  }
  if (extension == ".json") {
    return "application/json; charset=utf-8";
  }
  if (extension == ".txt") {
    return "text/plain; charset=utf-8";
  }
  return "application/octet-stream";
}

expected<ResolvedFile, HttpResponse> ResolveFile(const BundleConfig &config,
                                                 string_view request_path) {
  string path_only(request_path);
  const size_t query_pos = path_only.find('?');
  if (query_pos != string::npos) {
    path_only = path_only.substr(0, query_pos);
  }

  fs::path target = config.index_html_path;
  if (path_only != "/") {
    if (path_only.find("..") != string::npos) {
      return unexpected(HttpResponse::Text(403, "Forbidden", "forbidden"));
    }
    while (!path_only.empty() && path_only.front() == '/') {
      path_only.erase(path_only.begin());
    }
    target = config.root_dir / path_only;
  }

  error_code ec;
  const fs::path canonical_root = fs::weakly_canonical(config.root_dir, ec);
  if (ec) {
    return unexpected(
        HttpResponse::Text(500, "Internal Server Error", ec.message()));
  }
  const fs::path canonical_target = fs::weakly_canonical(target, ec);
  if (ec || canonical_target.string().rfind(canonical_root.string(), 0) != 0) {
    return unexpected(HttpResponse::Text(403, "Forbidden", "forbidden"));
  }

  if (!fs::exists(canonical_target) || fs::is_directory(canonical_target)) {
    return unexpected(HttpResponse::Text(404, "Not Found", "not found"));
  }

  return ResolvedFile{
      .path = canonical_target,
      .content_type = GuessContentType(canonical_target),
  };
}

expected<HttpRequest, string> ParseRequestLine(string_view request_line) {
  const size_t first_space = request_line.find(' ');
  const size_t second_space = request_line.find(' ', first_space + 1);
  if (first_space == string_view::npos || second_space == string_view::npos) {
    return unexpected<string>("malformed request line");
  }

  return HttpRequest{
      .method = string(request_line.substr(0, first_space)),
      .path = string(
          request_line.substr(first_space + 1, second_space - first_space - 1)),
  };
}

HttpResponse BuildResponse(const BundleConfig &config,
                           const HttpRequest &request) {
  if (request.method != "GET") {
    return HttpResponse::Text(405, "Method Not Allowed", "method not allowed");
  }

  auto resolved_file = ResolveFile(config, request.path);
  if (!resolved_file) {
    return resolved_file.error();
  }

  auto body = ReadFile(resolved_file->path);
  if (!body) {
    return HttpResponse::Text(500, "Internal Server Error", body.error());
  }

  return {
      .status_code = 200,
      .status_text = "OK",
      .content_type = resolved_file->content_type,
      .body = std::move(*body),
  };
}

class LibuvHttpServer {
public:
  LibuvHttpServer(BundleConfig config, uint16_t port)
      : cfg_(std::move(config)), port_(port) {}

  ~LibuvHttpServer() {
    if (loop_initialized_) {
      uv_loop_close(&loop_);
    }
  }

  expected<void, string> Run() {
    int status = uv_loop_init(&loop_);
    if (status != 0) {
      return unexpected<string>(string("uv_loop_init") + ": " +
                                uv_strerror(status));
    }
    loop_initialized_ = true;

    server_.data = this;
    sigint_.data = this;
    sigterm_.data = this;

    status = uv_tcp_init(&loop_, &server_);
    if (status != 0) {
      return unexpected<string>(string("uv_tcp_init") + ": " +
                                uv_strerror(status));
    }

    sockaddr_in addr{};
    status = uv_ip4_addr("0.0.0.0", port_, &addr);
    if (status != 0) {
      return unexpected<string>(string("uv_ip4_addr") + ": " +
                                uv_strerror(status));
    }

    status =
        uv_tcp_bind(&server_, reinterpret_cast<const sockaddr *>(&addr), 0);
    if (status != 0) {
      return unexpected<string>(string("bind") + ": " + uv_strerror(status));
    }

    status = uv_listen(reinterpret_cast<uv_stream_t *>(&server_), 128,
                       &LibuvHttpServer::OnNewConnection);
    if (status != 0) {
      return unexpected<string>(string("listen") + ": " + uv_strerror(status));
    }

    status = uv_signal_init(&loop_, &sigint_);
    if (status != 0) {
      return unexpected<string>(string("uv_signal_init(SIGINT)") + ": " +
                                uv_strerror(status));
    }
    status = uv_signal_start(&sigint_, &LibuvHttpServer::OnSignal, SIGINT);
    if (status != 0) {
      return unexpected<string>(string("uv_signal_start(SIGINT)") + ": " +
                                uv_strerror(status));
    }

    status = uv_signal_init(&loop_, &sigterm_);
    if (status != 0) {
      return unexpected<string>(string("uv_signal_init(SIGTERM)") + ": " +
                                uv_strerror(status));
    }
    status = uv_signal_start(&sigterm_, &LibuvHttpServer::OnSignal, SIGTERM);
    if (status != 0) {
      return unexpected<string>(string("uv_signal_start(SIGTERM)") + ": " +
                                uv_strerror(status));
    }

    cout << "dev server running at http://localhost:" << port_ << '\n';

    status = uv_run(&loop_, UV_RUN_DEFAULT);
    if (status != 0 && fatal_error_.empty()) {
      return unexpected<string>(string("uv_run") + ": " + uv_strerror(status));
    }
    if (!fatal_error_.empty()) {
      return unexpected<string>(fatal_error_);
    }

    status = uv_loop_close(&loop_);
    if (status != 0) {
      return unexpected<string>(string("uv_loop_close") + ": " +
                                uv_strerror(status));
    }
    loop_initialized_ = false;
    return {};
  }

private:
  struct ClientConnection {
    uv_tcp_t handle;
    LibuvHttpServer *server = nullptr;
    string read_buffer;
    string write_buffer;
  };

  static void OnAlloc(uv_handle_t *, size_t suggested_size, uv_buf_t *buf) {
    char *data = new char[suggested_size];
    *buf = uv_buf_init(data, static_cast<unsigned int>(suggested_size));
  }

  static void OnNewConnection(uv_stream_t *server_stream, int status) {
    auto *server = static_cast<LibuvHttpServer *>(server_stream->data);
    if (status < 0) {
      server->fatal_error_ = string("accept") + ": " + uv_strerror(status);
      server->InitiateShutdown();
      return;
    }

    auto *client = new ClientConnection{};
    client->server = server;
    client->handle.data = client;

    const int init_status = uv_tcp_init(&server->loop_, &client->handle);
    if (init_status != 0) {
      delete client;
      server->fatal_error_ =
          string("uv_tcp_init(client)") + ": " + uv_strerror(init_status);
      server->InitiateShutdown();
      return;
    }

    server->clients_.insert(client);
    if (uv_accept(server_stream,
                  reinterpret_cast<uv_stream_t *>(&client->handle)) != 0) {
      server->CloseClient(client);
      return;
    }

    const int read_status =
        uv_read_start(reinterpret_cast<uv_stream_t *>(&client->handle),
                      &LibuvHttpServer::OnAlloc, &LibuvHttpServer::OnRead);
    if (read_status != 0) {
      server->CloseClient(client);
    }
  }

  static void OnRead(uv_stream_t *stream, ssize_t nread, const uv_buf_t *buf) {
    auto *client = static_cast<ClientConnection *>(stream->data);
    auto *server = client->server;
    unique_ptr<char[]> cleanup(buf->base);

    if (nread < 0) {
      server->CloseClient(client);
      return;
    }
    if (nread == 0) {
      return;
    }

    client->read_buffer.append(buf->base, static_cast<size_t>(nread));
    if (client->read_buffer.size() > 8192) {
      server->SendResponse(
          client,
          HttpResponse::Text(400, "Bad Request", "request line too large"));
      return;
    }

    const size_t line_end = client->read_buffer.find("\r\n");
    if (line_end == string::npos) {
      return;
    }

    const string request_line = client->read_buffer.substr(0, line_end);
    auto request = ParseRequestLine(request_line);
    if (!request) {
      server->SendResponse(
          client, HttpResponse::Text(400, "Bad Request", "bad request"));
      return;
    }

    server->SendResponse(client, BuildResponse(server->cfg_, *request));
  }

  static void OnWriteDone(uv_write_t *req, int status) {
    auto *client = static_cast<ClientConnection *>(req->data);
    delete req;

    if (status < 0) {
      client->server->CloseClient(client);
      return;
    }

    client->server->CloseClient(client);
  }

  static void OnClientClosed(uv_handle_t *handle) {
    auto *client = static_cast<ClientConnection *>(handle->data);
    auto *server = client->server;
    server->clients_.erase(client);
    delete client;
  }

  static void OnSignal(uv_signal_t *signal, int) {
    auto *server = static_cast<LibuvHttpServer *>(signal->data);
    if (!server->shutting_down_) {
      cout << "shutting down dev server...\n";
    }
    server->InitiateShutdown();
  }

  void InitiateShutdown() {
    if (shutting_down_) {
      return;
    }
    shutting_down_ = true;

    CloseHandle(reinterpret_cast<uv_handle_t *>(&server_), nullptr);
    CloseHandle(reinterpret_cast<uv_handle_t *>(&sigint_), nullptr);
    CloseHandle(reinterpret_cast<uv_handle_t *>(&sigterm_), nullptr);

    vector<ClientConnection *> active_clients(clients_.begin(), clients_.end());
    for (auto *client : active_clients) {
      CloseClient(client);
    }
  }

  void CloseClient(ClientConnection *client) {
    CloseHandle(reinterpret_cast<uv_handle_t *>(&client->handle),
                &LibuvHttpServer::OnClientClosed);
  }

  static void CloseHandle(uv_handle_t *handle, uv_close_cb close_cb) {
    if (!uv_is_closing(handle)) {
      uv_close(handle, close_cb);
    }
  }

  void SendResponse(ClientConnection *client, const HttpResponse &response) {
    uv_read_stop(reinterpret_cast<uv_stream_t *>(&client->handle));

    client->write_buffer =
        "HTTP/1.1 " + to_string(response.status_code) + " " +
        response.status_text + "\r\n" +
        "Content-Type: " + response.content_type + "\r\n" +
        "Content-Length: " + to_string(response.body.size()) + "\r\n" +
        "Connection: close\r\n\r\n" + response.body;

    auto *write_req = new uv_write_t{};
    write_req->data = client;
    uv_buf_t buffer =
        uv_buf_init(client->write_buffer.data(),
                    static_cast<unsigned int>(client->write_buffer.size()));
    const int status =
        uv_write(write_req, reinterpret_cast<uv_stream_t *>(&client->handle),
                 &buffer, 1, &LibuvHttpServer::OnWriteDone);
    if (status != 0) {
      delete write_req;
      CloseClient(client);
    }
  }

  BundleConfig cfg_;
  uint16_t port_;
  uv_loop_t loop_{};
  bool loop_initialized_ = false;
  uv_tcp_t server_{};
  uv_signal_t sigint_{};
  uv_signal_t sigterm_{};
  bool shutting_down_ = false;
  string fatal_error_;
  unordered_set<ClientConnection *> clients_;
};

expected<void, string> RunBuild(const BundleConfig &config) {
  auto cleanup = CompileTypeScript(config, false);
  if (!cleanup) {
    return unexpected<string>(cleanup.error());
  }

  cout << "build complete: " << config.index_js_path << ", "
       << config.vendor_js_path << '\n';
  (*cleanup)();
  return {};
}

expected<void, string> RunDev(const BundleConfig &config) {
  auto cleanup = CompileTypeScript(config, true);
  if (!cleanup) {
    return unexpected<string>(cleanup.error());
  }

  auto port = ParsePort(kDefaultPort);
  if (!port) {
    (*cleanup)();
    return unexpected<string>(port.error());
  }

  LibuvHttpServer server(config, *port);
  auto result = server.Run();
  (*cleanup)();
  return result;
}

expected<void, string> Run(const vector<string> &args) {
  string mode = "dev";
  if (!args.empty()) {
    mode = args.front();
  }

  auto config = NewBundleConfig();
  if (!config) {
    return unexpected<string>(config.error());
  }

  if (mode == "dev") {
    return RunDev(*config);
  }
  if (mode == "build") {
    return RunBuild(*config);
  }
  return unexpected<string>("unknown mode \"" + mode +
                            "\", expected one of: dev, build");
}

} // namespace

int main(int argc, char **argv) {
  vector<string> args;
  for (int i = 1; i < argc; ++i) {
    args.emplace_back(argv[i]);
  }

  auto result = Run(args);
  if (!result) {
    cerr << result.error() << '\n';
    return 1;
  }
  return 0;
}
