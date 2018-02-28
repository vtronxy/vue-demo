<style lang="scss">
    @import "../sass/map";
    hr {
        overflow: hidden;
    }
    .text-right {
        text-align: right;
    }
    @mixin frag {
        float: left;
        width: calc((100% - 2.6rem) * 0.333 - 0.125rem);
        color: #8ef9f9;
        text-align: center;
        font-weight: bold;
    }
    .fragment {
        @include frag;
        display: flex; //  flex-direction:column;
        /*老版本语法*/
        -webkit-box-align: center;
        -moz-box-align: center;
        /*混合版本语法*/
        -ms-flex-align: center;
        /*新版本语法*/
        -webkit-align-items: center;
        align-items: center;
        /*水平居中*/
        /*老版本语法*/
        -webkit-box-pack: center;
        -moz-box-pack: center;
        /*混合版本语法*/
        -ms-flex-pack: center;
        /*新版本语法*/
        -webkit-justify-content: center;
        justify-content: center;
        position: relative;
        height: calc(100% - 2.5rem);
        text-align: center;
        background-color: rgba(7, 14, 37, 0.9);
        background-image: -webkit-linear-gradient(180deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px), -webkit-linear-gradient(90deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px);
        background-size: 0.43rem 0.43rem;
        border: {
            color: $card-border;
            width: 0 1px 0 1px;
            style: solid;
        }
        &_des {
            @include frag;
            height: 2.5rem;
            line-height: 2.5rem;
            font-size: 1rem;
        }
    }
    .card-side {
        &_long {
            @extend .card-side;
            height: calc(100% - 3.125rem);
        }
    }
    .margin_lr {
        margin-left: 1.25rem;
        margin-right: 1.25rem;
    }
    .head_title {
        position: relative;
    }
    .card_header_w110 {
        @extend .card_header;
        font-size: $card-header-font-size-w110;
        width: 6.75rem;
        margin-left: -3.4375rem;
    }
    body {
        overflow: hidden;
    }
    .container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .map {
        width: 100%;
        height: 100%;
    }
    .main-center {
        &_up {
            @extend .main-center;
            top: 6.75rem;
            height: 16%;
        }
        &_down {
            @extend .main-center;
            bottom: 1.875rem;
            height: calc((100% - 4.5625rem - 0.9375rem - 6.25rem) * 0.5);
            &_card {
                @include card;
                margin: 0;
                width: calc(100% - 0.125rem);
                height: calc(100% - 0.125rem);
                position: relative;
            }
        }
    }
    .index-info,
    .index-info a,
    .index-info a:visited {
        font-size: 4vmax;
        color: #53FBFB!important;
        position: relative; // top: -13px;
    }
    a:link,
    a:visited {
        color: #53FBFB;
    }
    @mixin bracket {
        background-image: url(../imgs/_brackets.png?2fc5802…);
        background-size: 0.4375rem 80%;
        background-repeat: no-repeat;
        height: 60%;
        font-weight: 900;
        font-size: 1.5rem;
        display: inline-block;
        background-position: center;
    }
    .bracket {
        @include bracket;
    }
    .bracketright {
        @include bracket;
        transform: rotate(180deg);
    }
    .offset1 {
        position: relative;
        top: -0.125rem;
    }
    .offset2 {
        top: -0.25rem;
    }
    .imgmiddle {
        vertical-align: middle;
        height: 70%;
    }
    .imgmiddleright {
        transform: rotate(180deg);
    }
    .fullScreen_img {
        cursor: pointer;
    }
    $card-border:#42edf8;
    @mixin rowcol() {
        border-color: $card-border;
        border-width: 0.25rem 0.25rem 0 0;
        padding: 0;
    }
    .row1_f1 {
        @extend .row1;
        @include rowcol(); // padding: 0px;
    }
    .row2_f1 {
        @extend .row2;
        @include rowcol();
    }
    .col1_f1 {
        @extend .col1;
        @include rowcol();
    }
    .col2_f1 {
        @extend .col2;
        @include rowcol();
    }
    .layerSwitch {
        position: absolute;
        width: 21rem;
        height: 19.6875rem;
        right: -21.5rem;
        top: 5.625rem;
    }
    .layerSwitch .card-side {
        height: 18.25rem;
        @include smallType {
            height: 25.25rem;
        }
    }
