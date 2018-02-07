<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-region-event {
        @include echartSize(100%, 67%);
    }
    .region-count {
        display: flex;
        justify-content: space-between;
    }
    li{
        font-size:0.75rem;
    }
    ul.event-count {
        text-align: right;
    }
    ul.event-count>li:first-child {
        list-style: none;
        margin-top: 10px;
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
    import _ from 'lodash'
    import {utils} from '../../common/js/utils'
    export default {
        data: function() {
            return {
                myChart: null,
                echartData: null
            }
        },
        mounted: function() {
            this.$nextTick(() => {
                const echartsScaleFactor = utils.getEchartsScaleFactor(); 
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom); //全局的echarts对象
                // 指定图表的配置项和数据
                var scale = 0.5;
                var echartData = [{
                    value: 25,
                    name: '施工管理',
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, .5)'
                            },
                            smooth: 0.1,
                            length: 15,
                            length2: 0 //折线的长度
                        }
                    }
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
                        fontSize: 25 * scale,
                        padding: [3, 0]
                    },
                    blue: {
                        color: '#49dff0',
                        fontSize: 25 * scale,
                        align: 'center',
                        padding: [3, 0]
                    },
                    hr: {
                        borderColor: '#8792A4',
                        width: '100%',
                        borderWidth: 1,
                        height: 0,
                    }
                }
                this.echartData = echartData;
                // 指定图表的配置项和数据
                const option = {
                    grid: {
                        top: '5%',
                        left: '1%',
                        right: '2%',
                        bottom: '25%',
                        containLabel: true
                    },
                    series: [{
                        type: 'pie',
                        radius: ['45%', '70%'],
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
                                    // return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                                    return '{blue|' + percent + '%}\n{hr|}\n{white|' + params.name + '}';
                                },
                                rich: rich
                            },
                        },
                        labelLine: {
                            normal: {
                                length: 55 * scale, //直连的直线长度
                                length2: 0, //拐角的直线长度
                                lineStyle: {
                                    color: '#8792A4',
                                    width: 1
                                }
                            }
                        },
                        data: echartData
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);

                setTimeout(this._startAnimate,2000)
            });
        },
        methods: {
            _startAnimate: function() {
                let action = () => {
                    let newDate = _.shuffle(this.echartData);
                    let newOptions = {
                        series: [{
                            data: newDate  //通过name字段更新相应的系列
                        }]
                    }
                    this.myChart.setOption(newOptions);
                };
                setInterval(action,4000);
            }
        }
    }
</script>




