export function readSave(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }}

export function writeSave(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
