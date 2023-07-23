import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('system', {
    // theme: () => process.theme,
})