</style>

<template>
    <div class="container">
        <!-- 地图组件 -->
        <ol-map ref="olMap" v-bind="baseMapProps">
            <!-- 覆盖瓦片图层 -->
            <ol-layer-tile @layer-loaded="_reportLayerLoaded($event)" v-for="(item,index) in olMapConfig.layers" :key="item.layerName" :layerName="item.layerName" :layerUrl="item.layerUrl" :serverType="item.serverType" :visible="item.visible" v-if="item.type == 'tile'"></ol-layer-tile>
            <ol-layer-vector @layer-loaded="_reportLayerLoaded($event)" v-for="(item,index) in olMapConfig.layers" :key="item.layerName" :layerStyle="item.layerStyle" :layerName="item.layerName" :layerUrl="item.layerUrl" :visible="item.visible" v-if="item.type.toLowerCase() == 'vector'"></ol-layer-vector>
            <ol-state-select state-name="single-choose"></ol-state-select>
        </ol-map>
        <div class="layerSwitch">
            <div class="j-card-side  card-side corner">
                <div class="card_header_w110">地图内容</div>
                <!-- 图层列表 -->
                <bi-map-content></bi-map-content>
            </div>
        </div>
        <div class="head">
            <div class="head_classify">
                <img src="../imgs/screen-.png" @click="fullScreen" class="head_classify_img fullScreen_img">
            </div>
            <!-- 标题栏的图片 -->
            <div class="j-head_title head_title"></div>
            <img src="../imgs/subject-.png" @click="visible=!visible" class="head_home" />
            <!-- 父组件控制浮云框的显示与隐藏 -->
            <bi-index-themepopup :visible="visible"></bi-index-themepopup>
        </div>
        <!-- part-1: 左侧面板 -->
        <div class="j-main-left main-left">
            <div class="card-side_long corner">
                <a href="./index-city-card.html">
                    <div class="card_header_w110">
                        城市名片
                    </div>
                </a>
                <bi-index-card></bi-index-card>
            </div>
        </div>
        <div class="j-main-center_up main-center_up">
            <div class="fragment corner_fragment">
                <span class="index-info">
                                    2.23T
                                </span>
            </div>
            <div class="fragment margin_lr corner_fragment">
                <span class="index-info">
                                    <bi-index-count v-bind:initcounter="36432"></bi-index-count>
                                  
                                </span>
            </div>
            <div class="fragment corner_fragment">
                <span class="index-info">
                                    64.2%
                                </span>
            </div>
            <div class="fragment_des">信息采集总量</div>
            <div class="fragment_des margin_lr ">信息交换总量</div>
            <div class="fragment_des">监控社保覆盖率</div>
        </div>
        <div class="j-main-center_down main-center_down">
            <div class="main-center_down_card corner">
                <a href="./index-city-traffic.html">
                    <div class="card_header_w110 ">
                        城市交通
                    </div>
                </a>
                <bi-index-traffic></bi-index-traffic>
            </div>
        </div>
        <div class="j-main-right main-right">
            <div class="card-side corner">
                <a href="./index-city-manager.html">
                    <div class="card_header_w110 ">
                        城市管理
                    </div>
                </a>
                <bi-index-citymanage></bi-index-citymanage>
            </div>
            <hr class="hidden_hr" />
            <div class="card-side corner">
                <a href="./index-city-public.html">
                    <div class="card_header_w110">
                        公共信息
                    </div>
                </a>
                <bi-index-public></bi-index-public>
            </div>
        </div>
    </div>
</template>

