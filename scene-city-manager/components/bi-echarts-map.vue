<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-wuhan-map {
        @include echartSize(100%, 100%);
    }
</style>

<template>
    <div class="container">
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-wuhan-map"></div>
    </div>
</template>

<script>
    import {EventBus,utils} from '../../common/js/utils'
    import wuhanJson from '../../data/wuhan.json'
    export default {
        data: function() {
            return {
                myChart: null
            }
        },
        mounted: function() {
            this.$nextTick(() => {
                const echarsScaleFactor = utils.getEchartsScaleFactor();
                echarts.registerMap('wuhan', wuhanJson); //注册地图GeoJSON数据
                let chart = echarts.init(this.$refs.echarts);
                this.myChart = chart;
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}'
                    },
                    data: [{
                        name: '新洲区',
                        selected: true
                    }, {
                        "name": "汉南区",
                        selected: false
                    }, {
                        "name": "汉阳区",
                        selected: false
                    }, {
                        "name": "东西湖区",
                        selected: false
                    }, {
                        "name": "蔡甸区",
                        selected: false
                    }, {
                        "name": "硚口区",
                        selected: false
                    }, {
                        "name": "洪山区",
                        selected: false
                    }, {
                        "name": "黄陂区",
                        selected: false
                    }, {
                        "name": "江岸区",
                        selected: false
                    }, {
                        "name": "江汉区",
                        selected: false
                    }, {
                        "name": "江夏区",
                        selected: false
                    }, {
                        "name": "青山区",
                        selected: false
                    }, {
                        "name": "武昌区",
                        selected: false
                    }, ],
                    series: [{
                        selectedMode: 'multiple',
                        name: '武汉',
                        type: 'map',   //指明是地图类型的 echarts
                        map: 'wuhan',
                        left: '15%', //控制地图的大小
                        top: 0,
                        right: '15%',
                        bottom: 0,
                        label: { //控制地名
                            normal: {
                                show: true,
                                //fontSize:16,
                                color: '#FFFFFF',
                            },
                            emphasis: {
                                color: '#FFFFFF',
                                fontSize: 14,
                                fontWeight: 'bold'
                            }
                        },
                        itemStyle: {
                            //普通状态下样式
                            normal: {
                                areaColor: '#0098d9',
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowBlur: 20,
                                shadowOffsetY: 10,
                                shadowOffsetX: 20,
                            },
                            //高亮状态下样式
                            emphasis: {
                                areaColor: '#00c3e2',
                            },
                            borderColor: '#0089ba',
                        }
                    }]
                };
                utils.adjustEcharts(option,echarsScaleFactor);
                chart.setOption(option); //设置图表的option项
                chart.on('click', function(params) {
                    var city = params.name;
                    EventBus.$emit('update-map-tip',{city});
                });
            });
        }
    }
</script>


