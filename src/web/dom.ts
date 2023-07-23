const dom = {
    container: document.querySelector('.container')! as HTMLDivElement,
    barcContainer: document.querySelector('.bard')! as HTMLDivElement,
    tabsContainer: document.querySelector('.tabs')! as HTMLDivElement,
    bookmarksContainer: document.querySelector(
        '.bookmarksContainer'
    )! as HTMLDivElement,
    webviewContainer: document.querySelector('.tabWebViews')! as HTMLDivElement,
    bardButton: document.getElementById('bard')! as HTMLButtonElement,
    newTabButton: document.getElementById('newTab')! as HTMLButtonElement,
    searchInput: document.getElementById('search')! as HTMLInputElement,
    searchButton: document.getElementById('searchButton'),
    actionButtons: document.getElementsByClassName('actionButton'),
    homeButton: document.getElementById('home'),
    reloadButton: document.getElementById('reload'),
    previousButton: document.getElementById('previous'),
    bookmarkButton: document.getElementById('bookmark'),
}

export const toggleDarkMode = () => {
    ;[dom.container, dom.searchInput, dom.newTabButton].forEach(
        (element: Element) => {
            element.classList.toggle('darkMode')
        }
    )

    document
        .querySelector('.webviewContainer')
        ?.classList.toggle('webviewDarkMode')

    document.querySelectorAll('.actionButton').forEach((el: Element) => {
        el.classList.toggle('actionButton-dark')
    })

    document
        .querySelectorAll('.bookmark')
        .forEach((el) => el.classList.toggle('close-tab-dark'))
}

export default dom
