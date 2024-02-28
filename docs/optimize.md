# 项目优化

## 移除

在生产环境需要将后台两个模块移除后再编译

```js
// 找到 web/src/router/index.ts 文件
// 找到这两个路由
{
    path: '/develop',
    component: () => import('@/layout/index.vue'),
    meta: { title: '开发工具', icon: 'wrench-screwdriver' },
    children: [
      {
        path: 'modules',
        name: 'modules',
        meta: { title: '模块管理' },
        component: () => import('@/views/develop/module/index.vue')
      },
      {
        path: 'schemas',
        name: 'schemas',
        meta: { title: 'Schemas' },
        component: () => import('@/views/develop/schema/index.vue')
      },
      {
        path: 'generate/:schema',
        name: 'generate',
        meta: { title: '代码生成', hidden: true, active_menu: '/develop/schemas' },
        component: () => import('@/views/develop/generate/index.vue')
      }
    ]
  },
  {
    path: '/components',
    component: () => import('@/layout/index.vue'),
    meta: { title: '组件演示', icon: 'wrench-screwdriver' },
    children: [
      {
        path: 'button',
        name: 'button',
        meta: { title: '按钮' },
        component: () => import('@/views/components/button/index.vue')
      },
      {
        path: 'icons',
        name: 'icons',
        meta: { title: '图标' },
        component: () => import('@/views/components/icons/index.vue')
      }
    ]
  }
```

将这两个路由注释掉，可以减少项目的大小

## 后端优化

一定要执行下面几个优化命令

- composer dumpautoload
- php artisan route:cache
- php artisan config:cache
