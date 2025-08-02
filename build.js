// @ts-check
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import path, { dirname, extname, join } from "node:path";
import { platform } from "node:os";
import { spawnSync } from "node:child_process";

// ==============================
const srcDir = "src";
const outDir = "out";
const srcExtArr = [".cc", ".cpp"];
const cppStd = "c++23";
// ==============================

function getCompiler() {
  const osPlatform = platform();
  if (osPlatform === "win32") {
    return "g++";
  }

  if (osPlatform === "linux" || osPlatform === "darwin") {
    return "clang++";
  }
  console.error(`[error] unsupported platform: ${platform}`);
  process.exit(1);
}

/**
 *
 * @param {string} filePath
 */
function hasMain(filePath) {
  try {
    const content = readFileSync(filePath, { encoding: "utf8" });
    return content.includes("int main(");
  } catch (err) {
    console.error(`[error] file path: ${filePath}, error: ${err}`);
    return false;
  }
}

/**
 *
 * @param {string} dirPath
 */
function removeDir(dirPath) {
  if (existsSync(dirPath)) {
    try {
      rmSync(dirPath, { recursive: true, force: true });
      console.log(`-- ${dirPath} removed`);
    } catch (err) {
      console.error(`"[error] remove ${outDir} error: ${err}`);
    }
  }
}

/**
 *
 * @param {string} dirPath
 * @param {(srcPath: string) => void} callback
 */
function walkDir(dirPath, callback) {
  readdirSync(dirPath, { withFileTypes: true }).forEach((item) => {
    const itemPath = join(dirPath, item.name);
    if (item.isDirectory()) {
      walkDir(itemPath, callback);
    } else if (item.isFile()) {
      callback(itemPath);
    }
  });
}

function startCompile() {
  removeDir(outDir);

  const compiler = getCompiler();
  const osPlatform = platform();

  console.log("==================== build start ====================");
  console.log(`-- platform: ${osPlatform}`);
  console.log(`-- compiler: ${compiler}`);
  console.log(`-- cpp standard: ${cppStd}`);
  console.log(`-- source directory: ${srcDir}`);
  console.log(`-- out directory: ${outDir}`);

  if (!existsSync(srcDir) || !statSync(srcDir).isDirectory()) {
    console.error(`[error] ${srcDir} is not a directory`);
    process.exit(1);
  }

  walkDir(srcDir, (srcPath) => {
    if (!srcExtArr.includes(extname(srcPath)) || !hasMain(srcPath)) {
      return;
    }

    console.log(`\x1b[92m-- add executable ${srcPath}\x1b[0m`);

    const srcPathNoExt = srcPath.slice(0, -path.extname(srcPath).length);

    let exePath = join(outDir, srcPathNoExt);

    if (osPlatform === "win32") {
      exePath += ".exe";
    }

    const exeDir = dirname(exePath);
    mkdirSync(exeDir, { recursive: true });

    const compileCmds = [
      compiler,
      `-std=${cppStd}`,
      "-g",
      "-o",
      exePath,
      srcPath,
    ];

    console.log(`-- compile command: ${compileCmds.join(" ")}`);

    const res = spawnSync(compileCmds[0], compileCmds.slice(1), {
      encoding: "utf8",
    });

    if (res.error) {
      console.error(`[error] ${compiler} not found`);
      return;
    }

    if (res.status !== 0) {
      console.error(`[error] compiler error: ${res.stderr}`);
      return;
    }

    console.log(`-- compiled, output -> ${exePath}`);
    if (res.stderr) {
      console.warn(`[warning] compiler warning: ${res.stderr}`);
    }
  });

  console.log("==================== build end ====================");
}

startCompile();
