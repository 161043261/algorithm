"use client"; // Error 组件必须是客户端组件

function ErrorComponent(props: unknown) {
  return <main className="bg-red-300">error: {JSON.stringify(props)}</main>;
}

export default ErrorComponent;
