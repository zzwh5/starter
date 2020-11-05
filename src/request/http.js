import axios from 'axios'
import qs from 'qs'
// 引入cookie的一些方法
import { getCookie, setCookie } from '../until/Cookie'
// 引入 antd的对话框
import { message } from 'ant-design-vue'

// 刷新token的接口
import { refrechToken } from '@/request/api'

const baseUrl = process.env.VUE_APP_BASE_API
// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// axios实例的一个方法
// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在localStorage中
instance.setToken = (token) => {
  instance.defaults.headers['token'] = token
  setCookie( 'token' , token,30000)
}

// http request拦截器 添加一个请求拦截器
instance.interceptors.request.use(
  function(config) {
    // console.log(config)
    // 在cookie中拿到 token
    let token = getCookie('token')
    if (token) {
      //将token放到请求头发送给服务器,将tokenkey放在请求头中
      config.headers['token'] = token
    }
    if(config.url.indexOf('auth') != -1){
      // config.headers['token'] = getCookie('Rtoken')
      config.headers['token'] = token
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []

// 刷新token的方法 
/* 
  // refrechToken(token).then(res=>{
  //   console.log(res)
  // })
*/
axios.interceptors.response.use(response => {
  // console.log(response)
  const { code } = response.data
  if (code === 401) {
    const config = response.config
    if (!isRefreshing) {
      isRefreshing = true
      console.log(isRefreshing)
      return refrechToken().then(res => {
        console.log(res)
        const { token } = res.data
        instance.setToken(token)
        config.headers['X-Token'] = token
        config.baseURL = ''
        // 已经刷新了token，将所有队列中的请求进行重试
        requests.forEach(cb => cb(token))
        // 重试完了别忘了清空这个队列（掘金评论区同学指点）
        requests = []
        return instance(config)
      }).catch(res => {
        console.error('refrechToken error =>', res)
        window.location.href = '/'
      }).finally(() => {
        isRefreshing = false
      })
    } else {
      // 正在刷新token，返回一个未执行resolve的promise
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push((token) => {
          config.baseURL = ''
          config.headers['X-Token'] = token
          resolve(instance(config))
        })
      })
    }
  }
  return response
}, error => {
  return Promise.reject(error)
})

// 封装get请求
export function get(url, params) {
  return new Promise((resolve, reject) => {
    // axios({
    //   method: 'get',
    //   url: url,
    //   params: params,
    //   // headers: {
    //   // 'token': store.state.token,
    //   // 'content-type': 'application/x-www-form-urlencoded'
    //   // }
    // }).then(res => {
    //   resolve(res.data);
    // });

    axios
      .get(baseUrl+url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

// 封装post请求
export function post(url, params,type) {
  return new Promise((resolve, reject) => {
    // console.log(url)
    // console.log(baseUrl + url)
    axios({
      method: 'post',
      url: baseUrl + url,
      data: params,
      headers: {
        // 'token': store.state.token,
        'content-type': type?type:'application/json'
      }
    })
      .then(res => {
        // console.log(res)
        resolve(res.data)
      })
      .catch(error => {
        // console.log(error)
        reject(error)
      })
  })
}

// 需要 qs的post请求
export function qspost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, Qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

// put请求
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(baseUrl+url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

// delte请求
export function deletefn(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(baseUrl+url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

// PATCH 请求
export function patch(url, params) {
  return new Promise((resolve, reject) => {
    axios.patch(baseUrl+url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}