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
        mounted: function() { //挂载上DOM树后,使用
            this.$nextTick(function() {
                const echartsScaleFactor = utils.getEchartsScaleFactor();
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom);
                var _data = [{
                        name: "导游投诉",
                        value: 195
                    },
                    {
                        name: "农家乐商家投诉",
                        value: 195
                    },
                    {
                        name: "景区投诉",
                        value: 172
                    },
                    {
                        name: "其他投诉",
                        value: 117
                    },
                    {
                        name: "餐饮商家投诉",
                        value: 101
                    }
                ];
                var total = 0;
                _data.forEach(function(item) {
                    total += item.value
                })
                var option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    polar: {
                        center: ['50%', '50%'],
                        radius: "50%"
                    },
                    radiusAxis: {
                        type: "value",
                        axisLine: {
                            show: false
                        }
                    },
                    angleAxis: {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#559ebc"
                            }
                        }
                    },
                    color: ["#f7f336", "#82ebf7", "#efa399", "#eaae4f", "#81fc00"],
                    series: [{
                        name: '年度投诉分布',
                        type: 'pie',
                        radius: ['20%', '45%'],
                        data: _data,
                        label: {
                            normal: {
                                show: true,
                                color: "#fff",
                                align: "center",
                                formatter: ['{per|{d}%}', '{normal|{b}}'].join('\n'),
                                rich: {
                                    per: {
                                        color: "#f7f336",
                                        align: "center",
                                        fontWeight: "bold",
                                        fontSize: 12
                                    },
                                    normal: {
                                        color: "#fff",
                                        fontSize: 12
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: "#559ebc"
                                },
                                smooth: 0.1,
                                length: 15,
                                length2: 15 //折线的长度
                            }
            
                        },
                    }]
                };
                if (echartsScaleFactor > 1) { //针对大屏的样式调整
                    option['polar']['radius'] = '75%';
                    option['series'][0]['radius'] = ['30%', '60%']; //圆环的半径
                    option['series'][0]['label']['normal']['rich']['per']['fontSize'] = 20;
                    option['series'][0]['label']['normal']['rich']['normal']['fontSize'] = 14;
                    option['series'][0]['labelLine']['normal']['length2'] = 35;
                }
                this.myChart.setOption(option); //设置图表的参数
            })
        }
    }
</script>

