import Axios from '../packages/Axios/index'
import {interfaceReturnType} from './type'

test('测试axios的get请求',()=>{
   let url: String = 'http://10.200.137.43:8080/Public/getEContractSign'
   return Axios.get(url).then((res: interfaceReturnType)=>{
      expect(res.code).toBe(1)
   })
})

test('测试axios的post请求',()=>{
   let url: String = 'http://10.200.137.43:8080/Public/saveEContractSign'
   let data : Object = {
      'no':'20210722170834TYoqKs',
      'sign':'data:image/png;base64,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'
   }
   return Axios.post(url,data).then((res : interfaceReturnType)=>{
      expect(res.code).toBe(1 || -1)
   })
})

