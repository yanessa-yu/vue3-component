import { App  } from 'vue';
import Input from './src/index.vue';

Input.install = (app : App) : void => {
    app.component(Input.name, Input)
}

const _Input = Input

export default _Input