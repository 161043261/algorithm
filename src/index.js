/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
var cancellable = function (generator) {
  let /** @type {Function} */ cancel;

  const promiseAll = new Promise((resolve, reject) => {
    const run = (arg, doNext = true) => {
      try {
        let /** @type {{ value: unknown, done: boolean }} */ ret;

        if (doNext) {
          ret = generator.next(arg);
        } else {
          ret = generator.throw(arg);
        }

        if (ret.done) {
          return resolve(ret.value);
        }

        ret.value /** Promise */
          .then((res) => run(res))
          .catch((err) => run(err, false));
      } catch (err) {
        reject(err);
      }
    };

    cancel = () => run("Cancelled", false);
    run(null);
  });

  return [cancel, promiseAll];
};
