import { defineConfig } from 'vitepress'

const root = '/pro/docs'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'CatchAdmin pro 文档',
  description: 'CatchAdmin pro 文档',
  assetsDir: 'pro/docs/assets',
  cleanUrls: true,
  rewrites: {
    '(.*)': 'pro/docs/(.*)'
  },
  themeConfig: {
    nav: [
      {
        text: '官网',
        link: 'https://catchadmin.com/',
        target: '_self'
      }
    ],
    sidebar: [
      {
        text: '开始',
        base: `${root}/start`,
        items: [
          { text: '介绍', link: '/overview' },
          { text: '安装', link: '/install' },
          { text: '更新', link: '/upgrade' }
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
          { text: '导入导出', link: '/export.md' },
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
        items: [{ text: '常见问题', link: `${root}/faq.md` }]
      }
    ],

    search: {
      provider: 'algolia',
      options: {
        appId: 'Z82AVC6OQ9',
        apiKey: '5883216465758859a57ee9d7332d79c3',
        indexName: 'catchadmin'
      }
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
      label: '页面导航'
    },
    lastUpdated: {
      text: '最近更新'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/catch-admin/pro-docs' }]
  }
})
