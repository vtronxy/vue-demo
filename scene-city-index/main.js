import Vue from 'vue'
import App from './App.vue'
new Vue({
    el: '#app',
    //相当于使用JavaScript来生成 <template> 替换到挂载点的DOM #app outerHTML
    render: h => h(App)
})

//渲染函数，h实质上是 CreateElement() 创建虚拟DOM