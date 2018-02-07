<template>
    <div class="public-container">
        <table class="public-container">
            <tr>
                <td class="public-td">
                    <div v-cloak class="container border" id="container-population-trend">
                        <div class="panel-wrapper">
                            <!-- 季度事件汇聚的echarts图标 -->
                            <div class="echarts-population-trend" ref="echarts"></div>
                        </div>

                    </div>
                </td>
                <td class="public-td">
                    <table class="weathercontainer">
                        <tr>
                            <td>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="weather ">已受理数
                                <span class="num">
                                    <span class="bracket">&nbsp;</span>
                                    <bi-index-count v-bind:initcounter="4558"></bi-index-count> <i>件</i>
                                    <span class="bracketright">&nbsp;</span>
                                </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="weather ">已办结数
                                    <span class="num">
                                        <span class="bracket">&nbsp;</span>
                                        <bi-index-count v-bind:initcounter="2245"></bi-index-count>
                                        <i>件</i>
                                        <span class="bracketright">&nbsp;</span>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                
                            </td>
                        </tr>
                    </table>
                    
                        
                </td>
            </tr>
            <tr>
                <td class="public-td" colspan="2">
                    <div class="itemtab">
                        <table class="itab">
                            <tr class="t-head">
                                <th>具体事项</th>
                                <th>职能部门</th>
                                <th>平均时长</th>
                            </tr>
                            <tr>
                                <td>病残儿医学鉴定</td>
                                <td class="itd">卫计委</td>
                                <td>2day</td>
                            </tr>
                            <tr class="change-bg">
                                <td>天然气报表</td>
                                <td class="itd">燃气公司</td>
                                <td>8h</td>
                            </tr>
                            <tr>
                                <td>收养登记</td>
                                <td class="itd">民政局</td>
                                <td>20day</td>
                            </tr>
                        </table>
                        </div>
                </td>
                
            </tr>
        </table>
    </div>
