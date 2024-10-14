const common = require("@studiocubics/rollup-config/library.js");
module.exports = {
  external: ["react", "@react-email/components"], // Exclude deps from the bundle
  ...common,
};
