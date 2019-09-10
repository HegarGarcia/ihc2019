const path = require("path");

module.exports = {
  devtool: "source-map",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    modules: ["node_modules", "core"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    stats: "minimal",
    port: 9000
  }
};
