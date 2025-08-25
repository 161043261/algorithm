// babel
import { transform } from "@babel/core";
import presetEnv from "@babel/preset-env";
import { readFileSync } from "fs";

const code = readFileSync("./build.js", "utf-8");
const res = transform(code, {
  presets: [[presetEnv, { useBuiltIns: "usage", corejs: 3 }]],
});

console.log(res.code);
