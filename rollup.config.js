// 处理vue文件插件
import vue from 'rollup-plugin-vue'
// 用于在节点单元模块中使用第三方模块
import { nodeResolve } from '@rollup/plugin-node-resolve'
// 处理ts插件
import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-only'
const overrides = {
  compilerOptions: { declaration: true }, // 生成.d.ts的文件
}
export default {
  input: 'src/index.ts',
  output: {
    name: 'index',
    dir: './dist',
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfigOverride: overrides }),
    vue({
      css: false
    }),
    css({ output: 'index.css' }),
  ],
  external: ['vue', 'intersection-observer-polyfill'] // 规定哪些是外部引用的模块
}