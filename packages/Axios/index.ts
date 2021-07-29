import Qs from 'qs'
import axios from 'axios';
import Toast from '../Toast/src/toast';

class newAxios {

    private init(options){
      let config: Object = {
            // `url` 是用于请求的服务器 URL
          url: options.url,
          // `method` 是创建请求时使用的方法
          method: options.method, // default
          // `headers` 是即将被发送的自定义请求头
          Headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          // `params` 是即将与请求一起发送的 URL 参数
          // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
          params: options.params,
            // `paramsSerializer` 是一个负责 `params` 序列化的函数
          // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
          paramsSerializer:  function(params: Object){
            return Qs.stringify(params) ;
          } ,
          transformRequest: [function (data, headers) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data) ;;
          }],
          // `data` 是作为请求主体被发送的数据
          // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
          // 在没有设置 `transformRequest` 时，必须是以下类型之一：
          // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
          // - 浏览器专属：FormData, File, Blob
          // - Node 专属： Stream
          data: options.data,
        
          // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
          // 如果请求话费了超过 `timeout` 的时间，请求将被中断
          timeout: 60000,
        
            // `withCredentials` 表示跨域请求时是否需要使用凭证
          withCredentials: false, // default
            // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
          responseType: 'json', // default
        
          // `responseEncoding` indicates encoding to use for decoding responses
          // Note: Ignored for `responseType` of 'stream' or client-side requests
          responseEncoding: 'utf8', // default
        
            // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
          xsrfCookieName: 'XSRF-TOKEN', // default
        
          // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
          xsrfHeaderName: 'X-XSRF-TOKEN', // default
          maxContentLength: 2000,
        }
        const instance = axios.create();
       
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
                // 在发送请求之前做些什么
            return config;
        }, function (error) {
                // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
                // 对响应错误做点什么
            return Promise.reject(error);
        });

        let p = new Promise((reslove, reject)=>{
          instance.request(config).then(res=>{
            if(res.status == 200){
              reslove(res.data)
            }else{
              console.log("status不等于200：" ,res)
              reject()
            }
          }).catch((err)=>{
            console.log("catch捕获的错误：" + err)
            reject()
          })
        })
        return p
    }

    get(url){
      let options = {
        url: url,
        method: 'GET',
        data: {},
        params: {}
      }
      return this.init(options)
    }

    post(url,data){
      let options = {
        url: url,
        method: 'POST',
        data: data,
        params: {}
      }
      return this.init(options)
    }

}

export default new newAxios()