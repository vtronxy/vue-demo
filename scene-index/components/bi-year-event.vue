<style lang="scss" scoped>
    $label-font-size:1.5em; //标题栏文字的
    //$indent-left:100px;  //覆盖echarts-container中的默认变量
    @import '../../sass/echarts-container';
     
    .container{
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-event-year {
        @include echartSize;
    }
    /* 列表水平排列 */
    .ul-h {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap
    }
    /* 水平列表的列表项去掉点号，并且文字居中 */
    .ul-h>li {
        list-style: none;
        text-align: center;
    }
    .event-type>span {
        vertical-align: middle;
    }
    // 将span置为inline-block可以设置宽高
    .event-type>span:nth-child(1) {
        display: inline-block;
        border-radius: 6px;
        width: 25px;
        height: 1em;
    }
    .lg-font {
        font-size: $label-font-size;
    }
</style>

<template>
    <div class="container">
        <div class="adapt-to-echart indent">
            <ul class="ul-h">
                <li class="list-item" v-for="(item,index) in eventStat" :key="index" :style="item.colorStyle">
                    <div class="lg-font" :style="item.color">{{item.count}}</div>
                    <span class="lg-font" :style="item.color">{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div ref="echarts" class="echarts-event-year"></div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                myChart: null,
                eventStat: [{
                    count: 51,
                    name: '街面秩序',
                    color: {
                        color: '#5acde6'
                    }
                }, {
                    count: 18,
                    name: '社会管理',
                    color: {
                        color: '#7adb8e'
                    }
                }, {
                    count: 14,
                    name: '施工管理',
                    color: {
                        color: '#FF6600'
                    }
                }]
            }
        },
        mounted: function() {
            this.$nextTick(() => {
                //此时获取的DOM，没有被css作用，大小为0
                //绘图过后 容器无法正常 适应百分比 70% 会出现滚动条
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom); //全局的echarts对象
                // 指定图表的配置项和数据
                var option = {
                    legend: {
                        data: ['施工管理', '社会管理', '街面秩序'],
                        y: 'bottom',
                        itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
                        // 横向布局时为水平间隔，纵向布局时为纵向间隔
                        itemWidth: 40, // 图例图形宽度
                        itemHeight: 20, // 图例图形高度
                        textStyle: {
                            color: '#FFFFFF'
                        },
                    },
                    xAxis: {
                        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        }
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        }
                    },
                    series: [{
                        name: '施工管理',
                        type: 'bar',
                        stack: 'one',
                        data: [3, 3, 0, 0, 0, 3, 3, 3]
                    }, {
                        name: '社会管理',
                        type: 'bar',
                        stack: 'one',
                        data: [3, 3, 0, 1, 0, 3, 3, 3]
                    }, {
                        name: '街面秩序',
                        type: 'bar',
                        stack: 'one',
                        data: [7, 8, 7, 8, 2, 9, 7, 11]
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
                    },
                    //全局的文字颜色
                    textStyle: {
                        color: '#FFFFFF'
                    }
                };
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
            });
        }
    }
</script>




