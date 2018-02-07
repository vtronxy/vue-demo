<style lang="scss" scoped>
    @import "../../sass/base";
    .bi {
        &-citymanagercontainer {
            width: 100%;
            height: 100%;
        }
        &-indexcitymanage {
            @include clearfix;
            position: relative;
            top: 0.625rem;
            height: 40%;
            font-size: 1.125rem;
            width: 100%;
            text-align: center;
            color: white;
            tr:nth-child(2) {
                font-size: 1rem;
                vertical-align: top;
            }
            &-zkh {
                color: #96feff;
                font-size:1.75rem;
                font-weight: 100;
            }
            &-offset {
                text-align: right;
            }
            &-num {
                font-size:1.8rem;
                font-family: "Microsoft YaHei Bold";
                color: #99ffff;
                font-weight: bold;
                padding-right: 1.0625rem;
            }
            &-unit {
                font-size: 0.75rem;
            }
        }
        &-indextrafficbarcount {
            height: 20%;
            width: 100%;
            @include clearfix;
        }
    }
    .wh {
        width: 100%;
        height: 100%;
    }
    .fcolor {
        color: #99ffff;
        font-size: 1.125rem;
    }
    .panel-wrapper {
        position: relative;
        margin: auto 0;
        width: 100%;
        height: 60%;
        box-sizing: border-box;
        font-size: 0.75rem;
        color: #fff;
        td {
            vertical-align: top;
        }
    }
    .cgecharts {
        width: 83%;
        height: 33%;
    }
    /* echart图标的宽高 */
    .echarts-population-trend {
        height: 140%;
        width: 100%;
    }
    #guanli {
        font-size: 0.75rem;
        color: #ffffff;
    }
    #huanbi1 {
    
        color: #fbf241;
    }
    #jianzhu {
        font-size: 0.75rem;
        color: #ffffff;
    }
    #huanbi2 {
        color: #48fa94;
    }
    #zhandao {
        font-size: 0.75rem;
        color: #ffffff;
    }
    #huanbi3 {
        color: #f38034;
    }
    .p1 {
        z-index: 10;
        top: 37%;
        left: 0.625rem;
    }
    .p11 {
        position: absolute;
        z-index: 10;
        right: 4.125rem;
        top: 37%;
    }
    .p2 {
        position: absolute;
        z-index: 10;
        top: 60%;
        left: 0.625rem;
        color: #ffffff;
    }
    .p22 {
        position: absolute;
        z-index: 10;
        left: 215%;
    }
    .p3 {
        position: absolute;
        z-index: 10;
        top: 83%;
        left: 0.625rem;
        color: #ffffff;
    }
    .p33 {
        position: absolute;
        z-index: 10;
        left: 215%;
    }
