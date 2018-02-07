<style lang="scss" scoped>
    @import '../../sass/echarts-container';

    .container {
        width: 100%;
        margin-top: 1.875rem;
        height: calc(100% - 1.875rem);
    }

    /* echart图标的宽高 */
    .echarts-population-trend {
        @include echartSize(100%, 42%);
    }

    .traffic-table {
        width: calc(100% - 0.625rem);
        margin: 0 0.3125rem;
        height: 58%;
        font-size: 0.8vmax;
        color:white;
        text-align: center;
        &_td{
            height: calc(16% - 0.0625rem);
            border-bottom: 1px solid rgba(255, 255, 255, 0.6);
        }
    }

    .noBorder{
        border: none;
    }

</style>

<template>
    <div class="container">
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-population-trend"></div>
        <table cellpadding="0" cellspacing="0" class="traffic-table"  id="traffic_road" >
            <thead style="background-color: #226099;">
            <th >排名</th>
            <th>道路名称</th>
            <th>高峰拥堵<br>延时指数</th>
            <th>高峰平<br>均车速</th>
            </thead>
            <tbody>

            <tr v-for="(item,index) in topics" class="item">
                <td :class="['traffic-table_td',{'noBorder':index == 4}]">{{index + 1}}</td>
                <td :class="['traffic-table_td',{'noBorder':index == 4}]">{{item.name}}</td>
                <td :class="['traffic-table_td',{'noBorder':index == 4}]">{{item.value1}}</td>
                <td :class="['traffic-table_td',{'noBorder':index == 4}]">{{item.value2}}km/h</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {utils} from '../../common/js/utils'
    export default {
        props: [], //组件支持的属性
        data: function () { //响应式数据
            return {
                topics: [
                    {name: "珞狮路", value1: 4.2, value2: 44},
                    {name: "中山路", value1: 3.0, value2: 28},
                    {name: "民族大道", value1: 2.9, value2: 29},
                    {name: "雄楚大道", value1: 2.5, value2: 36},
                    {name: "二环线", value1: 2.5, value2: 43},
                ]
            }
        },
        methods: {
            dataUpdate: function () {
                var _this = this;
                setInterval(function () {
                    var data1 = [];
                    var data2 = [];
                    for (var i = 0; i < _this.topics.length; i++) {
                        data1[i] = Math.ceil(Math.random() * 5);
                        data2[i] = Math.floor(Math.random() * 11) + 30;
                    }
                    _this.topics.forEach(function (item, index) {
                        // item.value1 = data1[index];
                        item.value2 = data2[index];
                    })
                }, 3000)
            }
        }, //方法中的 this指向 VM实例
        created: function () {
        },
        mounted: function () { //挂载上DOM树后
            this.$nextTick(() => {
                const echartsScaleFactor = utils.getEchartsScaleFactor(); //拿到echarts的缩放因子
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
                        top: 50,
                        bottom: '25%',
                        left: 40,
                        right: 40
                    },
                    legend: {
                        top: 0,
                        show: true,
                        data: ['真实值', '预测值'],
                        textStyle: {
                            color: "#fff",
                            fontSize: 14 *echartsScaleFactor
                        }
                    },
                    color: ['#ffcc00', '#99ffff'],
                    xAxis: [{
                        name: '日期',
                        nameGap: 5,
                        type: 'category',
                        nameLocation: "end",
                        boundaryGap: false,
                        data: ['9/22', '9/23', '9/24', '9/25', '9/26', '9/27', '9/28', '9/29'],
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
                        axisTick: {
                            inside: true
                        },
                        nameTextStyle: {
                            color: "rgba(255,255,255,1)"
                        }
                    }],
                    yAxis: [{
                        min: 1.0,
                        splitNumber: 2,
                        name: '高峰拥堵指数',
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
                        name: '真实值',
                        type: 'line',
                        symbolSize: 10,
                        data: [1.3, 1.7, 1.6, 1.8, 1.4],
                    }, {
                        name: '预测值',
                        type: 'line',
                        symbolSize: 10,
                        data: [null, null, null, null, 1.4, 1.2, 1.7, 1.6],
                    }]
                };
                utils.adjustEcharts(option,echartsScaleFactor);
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
                this.dataUpdate();
            });
        }
    }
</script>