import Toast from './src/toast'
import type { SFCWithInstall } from '../utils/types'



const _Toast: SFCWithInstall<typeof Toast>  = Toast as SFCWithInstall<typeof Toast>

_Toast.install = app => {
    // config 包含应用配置的对象
    // globalProperties 添加可以在应用程序内的任何组件实例中访问的全局 property
    app.config.globalProperties.$toast = _Toast
}

export default _Toast