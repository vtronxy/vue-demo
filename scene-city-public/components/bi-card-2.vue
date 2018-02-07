<style lang="scss" scoped>
    .container {
        margin-top: 0.9375rem;
        width: 100%;
        height: calc(100% - 0.9375rem);
    }

    .title {
        width: 100%;
        display: flex;
        height: 25%;
        align-items: center;
        font-size: 0.875rem;
        color: white;
        font-weight: bold;
        &_num {
            font-size: 1.5rem;
            font-weight: bold;
            color: #49d9fe;
        }
        &_text{
            width: 100%;
            text-align: center;
        }
    }

    .key-cloud, .topics{
        width: 50%;
        height: 75%;
        float: left;
        &_title{
            font-size: 0.875rem;
            color: #49d9fe;
            height: 1.5625rem;
            line-height: 1.5625rem;
            font-weight: bold;
        }
        &_content{
            width: 100%;
            margin-bottom: 1.25rem;
            height: calc(100% - 2.8125rem);
            &_list{
                width: 100%;
                height: 100%;
            }
        }
    }

    .item{
        font-size: 0.75rem;
        color: white;
        font-weight: bold;
        width: 100%;
        height: 25%;
        display: flex;
        align-items: center;
        &_num{
            font-size: 1.125rem;
            color: #f8e927;
        }
    }
</style>
<template>
    <div class="container">
        <div class="title">
            <div class="title_text">今日舆情监控<span class="title_num">&nbsp;{{infoNum}}&nbsp;</span><span class="title_unit">件</span></div>
        </div>
        <div class="key-cloud">
            <div class="key-cloud_title">&nbsp;&nbsp;&nbsp;&nbsp;关键词&nbsp;-&nbsp;云</div>
            <div class="key-cloud_content" ref="cloud"></div>
        </div>
        <div class="topics">
            <div class="topics_title">热门话题榜</div>
            <div class="topics_content">
                <ul class="topics_content_list">
                    <li v-for="(item,index) in topics" class="item">
                        <div>{{index + 1}}&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="item_num">{{item.value}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img :src="item.rising?'imgs/asc_arrow.png':'imgs/down_arrow.png'"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [], //组件支持的属性
        data: function () { //响应式数据
            return {
                infoNum:11370,
                topics:[
                    {name:"旅游体验",value:4370,rising:true},
                    {name:"环境卫生",value:3490,rising:false},
                    {name:"行政服务",value:2490,rising:false},
                    {name:"安全事故",value:1370,rising:true},
                ]
            }
        },
        methods: {
            dataUpdate:function () {
                var _this = this;
                setInterval(function () {
                    var risingData = [];
                    for(var i = 0;i < _this.topics.length;i++){
                        risingData[i] = Math.ceil(Math.random()*10);
                    }
                    _this.topics.forEach(function (item, index) {
                        item.value = item.value + risingData[index];
                        _this.infoNum += risingData[index];
                    })
                },3500)
            }
        }, //方法中的 this指向 VM实例
        created: function () {

        },
        mounted: function () { //挂载上DOM树后,使用
            this.$nextTick(function () {
                var dom = this.$refs.cloud;
                var chart = echarts.init(dom);
                var _data = [
                    {name:"酒店",value:[0.3,0.9,1728]},
                    {name:"就业",value:[1.6,0.5,2728]},
                    {name:"环境",value:[2.3,1.4,4490]},
                    {name:"教育",value:[3.6,1.5,1728]},
                    {name:"反腐",value:[0.9,1.8,728]},
                    {name:"魔拜",value:[1.7,2.0,3828]},
                    {name:"食品",value:[2.4,2.5,3928]},
                    {name:"交通",value:[3.0,2.2,2476]},
                    {name:"行政",value:[3.5,3.1,2490]},
                    {name:"旅游",value:[0.3,2.6,5370]},
                    {name:"施工",value:[1.2,3.3,1368]},
                    {name:"洪水",value:[2.1,3.7,28]}
                ]
                var _xData = [0,1,2,3,4];
                var _yData =  [0,1,2,3,4]
                var option = {
                    tooltip:{
                        show:true,
                        formatter:function(val){
                            return '<div style=\"width: 15px;height: 15px;float:left;margin-top:3px;margin-right:5px;border-radius: 60px; background-color: '+val.color+';\"></div><div style="float: left">'+val.data.name+'</div>'+
                                '<div style="clear: both;margin-left: 20px">'+val.data.value[2]+'件'+'</div>'
                        }
                    },
                    grid: {
                        left: "15%",
                        right: "15%",
                        bottom: '15%',
                        top: '15%'
                    },
                    visualMap: {
                        show: false,
                        color: [ '#c56573', '#ecb630','#7ad19c','#3597db'],
                        pieces: [
                            {gt: 3500},  // (900, 1500]
                            {gt: 2000, lte: 3500},  // (310, 1000]
                            {gt: 1000, lte: 2000},   // (200, 300]
                            {gt: 0, lte: 1000},       // (10, 200]
                        ]
                    },
                    xAxis: {
                        type: 'value',
                        data: _xData,
                        axisLine:{
                            show:false
                        },
                        axisLabel:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        splitLine:{
                            show:false
                        }
                    },
                    yAxis: {
                        data: _yData,
                        type: 'value',
                        axisLine:{
                            show:false
                        },
                        axisLabel:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        splitLine:{
                            show:false
                        }

                    },
                    series: [
                        {
                            type: 'scatter',
                            data:_data,
                            symbolSize: 50,
                            label:{
                                normal: {
                                    color:"#fff",
                                    formatter: function(val){
                                        return val.data.name
                                    },
                                    position: 'inside',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal:{
                                    shadowBlur:10,
                                    shadowColor:"rgba(200,20,220,0.6)"
                                }
                            }
                        }
                    ]
                };
                chart.setOption(option);
                this.dataUpdate();
            })
        },
        components: { //可以注册嵌套的局部组件，在模板字符串中使用

        }
    }
</script>

