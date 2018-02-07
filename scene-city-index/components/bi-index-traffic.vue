<style lang="scss" scoped>
    @import "../../sass/base";
    .indextraffic {
        position: absolute;
        top: 0px;
        bottom: 0px;
        border: 0px blue solid;
        left: 0.625rem;
        right: 0.625rem;
    }
    .bi {
        &-indextraffic {
            top: 0.625rem;
            position: relative;
            @include clearfix;
            height: calc(80% - 1.5625rem);
            font-size: 0.75rem;
            color: white;
            font-weight: 500;
            &-zkh {
                color: #96feff; // font-size: 28px;
            }
            &-offset {
                //padding: 0.625rem;
                text-align: right;
            }
            &-num {
                font-size: 1.125rem;
                font-family: "Microsoft YaHei Bold";
                color: #99ffff;
                font-weight: bold; // padding-right: 0.625rem;
            }
            &-unit {
                font-size: 0.75rem;
            }
            &-end {
                font-size: 0.75rem;
            }
            >li {
                @include pull-left;
            }
        }
        &-indextrafficBorder {
            border: {
                left: 1px rgba(4, 255, 255, 0.38) solid;
                right: 1px rgba(4, 255, 255, 0.38) solid;
                bottom: 1px rgba(4, 255, 255, 0.38) solid;
            }
        }
        &-indextrafficbarcount {
            white-space: nowrap;
            height: 20%;
            width: 100%;
            position: relative;
            top: 0.9375rem;
            @include clearfix;
        }
    }
    bi-indextraffic {
        td {
            padding: 0;
            margin: 0;
        }
    } //定义统计图标题
    @mixin bi-traffictatistic-title($deg) {
        position: relative;
        height: 2.125rem;
        width: 100%;
        background-color: #4793d9;
        border: 0px #197793 solid;
        background: linear-gradient($deg, transparent 24.5px, #4793d9 0);
        color: white;
        font-size: 0.75rem;
        text-align: center;
        display: inline-block;
        line-height: 2.125rem;
    }
    .bi {
        &-trafficstatistics {
            border: 1px #117f8e solid;
            width: 43.25%;
            height: calc(100%);
            font-size: 0.75rem;
        }
        &-trafficstatisticsleft {
            height: calc(100%);
             box-sizing: border-box;
            border: {
                right: 0px rgba(4, 255, 255, 0.14) solid;
                top: 0px rgba(4, 255, 255, 0.14) solid;
                bottom: 0px rgba(4, 255, 255, 0.14) solid;
                left: 0px rgba(4, 255, 255, 0.14) solid;
            }
        }
        &-trafficstatisticsright {
            overflow: hidden;
            border: {
                right: 0px rgba(4, 255, 255, 0.14) solid;
                top: 0px rgba(4, 255, 255, 0.14) solid;
                bottom: 0px rgba(4, 255, 255, 0.14) solid;
                left: 0px rgba(4, 255, 255, 0.14) solid;
            }
        }
        &-traffictablebg {
            position: absolute;
            @include bi-traffictatistic-title(135deg); // background-color: #4693d9;
            height: 2.125rem;
            width: 43.6%;
            z-index: -1;
        }
        &-uitraffic {
            &-title {
                @include bi-traffictatistic-title(-135deg);
            }
            &-titleright {
                @include bi-traffictatistic-title(135deg);
                position: absolute; // background-color: #4693d9;
                height: 2.125rem;
                width: 44%;
            }
        }
        &-traficydzs {
            position: relative;
            width: 12.8%;
            height: calc(100% - 1.25rem);
            border: 0px blue solid;
            overflow: visible;
        }
        &-traffictableright {
            float: right;
            text-align: center;
            width: 80%;
            height: 100%;
            td:nth-child(1) {
                width: 35%;
                text-align: left;
            }
            td:nth-child(2) {
                width: 35%;
            }
            td:nth-child(3) {
                width: 30%;
            }
        }
        &-traffictableleft {
            float: left;
            width: 100%;
            height: 100%;
        }
        &-traffictabletitle {
            //background-color: #4693d9;
            color: white;
            height: 2.125rem;
            white-space:nowrap;
        }
    }
    .trafficmiddle {
        width: 100%;
        height: 100%;
    }
    .bi {
        &-traffictable-charts {
            height: 100%;
            background-color: red;
            width: 82%;
        }
    }
    @mixin bi-trafficborderradius($left, $top, $border-radius, $width, $height) {
        display: inline-block;
        position: relative;
        left: $left;
        top: $top;
        border-radius: $border-radius;
        width: $width;
        height: $height;
        border: 4px #4bd9ff solid;
    }
    $traffic-radius1: 7.5rem;
    $traffic-radius2: 7.5rem;
    .bi-trafficborderradius1 {
        position: absolute;
        width: 7.5rem;
        height: 7.5rem;
        @include bi-trafficborderradius(-1.375rem, 0px, $traffic-radius1, $traffic-radius2, $traffic-radius2);
    }
    .bi-trafficborderradius2 {
        position: absolute;
        @include bi-trafficborderradius(0.6875rem, 0.6875rem, 5.625rem, 5.625rem, 5.625rem);
        text-align: center;
        border: 4px #4bd9ff solid;
    }
    .bi-traffic-font {
        color: #fe9856;
        font-size: 1.125rem;
    }
    @mixin bi-trafficradius($left, $transform) {
        position: absolute;
        left: -2.75rem;
        top: 1.4375rem;
        display: none;
        width: 10.5625rem;
        height: 10.5625rem;
        clip: rect(0px, 2.8125rem, 12.5rem, 0px);
        /* 这个clip属性用来绘制半圆，在clip的rect范围内的内容显示出来，使用clip属性，元素必须是absolute的 */
        border-radius: 6.25rem;
        border: 1px #197793 solid;
        transform: rotate($transform);
    }
    .bi-trafficradius {
        @include bi-trafficradius(15.5rem, 0deg);
    }
    .bi-trafficradiusright {
        @include bi-trafficradius(-11.375rem, 180deg);
        left: -2.5rem;
    }
    .echarts-population-trend {
        width: 100%;
        height: 100%;
    }
    .echarts-population-trend2 {
        width: 140%;
        height: calc(100% - 1.25rem);
        left: -10%;
        position: relative;
    }
</style>

<template>
    <div class="indextraffic">
        <table class="bi-indextraffic bi-indextrafficbarcount">
            <tr>
                <td>
                    交通事故数
                </td>
                <td>
                    <img class="imgmiddle" src="../../imgs/_brackets.png" alt="">
                </td>
                <td>
                    <span class="bi-indextraffic-num">
                        <bi-index-count v-bind:initcounter="229"></bi-index-count>
                    </span>
                </td>
                <td>
                    <span class="bi-indextraffic-unit">件</span>
                </td>
                <td>
                    <img src="../../imgs/_brackets.png" class="imgmiddle imgmiddleright" alt="">
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>抓拍违章数</td>
                <td>
                    <img src="../../imgs/_brackets.png" class="imgmiddle" alt="">
                </td>
                <td>
                    <span class="bi-indextraffic-num">          
                        <bi-index-count v-bind:initcounter="147"></bi-index-count>
                    </span>
                </td>
                <td>
                    <span class="bi-indextraffic-unit">件</span>
                </td>
                <td>
                    <img src="../../imgs/_brackets.png" class="imgmiddle imgmiddleright" alt="">
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>施工工地数</td>
                <td><img src="../../imgs/_brackets.png" class="imgmiddle" alt=""></td>
                <td><span class="bi-indextraffic-num">
                                                <bi-index-count v-bind:initcounter="36"></bi-index-count>
                                            </span></td>
                <td><span class="bi-indextraffic-unit">个</span></td>
                <td><img src="../../imgs/_brackets.png" class="imgmiddle imgmiddleright" alt=""></td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>停车场占比</td>
                <td><img src="../../imgs/_brackets.png" class="imgmiddle" alt=""></td>
                <td>
                    <span class="bi-indextraffic-num">
                                               <bi-index-count :initcounter="76.4" type="per" v-bind:minPerc="70" v-bind:maxPerc="80"></bi-index-count>
                                           </span>
                </td>
                <td><span class="bi-indextraffic-unit">%</span></td>
                <td><img src="../../imgs/_brackets.png" class="imgmiddle imgmiddleright" alt=""> </td>
                
            </tr>
        </table>
        <ul class="bi-indextraffic bi-indextrafficBorder">
            <li class="bi-trafficstatistics bi-trafficstatisticsleft">
                <table class="bi-traffictableleft">
                    <tr class="bi-traffictabletitle">
                        <td class=" bi-uitraffic-title">高峰时段车速</td>
                    </tr>
                    <tr rowspan="3">
                        <td colspan="3" >
                            <div ref="eharts" class="echarts-population-trend"></div>
                        </td>
                    </tr>
                </table>
            </li>
            <li class="bi-trafficstatistics bi-traficydzs">
                <table class="trafficmiddle">
                    <tr class="bi-traffictabletitle">
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <div class="bi-trafficradius">
                            </div>
                            <div ref="eharts2" class="echarts-population-trend2"></div>
                            <div class="bi-trafficradiusright">
                            </div>
                        </td>
                    </tr>
                </table>
            </li>
            <li class="bi-trafficstatistics bi-trafficstatisticsright">
                <div class=" bi-uitraffic-titleright bi-traffictablebg">
                </div>
                <table class="bi-traffictableright">
                    <tr>
                        <td class="bi-traffictabletitle">区域名</td>
                        <td class="bi-traffictabletitle">拥堵延时指数</td>
                        <td class="bi-traffictabletitle">平均车速</td>
                    </tr>
                    <tr>
                        <td>青年路<br>从青年路到机场路</td>
                        <td>2.7</td>
                        <td>16.9</td>
                    </tr>
                    <tr>
                        <td>珞狮路<br>从文治街到珞狮路立交桥</td>
                        <td>3.7</td>
                        <td>27.8</td>
                    </tr>
                    <tr>
                        <td>中北路<br>由南向北</td>
                        <td>3.7</td>
                        <td>27.8</td>
                    </tr>
                </table>
            </li>
        </ul>
    </div>
</template>
<script>
    import {utils} from '../../common/js/utils'
    import biIndexCount from './bi-index-count.vue'
    export default {
        name: "indextraffic",
        data: function() {
            return {
                charts2Animate: { //myCharts2动画
                    chartsCount: 81,
                    maxPerc: 90,
                    minPerc: 80,
                    docHeiht: null,
                    msec: 3000
                },
                myChart: null,
                myCharts2: null
            }
        },
        mounted: function() {
            this.$nextTick(() => {
                const echartsScaleFactor = utils.getEchartsScaleFactor(); 
                this.docHeiht = $(document).height();
                var dom = this.$refs.eharts;
                var myChart = this.myChart;
                myChart = echarts.init(dom); //全局的echarts对象
                // 指定图表的配置项和数据
                var option = {
                    grid: {
                        top: '21%',
                        right: '17%',
                        left: '10%',
                        bottom: '17%'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#ddd'
                            }
                        },
                        padding: [5, 10],
                        textStyle: {
                            color: '#7588E4',
                        },
                        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                        boundaryGap: false,
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 13
                            }
                        }
                    }],
                    yAxis: [{
                        name: 'km/h',
                        type: 'value',
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 13
                            }
                        }
                    }],
                    series: [{
                        name: '车速',
                        type: 'line',
                        smooth: true,
                        showSymbol: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        data: ['21', '19', '22', '25', '30', '39', '36'],
                        areaStyle: {
                            normal: {
                                color: '#1e849d'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#53eaf1'
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 0
                            }
                        }
                    }]
                };
                utils.adjustEcharts(option,echartsScaleFactor);
                // 使用刚指定的配置项和数据显示图表。
                myChart && myChart.setOption(option);
                var dom2 = this.$refs.eharts2;
                this.myCharts2 = echarts.init(dom2); //全局的echarts对象
                this.setEcharts2Interval();
                // 使用刚指定的配置项和数据显示图表。
                $(window).resize(() => {
                    this.docHeiht = $(document).height();
                    myChart.resize();
                    this.myCharts2.resize();
                })
            });
        },
        methods: {
            setEcharts2Interval: function() {
                let directives = true;
                let charts2Animate = this.charts2Animate;
                if (charts2Animate.chartsCount >= charts2Animate.maxPerc) {
                    directives = false;
                }
                if (charts2Animate.chartsCount <= charts2Animate.minPerc) {
                    directives = true;
                }
                //保留小数点后一位
                if (!directives) {
                    charts2Animate.chartsCount = charts2Animate.chartsCount - 1;
                } else if (directives) {
                    charts2Animate.chartsCount = charts2Animate.chartsCount + 1;
                }
                let option = this._echarts2Option(charts2Animate.chartsCount);
                
                this.myCharts2 && this.myCharts2.setOption(option);
                setInterval(() => {
                    if (charts2Animate.chartsCount >= charts2Animate.maxPerc) {
                        directives = false;
                    }
                    if (charts2Animate.chartsCount <= charts2Animate.minPerc) {
                        directives = true;
                    }
                    //保留小数点后一位
                    if (!directives) {
                        charts2Animate.chartsCount = charts2Animate.chartsCount - 1;
                    } else if (directives) {
                        charts2Animate.chartsCount = charts2Animate.chartsCount + 1;
                    }
                    let option = this._echarts2Option(charts2Animate.chartsCount);
                    this.myCharts2 && this.myCharts2.setOption(option);
                }, charts2Animate.msec);
            },
            _echarts2Option: function(perc) {
                var option = {
                    series: [{
                        itemStyle: {
                            normal: {
                                color: '#d6e01c'
                            },
                            emphasis: {
                                color: '#edf52e'
                            }
                        },
                        name: '事务处置',
                        type: 'pie',
                        radius: ['90%', '100%'],
                        areaStyle: {
                            normal: {
                                color: '#fbf141'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#fbf141'
                            }
                        },
                        label: {
                            normal: {
                                position: 'center',
                                color: '#fbf141',
                            }
                        },
                        data: [{
                            value: 11,
                            label: {
                                normal: {
                                    formatter: perc + '%\n处置率',
                                    textStyle: {
                                        color: '#fbf141',
                                        fontSize: this.docHeiht >= 760 ? 20 : 15
                                    }
                                }
                            },
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color: '#1be5f1'
                                },
                                emphasis: {
                                    color: '#3deaf4'
                                }
                            },
                            hoverAnimation: false
                        }]
                    }, {
                        type: 'pie',
                        radius: ['70%', '80%'],
                        label: {
                            normal: {
                                position: 'center',
                            }
                        },
                        data: [{
                            value: 11,
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color: '#1be5f1'
                                },
                                emphasis: {
                                    color: '#3deaf4'
                                }
                            },
                            hoverAnimation: false
                        }]
                    }]
                };
                return option;
            }
        },
        components: {
            "bi-index-count": biIndexCount
        }
    }
</script>

