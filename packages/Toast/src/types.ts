import { VNode } from "vue"

export interface IToastHandle {
    open: () => void
}

export type IToastOptions = {
    duration?: number,
    message?: string,
    type?:  'success' | 'warning' | 'info' | 'error' | '',
    id?: string,
    offset? : number
}
export type ToastType = 'success' | 'warning' | 'info' | 'error' | ''

export type ToastParams = IToastOptions | string
export type TypedToastParams<T extends ToastType> = {type : T;} & Omit<IToastOptions, 'type'> | string
export interface IToast {
    (options?: ToastParams) : IToastHandle
    success: (options? : TypedToastParams<'success'>) => IToastHandle
    warning: (options? : TypedToastParams<'warning'>) => IToastHandle
    info: (options? : TypedToastParams<'info'>) => IToastHandle
    error: (options? : TypedToastParams<'error'>) => IToastHandle
}



export type ToastVM = VNode
type ToastQueueItem = {
    vm: ToastVM
}
export type ToastQueue = Array<ToastQueueItem>