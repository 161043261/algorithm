"use client";

export default function Login() {
  return (
    <>
      <div>process.env.NODE_ENV {process.env.NODE_ENV}</div>
      {/* process.env.BASE_URL 只能在服务器组件中访问 */}
      <div>process.env.BASE_URL {process.env.BASE_URL}</div>
      {/* process.env.NEXT_PUBLIC_BASE_URL 服务器组件, 客户端组件中都可以访问 */}
      <div>
        process.env.NEXT_PUBLIC_BASE_URL {process.env.NEXT_PUBLIC_BASE_URL}
      </div>
    </>
  );
}
