const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const resolve = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const typescript = require("@rollup/plugin-typescript");
const analyze = require("rollup-plugin-analyzer");
const banner = require("rollup-plugin-banner2");
const postcss = require("rollup-plugin-postcss");
const fs = require("fs");
// TODO Modularise this configuration file more

const baseBuildMap = {
  input: "src/index.ts", // Entry file
  output: [
    {
      file: "dist/index.mjs",
      sourcemap: false,
      format: "esm",
    },
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
    terser(),
    typescript({
      tsconfig: "tsconfig.json",
      outDir: "dist",
    }),
    banner(() => '"use client";'),
    postcss({
      modules: true,
      extract: true,
      sourceMap: false,
      minimize: true,
      use: ["sass"],
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
