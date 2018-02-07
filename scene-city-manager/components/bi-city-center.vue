<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-CBD {
        @include echartSize(100%, 92%);
    }
    .text-label {
        text-align: center;
        display: block;
        margin-bottom: .6em;
        color: #FFFFFF;
        font-size:0.75rem;
    }
</style>

<template>
    <div class="container">
        <div ref="echarts" class="echarts-CBD"></div>
        <span class="text-label">2017年中心城区综合管理评分</span>
    </div>
</template>

<script>
    import {utils} from '../../common/js/utils'
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
                var option = {
                    tooltip: {
                        show: true
                    },
                    legend: {
                        data: ['环保治理', '专项治理', '市容环境'],
                        itemGap: 20 * echartsScaleFactor,
                        textStyle: {
                            color: '#FFFFFF'
                        },
                        itemHeight: 10 * echartsScaleFactor,
                        padding: 10 * echartsScaleFactor
                    },
                    grid: {
                        top: '15%',
                        left: '1%',
                        right: '2%',
                        bottom: '1%',
                        containLabel: true
                    },
                    xAxis: [{
                        data: ["江岸区", "江汉区", "武昌区", "洪山区", "汉阳区", "硚口区", "青山区", "沌口区", "江夏区", "黄陂区"],
                        axisLabel: {
                            rotate: 35,
                            fontSize: 10 
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        }
                    }],
                    yAxis: [{
                        splitLine: { //去掉分割线
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        },
                        axisLabel:{}
                    }],
                    series: [{
                        name: '环保治理',
                        type: 'bar',
                        stack: 'one',
                        data: [24, 23, 22, 22, 23, 25, 25, 26, 24, 23],
                        itemStyle: {
                            normal: {
                                color: "#ff6600"
                            }
                        },
                        barWidth: 15 * echartsScaleFactor,
                    }, {
                        name: '专项治理',
                        type: 'bar',
                        stack: 'one',
                        data: [26, 27, 30, 30, 10, 30, 25, 25, 18, 22],
                        itemStyle: {
                            normal: {
                                color: "#7ad82e"
                            }
                        },
                    }, {
                        name: '市容环境',
                        type: 'bar',
                        stack: 'one',
                        data: [11, 8, 7, 7, 12, 9, 7, 11, 13, 15],
                        itemStyle: {
                            normal: {
                                color: "#5acde6"
                            }
                        },
                    }],
                    //每一个条目的样式
                    itemStyle: {
                        emphasis: {
                            barBorderWidth: 1 * echartsScaleFactor,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    }
                };
                utils.adjustEcharts(option,echartsScaleFactor);
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
            }, 300);
        }
    }
</script>




