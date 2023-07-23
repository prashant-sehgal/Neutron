import { updateBookmarkIcon } from './Bookmark'
import Tab, { updateTabs } from './Tab'
import dom from './dom'
import { isDarkMode, tabs } from './renderer'

interface webview {
    src: string
}

const renderSearchBar = (tabId: string, url: string) => {
    const tab = tabs.find((tab) => tab.id === tabId)! as Tab
    tab.url = url.indexOf('home-page.html') !== -1 ? '' : url
    return tab.url
}

export const updateSearchBar = (url: string, isTabActive: boolean) => {
    if (isTabActive) dom.searchInput.value = url
}

export const addWebView = (tabId: string) => {
    dom.webviewContainer.insertAdjacentHTML(
        'beforeend',
        `<webview src="home-page.html" class="webview" id="web-${tabId}"></webview>`
    )

    addWebViewEventListers()
}

export const updateWebView = (tabId: string) => {
    document.querySelectorAll('.webview').forEach((webview) => {
        webview.classList.add('hidden')
    })
    document.getElementById(`web-${tabId}`)?.classList.remove('hidden')
}

const loadstart = (event: Event) => {
    const target = event.target! as HTMLDivElement
    const tab = tabs.find((tab) => tab.id === `${target.id.split('-')[1]}`)
    if (tab) {
        tab.isLoading = true
    }
    updateTabs(tabs)
}
const loadstop = (event: Event) => {
    const target: any = event.target
    const tab = tabs.find(
        (tab) => tab.id === `${target.id.split('-')[1]}`
    )! as Tab
    if (tab) {
        tab.isLoading = false
    }
    updateTabs(tabs)
    updateSearchBar(
        renderSearchBar(target.id.split('-')[1], target.src),
        tab.isActive
    )
    updateBookmarkIcon()
}

const addWebViewEventListers = () => {
    const webviews = document.querySelectorAll('.webview')
    webviews.forEach((webview) => {
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
        webview.addEventListener('page-favicon-updated', (event: any) => {
            const favicon = event.favicons[0]
            const webid = event.target.id.split('-')[1]
            const web: any = document.getElementById(`web-${webid}`)
            const title = web?.getTitle()
            const tab = tabs.find((tab) => tab.id === webid)
            if (tab) {
                tab.favicon = favicon
                tab.title = title
            }
            updateTabs(tabs)
        })
    })
}
