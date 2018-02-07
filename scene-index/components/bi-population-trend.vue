<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-population-trend {
        @include echartSize(100%, 100%);
    }
</style>

<template>
    <div class="container">
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-population-trend"></div>
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
                const option = {
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        }
                    },
                    legend: {
                        data: ['总人口(万人)', '总人口增长率(%)'],
                        textStyle: {
                            color: '#FFFFFF'
                        },
                        itemGap: 5
                    },
                    grid: {
                        top: '12%',
                        left: '1%',
                        right: '10%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        }
                    }],
                    yAxis: [{
                            type: 'value',
                            min: 700,
                            max: 880,
                            interval: 20,
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#FFFFFF',
                                }
                            }
                        },
                        {
                            type: 'value',
                            min: 0,
                            max: 3.0,
                            interval: 0.5,
                            axisLabel: {
                                formatter: '{value}.0%'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#FFFFFF',
                                }
                            }
                        }
                    ],
                    dataZoom: [{
                            type: 'slider',
                            show: true,
                            start: 0,
                            end: 40,
                            handleSize: 30,
                        },
                        {
                            type: 'inside',
                            start: 94,
                            end: 100
                        },
                    ],
                    series: [{
                        name: '总人口(万人)',
                        type: 'bar',
                        barWidth: 20,
                        barGap: '10%',
                        data: [820, 825, 830, 833, 834, 836, 838, 840, 859, 868, 870, 878],
                    }, {
                        name: '总人口增长率(%)',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.35, 1.1, 0.8, 0.4, 0.3, 0.2, 0.2, 0.4, 0.5, 1.1, 2.6, 3.0],
                        itemStyle: {
                            normal: {
                                color: "#64F9A8"
                            }
                        },
                    }],
                    //每一个条目的样式
                    itemStyle: {
                        normal: {
                            color: '#F9F440'
                        },
                        emphasis: {
                            shadowBlur: 100,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    },
                    //全局文字颜色
                    textStyle: {
                        color: 'rgb(255, 255, 255)'
                    }
                };
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
            });
        }
    }
</script>




