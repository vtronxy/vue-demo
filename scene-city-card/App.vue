<style lang="scss">
  @import "../sass/common";
      .card_header_w110 {
        @extend .card_header;
        font-size:$card-header-font-size-w110;
        width: 6.75rem;
        margin-left: -3.4375rem;
    }
  .card_header_w200 {
    @extend .card_header;
    width: 12.375rem;
    margin-left: -6.25rem;
  }
</style>

<template>
  <div id="app" style="position:relative;width:100%;height:100%">
    <div class="head">
      <div class="head_classify">
        <img src="../imgs/public.png" class="head_classify_img">
        <div class="head_classify_title">
          <div class="title_text">城市名片</div>
          <div class="title_subText">City Card</div>
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
        <div class="card_header_w110">生态指标</div>
        <bi-city-environment></bi-city-environment>
      </div>
      <hr class="hidden_hr" />
      <div class="card-side corner">
        <div class="card_header_w110">城镇化率</div>
        <bi-city-urbanization></bi-city-urbanization>
      </div>
    </div>
    <div class="main-center">
      <div class="card-center corner">
        <div class="card_header_w200">城市宣传片</div>
        <video @dblclick="toggleFullScreen($event)" style="object-fit:fill" src="./dist/city-vedio.webm" width="100%" height="100%" autoplay="autoplay" loop="loop"></video>
      </div>
      <hr class="hidden_hr" />
      <div class="card-center corner">
        <div class="card_header_w200 ">整点天气实况</div>
        <bi-city-weather></bi-city-weather>
      </div>
    </div>
    <div class="main-right">
      <div class="card-side corner">
        <div class="card_header ">历年人口变化趋势</div>
        <bi-population-trend></bi-population-trend>
      </div>
      <hr class="hidden_hr" />
      <div class="card-side corner">
        <div class="card_header">总人口分布图</div>
        <bi-population-distribute></bi-population-distribute>
      </div>
    </div>
  </div>
</template>

<script>
  import biCityEnvironment from './components/bi-city-environment.vue'
  import biCityUrbanization from './components/bi-city-urbanization.vue'
  import biCityWeather from './components/bi-city-weather.vue'
  import biPopulationDistribute from './components/bi-population-distribute.vue'
  import biPopulationTrend from './components/bi-population-trend.vue'
  import biIndexThemepopup from './components/bi-index-themepopup.vue';
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
      });
    },
    methods: {
      jumpToHome: function() {
        window.location.href = "/index-city-index.html";
      },
      toggleFullScreen: function(evt) {
        let videoDOM = evt.target;
        videoDOM.webkitRequestFullscreen(); //DOM全屏
        evt.stopPropagation();
      }
    },
    components: {
      'bi-city-environment': biCityEnvironment,
      'bi-city-urbanization': biCityUrbanization,
      'bi-city-weather': biCityWeather,
      "bi-index-themepopup": biIndexThemepopup,
      'bi-population-distribute': biPopulationDistribute,
      'bi-population-trend': biPopulationTrend
    }
  }
</script>



