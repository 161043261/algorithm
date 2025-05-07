/* eslint-disable @typescript-eslint/no-unused-vars */
// todo templateStr

const name = "Chihaya Anon";
const age = 22;
const str = "My name is ${name}, my age is ${age}";

/**
 *
 * @param {string} str
 * @returns {string}
 */
function templateStr(str) {
  return str.replace(/\$\{(.*?)\}/g, function (substr, arg /** (.*?) */) {
    console.log(substr, arg);
    return eval(arg); // eval 根据变量名, 计算变量值
  });
}

console.log(templateStr(str));

export default {}
