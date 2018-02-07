<style lang="scss" scoped>
    @import '../../sass/echarts-container';
    .container {
        @include container;
    }
    /* echart图标的宽高 */
    .echarts-city-weather {
        @include echartSize(100%, 100%);
    }
    p{
        font-size: 0.75rem;
    }
    .temperature {
        display: block;
    }
    .relativeHumidity {
        display: none;
    }
    .precipitation {
        display: none;
    }
    .switchshow {
        position: absolute;
        top: 0.8125rem;
        left: 1.875rem;
        width: 25rem;
        height: 1.25rem;
        color: #FFFFFF;
        font-size: 0.75rem
    }
    .btn-group {
        position: absolute;
        top: 0.625rem;
        right: -0.5625rem;
        z-index: 100;
        height: 1.25rem;
        width: 13.75rem;
        font-size: 0.7rem;
    }
    #qiwen {
        top: 0;
        left: 0;
        border-radius: 5px 0px 0px 5px;
        border-right: 1px solid #64ABED;
    }
    #xiangduishidu {
        left: 3.75rem;
        width: 5.2rem;
        border-right: 1px solid #64ABED;
    }
    #jiangshuiliang {
        top: 0;
        left: 8.75rem;
        border-radius: 0px 5px 5px 0px;
    }
    .btn-default {
        position: absolute;
        height: 1.5rem;
        @include bigType{
            height: 1.25rem;
        }
        width: 4rem;
        color: #FFFFFF;
        background-color: #008da5;
        border: none;
    }
    .btn-default:focus {
        color: #008498;
        background-color: #00e9f1;
    }
    .btn-default:hover {
        cursor: pointer;
    }
</style>

<template>
    <div class="container">
        <div class="switchshow">
            <p class="temperature">最新整点实况气温：19℃&nbsp;&nbsp;&nbsp;<span style="color: #FAF340">最高24℃&nbsp;&nbsp;最低8℃</span></p>
            <p class="relativeHumidity">最新整点实况相对湿度：71%&nbsp;&nbsp;&nbsp;<span style="color: #FAF340">最大相对湿度：102%</span></p>
            <p class="precipitation">武汉整点天气实况：19℃&nbsp;&nbsp;&nbsp;<span style="color: #FAF340">最近一小时降水量136.5mm</span></p>
        </div>
        <div class="btn-group">
            <button type="button" id="qiwen" class="btn btn-default" @click="qiwen">气温</button>
            <button type="button" id="xiangduishidu" class="btn btn-default" @click="shidu">相对湿度</button>
            <button type="button" id="jiangshuiliang" class="btn btn-default" @click="jiangshuiliang">降水量</button>
        </div>
        <!-- 季度事件汇聚的echarts图标 -->
        <div ref="echarts" class="echarts-city-weather"></div>
    </div>
</template>

