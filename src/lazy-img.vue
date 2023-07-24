<template>
    <img v-if="!immediately" :data-src="src" class="opacity0" ref="imgElement" :alt="title" />
    <img v-else :src="src" class="opacity0" ref="imgElement" :alt="title" />
</template>

<script lang="ts">
import {
    defineComponent, Ref, ref, onMounted,
} from 'vue'
import IntersectionObserver from 'intersection-observer-polyfill'

export default defineComponent({
    name: 'LazyImg',
    props: {
        src: {
            default: '',
            required: true,
        },
        immediately: {
            default: false,
        },
        title: {
            default: '',
        }
    },
    setup(props) {
        const imgElement: Ref<HTMLImageElement | null> = ref(null)
        const lazyload = (target: HTMLElement) => {
            const io = new IntersectionObserver((entries: any[], observer: any) => {
                entries.forEach(entry => {
                    // isIntersecting 企微不支持（使用了polyfill 也这样）
                    if (entry?.isIntersecting || entry.intersectionRatio > 0) {
                        const img = entry.target
                        const src = img.getAttribute('data-src')
                        img.setAttribute('src', src)
                        img.removeAttribute('data-src')
                        observer.disconnect()
                    }
                })
            })
            io.observe(target)
        }

        onMounted(() => {
            const img = imgElement.value
            if (img) {
                if (!props.immediately) {
                    lazyload(img)
                }
                if (img.complete) {
                    // 如果图片已经存在于浏览器缓存，直接显示出来
                    img.classList.remove('opacity0')
                    img.classList.add('fade')
                } else {
                    img.onload = () => {
                        img.classList.remove('opacity0')
                        img.classList.add('fade')
                    }
                }

                img.onerror = () => setTimeout(() => img.setAttribute('src', props.src), 500)
            }
        })

        return {
            imgElement,
        }
    },
})
</script>

<style scoped>
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
</style>