<template>
  <div id="bi-public-information">
    <div class="content-right-header">
        <div class="fg_header_swit1"></div>
        <div>
            <div>公共信息</div>
            <div>Public Infomation</div>
        </div>
        <div class="fg_arrow_right fg_arrow_rgBg" tempUrl="cityPublicInfo.html"></div>
    </div>
    <div class="fg_content_f1">
        <div>今日案件上报
            <div class="fg_content_num"><span class="fg_tail_sp1" tempFlag=true tempName="案件上报">16</span>&nbsp;件
            </div>
        </div>
        <div>应结案件情况
            <div class=""><span class="fg_tail_sp1" tempFlag=true tempName="应结案件">3/6</span>&nbsp;人</div>
        </div>
    </div>
    <div class="fg_content_f2"></div>
</div>
</template>

<script>
export default {
    props: [], //组件支持的属性
    data: function() { //响应式数据
        return {}
    },
    methods: {}, //方法中的 this指向 VM实例
    created: function() {},
    mounted: function() { //挂载上DOM树后,使用
    },
    components: { //可以注册嵌套的局部组件，在模板字符串中使用

    }
}
</script>

