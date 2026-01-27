// export const revalidate = 0; // 不缓存
// export const revalidate = 5; // 缓存 5s
// export const dynamic = "force-dynamic";
import { Suspense } from "react";

const DynamicComponent = async () => {
  const res = await fetch("http://127.0.0.1:3001/api/image", {
    cache: "no-store",
  });
  const arr = await res.arrayBuffer();
  const base64Image = Buffer.from(arr).toString("base64");
  console.log(base64Image);
  return (
    <>
      <h1>Home</h1>
      <img
        src={`data:image/png;base64,${base64Image}`}
        alt="base64Image"
        width={256}
      />
    </>
  );
};

export default async function Home() {
  return (
    <>
      <h1>Home</h1>
      <Suspense fallback="Loading Dynamic Content...">
        <DynamicComponent />
      </Suspense>
    </>
  );
}
