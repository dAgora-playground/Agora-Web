import { fileURLToPath, URL } from 'node:url'

import { loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// ArcoVue、VueUse 组件和指令的自动引入解析器
import {
  ArcoResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      port: 3004,
      open: true,
      cors: true,
    },

    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            siteName: env.VITE_APP_TITLE,
            logo: env.VITE_LOGO
          }
        }
      }),
      AutoImport({
        // 需要去解析的文件
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.md$/ // .md
        ],
        // imports 指定自动引入的包位置（名）
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
        // 生成相应的自动导入json文件。
        eslintrc: {
          // 启用
          enabled: true,
          // 生成自动导入json文件位置
          filepath: './.eslintrc-auto-import.json',
          // 全局属性值
          globalsPropValue: true
        },
        resolvers: [ArcoResolver()]
      }),
      Components({
        // imports 指定组件所在目录，默认为 src/components
        dirs: ['src/components/', 'src/view/'],
        // 需要去解析的文件
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
}
