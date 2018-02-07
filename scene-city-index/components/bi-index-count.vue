/**
    数字变化组件
 */
<template>
  <span>
      {{count}}
  </span>
</template>
<script>
    export default {
        props:{
            initcounter: {
                type:Number,
                required: true
            },
            msec: {//多少毫秒执行一次
                type:Number,
                default: 3000
            },
            minPerc: {//最小百分比
                type:Number,
                default: 90
            },
            maxPerc: {//最大百分比
                type:Number,
                default: 99
            },
            minNum: {//最小数字
                type:Number,
                default: 45
            },
            maxNum: {//最大数字
                type:Number,
                default: 75
            },
            type: {//数字变化策略
                type:String,
                default: "increase", //取值：increase:逐渐随机增长，float:在指定值范围内浮动，per：在指定百分比范围内浮动
                validator: function (value) {
                    var types = ["increase","float","per"];
                    return types.includes(value);
                }
            }
        },
        data() {
            return {
                //this.initcounter的值不能在组件内修改，需要定义一个count来设定数字的改变
                count: this.initcounter 
            }
        },
        mounted: function() {
            switch(this.type) {
                case "increase": this.increaseCount()
                break;
                case "float": this.floatByNum()
                break;
                case "per": this.floatByPerc()
                break;
            }
        },
        methods: {
            //在1-10增长范围内随机增长
            increaseCount: function() {
                
                setInterval(()=> {
                    this.count = this.count + Math.ceil(Math.random()*10);
                },this.msec);
            },
            //处理噪音变化
            floatByNum: function() {
                let directives = true;
                setInterval(() => {
                    var increment =  Math.ceil(Math.random()*10);
                    if(this.count >= this.maxNum) {
                        directives = false;
                    }
                    if(this.count <= this.minNum) {
                        directives = true;
                    }
                    if(!directives) {
                        this.count = this.count - increment;
                    }else if(directives) {
                        this.count = this.count + increment;
                    }
                },this.msec);   
            },
            limitSigDigs: function(num, sig) {
                let fig = 0;
                if (sig > 0) {
                    fig = parseFloat(num.toPrecision(sig));
                }
                return fig;
            },
            //处理百分比数变化
            floatByPerc: function() {
                let directives = true;
                setInterval(()=> {
                    if(this.count >= this.maxPerc) {
                        directives = false;
                    }
                    if(this.count <= this.minPerc) {
                        directives = true;
                    }
                    let acount = "";
                    //保留小数点后一位
                    if(!directives) {
                        acount = (parseFloat(this.count) - Math.random()).toFixed(1);
                        
                    }else if(directives) {
                        acount = (parseFloat(this.count) + Math.random()).toFixed(1);
                    }
                    if(!acount.includes(".")) {
                        this.count = acount+".0";
                    }else {
                        this.count = parseFloat(acount);
                    }
                },this.msec);
            }

        }
    }
</script>
<style>

</style>
