// import { cacheLife } from "next/cache";
import { Suspense } from "react";

interface IData {
  list: {
    name: string;
    age: number;
  }[];
}

const DynamicComponent = async () => {
  // "use cache" // 缓存 fetch 请求
  // // cacheLife("days") // 预设
  // cacheLife({
  //   stale: 5, // 5s 内, 客户端直接使用客户端缓存, 不请求服务器
  //   revalidate: 5, // 5s 后, 客户端缓存失效, 服务器收到请求, 返回服务器缓存给客户端, 异步生成新内容, 更新服务器缓存
  //   expire: 30, // 30s 后, 服务器收到请求, 服务器缓存失效, 同步生成新内容, 更新服务器缓存, 返回新内容给客户端
  // })
  const res = await fetch("http://127.0.0.1:3001/api/data");
  const data: IData = await res.json();

  return (
    <>
      <div>Dynamic Content</div>
      {data.list.map((item, idx) => (
        <div key={idx}>
          {item.name}, {item.age}
        </div>
      ))}
    </>
  );
};

export default async function HomeV2() {
  return (
    <>
      <h1>Home</h1>
      <Suspense fallback={<div>Loading Dynamic Content...</div>}>
        <DynamicComponent />
      </Suspense>
    </>
  );
}
