#!/usr/bin/env node
// @ts-check

import fs from "fs";
import fsp from "fs/promises";
import http from "http";
import os from "os";
import path from "path";
import { spawn, spawnSync } from "child_process";
import { fileURLToPath } from "url";

/** @typedef {() => void | Promise<void>} CleanupFn */

/**
 * @typedef {Object} BundleConfig
 * @property {string} rootDir
 * @property {string} templateHTMLPath
 * @property {string} indexHTMLPath
 * @property {string} vendorTSPath
 * @property {string} indexTSPath
 * @property {string} vendorJSPath
 * @property {string} indexJSPath
 */

/**
 * @typedef {Object} PreparedSources
 * @property {string} entryPath
 * @property {CleanupFn} cleanup
 */

const DEFAULT_PORT = "3000";
const TEMPLATE_PLACEHOLDER = "<!-- TEMPLATE -->";

/**
 * @returns {BundleConfig}
 */
function newBundleConfig() {
  const rootDir = path.dirname(fileURLToPath(import.meta.url));
  return {
    rootDir,
    templateHTMLPath: path.join(rootDir, "template.html"),
    indexHTMLPath: path.join(rootDir, "index.html"),
    vendorTSPath: path.join(rootDir, "vendor.ts"),
    indexTSPath: path.join(rootDir, "index.ts"),
    vendorJSPath: path.join(rootDir, "vendor.js"),
    indexJSPath: path.join(rootDir, "index.js"),
  };
}

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
async function run(args) {
  const mode = args[0] ?? "dev";
  const config = newBundleConfig();

  switch (mode) {
    case "dev":
      await runDev(config);
      return;
    case "build":
      await runBuild(config);
      return;
    default:
      throw new Error(`unknown mode "${mode}", expected one of: dev, build`);
  }
}

/**
 * @param {BundleConfig} config
 * @returns {Promise<void>}
 */
async function runBuild(config) {
  const cleanup = await compileTypeScript(config, false);
  try {
    console.log(
      `build complete: ${config.indexJSPath}, ${config.vendorJSPath}`,
    );
  } finally {
    await cleanup();
  }
}

/**
 * @param {BundleConfig} config
 * @returns {Promise<void>}
 */
async function runDev(config) {
  const cleanup = await compileTypeScript(config, true);
  const server = http.createServer((req, res) => {
    void handleRequest(config, req, res);
  });

  /**
   * @returns {Promise<void>}
   */
  const closeServer = async () => {
    if (!server.listening) {
      return;
    }
    await new Promise((resolve) => {
      server.close(() => resolve(undefined));
    });
  };

  /** @returns {void} */
  const shutdownHandler = () => {
    if (!server.listening) {
      return;
    }
    console.log("shutting down dev server...");
    void closeServer();
  };

  process.once("SIGINT", shutdownHandler);
  process.once("SIGTERM", shutdownHandler);

  try {
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(Number(DEFAULT_PORT), () => {
        server.off("error", reject);
        console.log(`dev server running at http://localhost:${DEFAULT_PORT}`);
        resolve(undefined);
      });
    });

    await new Promise((resolve, reject) => {
      server.once("close", resolve);
      server.once("error", reject);
    });
  } finally {
    process.removeListener("SIGINT", shutdownHandler);
    process.removeListener("SIGTERM", shutdownHandler);
    await closeServer();
    await cleanup();
  }
}

/**
 * @param {BundleConfig} config
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage>} res
 * @returns {Promise<void>}
 */
