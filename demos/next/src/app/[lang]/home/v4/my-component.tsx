"use client";

import { useState } from "react";

export default function MyComponent() {
  const [cnt, setCnt] = useState(0);
  return (
    <>
      <h1>{cnt}</h1>
      <button onClick={() => setCnt(cnt + 1)}>Add</button>
    </>
  );
}
