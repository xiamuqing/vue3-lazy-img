
## 描述

基于Vue3的懒加载组件
- 使用 `IntersectionObserver` 实现图片懒加载
- 使用`intersection-observer-polyfill` 兼容低版本浏览器
- 兼容企业微信 不支持 属性 `isIntersecting`
- 判断浏览器是否缓存了图片，如果缓存存在，直接展示，即`immediately = true`
- 图片加载失败 500ms 会重试

## 使用

1. 安装
```js
yarn add vue3-lazy-img
npm i vue3-lazy-img
```

2. 全局mian.ts 里引入
```js
import LazyImg from 'vue3-lazy-img'
import 'vue3-lazy-img/dist/index.css'  // 可以省略

createApp(App)
.use(LazyImg)\
.mount('#app')
```
or
组件里引入
```js
import { LazyImg } from "vue3-lazyload-img"
```

ts配置：
```js
// shims-vue.d.ts
declare module 'vue3-lazy-img'
```

3. 组件里使用
```vue
 <LazyImg v-for="(item, index) in showImages" :key="index" :src="item" :immediately="index === 0 ? true : false" />
```

4.attr
| 属性 | 描述 |  类型| 是否必填 |
| -- | -- | --- | --  | 
| src | 图片路径 | String | 必填 |
| immediately | 是否立即加载  | Boolean| 否 |
| title | alt文字  | String| 否 |

5. index.css 简单的动画,可以不引入
```css
.opacity0 {
    opacity: 0;
}
.fade {
    animation-name: FadeIn;
    animation-duration: 300ms;
    transition-timing-function: linear;
}

@keyframes FadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-moz-keyframes FadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-webkit-keyframes FadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-o-keyframes FadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-ms-keyframes FadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
```