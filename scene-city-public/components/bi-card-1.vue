<style lang="scss" scoped>
    .container {
        margin-top: 1.875rem;
        width: 100%;
        height: calc(100% - 1.875rem);
    }
    @mixin num {
        font-size: 1rem;
        float: right;
        font-weight: bold;
    }
    .billboard {
        width: calc(50% - 1.25rem);
        padding: 0 0.625rem;
        float: left;
        &_title {
            color: #99ffff;
            font-size: 0.875rem;
            font-weight: bold;
        }
        &_content {
            color: #FFFFFF;
            font-size: 0.75rem;
            height: 1.125rem;
            padding: 0.375rem 0;
            line-height: 1.125rem;
            display: inline-block;
            width: calc(100% - 0.9825rem);
            margin-left: -0.1875rem;
            border: {
                width: 0 0 1px 0;
                color: white;
                style: solid;
            }
            &_num1 {
                color: #87f6f6;
                @include num;
            }
            &_num2 {
                color: #faf340;
                @include num;
            }
            &_unit {
                font-size: 0.875rem;
                color: gray;
                float: right;
            }
        }
        &_img {
            vertical-align: bottom;
        }
    }
    .chart-container {
        width: 100%;
        margin-top: 0.625rem;
        height: calc(100% - 7.75rem);
        clear: both;
    }
</style>
<template>
    <div class="container">
        <div class="billboard">
            <div class="billboard_title"><img src="imgs/stitile_arrow.png">&nbsp;政务大厅</div>
            <div>
                <img src="imgs/dot_line.png" class="billboard_img">
                <div class="billboard_content">
                    累计收件数<span class="billboard_content_unit">件</span><span class="billboard_content_num1">{{governmentData[0]}}</span>
                </div>
            </div>
            <div>
                <img src="imgs/dot_line.png" class="billboard_img">
                <div class="billboard_content">
                    累计办结数<span class="billboard_content_unit">件</span><span class="billboard_content_num1">{{governmentData[1]}}</span>
                </div>
            </div>
            <div>
                <img src="imgs/dot_line.png" class="billboard_img">
                <div class="billboard_content">
                    未处理<span class="billboard_content_unit">件</span><span class="billboard_content_num1">{{governmentData[2]}}</span>
                </div>
            </div>
        </div>
        <div class="billboard">
            <div class="billboard_title"><img src="imgs/stitile_arrow.png">&nbsp;市长热线</div>
            <div>
                <img src="imgs/dot_line.png" class="billboard_img">
                <div class="billboard_content">
                    专题受理数<span class="billboard_content_unit">件</span><span class="billboard_content_num2">{{ztNum}}</span>
                </div>
            </div>
            <div>
                <img src="imgs/dot_line.png" class="billboard_img">
                <div class="billboard_content">
                    群众满意度<span class="billboard_content_num2">100%</span>
                </div>
            </div>
            <div>
                <img src="imgs/dot_line.png" class="billboard_img">
                <div class="billboard_content">
                    按期处理率<span class="billboard_content_num2">96%</span>
                </div>
            </div>
        </div>
        <div ref="echarts" class="chart-container"></div>
    </div>
</template>
<script>
    import {
        utils
    } from '../../common/js/utils'
    export default {
        props: [], //组件支持的属性
        data: function() { //响应式数据
            return {
                myChart: null,
                governmentData: [132, 130, 2],
                ztNum: 12
            }
        },
        methods: {
            dataUpdate: function() {
                var _this = this;
                setInterval(function() {
                    _this.governmentData[0] += Math.ceil(Math.random() * 3);
                    _this.governmentData[1] += Math.ceil(Math.random() * 5);
                    if (_this.governmentData[1] > _this.governmentData[0]) {
                        _this.governmentData[1] = _this.governmentData[0]
                    }
                    _this.governmentData[2] = _this.governmentData[0] - _this.governmentData[1];
                    _this.ztNum += Math.ceil(Math.random() * 3);
                }, 2500)
            }
        }, //方法中的 this指向 VM实例
        created: function() {},
        mounted: function() { //挂载上DOM树后,使用
            this.$nextTick(function() {
                const echartsScaleFactor = utils.getEchartsScaleFactor();
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom);
                var option = {
                    title: {
                        text: '来电按月统计',
                        left: '1%',
                        top: 10,
                        textStyle: {
                            color: "#99ffff",
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        top: 40,
                        left: 10,
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    color: ["#5acde6"],
                    dataZoom: {
                        type: "inside",
                        start: 0,
                        end: 83.33
                    },
                    xAxis: [{
                        name: "月",
                        type: 'category',
                        boundaryGap: false,
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                        axisLabel: {
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.5)"
                            }
                        },
                        axisLabel: {},
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,0.5)"
                            }
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        splitNumber: 3,
                        axisLabel: {
                            align: "right",
                            margin: 2,
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.5)"
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,0.5)"
                            }
                        }
                    }],
                    series: [{
                        name: '月来电数',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: false,
                                position: 'top',
                                textStyle: {
                                    color: "#1E5B87"
                                },
                            }
                        },
                        symbolSize: 4 * echartsScaleFactor,
                        lineStyle: {
                            normal: {
                                color: "#1E5B87",
                                width: 3 * echartsScaleFactor
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: "#1E5B87"
                            }
                        },
                        data: [244, 202, 232, 214, 227, 231, 243, 265, 277, 245, 220, 218, 256]
                    }]
                };
                utils.adjustEcharts(option, echartsScaleFactor);
                this.myChart.setOption(option);
                this.dataUpdate();
            })
        }
    }
</script>

