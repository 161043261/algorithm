"use server";

import { readFileSync } from "fs";
interface IData {
  list: {
    name: string;
    age: number;
  }[];
}

async function Home() {
  // 同步 IO
  const dataStr = readFileSync("data.json", "utf-8");
  const data: IData = JSON.parse(dataStr);
  console.log(data); // prerender

  // 模块导入
  const data2: IData = await import("../../../data.json");
  console.log(data2); // prerender

  // 纯计算
  const arr = [1, 2, 3, 4, 5];
  const arr2 = arr.map((item) => 2 * item);
  console.log(arr2); // prerender

  return (
    <>
      <div>Home</div>
      {data.list.map((item, idx) => (
        <div key={idx}>
          {item.name}, {item.age}
        </div>
      ))}
      {data2.list.map((item, idx) => (
        <div key={idx}>
          {item.name}, {item.age}
        </div>
      ))}
      {arr2.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </>
  );
}

export default Home;
