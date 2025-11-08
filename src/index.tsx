import { createRoot } from "react-dom/client";
import Layout from "./Layout.js";
import "./main.css";

const container = document.getElementById("webpack");

if (!container) {
  throw new Error("container === null");
}

const root = createRoot(container);

root.render(<Layout />);
