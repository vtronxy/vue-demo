<style lang="scss" scoped>
    @import '../../sass/echarts-container'; // 是绝对定位
    @import '../../sass/size';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-city-environment {
        @include echartSize(75%, 100%);
    } //相对于 .container
    .tips {
        position: absolute;
        right: 0.625rem;
        top: 0;
        width: 28%;
        height: 95%;
        box-sizing: border-box;
        padding-top: 9%;
    }
    .tips>li {
        height: 20%;
    }
    div.res {
        display: flex;
        align-items:center;
        text-align: center;
        font-size: 0.9375rem;
        font-weight: bolder;
        margin-left: 5px;
        margin-right: 5px;
    }

    .res > img{
        width: 1.8rem;
        height: 1.8rem;
    }

    .res > div{
        display: inline-block;
        width: calc(100% - 1.8rem);
    }
    .tips>li:first-child>span{
        padding-left: 15%;
        @include bigType{
            padding-left: 24%;
        }
    }
    span.tilte {
        color:#0CE9F1;
        padding-left:15%;
        @include bigType{
            padding-left: 24%;
            font-size:0.7rem;
        }

    }

    .tips>li {
        margin-bottom: 12%;
        border-radius: 1.5625rem 0;
        background-color: rgba(34,124,148,.5)
    }
    .tips>li:last-child {
        margin-bottom: none;
    }
</style>

<template>
    <div class="container">
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-city-environment"></div>
        <ul class="tips">
            <li>
                <span class="tilte">空气质量指数</span>
                <div class="res"><img src="../imgs/leaf.png"><div>14</div></div>
            </li>
            <li>
                <span class="tilte">累计降雨量</span>
                <div class="res"><img src="../imgs/rain-.png"><div>21mm</div></div>
            </li>
            <li>
                <span class="tilte">城市绿化率</span>
                <div class="res"><img src="../imgs/tree.png"><div>52.0%</div></div>
            </li>
            <li>
                <span class="tilte">森林覆盖率</span>
                <div class="res"><img src="../imgs/forest.png"><div>78.0%</div></div>
            </li>
        </ul>
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
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom); //全局的echarts对象
                const echartsScaleFactor = utils.getEchartsScaleFactor();
                // 指定图表的配置项和数据
                var myData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                var option = {
                    legend: {
                        data: ['2015年降水量', '2016年降水量'],
                        top: 4 * echartsScaleFactor,
                        textStyle: {
                            color: '#FFFFFF',
                        },
                        itemHeight: 8 * echartsScaleFactor,
                        itemWidth: 18 * echartsScaleFactor,
                    },
              
                    grid: [{
                        show: false,
                        left: `4%`,
                        top: `5%`,
                        bottom: `5%`,
                        containLabel: true,
                        width: `46%`,
                    }, {
                        show: false,
                        left: `48%`, //48
                        top: `14%`,
                        bottom: `5%`,
                        width: `0%`,
                    }, {
                        show: false,
                        right: `4%`,
                        left: `40%`, 
                        top: `5%`,
                        bottom: `5%`,
                        containLabel: true,
                        width: `46%`,
                    }, ],
                    xAxis: [{
                        type: 'value',
                        inverse: true,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        position: 'top',
                        //2015横向数值
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                        },
                    }, {
                        gridIndex: 1,
                        show: false,
                    }, {
                        gridIndex: 2,
                        type: 'value',
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        position: 'top',
                        //2016横向数值
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                        },
                    }, ],
                    yAxis: [{
                            type: 'category',
                            inverse: true,
                            position: 'right',

                            axisLabel:{ 
                                show:false, //不显示数字
                                interval:0 //控制坐标轴上的标号 强制显示全部数字
                            },
                            axisLine: {
                                show: true,
                                lineStyle:{
                                    color: '#FFFFFF'
                                }
                               
                            },
                            axisTick: {
                                show: false
                            },
                        
                            data: myData,
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            inverse: true,
                            axisLabel:{
                                interval:0, //强制显示所有的数字
                                align:'center',
            

                            },
                            axisLine: {
                                show: false,
                                lineStyle:{
                                    color: '#FFFFFF'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            data: myData.map(function(value) {
                                return {
                                    value: value,
                                    textStyle: {
                                        align: 'center',
                                        fontSize:8 * echartsScaleFactor,
                                        fontWeight:"bold"
                                    }
                                }
                            }),
                        }, {
                            gridIndex: 2,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLabel:{
                             show:false
                            },
                            axisLine: {
                                show: true,
                                lineStyle:{
                                    color: '#FFFFFF'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                             data: myData
                        },
                    ],
                    series: [{
                            name: '2015年降水量',
                            type: 'bar',
                            barGap: 20 * echartsScaleFactor,
                            barWidth: 8 * echartsScaleFactor,
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: true,
                                    position: 'left',
                                    offset: [0, 0],
                                    textStyle: {
                                        color: '#FFFFFF',
                                        fontSize: 8 * echartsScaleFactor,
                                    },
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: '#FAF340',
                                },
                                emphasis: {
                                    color: '#e7f507'
                                },
                            },
                            data: [40.5, 60, 98.5, 136.5, 163, 222, 186, 120.5, 80, 76.5, 53.5, 30],
                        },
                        {
                            name: '2016年降水量',
                            type: 'bar',
                            barGap: 20 * echartsScaleFactor,
                            barWidth: 8 * echartsScaleFactor,
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: true,
                                    position: 'right',
                                    offset: [0, 0],
                                    textStyle: {
                                        color: '#FFFFFF',
                                        fontSize: 8 * echartsScaleFactor,
                                    },
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: '#64F9AB',
                                },
                                emphasis: {
                                    color: '#06f780',
                                },
                            },
                            data: [42.5, 62, 99.5, 138.5, 165, 223, 185, 121.5, 83, 79.5, 51.5, 32],
                        }
                    ],
                };
                //大屏幕
                if(echartsScaleFactor > 1){
                    option['grid'][1]['left'] = '50%';
                    option['grid'][2]['left'] = '45%';
                     option['legend']['textStyle']['fontSize'] = 16;
                }
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
            });
        }
    }
</script>




