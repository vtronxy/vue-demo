<style lang="scss" scoped>
    $containerHeight:100%;
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-map-tips {
        @include echartSize(100%, 90%);
    }
    .title {
        color: #03ffff;
        text-align: center;
        padding-top: 3%;
        font-weight: bolder;
        font-size: 0.75rem;
    }
</style>

<template>
    <div class="container">
        <!-- 季度事件汇聚的echarts图标 -->
        <div class="title">{{chooseCityName}}</div>
        <div ref="echarts" class="echarts-map-tips"></div>
    </div>
</template>

<script>
    import {
        EventBus,utils
    } from '../../common/js/utils'
    import _ from 'lodash'
    export default {
        data: function() {
            return {
                myChart: null,
                chooseCityName: '新洲区',
            }
        },
        mounted: function() {
            this.$nextTick(() => {
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom); //全局的echarts对象
                let echartData = [{
                    value: 6,
                    name: '弃土治理',
                    itemStyle: {
                        normal: {
                            color: '#0CFF00'
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, .5)'
                                },
                                smooth: 0.1,
                                length: 5,
                                length2: 10 //折线的长度
                            }
                        }
                    }
                }, {
                    value: 4,
                    name: '工地治理',
                    itemStyle: {
                        normal: {
                            color: '#1BBC9A'
                        }
                    },
                    label: {
                        normal: {
                            fontSize: 11
                        }
                    },
                }, {
                    value: 4,
                    name: '路面清洗',
                    itemStyle: {
                        normal: {
                            color: '#E84B3D'
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, .5)'
                            },
                            smooth: 0.1,
                            length: 15,
                            length2: 15 //折线的长度
                        }
                    }
                }, {
                    value: 4,
                    name: '空气质量',
                    itemStyle: {
                        normal: {
                            color: '#5ACDE6'
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, .5)'
                            },
                            smooth: 0.1,
                            length: 15,
                            length2: 15 //折线的长度
                        }
                    }
                }, {
                    value: 4,
                    name: '餐厨垃圾',
                    itemStyle: {
                        normal: {
                            color: '#7AD82E'
                        }
                    },
                    label: {
                        normal: {
                            fontSize: 11
                        }
                    },
                }, {
                    value: 2,
                    name: '油烟噪音',
                    itemStyle: {
                        normal: {
                            color: '#FF6600'
                        }
                    },
                    label: {
                        normal: {
                            fontSize: 10
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, .5)'
                            },
                            smooth: 0.1,
                            length: 5,
                            length2: 10 //折线的长度
                        }
                    }
                }, {
                    value: 2,
                    name: '环卫车辆治理',
                    itemStyle: {
                        normal: {
                            color: '#F2E622',
                        }
                    },
                    label: {
                        normal: {
                            fontSize: 9
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, .5)'
                            },
                            smooth: 0.1,
                            length: 5,
                            length2: 10 //折线的长度
                        }
                    }
                }, {
                    value: 1,
                    name: '生态补偿金',
                    itemStyle: {
                        normal: {
                            color: '#49D9FE'
                        }
                    },
                    label: {
                        fontSize: 10
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, .5)'
                            },
                            smooth: 0.1,
                            length: 5,
                            length2: 10 //折线的长度
                        }
                    }
                }];
                this.echartData = echartData;
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow',
                        },
                        formatter: "{b}:{c}({d}%)"
                    },
                    title: {
                        x: 'center',
                    },
                    series: [{
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
                        avoidLabelOverlap: true,
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, .5)'
                                },
                                smooth: 0.1,
                                length: 5,
                                length2: 10 //折线的长度
                            }
                        },
                        data: echartData,
                    }],
                    //每一个条目的样式
                    itemStyle: {
                        emphasis: {
                            barBorderWidth: 1,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    }
                };
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
                EventBus.$on('update-map-tip', (data) => {
                    this.chooseCityName = data.city;
                    let newEchartData = _.shuffle(this.echartData);
                    let newOptions = {
                        series: [{
                            data: newEchartData
                        }]
                    }
                    this.myChart.setOption(newOptions);
                })
            });
        }
    }
</script>




