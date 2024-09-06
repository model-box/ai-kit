import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/index.js",
    format: "esm",
  },
  external: ["react", "react/jsx-runtime"],
  plugins: [typescript()],
};