</template>
<script>
    import biIndexCount from './bi-index-count.vue'
    export default {
        data: function() {
            return {
                chartsCount: 87,
                maxPerc:90,
                minPerc:80,
                docHeiht:null,
                msec:3000,
                myCharts: null
            }
           
        },
        mounted: function() {
             this.$nextTick(() => {
                    this.docHeiht = $(document).height();
                    var dom = this.$refs.echarts;
                    this.myCharts = echarts.init(dom); //全局的echarts对象
                    this.setEchartsInterval();
                    // 使用刚指定的配置项和数据显示图表。
                    $(window).resize(()=>{
                        this.docHeiht = $(document).height();
                        this.myCharts.resize();
                    })
             });   
        },
        components: {
            "bi-index-count":biIndexCount
        },
        methods: {
            setEchartsInterval:function() {
                let directives = true;
                if(this.chartsCount >= this.maxPerc) {
                    directives = false;
                }
                if(this.chartsCount <= this.minPerc) {
                    directives = true;
                }
                //保留小数点后一位
                if(!directives) {
                    this.chartsCount = this.chartsCount - 1;
                }else if(directives) {
                    this.chartsCount = this.chartsCount + 1;
                }
                let option = this._option(this.chartsCount);
                this.myCharts && this.myCharts.setOption(option);
                setInterval(() => {
                    if(this.chartsCount >= this.maxPerc) {
                        directives = false;
                    }
                    if(this.chartsCount <= this.minPerc) {
                        directives = true;
                    }
                    //保留小数点后一位
                    if(!directives) {
                        this.chartsCount = this.chartsCount - 1;
                    }else if(directives) {
                        this.chartsCount = this.chartsCount + 1;
                    }
                    let option = this._option(this.chartsCount);
                    this.myCharts && this.myCharts.setOption(option);
                },this.msec);
            },
            _option: function(perc) {
                
                var option = {
                        grid: {
                            left: "10%",
                            right: "10%",
                            bottom: 100,
                            top: 0,
                            containLabel: true
                        },    
                        series: [{
                            itemStyle: {
                                normal: {
                                    color: '#d6e01c'
                                },
                                emphasis: {
                                    color: '#edf52e'
                                }
                            },
                            name: '事务处置',
                            type: 'pie',
                            radius: ['53%', '70%'],
                            areaStyle:{
                                normal:{
                                    color:'#fbf141'
                                }
                            },
                            lineStyle:{
                                normal:{
                                    color:'#fbf141'
                                }
                            },
                            label: {
                                normal: {
                                    position: 'center',
                                    color:'#fbf141',
                                }
                            },
                            data: [{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10,
                                itemStyle: {
                                    normal: {
                                        color: '#43e9f8'
                                    },
                                    emphasis: {
                                        color: '#43e9f8'
                                    }
                                }
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10,
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10,
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10,
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10,
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10,
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10,
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10,
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            },{
                                value: 10,
                            },{
                                value: 0.7,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                }
                            }, {
                                value: 10,
                                label: {
                                    
                                    normal: {
                                        position:"center",
                                        formatter: perc+'%\n处置率',
                                        textStyle: {
                                            color: '#fbf141',
                                            fontSize: this.docHeiht >=760 ?17 : 12
                                        }
                                    }
                                },
                                
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#43e9f8'
                                    },
                                    emphasis: {
                                        color: '#43e9f8'
                                    }
                                },
                                //禁止
       
                            }]
                        },{
                            type: 'pie',
                            radius: ['79%', '81%'],
                            label: {
                                normal: {
                                    position: 'center',
                                }
                            },
                            data: [{
                                value: 11,
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#1be5f1'
                                    },
                                    emphasis: {
                                        color: '#3deaf4'
                                    }
                                },
                                hoverAnimation: false
                            }]
                        },{
                            type: 'pie',
                            radius: ['44%', '46%'],
                            label: {
                                normal: {
                                    position: 'center',
                                }
                            },
                            data: [{
                                value: 11,
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#1be5f1'
                                    },
                                    emphasis: {
                                        color: '#3deaf4'
                                    }
                                },
                                hoverAnimation: false
                            }]
                        }
                        ]
                    };
                    return option;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../sass/base";
    .public {
        &-container {
            width: 100%;
            height: 100%;
            color:white;
        }
    }
    .public-td {
        width: 50%;
        height: 50%;
    }

    // .border {
    //         background-color: rgba(0, 128, 0, 0.2);
    //         border: 1px solid black;
    //     }
        /* 把这个当做面板的 外框 */

        .container {
            width: 100%;
            height: 100%;
            // margin: auto auto;
            // position: absolute;
            // left: 0;
            // right: 0;
            // bottom: 0;
            // top: 0;
            // width: 500px;
            // height: 40%;
            // background-color: rgba(5, 27, 64, 0.8);
        }
        /* 装入内容的外套 设置内容在容器中居中 */
        /* 起初想法不设置高度，让内容撑开，但是里面的echart使用了百分比的单位 */

        .panel-wrapper {
            position: relative;
            margin: auto 0;
            width: 100%;
            height: 100%;
            top:3%;
            box-sizing: border-box;
            // padding-top: 15px;
        }
        /* echart图标的宽高 */

        .echarts-population-trend {
            height: 100%;
            width: 100%;
        }
        .weathercontainer {
            position: relative;
            top: 0.5rem;
            height: calc(100% - 0.75rem);
        }
        .weather{	
            // background-color: #17789c;
            // margin-top:8px; 	
            // width: 163px;
            // height: 50px;
            // line-height: 35px; 
            // padding: 5px;
            white-space: nowrap;
            font-size:1vmax;
            color:#ffffff; 
            font-weight:bold; 
            text-align: left;
            position: relative;
            right: 0.625rem;

        }	
      
        .weather>span.num {
            color:#76fcb2; 
            font-size: 1.125rem; 
            padding-left: 0.9375rem;
        }
        .weather>span>i {

            font-size:0.75rem;
            color:#ffffff; 
        }

        .bracket {
            font-size: 1.5625rem;
        }

        .itemtab{
            // margin-top: 15px;
            display: flex;
            // flex-direction:column;
            justify-content:center;
        }

        .itab{
            align-self: center;
            background-color:rgba(0,82,133,0.3) ;
            width: 19.875rem;
            height: 1.875rem;
            line-height: 1.875rem;
            font-size: 0.75rem;
            color: #ffffff;
            border-collapse:collapse;
            text-align: center;
        }
        .t-head{
            font-size: 0.75rem;
            color: #ffffff;
            height: 1.875rem;
            line-height: 1.875rem;
            background-color: #387FC5;
        }
        .change-bg{
            background-color: rgba(24,99,159,0.3);		
        }
        .itd{
            color:#99ffff;
        } 


        /*湖泊水质 table */
        .itemtab{
            // margin-top: 15px;
            // display: flex;
            // flex-direction:column;
            width: 100%;
            height: 100%;
            // position: relative;
            // top:0px;
            // bottom: 0px;
            // left: 0px;
            // right: 0px;
        }

        .itab{
            align-self: center;
            background-color:rgba(0,82,133,0.3) ;
            width: 98%;
            height: 100%;
            // line-height: 30px;
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
