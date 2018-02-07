<style lang="scss" scoped>
    .container {
        margin-top: 30px;
        width: 100%;
        height: calc(100% - 30px);
    }
</style>
<template>
    <div class="container" ref="echarts"></div>
</template>
<script>
    import {utils} from '../../common/js/utils'
    export default {
        props: [], //组件支持的属性
        data: function () { //响应式数据
            return {
                myChart:null
            }
        },
        methods: {}, //方法中的 this指向 VM实例
        created: function () {
        },
        mounted: function () { //挂载上DOM树后,使用
            this.$nextTick(function () {
                 const echartsScaleFactor = utils.getEchartsScaleFactor(); //拿到echarts的缩放因子
                var colors = ["#43eef8","#43eef8","#43eef8","#30ff30","#43eef8","#30ff30","#30ff30","#30ff30","#faf340","#faf340"];
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom);
                var _data = [
                    {name: "清幽台农家乐-素食宴分", value: 91},
                    {name: "桃源居农家乐-素食宴分", value: 91},
                    {name: "归真轩农家-素食宴分", value: 92},
                    {name: "张大明农家-素食宴分", value: 95},
                    {name: "静怡园农家-素食宴分", value: 93},
                    {name: "仁和九号院-素食宴分", value: 95},
                    {name: "御景山庄", value: 95},
                    {name: "岁月如歌酒店", value: 96},
                    {name: "悦来酒店", value: 100},
                    {name: "一路欢笑采摘园", value: 100}
                ];
                var option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    grid: {
                        top: 0,
                        left: 20,
                        right: "12%",
                        bottom: "5%",
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'value',
                        boundaryGap: false,
                        axisLabel: {
                            textStyle: {color: '#ffffff'}
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#ffffff"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: "dotted",
                            }
                        }
                    }],
                    yAxis: [{
                        type: 'category',
                        data: _data.map(function (item) {
                            return item.name
                        }),
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {color: '#ffffff'}
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#ffffff"
                            }
                        }
                    }],
                    series: [
                        {
                            name: '游客走势图',
                            type: 'bar',
                            data: _data,
                            barWidth:'60%',
                            tooltip: {
                                // position: "auto",
                                formatter: function (v) {
                                    return '<div ><div style="color: black">' + v.name + '</div><div style="font-size: 16px;font-weight: bold;color:black">' + v.value + '(分)'+'</div></div>'
                                },
                                backgroundColor: "#b3fdfc"
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: "right",
                                    formatter: "{c}分"
                                }
                            },
                            itemStyle:{
                                normal:{
                                    color:function (v) {
                                        return colors[v.dataIndex]
                                    }
                                }
                            }
                        }
                    ]
                };
                utils.adjustEcharts(option,echartsScaleFactor);
                this.myChart.setOption(option);
            })
        },
        components: { //可以注册嵌套的局部组件，在模板字符串中使用

        }
    }
</script>