async function handleRequest(config, req, res) {
  if ((req.method ?? "GET") !== "GET") {
    sendResponse(res, 405, "text/plain; charset=utf-8", "method not allowed");
    return;
  }

  const requestUrl = new URL(req.url ?? "/", "http://localhost");
  const requestPath =
    requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const relativePath = requestPath.replace(/^\/+/, "");

  if (relativePath.includes("..")) {
    sendResponse(res, 403, "text/plain; charset=utf-8", "forbidden");
    return;
  }

  const rootPath = await fsp.realpath(config.rootDir);
  const targetPath = path.join(config.rootDir, relativePath);

  /** @type {string} */
  let realTargetPath;
  try {
    realTargetPath = await fsp.realpath(targetPath);
  } catch {
    sendResponse(res, 404, "text/plain; charset=utf-8", "not found");
    return;
  }

  const normalizedRoot = rootPath.endsWith(path.sep)
    ? rootPath
    : `${rootPath}${path.sep}`;
  if (
    realTargetPath !== rootPath &&
    !realTargetPath.startsWith(normalizedRoot)
  ) {
    sendResponse(res, 403, "text/plain; charset=utf-8", "forbidden");
    return;
  }

  /** @type {fs.Stats} */
  let stat;
  try {
    stat = await fsp.stat(realTargetPath);
  } catch {
    sendResponse(res, 404, "text/plain; charset=utf-8", "not found");
    return;
  }

  if (!stat.isFile()) {
    sendResponse(res, 404, "text/plain; charset=utf-8", "not found");
    return;
  }

  const body = await fsp.readFile(realTargetPath);
  sendResponse(res, 200, getContentType(realTargetPath), body);
}

/**
 * @param {http.ServerResponse<http.IncomingMessage>} res
 * @param {number} statusCode
 * @param {string} contentType
 * @param {string | Buffer} body
 */
function sendResponse(res, statusCode, contentType, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Length", Buffer.byteLength(body));
  res.end(body);
}

/**
 * @param {string} filePath
 * @returns {string}
 */
function getContentType(filePath) {
  switch (path.extname(filePath).toLowerCase()) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".json":
      return "application/json; charset=utf-8";
    case ".txt":
      return "text/plain; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

/**
 * @param {BundleConfig} config
 * @param {boolean} removeOutputOnCleanup
 * @returns {Promise<CleanupFn>}
 */
async function compileTypeScript(config, removeOutputOnCleanup) {
  const prepared = await prepareGeneratedSources(config);
  /** @type {CleanupFn[]} */
  const cleanupFns = [prepared.cleanup];

  const tempOutputDir = await fsp.mkdtemp(
    path.join(os.tmpdir(), "proxy-tsc-out-"),
  );
  cleanupFns.push(async () => {
    await fsp.rm(tempOutputDir, { recursive: true, force: true });
  });

  try {
    await runTSC(prepared.entryPath, tempOutputDir);

    const compiledIndexJSPath = path.join(tempOutputDir, "index.js");
    const compiledVendorJSPath = path.join(tempOutputDir, "vendor.js");

    await assertFileExists(compiledIndexJSPath);
    await assertFileExists(compiledVendorJSPath);

    await copyFile(compiledIndexJSPath, config.indexJSPath);
    await copyFile(compiledVendorJSPath, config.vendorJSPath);

    if (removeOutputOnCleanup) {
      cleanupFns.push(async () => {
        await safeUnlink(config.indexJSPath);
      });
      cleanupFns.push(async () => {
        await safeUnlink(config.vendorJSPath);
      });
    }
  } catch (error) {
    await runCleanup(cleanupFns);
    throw error;
  }

  return async () => {
    await runCleanup(cleanupFns);
  };
}

/**
 * @param {BundleConfig} config
 * @returns {Promise<PreparedSources>}
 */
async function prepareGeneratedSources(config) {
  const templateContent = await fsp.readFile(config.templateHTMLPath, "utf8");
  const vendorTSContent = await fsp.readFile(config.vendorTSPath, "utf8");
  const indexTSContent = await fsp.readFile(config.indexTSPath, "utf8");

  if (!indexTSContent.includes(TEMPLATE_PLACEHOLDER)) {
    throw new Error(
      `placeholder "${TEMPLATE_PLACEHOLDER}" not found in index.ts`,
    );
  }

  const replaced = indexTSContent.replace(
    TEMPLATE_PLACEHOLDER,
    templateContent,
  );
  const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), "proxy-ts-src-"));
  const generatedIndexPath = path.join(tempDir, "index.ts");
  const generatedVendorPath = path.join(tempDir, "vendor.ts");

  await fsp.writeFile(generatedIndexPath, replaced, "utf8");
  await fsp.writeFile(generatedVendorPath, vendorTSContent, "utf8");

  return {
    entryPath: generatedIndexPath,
    cleanup: async () => {
      await fsp.rm(tempDir, { recursive: true, force: true });
    },
  };
}

