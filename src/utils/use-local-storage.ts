import { useSyncExternalStore } from "react";

type TCallback = () => void;

export default function useLocalStorage<T>(key: string, initialVal: T) {
  let cb: TCallback | null = null;

  // subscribe 订阅数据源的更新
  // subscribe 接收 React 提供的 onStoreChange 回调函数
  // 数据源更新时, 调用 onStoreChange
  const subscribe = (onStoreChange: TCallback): TCallback => {
    // function() { checkIfSnapshotChanged(inst) && forceStoreRerender(fiber); }
    console.log("[subscribe] onStoreChange:", onStoreChange.toString());

    // onStoreChange 通知 React 数据源有更新
    // 通知 React 调用 getSnapshot 获取数据源的快照, 以更新 state, 触发组件更新
    cb = onStoreChange;

    // subscribe 返回取消订阅的函数
    return () => (cb = null);
  };

  // getSnapshot 获取数据源的快照
  // 如果 getSnapshot 返回值的内存地址与上一个返回值的内存地址不同, 则会触发组件更新
  const getSnapshot = (): T => {
    const jsonStr = localStorage.getItem(key);
    // 如果 getSnapshot 返回值的内存地址总是不同的, 则会报错 Maximum update depth exceeded
    return jsonStr ? (JSON.parse(jsonStr) as T) : initialVal;
  };

  const state: T = useSyncExternalStore<T>(subscribe, getSnapshot);
  const setState = (newVal: T) => {
    localStorage.setItem(key, JSON.stringify(newVal));
    cb?.();
  };

  return [state, setState] as const;
}
