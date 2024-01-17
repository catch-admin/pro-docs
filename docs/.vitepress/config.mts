import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'CatchAdmin pro 文档站',
  description: 'CatchAdmin pro 文档',
  assetsDir: 'docs/assets',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: '文档', link: '/start/overview' }],

    sidebar: [
      {
        text: '开始',
        base: '/start',
        items: [
          { text: '介绍', link: '/overview' },
          { text: '安装', link: '/install' },
          { text: '更新', link: '/upgrade' }
        ]
      },
      {
        text: '服务端',
        base: '/server',
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
        base: '/front',
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
        items: [{ text: '常见问题', link: '/faq.md' }]
      }
    ],

    search: {
      provider: 'algolia',
      options: {
        appId: 'Z82AVC6OQ9',
        apiKey: '3418e43d03b752b8354c9fa5295e4547',
        indexName: 'catchadmin',
        locales: {
          zh: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    editLink: {
      pattern: 'https://github.com/catch-admin/pro-docs/edit/master/:path',
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
