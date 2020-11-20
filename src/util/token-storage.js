import { get, set } from './storage.js'

export function setBothToken(data) {
  setToken(data.token)
  setRefreshToken(data.refreshToken)
}

export function getToken() {
  return get('token')
}

export function setToken(token) {
  set('token', token)
}

export function getRefreshToken() {
  return get('refreshToken')
}

export function setRefreshToken(token) {
  set('refreshToken', token)
}
