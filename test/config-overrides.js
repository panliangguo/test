/**
 * config-overrides.js
 *
 * react-app-rewired 会读取本文件，在不 eject 的前提下覆盖 Create React App 默认的
 * webpack/babel 配置。这里做了三件事：
 *   1. 使用 babel-plugin-import 实现 antd 组件按需加载（同时加载对应的 less 样式）。
 *   2. 通过 less-loader 支持 antd v3 的 less 样式（需开启 javascriptEnabled）。
 *   3. 开启 legacy 装饰器语法，支持代码中的 @observable / @inject / @observer 等写法。
 */
const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra')

module.exports = override(
  // antd 按需加载：import { Button } from 'antd' -> 自动引入组件及其 less 样式
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 让 webpack 能够编译 antd 引入的 .less 文件（antd v3 使用 less 变量，需 javascriptEnabled）
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  }),
  // 支持 legacy 装饰器（mobx 的 @observable / @action、mobx-react 的 @inject / @observer 等）
  addDecoratorsLegacy(),
)
