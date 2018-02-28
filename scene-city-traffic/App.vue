<style lang="scss">
  @import "../sass/common";
  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .card_side {
    &_rt {
      @include card;
      width: $card-width;
      height: calc((100% - 65px) * 0.29 - 2px);
      background-color: #02214c;
    }
    &_rb {
      @include card;
      margin-top: 15px;
      margin-bottom: 0;
      width: $card-width;
      height: calc((100% - 65px) * 0.71 - 2px);
      background-color: #02214c;
    }
    &_lt {
      @include card;
      width: $card-width;
      height: calc((100% - 65px) * 0.405 - 2px);
    }
    &_lb {
      @include card;
      width: $card-width;
      height: calc((100% - 65px) * 0.595 - 2px);
      margin-top: 15px;
      margin-bottom: 0;
    }
  }
  .traffic-indicator {
    z-index: 10;
    width: 300px;
    height: 32px;
    color: white;
    font-size: 14px;
    line-height: 32px;
    display: flex;
    align-items: center;
    position: absolute;
    right: calc(25% + 10px);
    bottom: 18px;
    background-color: $card-bgc;
    border: {
      color: $card-border;
      width: 1px 0 1px 0;
      style: solid;
    }
    ;
  }
  .traffic-indicator>img {
    margin-left: 10px;
    margin-right: 5px;
  }
  @mixin span_p {
    position: absolute;
    border: 1px solid $card-border;
    padding-top: 1px;
    padding-left: 1px;
  }
  .row1_p {
    @include span_p;
    top: -2px;
    left: -1px;
  }
  .row2_p {
    @include span_p;
    top: -2px;
    right: -1px;
  }
  .col1_p {
    @include span_p;
    bottom: -2px;
    left: -1px;
  }
  .col2_p {
    @include span_p;
    bottom: -2px;
    right: -1px;
  }
  .main-right {
    float: right;
  }
</style>

<template>
  <div id="app">
    <div class="head">
      <div class="head_classify">
        <img src="../imgs/cityTraffic.png" class="head_classify_img">
        <div class="head_classify_title">
          <div class="title_text">城市交通</div>
          <div class="title_subText">The Urban Traffic</div>
        </div>
      </div>
      <div class="head_title"></div>
      <!-- <a href="../index-city-index.html"><img src="../imgs/home.png" class="head_home"></a> -->
      <img src="../imgs/subject-.png" @click="visible=!visible" class="head_home" />
            <!-- 父组件控制浮云框的显示与隐藏 -->
            <bi-index-themepopup :visible="visible"></bi-index-themepopup>
    </div>
    <div class="main-left">
      <div class="card_side_lt corner">
        <div class="card_header">实时交通拥堵指数</div>
        <bi-public-traffic></bi-public-traffic>
      </div>
      <hr class="hidden_hr" />
      <div class="card_side_lb corner">
        <div class="card_header">整体拥堵趋势预测</div>
        <bi-public-traffic-trend></bi-public-traffic-trend>
      </div>
    </div>
      <div class="traffic-indicator corner_point">
        <img src="../imgs/tra-pic01.png">严重拥堵
        <img src="../imgs/tra-pic02.png">拥堵
        <img src="../imgs/tra-pic03.png">缓行
        <img src="../imgs/tra-pic04.png">畅通
      </div>
    <div class="main-right">
      <div class="card_side_rt corner">
        <div class="card_header ">地图内容</div>
        <bi-map-content></bi-map-content>
      </div>
      <hr class="hidden_hr" />
      <div class="card_side_rb corner">
        <div class="card_header">交通实时消息</div>
        <bi-public-information></bi-public-information>
      </div>
    </div>
    <!-- 地图组件 -->
    <ol-map ref="olMap" v-bind="baseMapProps">
      <ol-layer-tile @layer-loaded="_reportLayerLoaded($event)" v-for="(item,index) in olMapConfig.layers" :key="item.layerName" :layerName="item.layerName" :layerUrl="item.layerUrl" :serverType="item.serverType" :visible="item.visible" v-if="item.type == 'tile'"></ol-layer-tile>
      <ol-layer-vector @layer-loaded="_reportLayerLoaded($event)" v-for="(item,index) in olMapConfig.layers" :key="item.layerName" :layerName="item.layerName" :layerUrl="item.layerUrl" :layerStyle="item.layerStyle" :visible="item.visible" v-if="item.type.toLowerCase() == 'vector'"></ol-layer-vector>
      <ol-state-select state-name="single-choose"></ol-state-select>
    </ol-map>
  </div>
</template>

<script>
  import BiPublicInformation from './components/bi-public-information.vue'
  import BiPublicTrafficTrend from './components/bi-public-traffic-trend.vue'
  import BiPublicTraffic from './components/bi-public-traffic.vue'
  import BiMapContent from './components/bi-map-content.vue'
  import olMap from '../common/components/ol-map.vue'
  import olLayerTile from '../common/components/ol-layer-tile.vue'
  import olLayerVector from '../common/components/ol-layer-vector.vue'
  import olStateSelect from '../common/components/ol-state-select.vue'
  import mapConfig from '../data/mapConfig.json'
  import biIndexThemepopup from './components/bi-index-themepopup.vue';
  import {
    EventBus
  } from '../common/js/utils'
  //加载页面级别组件
  export default {
    name: 'app',
    data: function() {
      return {
        visible: false, //控制界面右上角弹出框的显示隐藏
        olMapConfig: mapConfig, //地图的配置文件
        baseMapProps: {
          map: mapConfig.map, //瓦片路径
          mapView: mapConfig.mapView, //地图的视角
          visible:mapConfig.visible //地图的可见性
        }
      }
    },
    //子组件已经 mounted完毕后，父组件的mounted最后执行
    mounted: function() {
      this.$nextTick(() => {
        $("div.corner").prepend('<span class="row1"></span> <span class="row2"></span> <span class="col2"></span> <span class="col1"></span>');
        $("div.corner_point").prepend('<span class="row1_p"></span> <span class="row2_p"></span> <span class="col2_p"></span> <span class="col1_p"></span>');
        //地图上 添加echarts扩展图层
        this.$refs.olMap.addEchartsLayer({visible:false});

      })
    },
    methods: {
      //报告已经加载的[所有的] 地图图层
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
            console.log(`allLayers load completed`);
          }
          console.log(`${event.layerName} load completed`);
        }
      })(),
    },
    components: {
      'bi-public-traffic': BiPublicTraffic,
      'bi-public-traffic-trend': BiPublicTrafficTrend,
      'bi-public-information': BiPublicInformation,
      'bi-map-content': BiMapContent,
      'ol-map': olMap,
      'ol-layer-tile': olLayerTile,
      'ol-layer-vector': olLayerVector,
      'ol-state-select': olStateSelect,
      "bi-index-themepopup": biIndexThemepopup,
    }
  }
</script>



