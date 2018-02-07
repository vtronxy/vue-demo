<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    /* 整个容器的大小 */
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-population-distribute {
        @include echartSize(100%, 93%);
    }
    .footer-label {
        text-align: center;
        font-size: 0.75rem;
    }
</style>

<template>
    <div class="container">
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-population-distribute"></div>
        <p class="footer-label">武汉市2016年分区总人口分布图</p>
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
                const echartsScaleFactor = utils.getEchartsScaleFactor();
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
                        itemHeight: 10 * echartsScaleFactor,
                        padding: 5 * echartsScaleFactor,
                    },
                    grid: {
                        top: '10%',
                        left: '1%',
                        right: '2%',
                        bottom: 0,
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ["武昌区", "江岸区", "江汉区", "硚口区", "汉阳区", "青山区", "东西湖区", "洪山区", "蔡甸区", "江夏区", "黄陂区", "新洲区"],
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 0, // {number} 
                            rotate: 35,
                            fontSize: 10
                        },
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
                        },
                        axisLabel: {
                            color: "#fff",
                            fontSize: 10 * echartsScaleFactor
                        }
                    }, ],
                    series: [{
                        name: '总人口（万人）',
                        type: 'bar',
                        data: [112, 68, 48, 52, 60, 46, 30, 95, 46, 68, 118, 110],
                        barWidth: 10 * echartsScaleFactor,
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
                // if (echartsScaleFactor > 1) {
                //     option['xAxis'][0]['axisLabel']['fontSize'] = 15;
                // }
                utils.adjustEcharts(option,echartsScaleFactor);
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
            });
        }
    }
</script>




