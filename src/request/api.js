import { get, post, put, deletefn, patch } from './http'

const api = {
  // 登录
  login: '/rest/1.0/auth/signin',
  // 刷新token
  refrechToken: '/rest/1.0/auth'
}
// 登录
export const login = p => post(api.login, p)
// 刷新token
export const refrechToken = p => put(api.refrechToken)

/* ==================== CRUD ==================== */
export const crud = {
  Metadata: (uri, params) => get(`${uri}/crud/metadata`, params),
  Search: (uri, params) => post(`${uri}/crud/_search`, params),
  Detail: (uri, params) => get(`${uri}/crud`, params),
  Insert: (uri, params) => post(`${uri}/crud`, params),
  Update: (uri, params) => patch(`${uri}/crud`, params),
  Delete: (uri, params) => deletefn(`${uri}/crud`, params)
}
