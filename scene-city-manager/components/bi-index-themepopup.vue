<template>
    <div class="popup-cnt">
        <transition name="fade">
            <div class="popup"  v-if="visible">
                <table>
                    <tr>
                        <td><img src="../../imgs/index_popup/home.png" alt=""></td>
                        <td><a href="../../index-city-index.html">首页</a></td>
                    </tr>
                    <tr>
                        <td><img src="../../imgs/index_popup/card_s.png" alt=""></td>
                        <td>
                            <a href="../../index-city-card.html">城市名片</a>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="../../imgs/index_popup/train_s.png" alt=""></td>
                        <td><a href="../../index-city-traffic.html">城市交通</a></td>
                    </tr>
                    
                    <tr>
                        <td><img src="../../imgs/index_popup/trip_s.png" alt=""></td>
                        <td>
                            <a href="../../index-city-trip.html">智慧旅游</a>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="../../imgs/index_popup/info_s.png" alt=""></td>
                        <td>
                            <a href="../../index-city-public.html">公共信息</a>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="../../imgs/index_popup/emergency.png" alt=""></td>
                        <td>
                            <a href="../../yingjii/index.html" target="_blank">应急预案</a>
                        </td>
                    </tr>
                </table>       
            </div>
        </transition>
    </div>
   
</template>
<script>
    export default {
        props: {//其显示隐藏，由父组件控制
            visible:Boolean
        }
    }
</script>
<style lang="scss" scoped>
     @import "../../sass/size";
    .popup-cnt{
        position: relative;
    }
    .popup  {
        position: absolute;
        right: 0.625rem;
        top:3.75rem;
        border: 0px red solid;
        background-image: url(../../imgs/index_popup/subject_border.png);
        background-size:contain;
        width: 10.9375rem;
        height: 19.6rem;
        color:#53FBFB;
        font-size: $popup-font-size;
        table {
            width: 8.125rem;
            height: 17.5rem;
            position: relative;
            top: -0.3125rem;
            left: -0.25rem;
            td {
                cursor: pointer;
                vertical-align: middle;
                position: relative;
                left: 2.125rem;
                top: 1.5rem;
            }
        }
        
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>

