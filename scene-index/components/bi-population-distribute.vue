<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-population-distribute {
        @include echartSize(100%, 100%);
    }
</style>

<template>
    <div class="container">
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-population-distribute"></div>
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
                        data: ['总人口（万人）'],
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
                        data: ["武昌区", "江岸区", "江汉区", "硚口区", "汉阳区", "青山区", "东西湖区", "洪山区", "蔡甸区", "江夏区", "黄陂区", "新洲区"],
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        min: 0,
                        max: 120,
                        interval: 20,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        }
                    }, ],
                    dataZoom: [{
                            type: 'slider',
                            show: true,
                            start: 0,
                            end: 50,
                            handleSize: 30
                        },
                        {
                            type: 'inside',
                            start: 94,
                            end: 100
                        },
                    ],
                    series: [{
                        name: '总人口（万人）',
                        type: 'bar',
                        data: [112, 68, 48, 52, 60, 46, 30, 95, 46, 68, 118, 110],
                        barWidth: 20,
                        barGap: '10%',
                    }],
                    //每一个条目的样式
                    itemStyle: {
                        normal: {
                            color: '#63F9A8'
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




