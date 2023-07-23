import Bookmark, {
    addNewBookmark,
    deleteBookmark,
    getAllBookmarks,
    updateBookmarkIcon,
    updateBookMarks,
} from './Bookmark'
import dom, { toggleDarkMode } from './dom'
import Tab, { createNewTab, removeTab, switchToTab, updateTabs } from './Tab'
import { generateId } from './utils'
import { updateSearchBar } from './webview'

export const tabs: Tab[] = []

export let isDarkMode: boolean = window.matchMedia(
    '(prefers-color-scheme: dark)'
).matches

const searchHandler = () => {
    const query = dom.searchInput.value
    if (!query) return

    let url = `https://www.google.com/search?q=${query}`
    const tabId = tabs.find((tab) => tab.isActive === true)?.id
    const web: any = document.getElementById(`web-${tabId}`)

    try {
        const urlObject = new URL(query)
        web.src = urlObject.href
    } catch (error) {
        web.src = url
    }

    dom.searchInput.blur()
}

const reloadTab = () => {
    const tabid = tabs.find((tab) => tab.isActive === true)?.id
    const webview: any = document.getElementById(`web-${tabid}`)
    webview.src = webview.src
}

function main() {
    createNewTab(tabs)
    if (isDarkMode) toggleDarkMode()

    if (!getAllBookmarks())
        localStorage.setItem('bookmarks', JSON.stringify([]))

    updateBookMarks()
}
main()

dom.bardButton.addEventListener('click', () => {
    dom.barcContainer.classList.toggle('hidden')
})

dom.newTabButton.addEventListener('click', () => {
    createNewTab(tabs)
})

dom.tabsContainer.addEventListener('click', (event: Event) => {
    const target = event.target! as HTMLDivElement
    const tabId = `${(target.id || target.parentElement?.id)?.split('-')[1]}`
    if (tabId !== 'undefined') {
        switchToTab(tabId)
        const tab = tabs.find((tab) => tab.id === tabId)! as Tab
        updateSearchBar(tab.url, tab.isActive)
        updateBookmarkIcon()
    }

    if (target.classList.contains('close')) {
        const id = `${target.parentElement?.parentElement?.id.split('-')[1]}`
        removeTab(id)
        updateBookmarkIcon()
    }
})

dom.searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') searchHandler()
})

dom.searchButton?.addEventListener('click', () => {
    searchHandler()
})

window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
        isDarkMode = event.matches
        toggleDarkMode()
        updateTabs(tabs)
    })

dom.homeButton?.addEventListener('click', () => {
    const tabid = tabs.find((tab) => tab.isActive === true)?.id
    const webview: any = document.getElementById(`web-${tabid}`)
    webview.src = 'home-page.html'
})

dom.reloadButton?.addEventListener('click', () => {
    reloadTab()
})

dom.previousButton?.addEventListener('click', () => {
    const tabid = tabs.find((tab) => tab.isActive === true)?.id
    const webview: any = document.getElementById(`web-${tabid}`)

    webview.goBack()
})

dom.bookmarkButton?.addEventListener('click', () => {
    const tab = tabs.find((tab) => tab.isActive === true)
    const webview: any = document.getElementById(`web-${tab?.id}`)

    if (
        getAllBookmarks()
            .map((b) => b.url)
            .includes(webview.src)
    )
        return

    const id = generateId(
        getAllBookmarks().map((bm) => bm.id),
        10
    )

    const newBookmark = new Bookmark(
        id,
        webview.getTitle(),
        webview.src,
        `${tab?.favicon}`
    )

    addNewBookmark(newBookmark)
    updateBookMarks()
    updateBookmarkIcon()
})

dom.bookmarksContainer.addEventListener('click', (event) => {
    const target: any = event.target

    if (target.innerText === 'close') {
        const id = target.parentElement.parentElement.id.split('-')[1]
        deleteBookmark(id)
        updateBookMarks()
        updateBookmarkIcon()
    }

    const url =
        target.getAttribute('url') || target.parentElement.getAttribute('url')

    const tabid = tabs.find((tab) => tab.isActive === true)?.id
    const webview: any = document.getElementById(`web-${tabid}`)
    webview.src = url
})
