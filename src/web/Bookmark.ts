import dom from './dom'
import { isDarkMode, tabs } from './renderer'
import { limitString } from './utils'

export default class Bookmark {
    constructor(
        public id: string,
        public title: string,
        public url: string,
        public favicon: string
    ) {}
}

export const getAllBookmarks = (): Bookmark[] =>
    JSON.parse(`${localStorage.getItem('bookmarks')}`)

export const addNewBookmark = (bookmark: Bookmark) => {
    const allBookmarks = getAllBookmarks()
    allBookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(allBookmarks))
}

export const deleteBookmark = (id: string) => {
    const bookmarks = getAllBookmarks().filter((bookmark) => bookmark.id !== id)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

export const updateBookMarks = () => {
    dom.bookmarksContainer.innerHTML = ''
    getAllBookmarks().forEach((bookmark) => {
        dom.bookmarksContainer?.insertAdjacentHTML(
            'beforeend',
            `<div class="bookmark" url="${bookmark.url}" id="bookmark-${
                bookmark.id
            }">
                <img src="${bookmark.favicon}" />
                <p class="bookmark-title">${limitString(bookmark.title, 20)}</p>
                <div class="close-tab ${isDarkMode ? 'close-tab-dark' : ''}">
                    <span class="material-symbols-outlined close">close</span>
                </div>
            </div>`
        )
    })

    if (isDarkMode)
        document
            .querySelectorAll('.bookmark')
            .forEach((el) => el.classList.add('close-tab-dark'))
    else
        document
            .querySelectorAll('.bookmark')
            .forEach((el) => el.classList.remove('close-tab-dark'))
}

export const updateBookmarkIcon = () => {
    const tabid = tabs.find((tab) => tab.isActive === true)?.id
    const webview: any = document.getElementById(`web-${tabid}`)
    if (
        getAllBookmarks()
            .map((bookmark) => bookmark.url)
            .includes(webview.src)
    ) {
        const chileNode: any = dom.bookmarkButton?.childNodes[1]
        chileNode.classList.add('icon-active')
    } else {
        const chileNode: any = dom.bookmarkButton?.childNodes[1]
        chileNode.classList.remove('icon-active')
    }
}
