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
    import {utils} from '../../common/js/utils'
    export default {
        data: function() {
            return {
                myChart: null
            }
        },
        mounted: function() {
            this.$nextTick(() => {
                const echartsScaleFactor = utils.getEchartsScaleFactor(); //拿到echarts的缩放因子
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
                        itemGap: 20 * echartsScaleFactor,
                        itemHeight: 10 * echartsScaleFactor,
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
                        data: ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 0, // {number} 
                            fontSize: 10 * echartsScaleFactor
                        },
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
                        },
                        axisLabel:{
                            show: true,
                            fontSize: 10 * echartsScaleFactor
                        }
                    }],

                    series: [{
                        name: '人口非农化率',
                        type: 'line',
                        data: [56, 57, 57.3, 57.5, 58, 58.1, 58.2, 58.07],
                        symbolSize:4 * echartsScaleFactor,
                        lineStyle:{
                            normal:{
                                width:3 * echartsScaleFactor
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#e2eb50',
                            },
                        }
                    }, {
                        name: '人口城镇化率',
                        type: 'line',
                        data: [53, 54, 53.7, 55, 56.4, 56.7, 57.3, 57.8],
                        symbolSize:4 * echartsScaleFactor,
                        itemStyle: {
                            normal: {
                                color: '#64F9AB',
                            },
                        },
                        lineStyle:{
                            normal:{
                                width:3 * echartsScaleFactor
                            }
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
                if(echartsScaleFactor > 1){
                    option['legend']['textStyle']['fontSize'] = 9 * echartsScaleFactor;
                }
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
            });
        }
    }
</script>




