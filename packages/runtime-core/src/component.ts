// server/client has its own template complier
let compile: (arg: any) => any
export function registerRuntimeCompiler(_compile: any) {
  compile = _compile
}

let uid = 0
export function createComponentInstance(vnode) {
  return {
    uid: uid++,
    vnode,
    type: vnode.type,
    render: null,

    // state
    data: {},
    props: {},

    // lifecycle
    isMounted: false,
  }
}

// preparation for rendering the component
export function setupComponent(instance) {
  const { props } = instance.vnode

  initProps(instance, props)

  const setupResult = setupStatefulComponent(instance)
  return setupResult
}

function setupStatefulComponent(instance) {
  const comp = instance.type

  const { setup } = comp

  if (setup) {

  } else {
    finishSetupComponent(instance)
  }
}

function finishSetupComponent(instance) {
  const comp = instance.type

  if (!instance.render) {
    // template only
    if (!comp.render) {
      comp.render = compile(comp.template)
    }

    instance.render = comp.render
  }
}

function initProps(instance, props) {
  instance.props = props
}
