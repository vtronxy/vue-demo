<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-city-environment {
        @include echartSize(100%, 100%);
    }
</style>

<template>
    <div class="container">
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-city-environment"></div>
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
                var myData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                var option = {
                    legend: {
                        data: ['2015年降水量', '2016年降水量'],
                        top: 4,
                        right: '20%',
                        textStyle: {
                            color: '#FFFFFF',
                        },
                    },
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        formatter: '{b}月<br/>{a}: {c}mm',
                        axisPointer: {
                            type: 'shadow',
                        }
                    },
                    grid: [{
                        show: false,
                        left: '4%',
                        top: 60,
                        bottom: 60,
                        containLabel: true,
                        width: '46%',
                    }, {
                        show: false,
                        left: '50.5%',
                        top: 80,
                        bottom: 60,
                        width: '0%',
                    }, {
                        show: false,
                        right: '4%',
                        top: 60,
                        bottom: 60,
                        containLabel: true,
                        width: '46%',
                    }, ],
                    xAxis: [{
                        type: 'value',
                        inverse: true,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        position: 'top',
                        //2015横向数值
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#FFFFFF',
                                fontSize: 12,
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    }, {
                        gridIndex: 1,
                        show: false,
                    }, {
                        gridIndex: 2,
                        type: 'value',
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        position: 'top',
                        //2016横向数值
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#FFFFFF',
                                fontSize: 12,
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    }, ],
                    yAxis: [{
                            type: 'category',
                            inverse: true,
                            position: 'right',
                            //2015年中间月份不显示
                            axisLabel: {
                                show: false,
                                textStyle: {
                                    color: '#FFFFFF',
                                    fontSize: 12,
                                },
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            data: myData,
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            inverse: true,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            //中间白色月份
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#FFFFFF',
                                    fontSize: 12,
                                },
                            },
                            data: myData.map(function(value) {
                                return {
                                    value: value,
                                    textStyle: {
                                        align: 'center',
                                    }
                                }
                            }),
                        }, {
                            gridIndex: 2,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            //2016年中间月份不显示
                            axisLabel: {
                                show: false,
                                textStyle: {
                                    color: '#FFFFFF',
                                    fontSize: 12,
                                },
                            },
                            data: myData,
                        },
                    ],
                    series: [{
                            name: '2015年降水量',
                            type: 'bar',
                            barGap: 20,
                            barWidth: 20,
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: true,
                                    position: 'left',
                                    offset: [0, 0],
                                    textStyle: {
                                        color: '#FFFFFF',
                                        fontSize: 14,
                                    },
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: '#FAF340',
                                },
                                emphasis: {
                                    color: '#e7f507',
                                },
                            },
                            data: [40.5, 60, 98.5, 136.5, 163, 222, 186, 120.5, 80, 76.5, 53.5, 30],
                        },
                        {
                            name: '2016年降水量',
                            type: 'bar',
                            barGap: 20,
                            barWidth: 20,
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: true,
                                    position: 'right',
                                    offset: [0, 0],
                                    textStyle: {
                                        color: '#FFFFFF',
                                        fontSize: 14,
                                    },
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: '#64F9AB',
                                },
                                emphasis: {
                                    color: '#06f780',
                                },
                            },
                            data: [42.5, 62, 99.5, 138.5, 165, 223, 185, 121.5, 83, 79.5, 51.5, 32],
                        }
                    ],
                };
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
            });
        }
    }
</script>




