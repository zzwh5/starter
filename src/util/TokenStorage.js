import storage from './Storage'

export function setBothToken(data) {
  setToken(data.token)
  setRefreshToken(data.refreshToken)
}

export function getToken() {
  return storage.get('token')
}

export function setToken(token) {
  storage.set('token', token)
}

export function getRefreshToken() {
  return storage.get('refreshToken')
}

export function setRefreshToken(token) {
  storage.set('refreshToken', token)
}
