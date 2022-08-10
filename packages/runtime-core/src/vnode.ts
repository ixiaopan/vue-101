import { ShapeFlags } from '@vue/shared'

export function createVNode(type, props?, children?) {
  const vnode = {
    el: null,
    component: null,

    // a flag indicating that this is a virtual node
    _vnode: true,

    type,
    props,
    children,

    // the unique id for diff algorithm
    key: props?.key,

    shapeFlag: getShapeFlag(type),
  }

  if (vnode.children) {
    if (typeof vnode.children == 'string') {
      vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
    } else {
      vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
    }
  }

  return vnode
}

export function getShapeFlag(type) {
  let nodeFlag
  if (typeof type == 'string') {
    nodeFlag = ShapeFlags.Element
  } else if (typeof type == 'object') {
    nodeFlag = ShapeFlags.STATEFUL_COMPONENT
  } else if (typeof type == 'function') {
    nodeFlag = ShapeFlags.FUNCTIONAL_COMPONENT
  }
  return nodeFlag
}

export function isVNode(obj) {
  return obj?._vnode
}
