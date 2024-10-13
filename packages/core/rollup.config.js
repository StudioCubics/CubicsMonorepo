const common = require("@studiocubics/rollup-config/library.js");
module.exports = {
  external: ["react", "@react-email/components", "react-hot-toast"], // Exclude deps from the bundle
  ...common,
};
