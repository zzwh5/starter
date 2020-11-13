export const TYPE = {
  LOCAL: 'LOCAL',
  SESSION: 'SESSION'
}
let instant = localStorage

export function get(key) {
  return instant.getItem(key)
}

export function set(key, value) {
  instant.setItem(key, value)
}

export function remove(key) {
  instant.removeItem(key)
}

export function clear() {
  instant.clear()
}

export function setType(type) {
  localStorage.setItem('storage', type)
  initInstant(type)
}

export function initStorageType() {
  this.initInstant(localStorage.get('storage'))
}

function initInstant(type) {
  switch (type) {
    case TYPE.LOCAL:
      instant = localStorage
      break
    case TYPE.SESSION:
      instant = sessionStorage
      break
    default:
      instant = localStorage
  }
}
