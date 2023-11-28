let {promise, resolve, reject} = Promise.withResolvers()

/** @type {HTMLIFrameElement} */
let jsIframe
onDOMReady(() => {
  jsIframe = document.querySelector('#jsIframe')
  jsIframe.addEventListener('load', () => {
    resolve()
  })
})

const sendMessage = (message) => {
  jsIframe.contentWindow.postMessage(message, '*')
}

chrome.runtime.onMessage.addListener(({name, data}) => {
  if (name === 'sendToSidebarChat') {
    promise.then(() => {
      sendMessage({name: 'sendToSidebarChat', data})
    })
  }
})

function onDOMReady(callback) {
  if (document.readyState === 'interactive') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}
