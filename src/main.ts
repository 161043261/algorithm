type TTask = () => Promise<unknown>;
type TResolveFn = (res: unknown) => void;
type TWrappedTask = (taskId: number) => void;

const getTask = (val: unknown, start: number, delay: number) => () =>
  new Promise((resolve) => {
    setTimeout(() => {
      val = `val: ${val}, elapsed: ${Date.now() - start}`;
      console.log(val);
      resolve(val);
    }, delay);
  });

function reconcile(maxTaskCnt: number) {
  let curTaskCnt = 0;
  const taskQueue: [number, TWrappedTask][] = [];
  let taskId = 0;
  const taskId2res = new Map<number, unknown>();
  let resolveFn: null | TResolveFn = null;

  const fn = (task: TTask) => {
    const wrappedTask = (taskId: number) => {
      curTaskCnt++;
      task()
        .then((val) => {
          taskId2res.set(taskId, val);
        })
        .catch((err) => {
          taskId2res.set(taskId, err);
        })
        .finally(() => {
          curTaskCnt--;
          if (taskQueue.length > 0) {
            const [nextTaskId, nextTask] = taskQueue[0];
            taskQueue.shift();
            nextTask(nextTaskId);
          } else if (curTaskCnt == 0) {
            const res = Array.from(taskId2res.entries()).sort(
              (a, b) => a[0] - b[0],
            );
            resolveFn?.(res.map((item) => item[1]));
          }
        });
    };

    if (curTaskCnt < maxTaskCnt) {
      wrappedTask(taskId);
    } else {
      taskQueue.push([taskId, wrappedTask]);
    }
    taskId += 1;
  };

  const ok = () => {
    return new Promise((resolve) => {
      resolveFn = resolve;
    });
  };

  return [fn, ok] as const;
}

const start = Date.now();
const [fn, ok] = reconcile(2);

fn(getTask("Task 1", start, 3000));
fn(getTask("Task 2", start, 2000));
fn(getTask("Task 3", start, 2000));
fn(getTask("Task 4", start, 3000));
fn(getTask("Task 5", start, 1000));

ok().then(console.log);
