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
    export default {
        props: [], //组件支持的属性
        data: function () { //响应式数据
            return {
                myChart:null
            }
        },
        methods: {}, //方法中的 this指向 VM实例
        created: function () {
        },
        mounted: function () { //挂载上DOM树后,使用
            this.$nextTick(function () {
                var dom = this.$refs.echarts;
                this.myChart = echarts.init(dom)
                var _data = [
                    {name: "GDP", pValue: 7.9, value:100},
                    {name: "工业", pValue: 6.8, value:100},
                    {name: "固定投资", pValue: 4.6, value:100},
                    {name: "财政预算", pValue: 3.5, value:100},
                    {name: "社销零售", pValue: 5.8, value:100},
                ];
                function Pie(center, radius, data, isGDP) {
                    this.type="pie";
                    this.radius = radius;
                    this.center = center;
                    this.data = [data];
                    this.silent = true;
                    this.label = {
                        normal:{
                            show:true,
                            position:'center',
                            formatter:function (v) {
                                var data = v.data;
                                if(data.name){
                                    if(isGDP){
                                        return '{upG|'+data.name+ '}\n{downG|'+ data.pValue+'}';
                                    }else {
                                        return '{up|'+data.name+ '}\n{down|'+ data.pValue+'}';
                                    }
                                }
                            },
                            rich:{
                                up:{
                                    color:'#ffffff',
                                    fontSize:12
                                },
                                down:{
                                    color:'#99ffff',
                                    fontSize:16,
                                    fontWeight:'bold',
                                    padding:3
                                },
                                upG:{
                                    color:'#ffffff',
                                    fontSize:24,
                                    fontWeight:'bold'
                                },
                                downG:{
                                    color:'#99ffff',
                                    fontSize:24,
                                    fontWeight:'bold',
                                    padding:3
                                }
                            }
                        }
                    };
                    this.itemStyle ={
                        normal:{
                            color:""
                        }
                    }
                }
                var radius = [[['38%','43%'],['32%','33%']],[['31%','36%'],['25%','26%']]];
                var centers = [['50%','50%'],['20%','25%'],['20%','75%'],['80%','25%'],['80%','75%']]
                var option = {
                    title:{
                        text:"2017年",
                        left:'center',
                        textStyle:{
                            color:"#99ffff",
                            fontSzie:18,
                            fontWeight:'bold'
                        },
                        subtext:'同比上涨 %',
                        subtextStyle:{
                            color:'#fff',
                            fontSize:14
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    color:["#64abed"],
                    series: []
                };
                _data.forEach(function (item,index) {
                    var pie1 = new Pie(centers[index],radius[index == 0?0:1][0],item,index==0);
                    var pie2 = new Pie(centers[index],radius[index == 0?0:1][1],{value:100},index==0);
                    option.series.push(pie1);
                    option.series.push(pie2);
                })
                this.myChart.setOption(option)
            })
        },
        components: { //可以注册嵌套的局部组件，在模板字符串中使用

        }
    }
</script>

