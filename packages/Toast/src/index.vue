<template>
<div v-show="visible" class="el-toast">
    <div>{{ message }}</div>
</div>
</template>


<script lang="ts">
import {defineComponent, ref, PropType, onMounted} from 'vue'
import { ToastVM } from './types'

export default defineComponent({
    name: 'fw-toast',
    props : {
        id: {type: String, default: ''},
        message: {
            type: [String, Object] as PropType<string | ToastVM>,
            default: '',
        },
        type: {type: String, default: 'info'},
        offset: {type: Number, default: 20}
    },
    setup(props, context){
        const visible = ref(false) 

        
        function close(){
            visible.value = false
        }

        let timer = null
        function startTimer(){
            timer = setTimeout(()=>{
                if(visible.value){
                    close()
                }
            }, 3000)
        }
        onMounted(()=>{
            startTimer()
            visible.value = true
        })
        return {
            visible,

            close,
            startTimer
         }
    }
})
</script>

<style>
.el-toast{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    margin: auto;
    background: #504d4d;
    width: fit-content;
    height: fit-content;
    display: inline;
    padding: 10px;
    color: #fff;
    border-radius: 5px;
    font-size: .26rem;
}
</style>