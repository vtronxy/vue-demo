<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-city-weather {
        @include echartSize(100%, 100%);
    }
    .temperature {
        display: block;
    }
    .relativeHumidity {
        display: none;
    }
    .precipitation {
        display: none;
    }
    .switchshow {
        position: absolute;
        top: 35px;
        left: 30px;
        ;
        width: 400px;
        height: 20px;
        color: #FFFFFF;
        font-size: 12px
    }
    .btn-group {
        position: absolute;
        top: 20px;
        right: 7px;
        z-index: 100;
        height: 30px;
        width: 220px;
        font-size: 14px;
       
    }
    .btn-default {
        color: #FFFFFF;
        background-color: #46bac8;
        border-color: #46bac8;
    }
    .btn-default:focus {
        color: #333;
        background-color: #66e2ee;
        border-color: #66e2ee
    }
    .btn-default:hover {
        color: #333;
        background-color: #66e2ee;
        border-color: #66e2ee
    }
</style>

<template>
    <div class="container">
        <div class="switchshow">
            <p class="temperature">最新整点实况气温：19℃&nbsp;&nbsp;&nbsp;<span style="color: #FAF340">最高24℃&nbsp;&nbsp;最低8℃</span></p>
            <p class="relativeHumidity">最新整点实况相对湿度：71%&nbsp;&nbsp;&nbsp;<span style="color: #FAF340">最大相对湿度：102%</span></p>
            <p class="precipitation">武汉整点天气实况：19℃&nbsp;&nbsp;&nbsp;<span style="color: #FAF340">最近一小时降水量136.5mm</span></p>
        </div>
        <div class="btn-group">
            <button type="button" id="qiwen" class="btn btn-default" @click="qiwen">气温</button>
            <button type="button" class="btn btn-default" @click="shidu">相对湿度</button>
            <button type="button" class="btn btn-default" @click="jiangshuiliang">降水量</button>
        </div>
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-city-weather"></div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                myChart: null
            }
        },
        mounted: function() {
            this.$nextTick(() => {
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom); //全局的echarts对象
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        formatter: '{b}时<br/>{a}: {c}',
                        axisPointer: {
                            type: 'shadow',
                        }
                    },
                    legend: {
                        show: false,
                        itemGap: -20,
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: 14,
                            padding: 10,
                            backgroundColor: "#46BAC8",
                            borderRadius: 5,
                        },
                        selectedMode: "single",
                        left: "right",
                        data: [{
                                name: '气温',
                                icon: "none"
                            },
                            {
                                name: '相对湿度',
                                icon: "none"
                            },
                            {
                                name: '降水量',
                                icon: "none"
                            },
                        ],
                        selected: {
                            "气温": true,
                            "相对湿度": false,
                            "降水量": false,
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '5%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#FFFFFF'
                            }
                        },
                        axisTick: {
                            show: true
                        },
                        splitLine: {
                            show: true
                        },
                        axisLabel: {
                            color: "#FFFFFF"
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#FFFFFF'
                            }
                        },
                        splitLine: {
                            show: true
                        },
                        axisLabel: {
                            color: "#fff"
                        }
                    },
                    series: [{
                            name: '气温',
                            type: 'line',
                            lineStyle: {
                                normal: {
                                    color: "#FAF340",
                                    width: 1
                                }
                            },
                            itemStyle: {
                                normal: {
                                    width: 1,
                                    color: "#FAF340"
                                }
                            },
                            data: [21, 23, 22.5, 23.5, 24, 22, 16.5, 15, 14, 13, 12, 12, 11, 10.8, 10.6, 9.6, 9.6, 9.6, 8, 12, 16, 18.7, 19, 20, 21],
                        },
                        {
                            name: '相对湿度',
                            type: 'line',
                            data: [50, 50, 42, 41, 40, 40, 60, 80, 100, 100, 100, 102, 100, 102, 101, 100, 98, 98, 94, 93, 91, 84, 60, 50],
                            itemStyle: {
                                normal: {
                                    width: 1,
                                    color: "#a7c6f6"
                                }
                            },
                        },
                        {
                            name: '降水量',
                            type: 'line',
                            data: [40.5, 60, 98.5, 136.5, 163, 222, 186, 120.5, 80, 76.5, 53.5, 30, 40.5, 60, 98.5, 136.5, 163, 222, 186, 120.5, 80, 76.5, 53.5, 30, 40],
                            itemStyle: {
                                normal: {
                                    width: 1,
                                    color: "#64F9A8"
                                }
                            },
                        },
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
                chart.on("legendselectchanged", function(eve) {
                    if (eve.name == '相对湿度') {
                        $('.relativeHumidity').css('display', 'block');
                        $('.precipitation').css('display', 'none');
                        $('.temperature').css('display', 'none');
                    } else if (eve.name == '气温') {
                        $('.relativeHumidity').css('display', 'none');
                        $('.precipitation').css('display', 'none');
                        $('.temperature').css('display', 'block');
                    } else if (eve.name == '降水量') {
                        $('.relativeHumidity').css('display', 'none');
                        $('.precipitation').css('display', 'block');
                        $('.temperature').css('display', 'none');
                    }
                });
            });
        },
        methods: {
            shidu: function() {
                this.myChart.dispatchAction({
                    type: 'legendToggleSelect',
                    name: '相对湿度',
                    selected: true
                });
            },
            qiwen: function() {
                this.myChart.dispatchAction({
                    type: 'legendToggleSelect',
                    name: '气温',
                    selected: true
                });
            },
            jiangshuiliang: function() {
                this.myChart.dispatchAction({
                    type: 'legendToggleSelect',
                    name: '降水量',
                    selected: true
                });
            },
        }
    }
</script>




