import dom from './dom'
import { isDarkMode, tabs } from './renderer'
import { generateId, limitString } from './utils'
import { addWebView, updateWebView } from './webview'

export default class Tab {
    favicon = ''
    title = ''
    isActive = true
    isLoading = true
    url = ''

    constructor(public id: string) {}
}

export const updateTabs = (tabs: Tab[]) => {
    dom.tabsContainer.innerHTML = '' // clear tab container
    tabs.forEach((tab) => {
        dom.tabsContainer.insertAdjacentHTML(
            'beforeend',
            `<div class="tab ${tab.isActive && !isDarkMode ? 'active' : ''} ${
                isDarkMode ? 'darkMode' : ''
            } ${tab.isActive && isDarkMode ? 'active-dark' : ''}" id="tab-${
                tab.id
            }">
                        <div class="tab-icon ${!tab.isLoading ? 'hidden' : ''}">
                            <span class="material-symbols-outlined loading-icon ${
                                !tab.isLoading ? 'hidden' : ''
                            }"
                                >progress_activity
                            </span>
                        </div>
                        <div class="favicon ${tab.isLoading ? 'hidden' : ''}">
                            <img src="${
                                tab.favicon ||
                                `${
                                    isDarkMode
                                        ? 'assets/tab.png'
                                        : 'assets/tab-light.png'
                                }`
                            }" alt="" width="20" />
                        </div>
                        <div class="tab-title">${
                            `${limitString(tab.title, 20)}` || 'New Tab'
                        }</div>
                        <div class="close-tab ${
                            isDarkMode ? 'close-tab-dark' : ''
                        }">
                            <span class="material-symbols-outlined close">close</span>
                        </div>
                    </div>`
        )
    })
}

export const createNewTab = (tabs: Tab[]) => {
    const tabId = generateId(
        tabs.map((tab) => tab.id),
        10
    )
    tabs.push(new Tab(tabId))
    updateTabs(tabs)
    addWebView(tabId)
    switchToTab(tabId)
}

export const switchToTab = (tabid: string) => {
    tabs.forEach((tab) => {
        tab.isActive = false
    })

    const tab = tabs.find((tab) => tab.id === tabid)
    if (tab) tab.isActive = true

    updateTabs(tabs)
    updateWebView(tabid)
}

export const removeTab = (tabId: string) => {
    const tab = tabs.find((tab) => tab.id === tabId)! as Tab
    const webview: any = document.getElementById(`web-${tab.id}`)
    webview.remove()

    const index = tabs.indexOf(tab)

    if (tab.isActive) tabs[index - 1].isActive = true

    tabs.splice(index, 1)

    updateTabs(tabs)
    updateWebView((tabs.find((tab) => tab.isActive === true)! as Tab).id)
}
