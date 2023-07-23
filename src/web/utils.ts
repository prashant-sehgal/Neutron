import Tab from './Tab'

const generateRandomString = (length: number) => {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        )
    }
    return result
}

export const generateId = (ids: string[], length: number) => {
    let tabId = generateRandomString(length)
    let i = 0
    while (i < ids.length) {
        if (tabId === ids[i]) {
            tabId = generateRandomString(10)
            i = 0
        } else {
            i++
        }
    }
    return tabId
}

export const limitString = (str: string, length: number) => {
    if (str.length <= length) return str
    return `${str.substring(0, length)}...`
}
