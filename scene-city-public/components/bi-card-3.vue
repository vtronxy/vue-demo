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
    import {utils} from '../../common/js/utils';
    import _ from 'lodash';
    export default {
        props: [], //组件支持的属性
        data: function () { //响应式数据
            return {}
        },
        methods: {
            _convertData: function (jsonData,legend) {
                var barSeries = [],
                    lineSeries = [];
                var category = [];
                for (var i = 0; i < jsonData.length; i++) {
                    if (!_.includes(category, jsonData[i].STAT_DATE)) {
                        category.push(jsonData[i].STAT_DATE);
                    }
                }

                for (var i = 0; i < legend.length; i++) {
                    var oneSeries = [];
                    for (var j = 0; j < jsonData.length; j++) {
                        if (legend[i] == jsonData[j].NAME) {
                            oneSeries.push(jsonData[j].VALUE);
                        }
                    }
                    barSeries.push({"legendName": legend[i], "data": oneSeries});
                }

                for (var i = 0; i < legend.length; i++) {
                    var lineValue = [];
                    lineValue[0] = 0;
                    for (var j = 0; j < category.length - 1; j++) {
                        lineValue[j + 1] = ((barSeries[i].data[j + 1] - barSeries[i].data[j]) / barSeries[i].data[j]) * 100;
                        lineValue[j + 1] = Math.round(lineValue[j + 1] * Math.pow(10, 2)) / Math.pow(10, 2);
                    }
                    lineValue[category.length - 1] = ((barSeries[i].data[category.length - 1] - barSeries[i].data[category.length - 2]) / barSeries[i].data[category.length - 1]) * 100;
                    lineValue[category.length - 1] = Math.round(lineValue[category.length - 1] * Math.pow(10, 2)) / Math.pow(10, 2);

                    lineSeries.push({"legendName": legend[i], "data": lineValue});
                }

                var series = [];
                series.push(barSeries);
                series.push(lineSeries);

                var result = {"legend": legend, "category": category, "series": series};

                return result;
            },
            showChart:function (data,echartsScaleFactor) {
                var lineLegend = ["地区生产总值", "工业总产值", "农业总产值", "消费品零售总额", "公共预算支出", "固定资产投资额", "人均地区生产值"];
                var _data = this._convertData(data,lineLegend);
                var color = ['#00ffff', '#00ff00', '#ffff25', '#ff9f00', '#ff8872', '#00bbb2', '#ffdd32'];
               var textSize;
               if(screen.availWidth > 1600){
                   textSize = 15
               }else {
                   textSize = 12
               }
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function (value, index) {
                            var tooltip = '';
                            var contentsDiv = "";
                            for (var i = 0; i < value.length; i++) {
                                if (i % 2 === 0) {
                                    var barValue, lineValue;
                                    value[i].hasOwnProperty("value") ? barValue = value[i].value : barValue = "暂无数据";
                                    value[i + 1].hasOwnProperty("value") ? lineValue = value[i + 1].value : lineValue = "暂无数据";
                                    contentsDiv += "<div style='width:350px;height:13px;padding:5px 10px 6px 10px;font-size:14px;color:" + value[i].color + "'>" + "<span style='display:inline-block;margin-bottom:5px;width:12px;height:12px;border-radius:6px;background:" + value[i].color + "'>" + "</span>" + "<span style='display:inline-block;padding:0 5px 0 5px;width:145px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>" + value[i].seriesName + "</span>" + "<span style='display:inline-block;padding:0 5px 0 5px;width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>" + barValue + "</span>" + "<span style='display:inline-block;padding:0 5px 0 5px;width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>" + "增长率" + lineValue + "</span>" + "</div>";
                                }
                            }
                            tooltip = "<div style='width:400px;height:100%;border-radius:8px;padding 10px 5px 10px 5px;margin-bottom:15px;'>" + "<span style='display:block;padding:16px 10px 0 10px;font-size:14px;font-weight:700;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>" + value[0].name + "经济发展情况" + "</span>" + contentsDiv + "<span style='display:block'>" + "</div>";
                            return tooltip;
                        }
                    },
                    legend: {
                        type:"scroll",
                        top: 5,
                        left: 'center',
                        data: [],
                        itemWidth:9,
                        itemHeight:9,
                        padding:[0,0,0,0],
                        textStyle:{
                            fontSize:textSize,
                            color:"#fff"
                        },
                        itemGap:6,
                        pageTextStyle:{
                            color:'#fff'
                        },
                        pageIconColor:"#fff",
                        pageIconInactiveColor:"#aaa"
                    },
                    grid: {
                        top:75,
                        left: 0,
                        right: 20,
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#ddd',
                                width: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        //坐标轴刻度标签
                        axisLabel: {
                            textStyle: {
                                color: "#ddd"
                            },
                            margin: 5
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#ddd"
                            }
                        },
                        data: _data.category
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '指标值(万)',
                        calculation: 'true',
                        position: 'left',
                        nameGap: 15,
                        nameTextStyle:{
                            fontSize:textSize
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ddd',
                                width: 1
                            }
                        },
                        axisLabel: {
                            formatter: function(v){
                                var _v = v/10000
                                return _v
                            }
                        }
                    },
                        {
                            type: 'value',
                            name: '同比增长率(%)',
                            calculation: 'true',
                            nameTextStyle:{
                                color:"#fbe927",
                                fontSize:textSize
                            },
                            position: 'right',
                            axisLine: {
                                lineStyle: {
                                    color: color[1],
                                    width: 1
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: []
                };
                for (var j = 0; j < _data.legend.length; j++) {
                    option.series.push({
                        name: _data.legend[j],
                        type: 'bar',
                        stack: '总量',
                        barWidth: "50%",
                        data: _data.series[0][j].data,
                        itemStyle: {
                            normal: {
                                color: color[j]
                            }
                        }
                    });
                    option.series.push({
                        name: _data.legend[j],
                        type: 'line',
                        yAxisIndex: 1,
                        data: _data.series[1][j].data,
                        symbol: 'none',
                        smooth: true,
                        lineStyle: {
                            normal: {
                                barBorderRadius: 0,
                                width: 2.5, //连线粗细
                                color: color[j] //连线颜色
                            }
                        }
                    });
                    option.legend.data.push({
                        name: _data.legend[j],
                        icon: "rect"
                    });
                }
                utils.adjustEcharts(option,echartsScaleFactor);
                var dom = this.$refs.echarts
                this.myChart = echarts.init(dom);
                this.myChart.setOption(option);
            }
        }, //方法中的 this指向 VM实例
        created: function () {
        },
        mounted: function () { //挂载上DOM树后,使用
            var _this = this;
            this.$nextTick(function () {
                const echartsScaleFactor = utils.getEchartsScaleFactor(); //拿到echarts的缩放因子
                $.ajax({
                    url:"data/cityPublicInfo.json",
                    type:"get",
                    dataType:"json",
                    success:function (data) {
                        var result = data["economicsResult"];
                        _this.showChart(result,echartsScaleFactor);
                    }
                })
            })
        }
    }
</script>

