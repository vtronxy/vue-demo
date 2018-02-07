<style lang="scss" scoped>
    @import '../../sass/echarts-container';

    .container {
        margin-top: 1.3125rem;
        height:calc(100% - 1.3125rem);
        width: 100%;
        overflow: auto;
    }

    /* echart图标的宽高 */
    .echarts-population-trend {
        @include echartSize(100%, 75%);
    }

    /* Switch */
    .container ul {
        height: 100%;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
    }

    .container li {
        height: 30%;
    }

    .container span {
        position: relative;
        top: -0.5rem;
        padding-left: 0.625rem;
        font-size: 0.875rem;
        color: #99ffff;
    }

    /* Switch */
    input[type="checkbox"].iswitch {
        font-size: 0.625rem;
        position: relative;
        display: inline-block;
        width: 2.625rem;
        height: 1.125rem;
        line-height: 0.875rem;
        border-radius: 0.875rem;
        margin: 0 auto;
        padding: 0;
        box-shadow: inset 0 0 0 2px #eeeeee;
        outline: 1px solid transparent !important;
        cursor: pointer;
        border: none;
        background: transparent;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-touch-callout: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        transition: box-shadow 0.3s ease-in-out, padding 0.25s ease-in-out;
        transition-delay: .1s, 0s; /* Animations if supported */
    }

    input[type="checkbox"].iswitch:checked {
        transition-delay: 0s, 0s;
        box-shadow: inset 0 0 0 12.57142857px #eeeeee !important;
        padding-left: 1.5rem;
    }

    input[type="checkbox"].iswitch.iswitch-primary:checked {
        box-shadow: inset 0 0 0 12.57142857px #2c2e2f !important;
    }

    input[type="checkbox"].iswitch.iswitch-secondary:checked {
        box-shadow: inset 0 0 0 12.57142857px #68b828 !important;
    }

    input[type="checkbox"].iswitch.iswitch-info:checked {
        box-shadow: inset 0 0 0 12.57142857px #40bbea !important;
    }

    input[type="checkbox"].iswitch.iswitch-warning:checked {
        box-shadow: inset 0 0 0 12.57142857px #ffba00 !important;
    }

    input[type="checkbox"].iswitch.iswitch-danger:checked {
        box-shadow: inset 0 0 0 12.57142857px #cc3f44 !important;
    }

    input[type="checkbox"].iswitch.iswitch-success:checked {
        box-shadow: inset 0 0 0 12.57142857px #8dc63f !important;
    }

    input[type="checkbox"].iswitch.iswitch-red:checked {
        box-shadow: inset 0 0 0 12.57142857px #d5080f !important;
    }

    input[type="checkbox"].iswitch.iswitch-blue:checked {
        box-shadow: inset 0 0 0 12.57142857px #0e62c7 !important;
    }

    input[type="checkbox"].iswitch.iswitch-purple:checked {
        box-shadow: inset 0 0 0 12.57142857px #7c38bc !important;
    }

    input[type="checkbox"].iswitch.iswitch-pink:checked {
        box-shadow: inset 0 0 0 12.57142857px #ff6264 !important;
    }

    input[type="checkbox"].iswitch.iswitch-turquoise:checked {
        box-shadow: inset 0 0 0 12.57142857px #00b19d !important;
    }

    input[type="checkbox"].iswitch.iswitch-yellow:checked {
        box-shadow: inset 0 0 0 12.57142857px #fcd036 !important;
    }

    input[type="checkbox"].iswitch.iswitch-orange:checked {
        box-shadow: inset 0 0 0 12.57142857px #f7aa47 !important;
    }

    input[type="checkbox"].iswitch.iswitch-gray:checked {
        box-shadow: inset 0 0 0 12.57142857px #d5d5d5 !important;
    }

    input[type="checkbox"].iswitch.hit {
        -webkit-animation: slide-off .35s ease both;
        -moz-animation: slide-off .35s ease both;
        -o-animation: slide-off .35s ease both;
        animation: slide-off .35s ease both;
    }

    input[type="checkbox"].iswitch.hit:checked {
        -webkit-animation: slide-on .35s ease both .05s;
        -moz-animation: slide-on .35s ease both .05s;
        -o-animation: slide-on .35s ease both .05s;
        animation: slide-on .35s ease both .05s;
    }

    input[type="checkbox"].iswitch:before, input[type="checkbox"].iswitch:after {
        content: "";
    }

    input[type="checkbox"].iswitch:after {

        /* Increases hit area */
        position: absolute;
        top: -6px;
        left: -6px;
        bottom: -6px;
        right: -6px;
    }

    input[type="checkbox"].iswitch:before {
        display: inline-block;
        height: 0.875rem;
        width: 0.875rem;
        margin: 2px 0 0 2px;
        background-color: #ffffff;
        border-radius: 9px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 0 1px 1px rgba(0, 0, 0, 0.1);
        -webkit-transition: all .1s ease .1s;
        -moz-transition: all .1s ease .1s;
        -o-transition: all .1s ease .1s;
        transition: all .1s ease .1s;
    }

    input[type="checkbox"].iswitch:active:before {
        transition: all .1s ease .05s;
    }

    input[type="checkbox"].iswitch.touch:hover:before {
        transition: all .0s ease .00s;
    }

    input[type="checkbox"].iswitch:active:before, input[type="checkbox"].iswitch.touch:hover:before {
        width: 1.25rem;
    }

    input[type="checkbox"].iswitch:active:checked:before, input[type="checkbox"].iswitch.touch:hover:checked:before {
        margin-left: 0px;
    }

    .imgIcon {
        padding-top: 0.4375rem;
    }
