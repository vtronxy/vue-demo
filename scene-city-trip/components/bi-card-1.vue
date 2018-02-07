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
                const echartsScaleFactor = utils.getEchartsScaleFactor();
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom);
                var _data = [40, 58, 75, 78, 83, 98, 100, 60, 78.5, 120, 82, 58]
                var option = {
                    title: {
                        text: '',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    grid: {
                        top: "12%",
                        left: 5,
                        right: "12%",
                        bottom: 5,
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        name: "(月)",
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                        axisLabel: {
                            textStyle: {color: 'rgba(255,255,255, .6)'}
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#ffffff"
                            }
                        }
                    }],
                    color: ['#03a9f4'],
                    yAxis: [{
                        type: 'value',
                        name: "(万)",
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {color: 'rgba(255,255,255, .6)'}
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#ffffff"
                            }
                        }
                    }],
                    series: [
                        {
                            name: '游客客流走势图',
                            type: 'line',
                            data: _data,
                            symbolSize: 10,
                            lineStyle:{
                                normal:{
                                    width:3 * echartsScaleFactor
                                }
                            },
                            tooltip: {
                                position:"bottom",
                                formatter: function (v) {
                                    return '<div class="tooltip"><div style="color: #000">2016-'+v.name+'</div><div style="font-size: 16px;font-weight: bold;color: #000">'+ v.value+'(万)</div></div>'
                                },
                                backgroundColor:"#b3fdfc"

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

