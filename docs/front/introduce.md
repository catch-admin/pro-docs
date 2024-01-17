# 简介

前端首先由 `Vue3` 构建，所以要想写前端第一步要先看[vue3 文档](https://cn.vuejs.org/)。
第二还需要 [typescript](https://www.tslang.cn/docs/home.html) 的加持
:::info
如果不想用使用 ts，直接在根目录 `tsconfig.json` 关闭即可
:::
这两个是项目的根基，所以一定要好好看看，其他用到的主要组件

- ElementPlus [官网地址](https://element-plus.org/)
- tailwindcss [官网地址](https://tailwindcss.com/)
- Pinia [官网地址](https://pinia.vuejs.org/)
- icon [hero icon](https://heroicons.com/)

## vite 配置

这里就直接用项目的配置一一说明了，不拆开来看了

```js
// vite.config.js
const rootPath = resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      vueJsx(),
      alias({
        entries: [
          {
            find: '@',
            replacement: resolve(rootPath, 'src')
          }
        ]
      }),
      viteMockServe({
        mockPath: './mock',
        // localEnabled: env.NODE_ENV === 'development',
        localEnabled: command === 'serve',
        watchFiles: true // 监视文件夹中的文件更改。 并实时同步到请求结果
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core']
        // resolvers: [ ElementPlusResolver({importStyle: 'sass'}) ]
      }),
      Components({
        dirs: ['src/components/', 'src/layout/'],

        extensions: ['vue'],

        deep: true,

        dts: true,

        include: [/\.vue$/, /\.vue\?vue/],

        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]
        // resolvers: [ ElementPlusResolver({ importStyle: 'sass'}) ]
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true
      })
    ],
    publicDir: './public',
    define: {
      BASE_URL: env.BASE_URL
    },
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/public/assets/styles/element.scss" as *;`,
      }
    },
    server: {
      host: '127.0.0.1',
      port: 10086,
      open: true, // 自动打开浏览器
      cors: true, // 允许跨域
      strictPort: true // 端口占用直接退出
    },
    build: {
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          drop_debugger: true
        }
      },
      assetsDir: 'assets',
      rollupOptions: {
        input: './index.html',
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',

          entryFileNames: 'assets/js/[name]-[hash].js',

          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
```

:::info
vite 的环境变量都需要在前面加上 `VITE` 前缀，在 **vite.config.js** 使用的时候直接访问 `env.BASE_URL`即可
:::

但是如果打包的话，还需要添加 `.env.production` 配置文件，里面配置

```js
// api url 接口地址
VITE_BASE_URL = API_URL
```
