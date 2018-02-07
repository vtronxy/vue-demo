<style lang="scss" scoped>
    .container {
        margin-top: 1.875rem;
        margin-bottom: 1.25rem;
        width: 100%;
        height: calc(100% - 1.875rem - 1.25rem);
    }

    @mixin num {
        font-size: 1.5rem;
        color: #00ffff;
        font-weight: bold;
        text-align: center;
    }

    @mixin normal {
        color: #ffffff;
        font-size: 0.75rem;
        text-align: center;
        font-weight: bold;
    }

    @mixin item {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
    }

    .allowance {
        float: left;
        margin: 0 1.875rem;
        width: calc(35% - 3.75rem);
        height: 100%;
    }

    .city, .country {
        @include item;
        &_title {
            width: 60%;
            text-align: center;
            @include normal;
        }
        &_pie {
            width: 40%;
            height: 100%;
        }
        &_unit {
            @include normal;
        }
        &_num {
            @include num;
        }
    }

    .other {
        float: right;
        margin: 0 0.625rem;
        width: calc(65% - 1.25rem);
        height: 100%;
    }

    .people {
        @include item;
        &_han, &_minority {
            width: 50%;
            text-align: center;
            &_num {
                @include num;
            }
            &_title {
                display: inline-block;
                @include normal;
            }
        }
    }

    .insurance {
        @include item;
        &_module {
            width: 33.3%;
            &_title{
                @include normal;
            }
            &_num{
                @include num;
            }
            &_img{
                text-align: center;
            }
            &_unit{
                @include normal;
            }
        }
    }
</style>
<template>
    <div class="container">
        <div class="allowance">
            <div class="city">
                <div class="city_title">
                    城市低保人数
                    <div class="city_num">12459<span class="city_unit">人</span></div>
                </div>
                <div ref="city_pie" class="city_pie"></div>
            </div>
            <div class="country">
                <div class="city_title">
                    农村低保人数
                    <div class="city_num">52459<span class="city_unit">人</span></div>
                </div>
                <div ref="country_pie" class="country_pie"></div>

            </div>
        </div>
        <div class="other">
            <div class="people">
                <div class="people_han">
                    <img src="../../imgs/han.png"/>
                    <div class="people_han_title">
                        汉族人口
                        <div class="people_han_num">1885242</div>
                    </div>
                </div>
                <div class="people_minority">
                    <img src="../../imgs/minority.png"/>
                    <div class="people_minority_title">
                        少数民族人口
                        <div class="people_minority_num">234987</div>
                    </div>
                </div>
            </div>
            <div class="insurance">
                <div class="insurance_module">
                    <div class="insurance_module_title">老年人群体</div>
                    <div class="insurance_module_title" style="height: 31px;line-height: 31px">65岁以上</div>
                    <div class="insurance_module_num">5669<span class="insurance_module_unit">人</span></div>
                </div>
                <div class="insurance_module">
                    <div class="insurance_module_title">养老保险</div>
                    <div class="insurance_module_img"><img src="../../imgs/oldman.png"/></div>
                    <div class="insurance_module_num">28.1%</div>
                </div>
                <div class="insurance_module">
                    <div class="insurance_module_title">医疗保险</div>
                    <div class="insurance_module_img"><img src="../../imgs/heart.png"/></div>
                    <div class="insurance_module_num">35.8%</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {utils} from '../../common/js/utils'
    export default {
        props: [], //组件支持的属性
        data: function () { //响应式数据
            return {}
        },
        methods: {
            showChart: function (data, dom,echartsScaleFactor) {
                var chart = echarts.init(dom);
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: data[0].name+'：'+data[0].value+'</br>'+data[1].name+'：'+data[1].value
                    },
                    legend: {
                        show: false
                    },
                    color: ["rgba(255, 255, 255, .6)", "#DF7E17"],
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            center: ['50%', '50%'],
                            radius: ['80%', '100%'],
                            avoidLabelOverlap: false,
                            hoverAnimation:false,
                            areaStyle: {backgroundColor: "green"},
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    //fontSize:16,
                                    formatter: function (v) {
                                        if(v.dataIndex == 1){
                                            return '占比\n' + Math.ceil(data[1].value * 100 / data[0].value) + '%'
                                        }else {
                                            return ""
                                        }
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '12',
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle:{
                                emphasis:{
                                }
                            },
                            data: data
                        }
                    ]
                };
                if(echartsScaleFactor > 1){  //大屏幕
                    option['series'][0]['label']['normal']['fontSize'] = 10 * echartsScaleFactor;
                }
                chart.setOption(option);
            }
        }, //方法中的 this指向 VM实例
        created: function () {

        },
        mounted: function () { //挂载上DOM树后,使用
            this.$nextTick(function () {
                const echartsScaleFactor = utils.getEchartsScaleFactor();
                var cityDom = this.$refs.city_pie;
                var countryDom = this.$refs.country_pie;
                var cityData = [
                    {value: 1245913, name: '城市总人数'},
                    {value: 12459, name: '城市低保人数'}
                ]

                var countryData = [
                    {value: 874316, name: '农村总人数'},
                    {value: 52459, name: '农村低保人数'}
                ]
                this.showChart(cityData, cityDom,echartsScaleFactor);
                this.showChart(countryData, countryDom,echartsScaleFactor);
            })
        }
    }
</script>

