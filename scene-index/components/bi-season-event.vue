<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container{
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-season-event {
        @include echartSize(100%,100%);
    }

</style>

<template>
    <div class="container">
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-season-event"></div>
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
                   var option = {
                    tooltip: {},
                    xAxis: {
                        data: ["网络舆情", "乱堆乱放", "工地厂尘", "施工占道", "施工弃料", "无照经营", "机动车乱停", "重点入口", "流动人口", "矛盾纠纷"],
                        axisLabel: {
                            rotate: 30
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#FFFFFF',
                            }
                        }
                    },
                    yAxis: {
                        splitLine: { //去掉分割线
                            show: false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#FFFFFF',
                            }
                        }
                    },
                    series: [{
                        name: '季度事件',
                        type: 'bar',
                        data: [4, 3, 2, 14, 15, 5, 7, 22, 5, 16],
                        itemStyle:{
                            normal:{
                                color:"#47f19d"
                            }
                        },
                        barWidth:15
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
            });
        }
    }
</script>




