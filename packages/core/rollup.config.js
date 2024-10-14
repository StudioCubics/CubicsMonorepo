const common = require("@studiocubics/rollup-config/library.js");
module.exports = {
  external: ["react"], // Exclude deps from the bundle
  ...common,
};
