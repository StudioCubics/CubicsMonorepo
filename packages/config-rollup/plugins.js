const fs = require("fs");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const resolve = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const typescript = require("@rollup/plugin-typescript");
const analyze = require("rollup-plugin-analyzer");
const postcss = require("rollup-plugin-postcss");
const { preserveDirectives } = require("rollup-plugin-preserve-directives");

const commonPlugins = [
  resolve({
    extensions: [".js", ".ts", ".tsx", ".json"],
  }),
  commonjs(),
  json(),
  preserveDirectives({
    suppressPreserveModulesWarning: true,
    exclude: ["**/*.scss"],
  }),
  typescript({
    tsconfig: "tsconfig.json",
    outDir: "dist",
  }),
  terser({ compress: { directives: false } }),
  analyze({
    summaryOnly: true,
    writeTo: (analysis) => {
      fs.appendFileSync("stats.log", analysis);
    },
  }),
];

const sassPlugin = [
  postcss({
    modules: true,
    extract: true,
    sourceMap: false,
    minimize: true,
    use: {
      sass: {
        silenceDeprecations: ["legacy-js-api", "import"],
      },
    },
    config: {
      path: "postcss.config.js",
    },
  }),
];

module.exports = { commonPlugins, sassPlugin };
