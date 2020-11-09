import {get, post, put, deletefn, patch} from './http'

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
export const crudMetadata = (uri, params) => get(`${uri}/crud/metadata`, params)
export const crudSearch = (uri, params) => post(`${uri}/crud/_search`, params)
export const crudDetail = (uri, params) => get(`${uri}/crud`, params)
export const crudInsert = (uri, params) => post(`${uri}/crud`, params)
export const crudUpdate = (uri, params) => patch(`${uri}/crud`, params)
export const crudDelete = (uri, params) => deletefn(`${uri}/crud`, params)
