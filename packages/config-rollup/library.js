// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */
const fs = require("fs");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const resolve = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const typescript = require("@rollup/plugin-typescript");
const analyze = require("rollup-plugin-analyzer");
const postcss = require("rollup-plugin-postcss");
const { preserveDirectives } = require("rollup-plugin-preserve-directives");
// TODO Modularise this configuration file more

const baseBuildMap = {
  input: "src/index.ts", // Entry file
  output: [
    // {
    //   file: "dist/index.mjs",
    //   sourcemap: false,
    //   format: "esm",
    // },
    {
      dir: "dist",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: false,
      format: "cjs",
      exports: "named",
    },
  ],
};

const plugins = {
  plugins: [
    resolve({
      extensions: [".js", ".ts", ".tsx", ".json"],
    }),
    commonjs(),
    json(),
    preserveDirectives({
      suppressPreserveModulesWarning: true,
      exclude: ["**/*.scss"],
    }),
    terser({ compress: { directives: false } }),
    typescript({
      tsconfig: "tsconfig.json",
      outDir: "dist",
    }),
    postcss({
      modules: true,
      extract: true,
      sourceMap: false,
      minimize: true,
      use: ["sass"],
      config: {
        path: "postcss.config.js",
      },
    }),
    analyze({
      summaryOnly: true,
      writeTo: (analysis) => {
        fs.appendFileSync("stats.log", analysis);
      },
    }),
  ],
};

module.exports = {
  ...baseBuildMap,
  ...plugins,
};
