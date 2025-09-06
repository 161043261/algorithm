/* eslint-disable @typescript-eslint/no-unused-vars */
type Fn<Type> = (/** arguments */) => Promise<Type> /** returnValue */;

function promiseAll<Type>(functions: Fn<Type>[]): Promise<Type[]> {
  let resolvedCnt = 0;
  const resultArr: (Type | undefined)[] = Array.from(
    { length: functions.length },
    () => undefined,
  );

  return new Promise((resolve, reject) => {
    for (let i = 0; i < functions.length; i++) {
      const func = functions[i];

      // <<< Micro task begin <<<
      func()
        .then((val) => {
          resolvedCnt += 1;
          resultArr[i] = val;

          if (resolvedCnt === functions.length) {
            resolve(resultArr as Type[]);
          }
        })
        .catch((err) => {
          reject(err);
        });
      // >>> Micro task end >>>
    }
  });
}
