// node ./babel.js ./src/index.js
import { transform } from "@babel/core";
import presetEnv from "@babel/preset-env";
import { readFileSync } from "node:fs";

const code = readFileSync(process.argv[2], "utf-8");
const res = transform(code, {
  presets: [[presetEnv, { useBuiltIns: "usage", corejs: 3 }]],
});

console.log(res.code);
