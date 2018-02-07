<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-city-urbanization {
        @include echartSize(100%, 100%);
    }
</style>

<template>
    <div class="container">
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-city-urbanization"></div>
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
                        data: ['人口非农化率', '人口城镇化率'],
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
                        data: ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        }
                    }],
                    yAxis: [{
                        name: '(%)',
                        type: 'value',
                        min: 50,
                        max: 70,
                        interval: 5,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        }
                    }],
                    dataZoom: [{
                            type: 'slider',
                            show: true,
                            start: 0,
                            end: 100,
                            handleSize: 30
                        },
                        {
                            type: 'inside',
                            start: 94,
                            end: 100
                        },
                    ],
                    series: [{
                        name: '人口非农化率',
                        type: 'line',
                        data: [56, 57, 57.3, 57.5, 58, 58.1, 58.2, 58.07],
                        itemStyle: {
                            normal: {
                                color: '#e2eb50',
                            },
                        }
                    }, {
                        name: '人口城镇化率',
                        type: 'line',
                        data: [53, 54, 53.7, 55, 56.4, 56.7, 57.3, 57.8],
                        itemStyle: {
                            normal: {
                                color: '#64F9AB',
                            },
                        }
                    }],
                    //每一个条目的样式
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 100,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    },
                    //全局文字颜色
                    textStyle: {
                        color: '#ffffff'
                    }
                };
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
            });
        }
    }
</script>




