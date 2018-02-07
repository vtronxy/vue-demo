<style lang="scss">
  @import "./sass/common";
  .card {
    &-side {
      @include card;
      width: $card-width;
      height: $card-height;
    }
    &-center {
      @include card;
      width: $card-width;
      height: $card-height;
    }
  }
  #app {
    background-image: url("./image/main-bg.png");
  }
</style>

<template>
  <div id="app" style="position:relative;width:100%;height:100%">
    <div class="head">
      <div class="head_classify">
        <img src="./image/public.png" class="head_classify_img">
        <div class="head_classify_title">
          <div class="title_text">公共信息</div>
          <div class="title_subText">Public Information</div>
        </div>
      </div>
      <div class="head_title"></div>
      <img src="./image/home.png" class="head_home">
    </div>
    <div class="main-left">
      <div class="card-side">
        <bi-city-environment></bi-city-environment>
      </div>
      <hr class="hidden_hr" />
      <div class="card-side">
        <bi-season-event></bi-season-event>
      </div>
    </div>
    <div class="main-center">
      <div class="card-center">
       <bi-population-trend></bi-population-trend>
      </div>
      <hr class="hidden_hr" />
      <div class="card-center">
        <bi-population-trend></bi-population-trend>
      </div>
    </div>
    <div class="main-right">
      <div class="card-side">
        <bi-region-event></bi-region-event>
      </div>
      <hr class="hidden_hr" />
      <div class="card-side">
        <bi-city-urbanization></bi-city-urbanization>
      </div>
    </div>
  </div>
</template>

<script>
  //加载页面级别组件

  import biYearEvent from './components/bi-year-event.vue'
  import biSeasonEvent from './components/bi-season-event.vue'
  import biRegionEvent from './components/bi-region-event.vue'
  import biCityCenter from './components/bi-city-center.vue'
  import biMapTip from './components/bi-map-tip.vue'
  import biCityWeather from './components/bi-city-weather.vue'
  import biCityEnvironment from './components/bi-city-environment.vue'
  import biPopulationTrend from './components/bi-population-trend.vue'
  import biPopulationDistribute from './components/bi-population-distribute.vue'
  import biCityUrbanization from './components/bi-city-urbanization.vue'
  export default {
    name: 'app',
    data() {
      return {
        message: 'I am App.vue'
      }
    },
    mounted: function() {},
    components: {
      'bi-year-event': biYearEvent,
      'bi-season-event':biSeasonEvent,
      'bi-region-event':biRegionEvent,
      'bi-city-center':biCityCenter,
      'bi-map-tip':biMapTip,
      'bi-city-weather':biCityWeather,
      'bi-city-environment':biCityEnvironment,
      'bi-population-trend':biPopulationTrend,
     'bi-population-distribute':biPopulationDistribute,
     'bi-city-urbanization':biCityUrbanization
    }
  }
</script>



