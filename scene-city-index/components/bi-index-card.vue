<template>
    <ul class="card-container">
        <li class="card-charts">
            <div class="chart" ref="charts"></div>
        </li>
        <li>
            <div class="weather1 weather bgimg">
                <table class="">
                    <tr>
                        <td class="weathertablewidth text-right">
                            空气质量优良天数
                        </td>
                        <td>
                            <table>
                                <tr>
                                    <td><img class="imgmiddle" src="../../imgs/_brackets.png" alt=""></td>
                                    <td>182/56.6%</td>
                                    <td><img class="imgmiddle imgmiddleright" src="../../imgs/_brackets.png" alt=""></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

            </div>
            <div class="weather2 weather bgimg">
                <table class="">
                    <tr>
                        <td class="weathertablewidth text-right">
                           主要场所噪音
                        </td>
                        <td>
                            <table>
                                <tr>
                                    <td><img class="imgmiddle" src="../../imgs/_brackets.png" alt=""></td>
                                    <td>&nbsp;&nbsp;&nbsp;
                                        
                                        <bi-index-count :initcounter="45" type="float"></bi-index-count>db
                                        &nbsp;&nbsp;</td>
                                    <td><img class="imgmiddle imgmiddleright" src="../../imgs/_brackets.png" alt=""></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </li>
        <li>
            <div class="itemtab">
                <table class="itab">
                    <tr class="t-head">
                        <th>湖泊名</th>
                        <th>水质</th>
                        <th>营养状态</th>
                        <th>达标情况</th>
                        <th>水质变化</th>
                    </tr>
                    <tr>
                        <td>竹叶海</td>
                        <td class="itd">V类</td>
                        <td>中度富营养</td>
                        <td class="itd">达标</td>
                        <td>较稳定</td>
                    </tr>
                    <tr class="change-bg">
                        <td>月湖</td>
                        <td class="itd">IV类</td>
                        <td>轻度富营养</td>
                        <td class="itd">达标</td>
                        <td>稳定</td>
                    </tr>
                    <tr>
                        <td>莲花湖</td>
                        <td class="itd">V类</td>
                        <td>中度富营养</td>
                        <td class="itd">达标</td>
                        <td>较稳定</td>
                    </tr>
                    <tr class="change-bg">
                        <td>外沙湖</td>
                        <td class="itd">IV类</td>
                        <td>中度富营养</td>
                        <td class="itd">达标</td>
                        <td>稳定</td>
                    </tr>
                    <tr>
                        <td>汤逊湖</td>
                        <td class="itd">V类</td>
                        <td>轻度富营养</td>
                        <td class="itd">达标</td>
                        <td>较稳定</td>
                    </tr>
                    <!-- <tr class="change-bg">
                        <td>南湖</td>
                        <td class="itd">IV类</td>
                        <td>轻度富营养</td>
                        <td class="itd">达标</td>
                        <td>稳定</td>
                    </tr> -->
                </table>
            </div>
        </li>
    </ul>
