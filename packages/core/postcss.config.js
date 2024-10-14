module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-prefixer")({ prefix: "sc_" }),
  ],
};
