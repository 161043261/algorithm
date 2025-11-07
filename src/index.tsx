import { createRoot } from "react-dom/client";

const container = document.getElementById("webpack");

if (!container) {
  throw new Error("container === null");
}

const root = createRoot(container);

root.render(<div>Hello, React</div>);