<script>
    import biIndexTraffic from './components/bi-index-traffic.vue'
    import biIndexCitymanage from './components/bi-index-citymanage.vue'
    import biIndexPublic from './components/bi-index-public.vue'
    import biIndexCard from './components/bi-index-card.vue'
    import biIndexThemepopup from './components/bi-index-themepopup.vue';
    import biMapContent from './components/bi-map-content.vue'
    import biIndexCount from './components/bi-index-count.vue'
    import olMap from '../common/components/ol-map.vue'
    import olLayerTile from '../common/components/ol-layer-tile.vue'
    import olLayerVector from '../common/components/ol-layer-vector.vue'
    import olStateSelect from '../common/components/ol-state-select.vue'
    import mapConfig from '../data/mapConfig.json'
    import {
        EventBus
    } from '../common/js/utils'
    //加载页面级别组件
    export default {
        name: 'app',
        data() {
            return {
                visible: false, //控制界面右上角弹出框的显示隐藏
                isFullSCreen: false,
                main_top: null,
                main_left: null,
                main_right: null,
                main_bottom: null,
                head_title: null,
                message: 'I am App.vue',
                olMapConfig: mapConfig, //地图的配置文件
                baseMapProps: {
                    map: mapConfig.map, //瓦片路径
                    mapView: mapConfig.mapView //地图的视角
                }
            }
        },
        mounted: function() {
            this.$nextTick(() => {
                $("div.corner").prepend('<span class="row1"></span> <span class="row2"></span> <span class="col2"></span> <span class="col1"></span>');
                $("div.corner_fragment").prepend('<span class="row1_f"></span> <span class="row2_f"></span> <span class="col2_f"></span> <span class="col1_f"></span>');
                //地图上 添加echarts扩展图层
                this.$refs.olMap.addEchartsLayer();
            });
        },
        methods: {
            //数字逐渐增加
            increaseNum: function(num) {
                return function() {
                    setInterval(function() {
                        num++;
                    }, 1000);
                }
            },
            fullScreen: function() {
                if (this.isFullSCreen) {
                    this.resizeScreen();
                    return;
                }
                this.main_left = $(".j-main-left").css("left");
                this.main_right = $(".j-main-right").css("right");
                this.main_center_down = $(".j-main-center_down").css("bottom");
                this.main_center_up = $(".j-main-center_up").css("top");
                $(".j-main-left").animate({
                    left: -470
                }, 800);
                //界面出现动画
                $(".j-main-right").animate({
                    right: -470
                }, 800);
                //界面底图出现动画
                $(".j-main-center_down ").animate({
                    bottom: -490
                }, 800);
                $(".j-main-center_up").animate({
                    top: -300
                }, 800);
                $(".j-head_title").animate({
                    top: -300
                }, 800);
                $(".layerSwitch").animate({
                    right: 14
                }, 800);
                this.isFullSCreen = true;
            },
            resizeScreen: function() {
                $(".j-main-left").animate({
                    left: this.main_left
                }, 800);
                //界面出现动画
                $(".j-main-right").animate({
                    right: this.main_right
                }, 800);
                //界面底图出现动画
                $(".j-main-center_down ").animate({
                    bottom: this.main_center_down
                }, 800);
                $(".j-main-center_up").animate({
                    top: this.main_center_up
                }, 800);
                $(".j-head_title").animate({
                    top: 0
                }, 800);
                $(".layerSwitch").animate({
                    right: '-21.5rem'
                }, 800);
                this.isFullSCreen = false;
            },
            //报告已经加载的 地图图层
            _reportLayerLoaded: (function(that) {
                let count = 0;
                let layerCount = mapConfig.layers.length; //所有图层的数量
                let allLayers = [];
                return function(event) {
                    count++;
                    allLayers.push(event.layerObj);
                    if (layerCount === count) {
                        //ol-state- 会监听这个事件
                        EventBus.$emit('layer-load-completed', allLayers); //所有的图层已经加载完毕
                    }
                    console.log(`${event.layerName} load completed`);
                }
            })(),
        },
        components: {
            "bi-index-traffic": biIndexTraffic,
            "bi-index-citymanage": biIndexCitymanage,
            "bi-index-public": biIndexPublic,
            "bi-index-card": biIndexCard,
            "bi-index-themepopup": biIndexThemepopup,
            "bi-index-count": biIndexCount,
            "bi-map-content": biMapContent,
            'ol-map': olMap,
            'ol-layer-tile': olLayerTile,
            'ol-layer-vector': olLayerVector,
            'ol-state-select': olStateSelect
        }
    }
</script>



