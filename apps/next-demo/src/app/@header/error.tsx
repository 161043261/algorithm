"use client"; // Error 组件必须是客户端组件

function HeaderErrorComponent(props: unknown) {
  return <div className="bg-yellow-300">error: {JSON.stringify(props)}</div>;
}

export default HeaderErrorComponent;
