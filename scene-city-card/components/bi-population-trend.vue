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
    import {
        utils
    } from '../../common/js/utils'
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
                const echartsScaleFactor = utils.getEchartsScaleFactor();  
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
                        itemGap: 40 *echartsScaleFactor,
                        itemHeight: 10 *echartsScaleFactor,
                    },
                    grid: {
                        top: '15%',
                        left: '1%',
                        right: '2%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 0, // {number} 
                            rotate: 40,
                            fontSize: 10
                        },
                    }],
                    yAxis: [{
                            type: 'value',
                            min: 0,
                            max: 880,
                            interval: 150,
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#FFFFFF',
                                }
                            },
                            axisLabel:{}
                        },
                        {
                            type: 'value',
                            min: 0.0,
                            max: 3.0,
                            interval: 0.5,
                            axisLabel: {
                                formatter: '{value}%'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#FFFFFF',
                                }
                            }
                        }
                    ],
                     series: [
                        {
                        name: '总人口(万人)',
                        type: 'bar',
                        yAxisIndex:0,
                        barWidth: 10 *echartsScaleFactor,
                        //barGap: '10%',
                        data: [820, 825, 830, 833, 834, 836, 838, 840, 859, 868, 870, 878],
                    }, 
                    {
                        name: '总人口增长率(%)',
                        type: 'line',
                        symbolSize:4 * echartsScaleFactor,
                        yAxisIndex: 1,
                        data: [2.35, 1.1, 0.8, 0.4, 0.3, 0.2, 0.2, 0.4, 0.5, 1.1, 2.6, 3.0],
                        itemStyle: {
                            normal: {
                                color: "#64F9A8"
                            }
                        },
                        lineStyle:{
                            normal:{
                                width:3 * echartsScaleFactor
                            }
                        }
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
                utils.adjustEcharts(option,echartsScaleFactor);
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
            });
        }
    }
</script>




