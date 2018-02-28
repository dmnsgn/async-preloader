import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  plugins: [
    resolve(),
    typescript({
      typescript: require("typescript")
    })
  ],
  output: [
    {
      format: "umd",
      file: "lib/async-preloader.js",
      name: "AsyncPreloader",
      exports: "named",
      globals: {
        tslib: "tslib",
        lodash: "lodash",
        fontfaceobserver: "FontFaceObserver"
      }
    },
    {
      format: "es",
      file: "lib/async-preloader.module.js"
    }
  ],
  external: ["tslib", "lodash", "fontfaceobserver"]
};
