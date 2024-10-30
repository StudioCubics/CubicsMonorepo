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
module.exports = { baseBuildMap };