</style>
<template>
    <div ref="sliderContainer" class="container">
        <ul>
            <template v-for="(item,index) in layers">
                <li>
                    <img class="imgIcon" :src="item.imgSrc">
                    <span>{{nameMap[item.layerName || item.mapName]}}</span>
                    <input @click="switchLayer($event)"
                           :data-layerName="item.layerName || item.mapName"
                           :checked = "item.visible"
                           type="checkbox"
                           class="pull-right iswitch iswitch-orange"
                           title="打开/关闭图层"
                           style="margin-top:10px">
                </li>
                <hr size=1 style="color: #FFFFFF;border-style:dashed ;width:100%;opacity:0.4">
            </template>
            <!-- echarts扩展图层，不在配置文件mapConfig.json当中 -->
            <li><img class="imgIcon" src="imgs/poi/SSJTLK.png"><span>实时车辆轨迹</span><input @click="switchLayer($event)"
                                                                                         type="checkbox"
                                                                                         class="pull-right iswitch iswitch-orange"
                                                                                         title="打开/关闭图层"
                                                                                         data-layerName="trafficing"
                                                                                         style="margin-top:10px"></li>
        </ul>
    </div>
</template>


<script>
    import {
        EventBus
    } from '../../common/js/utils';
    import mapConfig from '../../data/mapConfig.json';

    const nameMap = {
        "high_speed_probe":"高速探头",
        "camera":"道路摄像头",
        "traffic":"实时交通路况",
        "roadwork":"施工占道",
        "cover":"街道井盖",
        "streetlight":"街道路灯",
        "baseMap":"基础底图",
        "baseMap2":"WMTS底图",
        "traffic2":"WMTS路况"
    }
    export default {
        data: function () {
            return {
                layers:[], //所有的图层，包含底图
                layerCount:0,
                nameMap
            }
        },
        created:function(){
            this.layers = mapConfig.map.concat(mapConfig.layers);
            this.layerCount = this.layers.length;
        },
        methods: {
            switchLayer: function (evt) {

                let layerName = evt.currentTarget.dataset.layername;
                let visible = evt.currentTarget.checked; //获取它是否选中
                //echarts图层单独处理
                if (!Object.is(layerName, "trafficing")) {
                    EventBus.$emit('layer-switch', {layerName, visible});
                } else {
                    EventBus.$emit('echartsLayer-switch', visible);
                }
            }
        },
        mounted: function () {
            var cntDOM = this.$refs.sliderContainer;
            this.$nextTick(() => {
                $(cntDOM).mCustomScrollbar({
                    theme: "minimal"
                });
            });
        }
    }
</script>




