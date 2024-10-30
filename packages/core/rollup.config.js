const common = require("@studiocubics/rollup-config/library-sass.js");
module.exports = {
  external: ["react"], // Exclude deps from the bundle
  ...common,
};
