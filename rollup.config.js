import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

import pkg from "./package.json";

const isDev = process.env.NODE_ENV === "development";

export default [
  {
    input: "src/index.ts",
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        typescript: require("typescript")
      }),
      isDev ? 0 : uglify()
    ].filter(Boolean),
    external: ["tslib", "lodash-es/get", "fontfaceobserver-es"],
    output: {
      name: "AsyncPreloader",
      format: "umd",
      file: pkg.browser,
      exports: "named",
      globals: {
        tslib: "tslib",
        "lodash-es/get": "_.get",
        "fontfaceobserver-es": "FontFaceObserver"
      }
    }
  },
  {
    input: "src/index.ts",
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        typescript: require("typescript")
      }),
      isDev ? 0 : uglify()
    ].filter(Boolean),
    external: ["tslib", "lodash-es/get", "fontfaceobserver-es"],
    output: {
      format: "cjs",
      file: pkg.main,
      exports: "named"
    }
  },
  {
    input: "src/index.ts",
    plugins: [
      resolve(),
      typescript({
        typescript: require("typescript")
      })
    ],
    external: ["tslib", "lodash-es/get", "fontfaceobserver-es"],
    output: {
      format: "es",
      file: pkg.module
    }
  }
];
