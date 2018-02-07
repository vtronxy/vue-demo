<style lang="scss" scoped>
    @import '../../sass/echarts-container';

    .container {
        width: calc(100% - 0.625rem);
        margin-top: 1.875rem;
        margin-left: 0.625rem;
        height: calc(100% - 1.875rem);
    }

    /* echart图标的宽高 */
    .echarts-population-trend {
        @include echartSize(100%, 75%);
    }

    .content_h30 {
        height: calc((100% - 2.625rem) * 0.3);
    }

    .fg_big14_light_yellow {
        font-size: 0.875rem;
        margin: 0 auto;
        color: #FBE927;
        height: 3.125rem;
    }

    .fg_big14_light_blue {
        font-size: 0.875rem;
         height: 3.125rem;
        margin: 0 auto;
        color: #4AF999;
    }

    .fg_big28_light_yellow {
        font-size: 1.875rem;
        overflow: hidden;
    }

    .fg_big28_light_blue {
        font-size: 1.875rem;
    }

    .content_h30 > div {
        width: 50%;
        float: left;
        height: 100%;
        align-items: center;
        display: flex;
        text-align: center;
    }
</style>
<template>
    <div class="container">
        <div class="content_h30">
            <div>
                <div class="fg_big14_light_yellow">平均拥堵指数
                    <div class="fg_big28_light_yellow" v-for="item in items">{{item.value}}</div>
                </div>
            </div>
            <div>
                <div class="fg_big14_light_blue">实时拥堵指数
                    <div class="fg_big28_light_blue" v-for="topic in topics">{{topic.value}}</div>
                </div>
            </div>
        </div>
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-population-trend"></div>
    </div>
</template>

<script>
    import {utils} from '../../common/js/utils'
    export default {
        props: [], //组件支持的属性
        data: function () { //响应式数据
            return {
                items: [{value: 5.7}],
                topics: [{value: 8}]
            }
        },
        methods: {
            dataUpdate1: function () {
                var _this = this;
                setInterval(function () {
                    _this.topics[0].value = Math.ceil(Math.random() * 10)
                }, 5000)
            }
        }, //方法中的 this指向 VM实例
        created: function () {
        },
        mounted: function () { //挂载上DOM树后
            this.$nextTick(() => {
                const echartsScaleFactor = utils.getEchartsScaleFactor();
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom); //全局的echarts对象
                // 指定图表的配置项和数据
                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        right: 30,
                        top: 30,
                        bottom: '20%',
                        left: 35
                    },
                    color: ['#ffcc00', '#99ffff'],
                    xAxis: [{
                        name: '时',
                        type: 'category',
                        nameGap:5,
                        boundaryGap: false,
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
                            '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
                        ],
                        axisLabel: {
                            textStyle: {
                                color: "rgba(255,255,255,1)"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "black"
                            }
                        },
                        nameTextStyle: {
                            color: "rgba(255,255,255,1)"
                        }
                    }],
                    yAxis: [{
                        name: '拥堵指数',
                        type: 'value',
                        axisLabel: {
                            textStyle: {
                                color: "rgba(255,255,255,1)"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "black"
                            }
                        },
                        nameTextStyle: {
                            color: "rgba(255,255,255,1)"
                        }

                    }],
                    series: [{
                        name: '平均拥堵指数',
                        type: 'line',
                        symbolSize: 10,
                        data: [2, 2.5, 2.5, 3, 3, 3, 9.5, 9, 9.5, 8.4, 8.5, 9.4,
                            8.5, 7.4, 7.2, 8.4, 9.5, 7, 4, 5, 4, 3, 3.5, 2
                        ],
                    }, {
                        name: '实际拥堵指数',
                        type: 'line',
                        symbolSize: 10,
                        data: [1, 1.5, 1.5, 2, 2, 3, 8.5, 8, 8.5, 7.4, 7.5, 8.4,
                            7.5, 6.4, 6.2, 7.4, 8.5, 6, 3, 4, 3, 2, 2.5, 1
                        ],
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                utils.adjustEcharts(option,echartsScaleFactor);
                chart && chart.setOption(option);
                this.dataUpdate1();
            });


        }
    }
</script>

