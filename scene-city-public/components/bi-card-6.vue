<style lang="scss" scoped>
    .container{
        margin-top: 1.875rem;
        width:100%;
        height: calc(100% - 1.875rem);
    }
</style>
<template>
    <div class="container" ref="echarts"></div>
</template>
<script>
    import {utils} from '../../common/js/utils';
    export default {
        props: [], //组件支持的属性
        data: function () { //响应式数据
            return {
                myChart: null
            }
        },
        methods: {}, //方法中的 this指向 VM实例
        created: function () {
        },
        mounted: function () { //挂载上DOM树后,使用
            this.$nextTick(function () {
                const echartsScaleFactor = utils.getEchartsScaleFactor(); //拿到echarts的缩放因子
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom);
                var _data = [
                    {name: "第一产业", productValue: 960,  increasePercent: 5},
                    {name: "第二产业", productValue: 4100,  increasePercent: 9.6},
                    {name: "工业", productValue: 3800, increasePercent: 9.9},
                    {name: "建筑业", productValue: 1960,  increasePercent: 9.4},
                    {name: "第三产业", productValue: 4300,increasePercent: 8.6},
                ]
                var option = {
                    tooltip:{
                        trigger:"item"
                    },
                    xAxis: [{
                        type: 'category',
                        data: _data.map(function (item) {
                            return item.name
                        }),
                        axisLabel: {
                            textStyle: {color: '#fff'},
                            rotate:25
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        nameLocation: "center"
                    }],
                    color: ['#f7f336'],
                    grid: {
                        top: 35,
                        left: 5,
                        right: 5,
                        bottom: 5,
                        containLabel: true
                    },
                    yAxis: [{
                        type: 'value',
                        name: '单位：亿元',
                        nameTextStyle:{
                            color:'#fff'
                        },
                        position: 'left',
                        axisLabel: {
                            textStyle: {color: '#fff'}
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        }, splitLine: {
                            show: false
                        }
                    }, {
                        type: 'value',
                        name: '比上年增长',
                        position: 'right',
                        nameTextStyle:{
                            color:'#fff'
                        },
                        axisLabel: {
                            textStyle: {color: '#fff'},
                            formatter:'{value}%'
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        name: "产值",
                        type: "bar",
                        data: _data.map(function (item) {
                            return item.productValue
                        }),
                        barWidth: 15 * echartsScaleFactor
                    }, {
                        name: "增长率",
                        type: "line",
                        yAxisIndex: 1,
                        symbolSize:8 * echartsScaleFactor,
                        data: _data.map(function (item) {
                            return item.increasePercent
                        }),
                        lineStyle:{
                            normal:{
                                color:"#03a9f4",
                                width:3 * echartsScaleFactor
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:"#03a9f4"
                            }
                        }
                    }]
                }
                utils.adjustEcharts(option,echartsScaleFactor);
                this.myChart.setOption(option);
            })
        }
    }
</script>

