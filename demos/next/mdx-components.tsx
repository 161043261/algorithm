import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: (props) => <h1 {...props} className="text-red-300" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
