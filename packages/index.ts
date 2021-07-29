import { App } from 'vue'
import Input  from './Input'
import Toast from './Toast'
import Route from './Route'
import Axios from './Axios'


const components = [
    Input,
]

const install = (app: App) : void => {
    components.forEach(component => {
        // component 注册或检索全局组件
        app.component(component.name, component)
    })
}

export {
    Input,
    Toast,
    Route,
    Axios,
    install
}


export default{
    install
}