</style>
<template>
    <div class="bi-citymanagercontainer">
        <table class="bi-indexcitymanage">
            <tr>
                <td class=""></td>
                <td class=""></td>
                <td class=""></td>
            </tr>
            <tr>
                <td class=""></td>
                <td class=""></td>
                <td class=""></td>
            </tr>
            <tr>
                <td>
                    <span class="bi-indexcitymanage-zkh">
                                <img class="imgmiddle" src="../../imgs/_brackets.png" alt="">
                            </span>
                    <span class="fcolor">                
                                <bi-index-count v-bind:initcounter="27669"></bi-index-count>
                            </span>
                    <span class="bi-indexcitymanage-zkh">
                                <img class="imgmiddle imgmiddleright" src="../../imgs/_brackets.png" alt="">
                            </span>
                </td>
                <td>
                    <span class="bi-indexcitymanage-zkh">
                                <img class="imgmiddle" src="../../imgs/_brackets.png" alt="">
                            </span>
                    <span class="fcolor">
                                <bi-index-count v-bind:initcounter="336"></bi-index-count>
                            </span>
                    <span class="bi-indexcitymanage-zkh">
                                <img class="imgmiddle imgmiddleright" src="../../imgs/_brackets.png" alt="">
                            </span>
                </td>
                <td>
                    <span class="bi-indexcitymanage-zkh">
                                <img class="imgmiddle" src="../../imgs/_brackets.png" alt="">
                            </span>
                    <span class="fcolor">
                                <bi-index-count :initcounter="96.5" type="per"></bi-index-count>%
                                
                            </span>
                    <span class="bi-indexcitymanage-zkh">
                                <img class="imgmiddle imgmiddleright" src="../../imgs/_brackets.png" alt="">
                            </span>
                </td>
            </tr>
            <tr>
                <td class="">受理总数</td>
                <td class="">今日受理数</td>
                <td class="">今日办结率</td>
            </tr>
            <tr>
                <td class=""></td>
                <td class=""></td>
                <td class=""></td>
            </tr>
            <tr>
                <td class=""></td>
                <td class=""></td>
                <td class=""></td>
            </tr>
        </table>
        <!-- 季度事件汇聚的echarts图标 -->
        <table class="panel-wrapper">
            <tr>
                <td class="cgecharts">
                    <table class="wh">
                        <tr>
                            <td colspan="2">
                                <div ref="citymanageecharts" class="echarts-population-trend"></div>
                            </td>
                        </tr>
                        <tr>
                            <td class="" style="padding-left: 20px;">施工占道</td>
                            <td class="" style="text-align: right;">(59%)658</td>
                        </tr>
                    </table>
                </td>
                <td><i class="fa fa-arrow-up" id="huanbi1"></i></td>
                <td>
                    <div id="guanli">环比</br>12%</div>
                </td>
            </tr>
            <tr>
                <td class="cgecharts">
                    <table class="wh">
                        <tr>
                            <td colspan="2">
                                <div ref="citymanageecharts2" class="echarts-population-trend"></div>
                            </td>
                        </tr>
                        <tr>
                            <td class="" style="padding-left: 20px;">建筑物外立面不洁</td>
                            <td class="" style="text-align: right;">(28%)319</td>
                        </tr>
                    </table>
                </td>
                <td><i class="fa fa-arrow-down" id="huanbi2"></i></td>
                <td>
                    <div id="jianzhu">环比</br>26%</div>
                </td>
            </tr>
            <tr>
                <td class="cgecharts">
                    <table class="wh">
                        <tr>
                            <td colspan="2">
                                <div ref="citymanageecharts3" class="echarts-population-trend"></div>
                            </td>
                        </tr>
                        <tr>
                            <td class="" style="padding-left: 20px;">其他施工管理问题</td>
                            <td class="" style="text-align: right;">(13%)298</td>
                        </tr>
                    </table>
                </td>
                <td><i class="fa fa-arrow-down" id="huanbi3"></i></td>
                <td>
                    <div id="zhandao">环比</br>32%</div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    import biIndexCount from './bi-index-count.vue'
    export default {
        name: "indexcitymanage",
        data: function() {
            return {
                myCharts: null,
                myCharts2: null,
                myCharts3: null
            }
        },
        methods: {
            getEcharts: function(myCharts, dom, data) {
                var myCharts = echarts.init(dom); //全局的echarts对象
                var myChart = myCharts;
                // 指定图表的配置项和数据
                var _should = [data[0]]; //2292,1139,1115
                var _actual = [data[1]]; //298,319,658
                var deemph_colors = new Array();
                for (var i = 0; i < 3; i++) {
                    if (_actual[i] < 300) {
                        deemph_colors[i] = '#f38034'
                    } else if (_actual[i] > 500) {
                        deemph_colors[i] = '#fbf241'
                    } else {
                        deemph_colors[i] = '#48fa94'
                    }
                }
                var option = {
                    grid: {
                        left: '-40px',
                        right: '0.625rem',
                        //  bottom: '0px',
                        //   top: -1,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function(data) {
                            var _str = "";
                            _str += "总数： " + _actual[data[0].dataIndex] + " 件<br>";
                            _str += "比例： " + (_actual[data[0].dataIndex] * 100 / _should[data[0].dataIndex]).toFixed(2) + " %";
                            return _str;
                        }
                    },
                    xAxis: {
                        type: 'value',
                        show: false,
                        max: 100,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                show: false,
                                color: '#FFFFFF'
                            }
                        },
                        axisTick: {
                            show: false,
                        },
                        data: ['占道经营'],
                        show: false,
                    },
                    series: [{
                        type: 'bar',
                        barWidth: '140%',
                        barGap: '-10%',
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                offset: [-60, 20],
                                textStyle: {
                                    color: '#fff'
                                },
                                formatter: function(param) {
                                    return "(59%)658 ";
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#cccdcc'
                            }
                        },
                        data: [100] //, 100, 100
                    }, {
                        type: 'bar',
                        barWidth: '140%',
                        barGap: '-100%',
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                },
                                offset: [20, 0],
                                position: 'left',
                                formatter: function(param) {
                                    if (param.data == 13) {
                                        return "施工占道              "
                                    } else if (param.data == 28) {
                                        return "建筑物外立面不洁"
                                    } else {
                                        return "其他施工管理问题";
                                    }
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorlist = [deemph_colors[0], deemph_colors[1], deemph_colors[2]];
                                    return colorlist[params.dataIndex];
                                }
                            }
                        },
                        data: _actual.map((item, index) => {
                            return parseInt(item / _should[index] * 100)
                        })
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart && myChart.setOption(option);
            }
        },
        mounted: function() {
            this.$nextTick(() => {
                var dom = this.$refs.citymanageecharts;
            
                this.getEcharts(this.myCharts, dom, [1115, 658]);
                var dom2 = this.$refs.citymanageecharts2;
                this.getEcharts(this.myCharts2, dom2, [1139, 319]);
                var dom3 = this.$refs.citymanageecharts3;
                this.getEcharts(this.myCharts3, dom3, [2292, 298]);
            });
        },
        components: {
            "bi-index-count": biIndexCount
        }
    }
</script>

