// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({openPanelOnActionClick: true})
  .catch((error) => console.error(error))

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'sendToSidebarChat',
    title: 'Send to Sidebar Chat',
    contexts: ['all'],
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'sendToSidebarChat') {
    // This will open the panel in all the pages on the current window.
    await chrome.sidePanel.open({windowId: tab.windowId})
    // wait for the panel to be opened
    await new Promise((resolve) => setTimeout(resolve, 200))
    chrome.runtime.sendMessage({
      name: info.menuItemId,
      data: info,
    })
  }
})
