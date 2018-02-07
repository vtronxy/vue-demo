<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-region-event {
        @include echartSize;
    }
    .region-count {
        display: flex;
        justify-content: space-between;
    }
    ul.event-count {
        text-align: right;
    }
    ul.event-count>li {
        list-style: none;
        margin-bottom: 10px;
    }
    .result-num {
        font-size: 30px;
        font-weight: bold;
        color: #49D8FE;
    }
</style>

<template>
    <div class="container">
        <!-- indent类放在在公共echarts-container当中 -->
        <div class="adapt-to-echart indent">
            <div class="region-count">
                <ul class="event-count">
                    <li>今日案件上报</li>
                    <li> <span class="result-num" style="margin-right:5px">16</span>件</li>
                </ul>
                <ul class="event-count">
                    <li>应结案件情况</li>
                    <li><span class="result-num">3/<span style="color:white;margin-right:5px">6</span></span>人
                    </li>
                </ul>
            </div>
        </div>
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-region-event"></div>
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
                var scale = 1;
                var echartData = [{
                    value: 25,
                    name: '施工管理',
                }, {
                    value: 40,
                    name: '市容环境',
                }, {
                    value: 25,
                    name: '举报投诉',
                }, {
                    value: 10,
                    name: '宣传广告',
                }, {
                    value: 50,
                    name: '警民互助'
                }]
                var rich = {
                    yellow: {
                        color: "#ffffff",
                        fontSize: 30 * scale,
                        padding: [5, 4],
                        align: 'center'
                    },
                    total: {
                        color: "#ffc72b",
                        fontSize: 40 * scale,
                        align: 'center'
                    },
                    white: {
                        color: "#fff",
                        align: 'center',
                        fontSize: 14 * scale,
                        padding: [21, 0]
                    },
                    blue: {
                        color: '#49dff0',
                        fontSize: 16 * scale,
                        align: 'center'
                    },
                    hr: {
                        borderColor: '#0b5263',
                        width: '100%',
                        borderWidth: 1,
                        height: 0,
                    }
                }
                // 指定图表的配置项和数据
                const option = {
                    backgroundColor: 'rgba(5, 27, 64, .8)',
                    title: {
                        text: '总案件数量',
                        left: 'center',
                        top: '51%',
                        padding: [24, 0],
                        textStyle: {
                            color: '#fff',
                            fontSize: 12 * scale,
                            align: 'center'
                        }
                    },
                    legend: {
                        selectedMode: false,
                        formatter: function(name) {
                            var total = 0; //各科正确率总和
                            var averagePercent; //综合正确率
                            echartData.forEach(function(value, index, array) {
                                total += value.value;
                            });
                            return '{total|' + total + '}';
                        },
                        data: [echartData[0].name],
                        left: 'center',
                        top: 'center',
                        icon: 'none',
                        align: 'center',
                        textStyle: {
                            color: "#fff",
                            fontSize: 16 * scale,
                            rich: rich
                        },
                    },
                    series: [{
                        type: 'pie',
                        radius: ['26%', '40%'],
                        hoverAnimation: false,
                        color: ['#852b99', '#e64b37', '#1dbb9b', '#f0c301', '#3497db'],
                        label: {
                            normal: {
                                formatter: function(params, ticket, callback) {
                                    var total = 0; //考生总数量
                                    var percent = 0; //考生占比
                                    echartData.forEach(function(value, index, array) {
                                        total += value.value;
                                    });
                                    percent = ((params.value / total) * 100).toFixed(1);
                                    return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                                },
                                rich: rich
                            },
                        },
                        labelLine: {
                            normal: {
                                length: 55 * scale,
                                length2: 0,
                                lineStyle: {
                                    color: '#0b5263'
                                }
                            }
                        },
                        data: echartData
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
            });
        }
    }
</script>