<script>
    import {
        utils
    } from '../../common/js/utils'
    export default {
        data: function() {
            return {
                myChart: null,
                carouselFunc: ['jiangshuiliang', 'shidu','qiwen'],
                interval: 2000,
            }
        },
        mounted: function() {
            this.$nextTick(() => {
                const echarsScaleFactor = utils.getEchartsScaleFactor();  
                this._initEcharts(echarsScaleFactor);
                document.querySelector('#qiwen').focus(); //第一个按钮 获取焦点
                this._startCarousel(); //开始轮播

            });

           
        },
        methods: {
            _initEcharts: function(echarsScaleFactor) {
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom); //全局的echarts对象
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        formatter: '{b}时<br/>{a}: {c}',
                        axisPointer: {
                            type: 'shadow',
                        }
                    },
                    legend: {
                        show: false,
                        itemGap: -20 *echarsScaleFactor,
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: 14*echarsScaleFactor,
                            padding: 10*echarsScaleFactor,
                            backgroundColor: "#46BAC8",
                            borderRadius: 5*echarsScaleFactor,
                        },
                        selectedMode: "single",
                        left: "right",
                        data: [{
                                name: '气温',
                                icon: "none"
                            },
                            {
                                name: '相对湿度',
                                icon: "none"
                            },
                            {
                                name: '降水量',
                                icon: "none"
                            },
                        ],
                        selected: {
                            "气温": true,
                            "相对湿度": false,
                            "降水量": false,
                        }
                    },
                    grid: {
                        top: '15%',
                        left: '1%',
                        right: '2%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#FFFFFF'
                            }
                        },
                        axisTick: {
                            show: true
                        },
                        splitLine: {
                            show: true
                        },
                        axisLabel: {
                            color: "#FFFFFF",
                            fontSize: 10*echarsScaleFactor
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#FFFFFF'
                            }
                        },
                        splitLine: {
                            show: true
                        },
                        axisLabel: {
                            color: "#fff",
                            fontSize: 10*echarsScaleFactor
                        }
                    },
                    series: [{
                            name: '气温',
                            type: 'line',
                            lineStyle: {
                                normal: {
                                    color: "#FAF340",
                                    width: 2*echarsScaleFactor
                                }
                            },
                            itemStyle: {
                                normal: {
                                    width: 2*echarsScaleFactor,
                                    color: "#FAF340"
                                }
                            },
                            data: [21, 23, 22.5, 23.5, 24, 22, 16.5, 15, 14, 13, 12, 12, 11, 10.8, 10.6, 9.6, 9.6, 9.6, 8, 12, 16, 18.7, 19, 20, 21],
                        },
                        {
                            name: '相对湿度',
                            type: 'line',
                            data: [50, 50, 42, 41, 40, 40, 60, 80, 100, 100, 100, 102, 100, 102, 101, 100, 98, 98, 94, 93, 91, 84, 60, 50],
                            lineStyle: {
                                normal: {
                                    color: "#a7c6f6",
                                    width: 2*echarsScaleFactor
                                }
                            },
                            itemStyle: {
                                normal: {
                                    width: 2 *echarsScaleFactor,
                                    color: "#a7c6f6"
                                }
                            },
                        },
                        {
                            name: '降水量',
                            type: 'line',
                            data: [40.5, 60, 98.5, 136.5, 163, 222, 186, 120.5, 80, 76.5, 53.5, 30, 40.5, 60, 98.5, 136.5, 163, 222, 186, 120.5, 80, 76.5, 53.5, 30, 40],
                            lineStyle: {
                                normal: {
                                    color: "#64F9A8",
                                    width: 2*echarsScaleFactor
                                }
                            },
                            itemStyle: {
                                normal: {
                                    width: 1*echarsScaleFactor,
                                    color: "#64F9A8"
                                }
                            },
                        },
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                var chart = this.myChart;
                chart && chart.setOption(option);
                chart.on("legendselectchanged", function(eve) {
                    if (eve.name == '相对湿度') {
                        $('.relativeHumidity').css('display', 'block');
                        $('.precipitation').css('display', 'none');
                        $('.temperature').css('display', 'none');
                    } else if (eve.name == '气温') {
                        $('.relativeHumidity').css('display', 'none');
                        $('.precipitation').css('display', 'none');
                        $('.temperature').css('display', 'block');
                    } else if (eve.name == '降水量') {
                        $('.relativeHumidity').css('display', 'none');
                        $('.precipitation').css('display', 'block');
                        $('.temperature').css('display', 'none');
                    }
                });
            },
            _disableButtonFocus:function(){
                let btnSet = document.querySelectorAll('.btn'); //NodeList的集合
                if(btnSet.length){
                    let resArr  = Array.prototype.slice.call(btnSet);
                    resArr.forEach(el => {
                        el.blur();  //失去焦点
                    });
                }
                
            },
            _startCarousel() {
                // let fun = async() => {
                //     for (let func of this.carouselFunc) {
                //         await utils.sleep(3000);
                //         (this[func])();
                //     }
                //     fun(); //递归调用
                // };
                // fun();
                //使用循环改写 循环变量保存到 闭包当中
                let index = 0;
                let len = this.carouselFunc.length;
                const setButtonFocus = {
                    0:function(){
                        document.querySelector('#xiangduishidu').focus();
                    },
                    1:function(){
                        document.querySelector('#jiangshuiliang').focus();
                    },
                    2:function(){
                        document.querySelector('#qiwen').focus();
                    }
                };
                return (async()=>{
                    while(true){
                        await utils.sleep(3000);  //停顿3s后执行
                        this._disableButtonFocus(); //使用所有的button 失去焦点
                        setButtonFocus[index % len](); //让按钮得到焦点
                        this[this.carouselFunc[index++ % len]]();
                    }
                })();
            },
            shidu: function() {
                this.myChart.dispatchAction({
                    type: 'legendToggleSelect',
                    name: '相对湿度',
                    selected: true
                });
            },
            qiwen: function() {
                this.myChart.dispatchAction({
                    type: 'legendToggleSelect',
                    name: '气温',
                    selected: true
                });
            },
            jiangshuiliang: function() {
                this.myChart.dispatchAction({
                    type: 'legendToggleSelect',
                    name: '降水量',
                    selected: true
                });
            },
        }
    }
</script>




