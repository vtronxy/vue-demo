<template>
  <div id="bi-public-traffic">
    <div class="content-right-header">
        <div class="fg_header_swit1"></div>
        <div>
            <div>{{tile}}</div>
            <div>City Traffic</div>
        </div>
        <div class="fg_arrow_right fg_arrow_rgBg" tempUrl="cityTraffic.html"></div>
    </div>
    <div class="content-left-header_1">
        <div id="fg_gauge1"></div>
        <div id="fg_gauge2"></div>
    </div>
    <div class="content-left-header_2"></div>
</div>
</template>

<script>
export default {
    props: [], //组件支持的属性
    data: function() { //响应式数据
        return {
            tile:'城市交通'
        }
    },
    methods: {}, //方法中的 this指向 VM实例
    created: function() {},
    mounted: function() { //挂载上DOM树后
    },
    components: { //可以注册嵌套的局部组件，在模板字符串中使用

    }
}
</script>

