<style lang="scss" scoped>
    @import "../../sass/component";

    .container {
        width: 100%;
        height: 100%;
    }

    .fragment {
        &-big {
            float: left;
            position: relative;
            width: calc(55% - 10px);
            height: calc(100% - 2px);
            border: {
                color: #64abed;
                width: 1px 0 1px 0;
                style: solid;
            }
        }
        &-small {
            position: relative;
            display: flex;
            align-items: center;
            margin-left: 55%;
            width: calc(45% - 2px);
            height: calc((100% - 10px) * 0.5 - 2px);
            box-shadow: 0 0 25px 10px rgba(255,255,255,0.3) inset;
            border: 1px solid $card-border;
            background-color: $card-bgc;
            &_title {
                width: 100%;
                text-align: center;
                font-size: 16px;
                color: #43eef8;
                font-weight: bold;
            }
            &_value {
                width: 100%;
                text-align: center;
                font-size: 30px;
                color: white;
            }
        }
    }

    .margin_b {
        margin-bottom: 10px;
    }

    .map_container {
        width: 100%;
        height: 100%;
        background-color: #404a59;
        background-image: -webkit-linear-gradient(180deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px), -webkit-linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
        background-size: 21px 21px;
    }
</style>
<template>
    <div class="container">
        <div class="fragment-big corner">
            <div class="card_header">来访游客的始发地</div>
            <div class="map_container">
                <div ref="echarts" class="container"></div>
            </div>
        </div>
        <div class="fragment-small margin_b corner_blue">
            <div class="fragment-small_title">
                2016年全年客流总人数（万）
                <div class="fragment-small_value">
                    1,747,053
                </div>
            </div>

        </div>
        <div class="fragment-small corner_blue">
            <div class="fragment-small_title">
                2016年累计交易额（万）
                <div class="fragment-small_value">
                    7,261,457
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {china} from '../../data/chinaMap.js'
    import _ from 'lodash';

    export default {
        props: [], //组件支持的属性
        data: function () { //响应式数据
            return {
                myChart: null,
                geoCoordMap: null,
                departCites: null
            }
        },
        methods: {
            _convertData: function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = this.geoCoordMap[dataItem[0].name];
                    var toCoord = this.geoCoordMap[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push([{
                            coord: fromCoord,
                            value: dataItem[0].value
                        }, {
                            coord: toCoord,
                        }]);
                    }
                }
                return res;
            },
            showChart: function () {
                var series = [];
                var _this = this;
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom);
                echarts.registerMap("china", china);
                [['广州', this.departCites]].forEach(function (item, i) {
                    series.push(
                        {
                            type: 'lines',
                            zlevel: 2,
                            effect: {
                                show: true,
                                period: 4,
                                trailLength: 0.02,
                                symbol: 'arrow',
                                symbolSize: 5,
                            },
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    opacity: 0.6,
                                    curveness: 0.2
                                }
                            },

                            data: _this._convertData(item[1])
                        }, {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                period: 4,
                                brushType: 'stroke',
                                scale: 4
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    offset: [5, 0],
                                    formatter: '{b}'
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            symbol: 'circle',
                            symbolSize: function (val) {
                                return 4 + val[2] / 40;
                            },
                            itemStyle: {
                                normal: {
                                    show: false,
                                    color: '#46bee9'
                                }
                            },
                            data: item[1].map(function (dataItem) {
                                return {
                                    name: dataItem[0].name,
                                    value: _this.geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                                };
                            }),
                        }
                    );
                });
                var option = {
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        layoutSize: "140%",
                        itemStyle: {
                            normal: {
                                areaColor: 'rgba(50,60,72,0.8)',
                                borderColor: '#404a59'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    color: ["#46bee9"],
                    series: series
                };

                this.myChart.setOption(option);
            }
        }, //方法中的 this指向 VM实例
        created: function () {
        },
        mounted: function () { //挂载上DOM树后,使用
            var _this = this;
            this.$nextTick(function () {
                $("div.corner").prepend('<span class="row1"></span> <span class="row2"></span> <span class="col2"></span> <span class="col1"></span>');
                $("div.corner_blue").prepend('<span class="row1_b"></span> <span class="row2_b"></span> <span class="col2_b"></span> <span class="col1_b"></span>');
                $.ajax({
                    url: "data/cityTrip.json",
                    type: "get",
                    dataType: "json",
                    success: function (result) {
                        _this.geoCoordMap = result["geoCoordMap"];
                        _this.departCites = result["departCites"];
                        if (_this.geoCoordMap != null && _this.departCites != null) {
                            _this.showChart()
                        }
                    }
                })
            })
        },
        components: { //可以注册嵌套的局部组件，在模板字符串中使用

        }
    }
</script>

