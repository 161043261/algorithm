"use client"; // 类组件必须是客户端组件

import Link from "next/link";
import { Component, Suspense } from "react";

interface IState {
  count: number;
}

class AboutLayout extends Component<LayoutProps<"/[lang]/about">, IState> {
  state = { count: 0 };

  handleClick = () => {
    const { count: cnt } = this.state;
    this.setState({ count: cnt + 1 }, () => console.log(this.state));
  };

  render() {
    const { count: cnt } = this.state;
    const { children } = this.props;
    return (
      <main className="bg-blue-300 h-500">
        <div>cnt {cnt}</div>
        <button onClick={this.handleClick}>addCnt</button>
        <header>AboutLayer header</header>

        {/* children: template.tsx */}
        <Suspense fallback={<>loading...</>}>{children}</Suspense>
        <Link href="/about/him" className="text-red-500 block">
          /about/him
        </Link>
        <Link
          href="/about/her"
          className="text-red-500 block"
          // 预获取 /about/her 页面
          prefetch
          // 禁止默认滚动行为: 滚动到顶部
          scroll={false}
          // 替换当前页面
          replace
        >
          /about/her
        </Link>
        <Link
          href={{ pathname: "/about/him", query: { name: "lark", age: 24 } }}
          prefetch={false}
        >
          /about/him?name=lark&age=24
        </Link>
        <footer>AboutLayer footer</footer>
      </main>
    );
  }
}

export default AboutLayout;
