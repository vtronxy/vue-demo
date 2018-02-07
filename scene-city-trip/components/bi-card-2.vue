<style lang="scss" scoped>
    .container {
        margin-top: 1.875rem;
        width: 100%;
        height: calc(100% - 1.875rem);
    }
</style>
<template>
    <div class="container" ref="echarts">
    </div>
</template>
<script>
    import {
        utils
    } from '../../common/js/utils'
    export default {
        props: [], //组件支持的属性
        data: function() { //响应式数据
            return {
                myChart: null
            }
        },
        methods: {}, //方法中的 this指向 VM实例
        created: function() {},
        mounted: function() { //挂载上DOM树后,使用
            this.$nextTick(function() {
                const echartsScaleFactor = utils.getEchartsScaleFactor();
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom);
                var _data = [{
                        value: 40,
                        name: 'APP预定'
                    },
                    {
                        value: 20,
                        name: '网站预定'
                    },
                    {
                        value: 25,
                        name: '电话预定'
                    },
                    {
                        value: 15,
                        name: '其他预定'
                    }
                ];
                var option = {
                    tooltip: {
                        trigger: "item"
                    },
                    polar: {
                        center: ['50%', '40%'],
                        radius: '54%'
                    },
                    legend: {
                        left: 'center',
                        bottom: 15,
                        data: _data.map(function(item) {
                            return {
                                name: item.name,
                                icon: "rect"
                            }
                        }),
                        itemWidth: 12 * echartsScaleFactor,
                        itemHeight: 12 * echartsScaleFactor,
                        itemGap: 5 * echartsScaleFactor,
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    radiusAxis: {
                        type: "value",
                        min: 0,
                        max: 40,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#6bbbdf",
                                opacity: 0.7
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    color: ["#43eef8", "#30ff30", "#faf340", "#ff9ebc"],
                    angleAxis: {
                        type: "value",
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#6bbbdf",
                                opacity: 0.7
                            }
                        },
                        splitLine: {
                            show: true
                        }
                    },
                    series: [{
                        name: '游客预定方式',
                        type: 'pie',
                        radius: [0, '55%'],
                        center: ['50%', '40%'],
                        roseType: 'radius',
                        label: {
                            normal: {
                                show: true,
                                color: "#f7f336",
                                formatter: '{d}%',
                                fontSize: 14 * echartsScaleFactor
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                lineStyle: {
                                    color: "#6bbbdf",
                                    opacity: 0.7
                                },
                                smooth: 0.1,
                                length: 10 *echartsScaleFactor,
                                length2: 20 *echartsScaleFactor//折线的长度
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: _data
                    }]
                }
                if (echartsScaleFactor > 1) {
                    //调整字体大小
                    option['polar']['radius'] = '75%';
                }
                this.myChart.setOption(option);
            })
        }
    }
</script>

