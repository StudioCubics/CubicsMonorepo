// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */

const { baseBuildMap } = require("./buildMaps");
const { commonPlugins } = require("./plugins");

module.exports = {
  plugins: commonPlugins,
  ...baseBuildMap,
};
