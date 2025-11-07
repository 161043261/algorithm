import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const container = document.getElementById("webpack");

if (!container) {
  throw new Error("container === null");
}

const root = createRoot(container);

root.render(<App />);
