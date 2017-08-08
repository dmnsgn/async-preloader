import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  entry: "src/index.js",
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    })
  ],
  moduleName: "AsyncPreloader",
  targets: [
    {
      format: "umd",
      dest: "lib/async-preloader.js"
    },
    {
      format: "es",
      dest: "lib/async-preloader.module.js"
    }
  ],
  external: [
    'fontfaceobserver'
  ]
};
