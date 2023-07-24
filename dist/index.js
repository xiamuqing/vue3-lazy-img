import { defineComponent, ref, onMounted, openBlock, createElementBlock } from 'vue';
import IntersectionObserver from 'intersection-observer-polyfill';

var script = defineComponent({
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
    setup: function (props) {
        var imgElement = ref(null);
        var lazyload = function (target) {
            var io = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    // isIntersecting 企微不支持（使用了polyfill 也这样）
                    if ((entry === null || entry === void 0 ? void 0 : entry.isIntersecting) || entry.intersectionRatio > 0) {
                        var img = entry.target;
                        var src = img.getAttribute('data-src');
                        img.setAttribute('src', src);
                        img.removeAttribute('data-src');
                        observer.disconnect();
                    }
                });
            });
            io.observe(target);
        };
        onMounted(function () {
            var img = imgElement.value;
            if (img) {
                if (!props.immediately) {
                    lazyload(img);
                }
                if (img.complete) {
                    // 如果图片已经存在于浏览器缓存，直接显示出来
                    img.classList.remove('opacity0');
                    img.classList.add('fade');
                }
                else {
                    img.onload = function () {
                        img.classList.remove('opacity0');
                        img.classList.add('fade');
                    };
                }
                img.onerror = function () { return setTimeout(function () { return img.setAttribute('src', props.src); }, 500); };
            }
        });
        return {
            imgElement: imgElement,
        };
    },
});

const _hoisted_1 = ["data-src", "alt"];
const _hoisted_2 = ["src", "alt"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (!_ctx.immediately)
    ? (openBlock(), createElementBlock("img", {
        key: 0,
        "data-src": _ctx.src,
        class: "opacity0",
        ref: "imgElement",
        alt: _ctx.title
      }, null, 8 /* PROPS */, _hoisted_1))
    : (openBlock(), createElementBlock("img", {
        key: 1,
        src: _ctx.src,
        class: "opacity0",
        ref: "imgElement",
        alt: _ctx.title
      }, null, 8 /* PROPS */, _hoisted_2))
}

script.render = render;
script.__scopeId = "data-v-719b0c7a";
script.__file = "src/lazy-img.vue";

var components = [script];
var index = {
    install: function (vm) {
        var app = vm;
        components.forEach(function (component) { return app.component(component.name, component); });
    },
};

export { index as default };
