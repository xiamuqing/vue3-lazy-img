import { App } from 'vue'
import LazyImg from './lazy-img.vue'

const components = [LazyImg]

export default {
    install: (vm: App): void => {
        const app = vm
        components.forEach(component => app.component(component.name, component))
    },
}
