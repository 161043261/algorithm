"use client";

import { ReactNode, useState } from "react";

interface IProps {
  children: ReactNode;
}

const AboutTemplate = function (props: IProps) {
  const [cnt, setCnt] = useState(0);
  const handleClick = () => setCnt(cnt + 1);

  const { children } = props;

  return (
    <main className="bg-green-300">
      <div>cnt: {cnt}</div>
      <button onClick={handleClick}>addCnt</button>
      <header>AboutTemplate header</header>
      {children}
      <footer>AboutTemplate footer</footer>
    </main>
  );
};

export default AboutTemplate;
