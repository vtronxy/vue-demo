<style lang="scss" scoped>
    .container {
        margin-top: 1.875rem;
        width: 100%;
        height: calc(100% - 1.875rem);
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
        mounted: function () { //挂载上DOM树后,使用
            this.$nextTick(function () {
                const echartsScaleFactor = utils.getEchartsScaleFactor();
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom);
                var _data = [
                    {name: "18岁以下", value: 5},
                    {name: "18-24岁", value: 12},
                    {name: "25-30岁", value: 38},
                    {name: "31-35岁", value: 18},
                    {name: "36-40岁", value: 12},
                    {name: "41-50岁", value: 9},
                    {name: "50岁以上", value: 6}
                ];
                var option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    grid: {
                        top: 0,
                        left: 20,
                        right: "12%",
                        bottom: "8%",
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'value',
                        boundaryGap: false,
                        axisLabel: {
                            textStyle: {color: '#ffffff'},
                            formatter:'{value}%'
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#ffffff"
                            }
                        },
                        splitLine:{
                            show:false
                        }

                    }],
                    color: ['#f7f33a'],
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
                            name: '游客年龄占比',
                            type: 'bar',
                            barWidth:'50%',
                            data: _data,
                            tooltip: {
                                // position: "right",
                                formatter: function (v) {
                                    return '<div style="color: black"><div style="color: black">' + v.name + '</div><div style="font-size: 16px;font-weight: bold;color: black">' + v.value + '%</div></div>'
                                },
                                backgroundColor: "#b3fdfc"
                            },
                            label:{
                                normal:{
                                    show:true,
                                    position:"right",
                                    formatter:"{c}%"
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

