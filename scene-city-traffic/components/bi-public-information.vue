<style>
    .fg_detail_content {
        /* padding-top: 30px; */
        margin-top: 1.875rem;
        color: white;
        padding-left: 0.625rem;
        padding-right: 0.625rem;
        height: 90%;
    }

    .fg_detail_content ul {
        height: 100%;
    }

    .fg_detail_content li {
        overflow: hidden;
        zoom: 1
    }

    .text_line3 li {
        height: calc((100% - 3.25rem) * 0.22);
    }

    .fg_detail_li2 {
        display: flex;
        align-items: center;
    }

    .fg_detail_li2 > div:nth-child(1) {
        width: 1.5rem;
        height: 2rem;
        padding-right: 0.375rem;
        vertical-align: top;
    }

    .fg_detail_li2 > div {
        display: inline-block;
        width: 90%;
        margin: auto 0;
    }

    .fg_detail_img {
        width: 1.5rem;
        height: 2rem;
    }

    .fg_detail_title_2 {
        font-size: 1.125rem;
    }

    .fg_detail_introduce {
        font-size: 0.875rem;
        max-height: 2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
    }
</style>

<template>
    <div class="fg_detail_content text_line3" ref="scrollUpContainer">
        <ul>
            <li class="fg_detail_li2">
                <div>
                    <img src="imgs/poi/sg.png" class="fg_detail_img"/>
                </div>
                <div>
                    <div class="fg_detail_title_2">7/9/2016 09:33:43</div>
                    <div class="fg_detail_introduce">
                        关山大道拥堵严重，请绕行
                    </div>
                </div>

            </li>
            <!-- <hr size=1 style="color: #FFFFFF;border-style:dashed ;width:100%;opacity:0.4"> -->
            <li class="fg_detail_li2">
                <div>
                    <img src="imgs/poi/rk.png" class="fg_detail_img"/>
                </div>
                <div>
                    <div class="fg_detail_title_2">7/9/2016 10:33:43</div>
                    <div class="fg_detail_introduce">热点事件:通过专家点评和民意调查等环节</div>
                </div>
            </li>
            <li class="fg_detail_li2">
                <div>
                    <img src="imgs/poi/gd.png" class="fg_detail_img"/>
                </div>
                <div>
                    <div class="fg_detail_title_2">7/9/2016 10:44:43</div>
                    <div class="fg_detail_introduce">未经许可在公共场合堆放物料的现象</div>
                </div>
            </li>
            <li class="fg_detail_li2">
                <div>
                    <img src="imgs/poi/gd.png" class="fg_detail_img"/>
                </div>
                <div>
                    <div class="fg_detail_title_2">7/9/2016 11:23:11</div>
                    <div class="fg_detail_introduce">光谷一路出现交通事故，请绕行</div>
                </div>
            </li>
            <li class="fg_detail_li2">
                <div>
                    <img src="imgs/poi/gd.png" class="fg_detail_img"/>
                </div>
                <div>
                    <div class="fg_detail_title_2">7/9/2016 12:36:55</div>
                    <div class="fg_detail_introduce">名族大道交通顺畅</div>
                </div>
            </li>
            <li class="fg_detail_li2">
                <div>
                    <img src="imgs/poi/gd.png" class="fg_detail_img"/>
                </div>
                <div>
                    <div class="fg_detail_title_2">7/9/2016 10:44:43</div>
                    <div class="fg_detail_introduce">未经许可在公共场合堆放物料的现象</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: [], //组件支持的属性
        data: function () { //响应式数据
            return {}
        },
        methods: {}, //方法中的 this指向 VM实例
        created: function () {
        },
        mounted: function () { //挂载上DOM树后,使用
            let scrollUp = this.$refs.scrollUpContainer;
            var _height = $(scrollUp).height();
            $(scrollUp).vTicker({
                speed: 500, //滚动速度，单位毫秒。
                pause: 3000, //暂停时间，就是滚动一条之后停留的时间，单位毫秒。
                showItems: 5, //显示内容的条数。
                animation: 'fade', //动画效果，默认是fade，淡出。
                mousePause: true, //鼠标移动到内容上是否暂停滚动，默认为true。
                height: _height, //滚动内容的高度。
                direction: 'up' //滚动的方向，默认为up向上，down则为向下滚动。
            });
        },
        components: { //可以注册嵌套的局部组件，在模板字符串中使用

        }
    }
</script>

