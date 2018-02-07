<style lang="scss">
  @import "../sass/common";
  .card-center {
    &_transparent {
      @include card;
      border-width: 0;
      width: $card-width;
      height: $card-height;
      box-shadow: none;
      background-color: transparent;
    }
  }
  .card_header_w200 {
    @extend .card_header;
    width: 14.375rem;
    margin-left: -7.25rem;
  }
  .card_header_w150 {
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
          <div class="title_text">智慧旅游</div>
          <div class="title_subText">Wisdom Tourism</div>
        </div>
      </div>
      <div class="head_title"></div>
      <!-- <a href="../index-city-index.html"><img src="../imgs/home.png" class="head_home"></a> -->
      <img src="../imgs/subject-.png" @click="visible=!visible" class="head_home" />
            <!-- 父组件控制浮云框的显示与隐藏 -->
            <bi-index-themepopup :visible="visible"></bi-index-themepopup>
    </div>
    <div class="main-left">
      <div class="card-side corner">
        <div class="card_header">游客客流走势图</div>
        <bi-card-1></bi-card-1>
      </div>
      <hr class="hidden_hr" />
      <div class="card-side corner">
        <div class="card_header_w150">游客预定方式分布图</div>
        <bi-card-2></bi-card-2>
      </div>
    </div>
    <div class="main-center">
      <div class="card-center_transparent">
        <bi-card-3></bi-card-3>
      </div>
      <hr class="hidden_hr" />
      <div class="card-center corner">
        <div class="card_header_w200 ">诚信排行榜（TOP10）</div>
        <bi-card-4></bi-card-4>
      </div>
    </div>
    <div class="main-right">
      <div class="card-side corner">
        <div class="card_header ">游客年龄占比图</div>
        <bi-card-5></bi-card-5>
      </div>
      <hr class="hidden_hr" />
      <div class="card-side corner">
        <div class="card_header">年度投诉分布图</div>
        <bi-card-6></bi-card-6>
      </div>
    </div>
  </div>
</template>

<script>
  //加载页面级别组件
  import biCard1 from './components/bi-card-1.vue'
  import biCard2 from './components/bi-card-2.vue'
  import biCard3 from './components/bi-card-3.vue'
  import biCard4 from './components/bi-card-4.vue'
  import biCard5 from './components/bi-card-5.vue'
  import biCard6 from './components/bi-card-6.vue'
  import biIndexThemepopup from './components/bi-index-themepopup.vue';
  export default {
    name: 'app',
    data() {
      return {
        visible: false, //控制界面右上角弹出框的显示隐藏
        message: 'I am App.vue'
      }
    },
    mounted: function() {
      this.$nextTick(() => {
        $("div.corner").prepend('<span class="row1"></span> <span class="row2"></span> <span class="col2"></span> <span class="col1"></span>');
      });
    },
    components: {
      'bi-card-1': biCard1,
      'bi-card-2': biCard2,
      'bi-card-3': biCard3,
      'bi-card-4': biCard4,
      'bi-card-5': biCard5,
      'bi-card-6': biCard6,
      "bi-index-themepopup": biIndexThemepopup,
    }
  }
</script>



