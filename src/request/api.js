import { get, post, put, deletefn, qspost, patch } from './http'
const api = {
  // 登录
  login: '/rest/1.0/auth/signin',
  // 刷新token
  refrechToken: '/rest/1.0/auth',
  // 获取某个页面的所有字段
  getColumns: '/rest/1.0/admin/role/crud/metadata',
  // 获取某个页面的列表
  getTable: '/rest/1.0/admin/role/crud/_search',
  // 增加列表 · 编辑列表 · 列表详情 · 删除列表 接口一样 只是方法不一样 method
  addTable: '/rest/1.0/admin/role/crud'
}
// 登录
export const login = p => post(api.login, p)
// 刷新token
export const refrechToken = p => put(api.refrechToken)
// 获取某个页面的所有字段
export const getColumns = p => get(api.getColumns)
// 获取某个页面的列表
export const getTable = p => post(api.getTable)
// 增加列表
export const addTable = p => post(api.addTable, p)
// 编辑列表
export const editTable = p => patch(api.addTable, p)
// 列表详情
export const detailTable = p => get(api.addTable, p)
// 删除列表
export const delTable = p => deletefn(api.addTable, p)
