<template>
  <div class="content_right">
    <span id="rightClickSpan">></span>
    <div class="bi-corner module_h58">
        <div class="content-right-header">
            <div class="fg_header_swit1"></div>
            <div>
                <div>城市事件</div>
                <div>City Cases</div>
            </div>
            <div class="fg_arrow_right fg_arrow_rgBg" tempUrl="cityEvents.html"></div>
        </div>
        <div class="content-right-content-1">
            <div>
                <span class="fg_big_1"><i id="fg_big_despan1" tempFlag=true tempName="治理案件">90</i>%<span
                                        class="fg_common_1">治理案件数</span></span>
            </div>
            <div>
                <span class="fg_big_2"><i id="fg_big_despan2" tempFlag=true tempName="结案率">97</i>%<span
                                        class="fg_common_1">结案率</span></span>
            </div>
        </div>
        <div class="content-left-content-2">
            在东二十七号大街附近发现工地违章施工,施工过程中未采取有效防尘措施造成扬尘现象,目前已接到举报。
        </div>
        <div class="content-right-content-3"></div>
    </div>
    <div class="bi-corner module_h42">
        <div class="content-right-header">
            <div class="fg_header_swit1"></div>
            <div>
                <div>溢水积水</div>
                <div>Water and Rainfall</div>
            </div>
            <div class="fg_arrow_right fg_arrow_rgBg" tempurl="cityWaterFuz.html"></div>
        </div>
        <div class="content-right-content-4"></div>
    </div>
</div>
</template>

<script>
export default {
    props: [], //组件支持的属性
    data: function() { //响应式数据
        return {}
    },
    methods: {}, //方法中的 this指向 VM实例 this.$emit(); 触发事件
    created: function() {},
    mounted: function() { //挂载上DOM树后
    },
    components: { //可以注册嵌套的局部组件，在模板字符串中使用

    }
}
</script>