/**
 * @param {string} entryPath
 * @param {string} outDir
 * @returns {Promise<void>}
 */
async function runTSC(entryPath, outDir) {
  const [command, ...args] = resolveTSCCommand(entryPath, outDir);
  await runCommand(command, args);
}

/**
 * @param {string} entryPath
 * @param {string} outDir
 * @returns {string[]}
 */
function resolveTSCCommand(entryPath, outDir) {
  const baseArgs = [
    "--target",
    "ESNext",
    "--module",
    "ESNext",
    "--moduleResolution",
    "Bundler",
    "--lib",
    "ESNext,DOM",
    "--strict",
    "--skipLibCheck",
    "--pretty",
    "false",
    "--declaration",
    "false",
    "--sourceMap",
    "false",
    "--removeComments",
    "false",
    "--outDir",
    outDir,
    entryPath,
  ];

  if (commandExists("tsc")) {
    return ["tsc", ...baseArgs];
  }
  return ["npx", "--yes", "tsc", ...baseArgs];
}

/**
 * @param {string} command
 * @returns {boolean}
 */
function commandExists(command) {
  const result = spawnSync(command, ["--version"], { stdio: "ignore" });
  return !result.error && result.status === 0;
}

/**
 * @param {string} command
 * @param {string[]} args
 * @returns {Promise<void>}
 */
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: false,
    });

    child.on("error", (error) => {
      reject(new Error(`run typescript compiler: ${error.message}`));
    });

    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      const suffix =
        signal !== null ? `signal ${signal}` : `exit code ${String(code ?? 1)}`;
      reject(new Error(`run typescript compiler: ${suffix}`));
    });
  });
}

/**
 * @param {string} srcPath
 * @param {string} dstPath
 * @returns {Promise<void>}
 */
async function copyFile(srcPath, dstPath) {
  await fsp.copyFile(srcPath, dstPath);
}

/**
 * @param {string} filePath
 * @returns {Promise<void>}
 */
async function assertFileExists(filePath) {
  try {
    const stat = await fsp.stat(filePath);
    if (!stat.isFile()) {
      throw new Error("not a file");
    }
  } catch {
    throw new Error(`compiled output missing: ${filePath}`);
  }
}

/**
 * @param {string} filePath
 * @returns {Promise<void>}
 */
async function safeUnlink(filePath) {
  try {
    await fsp.unlink(filePath);
  } catch (error) {
    if (!isErrnoException(error) || error.code !== "ENOENT") {
      throw error;
    }
  }
}

/**
 * @param {CleanupFn[]} cleanups
 * @returns {Promise<void>}
 */
async function runCleanup(cleanups) {
  for (let index = cleanups.length - 1; index >= 0; index -= 1) {
    const cleanup = cleanups[index];
    if (typeof cleanup !== "function") {
      continue;
    }
    try {
      await cleanup();
    } catch (_error) {
      // Ignore cleanup errors to match the Go implementation.
    }
  }
}

/**
 * @param {unknown} error
 * @returns {error is NodeJS.ErrnoException}
 */
function isErrnoException(error) {
  return error instanceof Error;
}

void main();

/**
 * @returns {Promise<void>}
 */
async function main() {
  try {
    await run(process.argv.slice(2));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exitCode = 1;
  }
}
