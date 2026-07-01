# AGENTS.md

## Cursor Cloud specific instructions

### 项目概述
本仓库是一个 **纯前端** 的 React + Ant Design v3 + MobX 后台管理系统模板（基于 Create React App）。
所有源码位于 `test/` 目录下（CRA 工程根目录即 `test/`）。没有后端 / 数据库：
登录、用户数据、鉴权全部是客户端 mock（MobX store + cookie）。默认账号 `admin` / 密码 `admin`。

> 说明：仓库原本缺失 `package.json` / `public/` 等 CRA 必需文件，本环境已补齐
> （`test/package.json`、`test/public/`、`test/config-overrides.js`、`test/.env`）。

### Node 版本（重要）
必须使用 **Node 16** 运行 / 构建本项目。系统默认的 `/exec-daemon/node` 是 Node 22，
与 `react-scripts@4` / webpack 4 不兼容（会报 openssl / core-js 等错误）。

- 交互式 shell：`~/.bashrc` 已把 Node 16（nvm）加到 PATH 前面，直接可用。
- 非交互式命令（如脚本、tmux `send-keys`）：需显式前置 PATH：
  `export PATH="$HOME/.nvm/versions/node/v16.20.2/bin:$PATH"`
  （若该目录不存在，先执行 `nvm install 16`）。

### 常用命令（在 `test/` 目录下执行）
- 启动开发服务器：`BROWSER=none PORT=3000 npm start`（监听 3000 端口，支持热更新）。
- 代码检查（lint）：`npm run lint`（使用 CRA 内置的 eslint-config-react-app，仅有 warning）。
- 运行测试：`npm test`（CRA/Jest；仓库目前仅有默认的 `App.test.js` 冒烟测试）。
- 生产构建：`npm run build` —— **已知问题**：当前会因 `@babel/polyfill` 与 core-js
  版本注入冲突而失败。开发模式（`npm start`）是受支持的工作流；如需构建请优先处理该冲突。

### 构建配置说明
`test/config-overrides.js`（配合 `react-app-rewired`）做了三件事，缺一不可：
1. `babel-plugin-import`：antd 组件按需加载（含 less 样式）；
2. `less-loader`（`javascriptEnabled: true`）：编译 antd v3 的 less；
3. legacy 装饰器：支持源码里的 `@observable` / `@inject` / `@observer` 等写法。
注意源码里多处从 `mobx-react/index` 导入，因此 `mobx-react` 必须锁在 **v5**（v6 移除了该入口）。

### 自动化登录的坑（验证码）
登录页有一个 canvas 画的客户端验证码，扭曲严重、肉眼几乎无法识别，但它只是
存在 React 组件 state 里、且大小写不敏感地本地比对。自动化测试时可在浏览器
DevTools Console 里读取当前验证码，再配合 `admin` / `admin` 登录：

```js
(function(){var cs=document.querySelectorAll('canvas');for(var n=0;n<cs.length;n++){var c=cs[n];var k=Object.keys(c).find(function(x){return x.indexOf('__reactFiber$')===0||x.indexOf('__reactInternalInstance$')===0;});if(!k)continue;var f=c[k];while(f){if(f.stateNode&&f.stateNode.state&&typeof f.stateNode.state.code==='string'&&f.stateNode.state.code.length===4){return f.stateNode.state.code;}f=f.return;}}return 'NOT_FOUND';})()
```