</template>
<script>
    import {utils} from '../../common/js/utils'
    import biIndexCount from './bi-index-count.vue'
    export default {
        name:"indexcard",
        data: function() {
            return {
                myCharts: null,
                echartsData: null
            }
        },
        mounted: function() { //挂载到DOM上
           this.$nextTick(() => {
                const echartsScaleFactor = utils.getEchartsScaleFactor();
                // $("div.weather1").prepend('<span class="row1"></span> <span class="row2"></span> <span class="col2"></span> <span class="col1"></span>');
                $("div.weather1").prepend('<span class="row1_f1"></span> <span class="row2_f1"></span> <span class="col2_f1"></span> <span class="col1_f1"></span>');
                $("div.weather2").prepend('<span class="row1_f1"></span> <span class="row2_f1"></span> <span class="col2_f1"></span> <span class="col1_f1"></span>');
                var dom = this.$refs.charts;
                this.myCharts = echarts.init(dom); //全局的echarts对象
            
                let _data = [
                    {name: "PM2.5", value: 50,label:{fontSize:20}},     
                    {name: "NO2", value: 25,label:{fontSize:20}},
                    {name: "PM10", value: 68,label:{fontSize:20}},
                    {name: "SO2", value: 65,label:{fontSize:20}},
                    {name: "CO", value: 65,label:{fontSize:20}},
                    {name: "O3", value: 75,label:{fontSize:20}}
                ]
                this.setEchartsData(_data,echartsScaleFactor);
            
                setInterval(function() {
                    let _data = [
                        {name: "PM2.5", value: 50+Math.random()},     
                        {name: "NO2", value: 25+Math.random()*40},
                        {name: "PM10", value: 68+(Math.random()*30)},
                        {name: "SO2", value: 65+Math.random()},
                        {name: "CO", value: 65+Math.random()},
                        {name: "O3", value: 75+Math.random()*20}
                    ];
                    this.setEchartsData(_data,echartsScaleFactor);
                }.bind(this),4000);   
                //重新缩放图表
                $(window).resize(()=>{
                    this.myCharts.resize();
                });
                 
           });     
        },
        methods: {
            setEchartsData: function(_data,echartsScaleFactor) {
                var option = {
                    grid: {
                        
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    radar: { //雷达图
                        name: {
                            color: "#fff",
                            fontWeight:"bold",
                            //fontSize:16
                        },
                        indicator: _data.map(function(item){
                            return {
                                name:item.name,
                                max:100
                            }
                        }),
                        
                        axisLine:{
                            lineStyle:{
                                color:"#42edf8",
                                opacity:1,
                                width:1 * echartsScaleFactor
                            }
                        },
                        splitLine:{
                            lineStyle:{
                                color:"#42edf8"
                            }
                        },
                        splitArea:{
                            areaStyle:{
                                color:"#42EDF8",
                                opacity:0.27
                            }
                        }
                    },
                    series: [{
                        name:"空气质量",
                        type: 'radar',
                        data: [{
                            value: _data.map(function(item){
                                return item.value
                            })
                        }],
                        areaStyle:{
                            normal:{
                                color:"#FAF340",
                                opacity:0.4,
                            }
                        },
                        lineStyle:{
                            normal:{
                                color:"red",
                                opacity:0.5,
                                width:1
                            }
                        },
                    }]
                };
                if(echartsScaleFactor > 1){ //如果是大屏幕
                    option['radar']['name']['fontSize'] = 20; //设置字体大小
                }
                this.myCharts.setOption(option);
            }
        },
        components: {
            "bi-index-count": biIndexCount
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../sass/base";
    @import "../../sass/component";
    

    .card {
        &-container {
           @include clearfix;
           width: 100%;
           height: 100%;
           > li:nth-child(2) {
                display: flex;
                flex-direction:column;
                // top:40px;
                height: 16.3%;
                position: relative;
            }
            > li:nth-child(3) {
                display: flex;
                flex-direction:column;
                // top:40px;
                height: 39.7%;
                position: relative;
            }
        }
        
        &-charts {
            height: 44%;
            width: 100%;
        }
    }
    .chart {
        width: 100%;
        height:calc(100% - 1.25rem);
        top:1.25rem;
    }

    .weathertablewidth {
        width: 50%;
    }
    .weather {	
        align-self: center;
        background-color: #17789c;
        margin-top:0.5rem; 	
        width: 98%;
         height: 50%;
        // line-height: 200%; 
        display: flex;
        justify-content:center;
        position: relative;
        font-size:0.9375rem;
        color:#ffffff; 
        font-weight:bold; 
        text-align: center;
        border-top: 1px #42edf8 solid;
        border-bottom: 1px #42edf8 solid;
        background-size:cover; background:url("../../imgs/title_bg.png") ;
        
    }	
    .weather > table {
        width: 100%;
        height: 100%;
        td {
            // text-align: right;
            table {
                width: 7.5rem;
                right: 0.8125rem;
                position: relative;
                color:#76FCB2;
                float:right;
            }
        }
    }
    .weather>span.num{
        align-self: center;    
        font-size: 1.125rem; 
        color:#76fcb2; 
        // font-size: 14px; 
        padding-left: 0.9375rem;
    }
    .weather>span.num0 {
        align-self: center;    
        font-size: 0.875rem;
        position: relative; 
        top:0.125rem;
    }
    .weather>span.num0offset {
      
        top:0px;
    }
    
    .weather>span>i{

        font-size:0.75rem;
        color:#ffffff; 
    }

    .bracket{
        font-size: 1.5625rem;
    }

    /*湖泊水质 table */
    .itemtab{
        margin-top: 0.9375rem;
        display: flex;
        flex-direction:column;
        position: absolute;
        top:0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }

    .itab{
        align-self: center;
        background-color:rgba(0,82,133,0.3) ;
        width: 98%;
        height: 100%;
      
        font-size: 0.75rem;
        color: #ffffff;
        border-collapse:collapse;
        text-align: center;
    }
    .t-head{
        font-size: 0.75rem;
        color: #ffffff;
        // height: 30px;
        // line-height: 30px;
        background-color: #387FC5;
    }
    .change-bg{
        background-color: rgba(24,99,159,0.3);		
    }
    .itd{
        color:#99ffff;
    }  

    
</style>
