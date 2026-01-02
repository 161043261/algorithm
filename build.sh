# go install mvdan.cc/sh/v3/cmd/shfmt@latest
# shfmt -l -w ./build.sh

SRC_DIR="./src/go-by-example"
TARGET_DIR="./target"

# rm -rf $TARGET_DIR
mkdir -p $TARGET_DIR

get_file_mtime() {
  local file="$1"
  if [[ "$(uname)" == "Darwin" ]]; then
    stat -f "%m" "$file"
  else
    stat -c "%Y" "$file"
  fi
}

find "$SRC_DIR" -type f -name "*.go" | while read -r go_file; do
  relative_path="${go_file#$SRC_DIR/}"
  file_name_no_ext=$(basename "$go_file" .go)
  relative_dir_path=$(dirname "$relative_path")
  target_path="$TARGET_DIR/$relative_dir_path/$file_name_no_ext"
  mkdir -p "$(dirname "$target_path")"
  # go build -o "$target_path" -tags="$file_name_no_ext" "$go_file"

  should_compile=false
  if [ ! -f "$target_path" ]; then
    should_compile=true
  else
    src_mtime=$(get_file_mtime "$go_file")
    target_mtime=$(get_file_mtime "$target_path")
    if [ "$src_mtime" -gt "$target_mtime" ]; then
      should_compile=true
    else
      echo "Incremental compilation: $go_file => $target_path"
    fi
  fi

  if [ "$should_compile" = true ]; then
    go build -o "$target_path" -tags="$file_name_no_ext" "$go_file"
    if [ $? -eq 0 ]; then
      echo "go build -o $target_path -tags=$file_name_no_ext $go_file"
      echo "Build success: $go_file => $target_path"
    else
      echo "Build error: $go_file => $target_path"
    fi
  fi

done
