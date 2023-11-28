const selectors = {
  copilot: {
    input: '#searchbox',
  },
}

window.addEventListener('message', (event) => {
  if (event.origin !== `chrome-extension://${chrome.runtime.id}`) {
    return
  }
  const {name, data} = event.data
  const input = $$$(selectors.copilot.input)[0]
  // ignore data: URLs
  const safeUrl = (url) => {
    return url && !url.startsWith('data:') ? url : ''
  }
  if (input) {
    input.value =
      safeUrl(data.srcUrl || data.linkUrl) || data.selectionText || data.pageUrl
    if (input.matches('input,textarea')) {
      input.dispatchEvent(new CustomEvent('change'))
    }
  }
})

// https://stackoverflow.com/questions/29629492/how-to-query-elements-within-shadow-dom-from-outside-in-dart
function $$$(selector, rootNode = document.body) {
  const arr = []

  const traverser = (node) => {
    // 1. decline all nodes that are not elements
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return
    }

    // 2. add the node to the array, if it matches the selector
    if (node.matches(selector)) {
      arr.push(node)
    }

    // 3. loop through the children
    const children = node.children
    if (children.length) {
      for (const child of children) {
        traverser(child)
      }
    }

    // 4. check for shadow DOM, and loop through it's children
    const shadowRoot = node.shadowRoot
    if (shadowRoot) {
      const shadowChildren = shadowRoot.children
      for (const shadowChild of shadowChildren) {
        traverser(shadowChild)
      }
    }
  }

  traverser(rootNode)

  return arr
}
