# bundle-files-webpack-plugin


<h2 align="center">Usage</h2>

 ```javascript
const BundleFilesPlugin = require("bundle-files-webpack-plugin");
module.exports = {
  plugins: [
    new BundleFilesPlugin({
      files: ["source"],
      targets: ["target"]
    }),
  ]
}
```