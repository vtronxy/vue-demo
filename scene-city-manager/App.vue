<style lang="scss">
  //这里没有使用 scoped DOM上不会添加 dava-hashed属性
  @import '../sass/common';
  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .map-tip {
    position: absolute;
    top: 10%;
    right: 0;
    width: 32%;
    height: 32%;
    border: 1px solid #64abed; // box-shadow: 0 0 25px 10px rgba(255, 255, 255, 0.3) inset;
    background-color: rgba(0, 82, 133, 0.64);
    border-radius: 6px;
    padding: 0;
  }
</style>

<template>
  <div id="app">
    <div class="head">
      <div class="head_classify">
        <img src="../imgs/public.png" class="head_classify_img">
        <div class="head_classify_title">
          <div class="title_text">城市管理</div>
          <div class="title_subText">City Management</div>
        </div>
      </div>
      <div class="head_title"></div>
      <!-- <img src="../imgs/home.png" class="head_home" @click="jumpToHome"> -->
      <img src="../imgs/subject-.png" @click="visible=!visible" class="head_home" />
      <!-- 父组件控制浮云框的显示与隐藏 -->
      <bi-index-themepopup :visible="visible"></bi-index-themepopup>
    </div>
    <div class="main-left">
      <div class="card-side corner">
        <div class="card_header">年度事件汇聚</div>
        <bi-year-event></bi-year-event>
      </div>
      <hr class="hidden_hr" />
      <div class="card-side corner">
        <div class="card_header">区域案件汇聚</div>
        <bi-region-event></bi-region-event>
      </div>
    </div>
    <div class="main-center">
      <bi-echarts-map></bi-echarts-map>
      <div class="map-tip">
        <bi-map-tip></bi-map-tip>
      </div>
    </div>
    <div class="main-right">
      <div class="card-side corner">
        <div class="card_header ">中心城区综合管理</div>
        <bi-city-center></bi-city-center>
      </div>
      <hr class="hidden_hr" />
      <div class="card-side corner">
        <div class="card_header">季度事件类型汇聚</div>
        <bi-season-event></bi-season-event>
      </div>
    </div>
  </div>
</template>

<script>
  import biCityCenter from './components/bi-city-center.vue'
  import biMapTip from './components/bi-map-tip.vue'
  import biRegionEvent from './components/bi-region-event.vue'
  import biSeasonEvent from './components/bi-season-event.vue'
  import biYearEvent from './components/bi-year-event.vue'
  import biEchartsMap from './components/bi-echarts-map.vue'
  import biIndexThemepopup from './components/bi-index-themepopup.vue';
  //加载页面级别组件
  export default {
    name: 'app',
    data() {
      return {
        message: 'I am App.vue',
        visible: false, //控制界面右上角弹出框的显示隐藏
      }
    },
    mounted: function() {
      this.$nextTick(() => {
        $("div.corner").prepend('<span class="row1"></span> <span class="row2"></span> <span class="col2"></span> <span class="col1"></span>');
      })
    },
    methods:{
      jumpToHome:function(){
        window.location.href="/index-city-index.html";
      }
    },
    components: {
      'bi-city-center': biCityCenter,
      'bi-map-tip': biMapTip,
      'bi-region-event': biRegionEvent,
      'bi-season-event': biSeasonEvent,
      'bi-year-event': biYearEvent,
      'bi-echarts-map': biEchartsMap,
      "bi-index-themepopup": biIndexThemepopup,
    }
  }
</script>



