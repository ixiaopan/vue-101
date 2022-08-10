import { createApp, h } from 'vue'

const HelloApp = {
  render() {
    return h('div', null, 'hello world')
  },
}

const app = createApp(HelloApp)

app.mount('#app')
