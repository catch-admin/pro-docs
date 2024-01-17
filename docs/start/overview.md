# 🏡 介绍

## 关于专业版

首先感谢一直以来对 `CatchAdmin` 开源项目的支持和使用。作为一名开源工作者，我一直致力于开发出功能强大且易于使用的后台管理系统，以帮助您简化业务流程和提升工作效率。然而，由于某些原因，我不得不做出一些调整。为了能够继续开发和维护这个项目，我将推出一款付费的后台管理系统，以确保我能够持续为您提供高质量的服务和支持。

专业版本不会在开源版本做一些破坏性变更，所以当您从开源版本切换到专业版本，不会有任何开发心智负担。但是使用专业版本会有新的组件来配合您的工作。

我深信，付费后台管理系统将为您带来更多的价值和便利，帮助您提升工作效率

## 体验地址

[专业版体验地址](https://pro.catchadmin.com)

## 与开源的区别

- 前后端项目完全分离
- 作为付费用户, 将享有优先支持的权利。(但是好像群里小伙伴提出的问题我也是蛮及时的 😂)
- 提供更多的功能模块（例如 `catch` `table` 类似的组件）
- 持续改进和更新付费后台管理系统，以满足不断变化的业务需求和行业趋势

## 目录结构

`Catchadmin` 专业版本服务端和前端(web 目录)放在一个项目中，这样会更方便开发。

```php
├─app
├─bootstrap
├─config（配置目录）
├─database（migration和seed存放目录）
├─lang（多语言目录）
├─public（运行目录
├─modules（模块目录）
├─web
│  ├─src (前端目录)
│  │  ├─assets
|  |  ├─compoents (组件)
|  |  ├─enum （枚举）
|  |  ├─layout
|  |  ├─router
|  |  ├─store （pinia目录）
|  |  ├─styles （样式目录）
|  |  ├─support (助手方法)
|  |  ├─types （类型目录）
|  |  ├─views
|  |  | App.vue
|  |  | app.ts
|  |  | env.d.ts
│  |  package.json
|  |  postcss.config.js
│  |  tailwind.config.js
│  |  tsconfig.json
│  |  tsconfig.node.json
│  |  vite.config.js (Vue项目配置)
├─routes
├─storage
├─tests
│  .env-example（env配置示例）
│  .gitattributes
│  .gitignore
│  .travis.yml
│  composer.json
│  .php-cs-fixer.dist.php
│  phpunit.xml
└─ artisan（命令行入口文件）
```

这里可以先熟悉目录结构，在后续将介绍系统内具体的一些方法和配置。

## 疑问

### 为什么开源没有将项目分离

这就要说到`何为开源`? 开源就是分享，所以开源版本的模块化也遵循此。当初这么设计也是希望社区小伙伴可以参与到建设中来，可以通过一个一个模块分享来完善整个项目。专业版本作为付费版本，属于私有发布项目，所以会采用完全分离的方式分发出去。
