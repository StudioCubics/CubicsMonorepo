// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */

const { baseBuildMap } = require("./buildMaps");
const { commonPlugins, sassPlugin } = require("./plugins");

module.exports = {
  plugins: [...commonPlugins, ...sassPlugin],
  ...baseBuildMap,
};