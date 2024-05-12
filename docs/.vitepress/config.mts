import { defineConfig } from 'vitepress'

const root = '/pro/docs'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'CatchAdmin 专业版文档',
  titleTemplate: 'CatchAdmin 专业版文档 - CatchAdmin 后台管理系统框架 - 最新技术的 Laravel Admin Management System',
  description:
    'CatchAdmin 是一款基于 Laravel 和 Vue3 新的技术栈而成的 Laravel Admin 管理后台系统框架。CatchAdmin 采用前后端分离策略，Laravel 框架仅仅作为 Api 输出。系统设计充分考虑了模块间的解耦，每个模块之间都有独立的控制器，路由，模型，数据表。在开发上尽可能将模块之间的影响降到最低，降低了开发上的难度，提高后期维护的效率。',
  assetsDir: 'pro/docs/assets',
  cleanUrls: true,
  rewrites: {
    '(.*)': 'pro/docs/(.*)'
  },
  head: [
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-ETX73YSQ1V' }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ETX73YSQ1V');
      `
    ],
    [
      'script',
      {},
      ` setTimeout(() => {
        const title = document.querySelector('.VPNavBarTitle .title')
      
        title.href = 'javascript:void(0)'
        title.onclick = () => {
          window.location.href = 'https://catchadmin.com/pro'
        }
      }, 500);`
    ],
    [
      'script',
      {},
      `window.$crisp=[];window.CRISP_WEBSITE_ID="3b932646-67e5-49a8-b7ee-6aa67f65879f";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
    ]
  ],
  themeConfig: {
    sidebar: [
      {
        text: '开始',
        base: `${root}/start`,
        items: [
          { text: '介绍', link: '/overview' },
          { text: '安装', link: '/install' },
          { text: '更新', link: '/upgrade' },
          { text: '部署', link: '/deploy' }
        ]
      },
      {
        text: '服务端',
        base: `${root}/server`,
        items: [
          { text: '配置', link: '/config.md' },
          { text: '约定', link: '/promise.md' },
          { text: '模块化', link: '/module.md' },
          { text: '模型介绍', link: '/model.md' },
          { text: '权限介绍', link: '/permission.md' },
          { text: '数据权限', link: '/datarange.md' },
          { text: '代码生成', link: '/code-generate.md' },
          { text: '命令介绍', link: '/consoles.md' },
          { text: '数据导出', link: '/export.md' },
          { text: '数据导入', link: '/import.md' },
          { text: '小技巧', link: '/tips.md' }
        ]
      },
      {
        text: '前端',
        base: `${root}/front`,
        items: [
          { text: '简介', link: '/introduce.md' },
          { text: '入口', link: '/entry.md' },
          { text: '布局', link: '/layout.md' },
          { text: '侧边栏&路由', link: '/side-route.md' },
          { text: '权限认证', link: '/permissions.md' },
          { text: '样式', link: '/style.md' },
          { text: 'Table组件', link: '/catch-table.md' },
          { text: '组件', link: '/components.md' }
        ]
      },
      {
        text: '综合',
        items: [
          { text: '常见问题', link: `${root}/faq.md` },
          { text: '项目优化', link: `${root}/optimize.md` }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    editLink: {
      pattern: 'https://github.com/catch-admin/pro-docs/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      level: 'deep',
      label: '页面导航'
    },
    lastUpdated: {
      text: '最近更新'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/catch-admin/pro-docs' }]
  }
})
