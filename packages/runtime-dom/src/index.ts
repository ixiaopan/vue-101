import { createRenderer } from '@vue/runtime-core'

import * as nodeOps from './nodeOps'

export function createApp(rootComponent: any, rootProps: any) {
  const app = createRenderer({
    ...nodeOps,
  }).createApp(rootComponent, rootProps)

  const _mount = app.mount
  app.mount = (containerOrSelector: HTMLElement | String) => {
    const container = (
      typeof containerOrSelector === 'string'
        ? document.querySelector(containerOrSelector)
        : containerOrSelector
    ) as HTMLElement

    if (!container) {
      throw new Error(`Cannot find container ${containerOrSelector}`)
    }

    _mount(container)
  }

  return app
}

export * from './nodeOps'
