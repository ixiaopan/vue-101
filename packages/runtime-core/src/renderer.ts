import { ShapeFlags } from '@vue/shared'

import { createVNode } from './vnode'
import { createComponentInstance, setupComponent } from './component'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IComponent {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IPlugin {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IDirective {}

function createAppAPI(patch: any) {
  return function createApp(rootComponent: IComponent, rootProps: any) {
    // prevent re-mounting
    let isMounted = false

    const app = {
      _props: rootProps,
      _component: rootComponent,
      _rootContainer: null,

      use(_plugin: IPlugin, _options: any) {},
      mixin() {},
      component(_name: string, _component: IComponent) {},
      directive(_name: string, _directive: IDirective) {},

      mount(rootContainer: HTMLElement) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps)

          // for the initial render, the old node is null
          patch(null, vnode, rootContainer)

          isMounted = true

          // @ts-ignore
          app._rootContainer = rootContainer
        }
      },
      unmount() {},

      provide(_key: string, _value: any) {},
    }
    return app
  }
}

export function createRenderer(options) {
  const { insert, createElement, setElementText } = options || {}

  const processElement = (n1, n2, container) => {
    if (!n1) {
      mountElement(n2, container)
    }
  }
  const mountElement = (vnode, container) => {
    const el = createElement(vnode.type)
    vnode.el = el

    if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      setElementText(el, vnode.children)
    } else if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    }

    insert(el, container)
  }

  const processComponent = (n1, n2, container) => {
    // create a new component, n2
    if (!n1) {
      mountComponent(n2, container)
    }
    // update the existing component
  }
  const mountComponent = (vnode, container) => {
    const instance = createComponentInstance(vnode)
    vnode.component = instance

    //
    setupComponent(instance)

    // render the inner vnode of the component
    const subtree = instance.render()

    patch(null, subtree, container)
  }

  // n1 is the old node
  // n2 is the new node
  const patch = (n1, n2, container) => {
    if (n1 == n2) return

    const { shapeFlag } = n2

    // native html element
    if (shapeFlag & ShapeFlags.Element) {
      processElement(n1, n2, container)
    }

    // component
    else if (
      shapeFlag == ShapeFlags.FUNCTIONAL_COMPONENT ||
      shapeFlag == ShapeFlags.STATEFUL_COMPONENT
    ) {
      processComponent(n1, n2, container)
    }
  }

  return {
    createApp: createAppAPI(patch),
  }
}
