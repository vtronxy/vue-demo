<style scoped>
  .svg-cnt {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .content {
    position: absolute;
    border: 1px solid black;
    color: black;
  }
</style>
<template>
  <div class="svg-cnt" ref="svgCnt" :style="panelOffset" v-bind="panelUserOffset" v-cloak>
    <!-- 使用svg的 getBBox() 拿到viewBox的值 -->
    <svg class="svg-frame" ref="svgFrame" :style="size" viewBox="91.87100219726562 162.91700744628906 319.2740173339844 266.010986328125" preserveAspectRatio="none" overflow="hidden">
      <rect  ref="svgContent" x="94" y="179.5" fill="none" stroke="#44A6DD" stroke-miterlimit="10" width="315.833" height="247.467"/>
      <rect  x="93.5" y="178.25" fill="#FFFFFF" width="11.019" height="1.768"/>
      <rect  ref="svgOffsetTop" x="92.677" y="178.25" fill="#FFFFFF" width="1.834" height="13.44"/>
      <rect  ref="svgTitle" x="204.5" y="162.917" fill="#142345" stroke="#449CCF" stroke-miterlimit="10" width="100.5" height="29.25"/>
      <polyline fill="#44A6DD" points="204.021,184.15 199.339,179.471 204.018,174.79 "/>
      <polyline fill="#44A6DD" points="305.481,174.986 310.16,179.668 305.477,184.347 "/>
      <rect x="91.871" y="427.475" fill="#FFFFFF" width="13.004" height="1.453"/>
      <rect x="399.303" y="425.758" fill="#FFFFFF" width="11.019" height="1.768"/>
      <rect x="409.311" y="414.086" fill="#FFFFFF" width="1.834" height="13.44"/>
      <rect x="409.311" y="179.008" fill="#FFFFFF" width="1.768" height="11.019"/>
      <rect x="397.639" y="178.185" fill="#FFFFFF" width="13.44" height="1.834"/>
      <rect x="92.773" y="416.429" fill="#FFFFFF" width="1.768" height="11.019"/>
      <rect x="92.773" y="426.437" fill="#FFFFFF" width="13.44" height="1.834"/>
      <text x="222" y="185" fill="red" :font-size="panelTitleFontSize">{{panelTitle}}</text>
    </svg>
    <div class="content" ref="content" :style="contentLayout">
      <slot>这是DOM内容</slot>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue'
  export default {
    props: ['title','titleFontSize', 'width', 'height', 'left', 'top'], //组件支持的属性
    data: function() {
      return {
        panelTitle: this.title || '面板标题',
        panelTitleFontSize:Number.isInteger(parseInt(this.titleFontSize))? parseInt(this.titleFontSize):15,
        panelSize: { //默认100%
          width: Number.isInteger(parseInt(this.width))? parseInt(this.width): 100,
          height: Number.isInteger(parseInt(this.height))? parseInt(this.width): 100
        },
        offsetX: 0, //内容区域 距离左边像素距离
        offsetY: 0, //内容区域 距离顶部的像素距离
        contentDOM: null,
        contentLayout: {}, //内容区域 布局的样式对象
        panelOffset: { //panel的Offset
          left: 0,
          top: 0
        },
        panelUserOffset: { //用户自定义的 偏移量
          left: parseInt(this.left) || 0,
          top: parseInt(this.top) || 0
        }
      }
    },
    mounted: function() {
      this.contentDOM = this.$refs.content;
      //初始化时 计算属性getBoundingClientRect无法获取到正确的值
      requestAnimationFrame(() => {
        this._computePosition();
      });
    },
    computed: {
      size: function() {
        //实时的改变容器面板的大小
        return {
          width: this.panelSize.width + "%",
          height: this.panelSize.height + "%"
        };
      }
    },
    methods: {
      //计算面板布局
      _computePosition: function() {
        //step1:设置content的定位
        var rectCnt =
          this.$refs.svgContent
          .getBoundingClientRect();
        var left = rectCnt.left + this.offsetX - parseInt(this.panelOffset.left) + "px";
        var width = (rectCnt.width - this.offsetX) * 0.98 + "px";
        var rectTop = this.$refs.svgOffsetTop
          .getBoundingClientRect();
        var top = this.$refs.svgTitle.getBoundingClientRect().height + 'px';
        var height =
          (rectCnt.height - rectTop.height - this.offsetY) * 0.98 + "px";
        //动态的增加 响应依赖值
        Vue.set(this.contentLayout, "left", '5px');
        Vue.set(this.contentLayout, "top", top);
        Vue.set(this.contentLayout, "width", width);
        Vue.set(this.contentLayout, "height", height);

      },
      setPanelSize: function(size) {
        this.panelSize.width = size.w;
        this.panelSize.height = size.h;
      },
      //方法多余，只需要沾满父容器即可,布局的功能由外围的div来负责
      setContentOffset: function(offset) {
        this.offsetX = offset.left;
        this.offsetY = offset.top;
      }
    }
  };
</script>


