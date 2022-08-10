export const insert = (child, parent, referenceNode) => {
  parent.insertBefore(child, referenceNode || null)
}

export const createElement = (tag: string) => {
  return document.createElement(tag)
}

export const setElementText = (el, text) => {
  el.textContent = text
}
