import {createVNode , render} from 'vue'
import ToastConstructor from './index.vue'

import type {IToast, IToastHandle, IToastOptions, ToastParams, ToastQueue} from './types'

const instances: ToastQueue = []
let seed = 1
const Toast : any = {
 open  : function(opts: ToastParams = {} as ToastParams) : void {
    if(typeof opts === 'string'){
        opts = {
            message : opts
        }
    }
    const id = 'toast_' + seed++
    let options : IToastOptions = <IToastOptions> opts
    options = {
        ...options,
        id,
        offset:  opts.offset || 20
    }

    const container = document.createElement('div')
    container.className = 'container_${id}'

    const message = options.message
    const vm = createVNode(
        ToastConstructor,
        options,
        options.message? {default: ()=> message}: null
    )

    vm.props.onDestory = () => {
        render(null, container)
    }

    render(vm, container);
    document.body.appendChild(container.firstElementChild);
    
    } as any
}

export default Toast