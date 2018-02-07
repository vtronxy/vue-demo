/**
 * Created by Administrator on 2016/11/28 0028.
 */

(function (global) {

    $(function () {
        global.pfun.autoSize();
        global.pfun.switchLng();
        // 绑定突发事件地图切换
        emergency.initMapSwitch();
        // 加载地图
        pmap.init();
        // 加载时钟
        global.pweather.loadClock();
        $(".weatherbox").show();
        
        // 加载当前日期和天气
        global.pweather.loadCurDay();
        // global.pweather.loadWeather();

        // 加载画布
        // global.pcanvas.init();
        // //加载智慧城管模块
        // global.zzcg.init();
        // // 加载公共安全模块
        // global.ggaq.init();
        // // 加载智慧环保模块
        // global.zzhb.init();
        // //加载智慧交通
        // global.zzjt.init();
        // // 加载智慧水务模块
        // global.zhsw.init();
        // // 加载智慧政务模块
        // global.zhzw.init();

        // 总览窗口模块初始化
        global.zlwin.init();
        
        $($(".mtab-box > li")[1]).click();
    });

    global.pfun = {
        // 自动计算弹性页面布局的高宽比例
        autoSize: function () {
            var pwidth = document.documentElement.clientWidth,
                pheight = document.documentElement.clientHeight;

            pwidth = 1920;
            pheight = 1080;

            $("body").width(pwidth).height(pheight);
        },
        // 切换中英文语言
        switchLng: function() {
            // $(".logo").attr("lng", language);
            // $(".logo").bind("click", function () {
            //     var url = window.location.href;
            //     var idx = url.indexOf('l=');
            //     // 默认语言集，无地址栏传值
            //     if(idx == -1) {
            //         if(language === 'en-au') {
            //             if(url.indexOf('?') >= 0) { url += '&l=zh-cn'; }
            //             else { url += '?l=zh-cn'; }
            //         }
            //         else {
            //             if(url.indexOf('?') >= 0) { url += '&l=en-au'; }
            //             else { url += '?l=en-au'; }
            //         }
            //     }
            //     else {
            //         if(language === 'en-au') { url = url.replace('en-au', 'zh-cn'); }
            //         else { url = url.replace('zh-cn', 'en-au'); }
            //     }
            //     // 刷新页面
            //     window.location.href = url;
            // });
        },
        //设置数字滚动效果
        setNumEffect: function (id, start, end, decimals, duration) {
            var options = {
                useEasing: true,
                useGrouping: false,
                separator: '',
                decimal: '.',
                prefix: '',
                suffix: ''
            };
            var countUp = new CountUp(id, start, end, decimals, duration, options);
            countUp.start();
            return countUp;
        }
    };

    // 天气模块
    global.pweather = {
        num: 0,
        // 获取当前日期
        loadCurDay: function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var week = date.getDay();
            month = month > 9 ? month.toString() : '0' + month;
            day = day > 9 ? day.toString() : '0' + day;
            switch (week) {
                case 0:
                    week = dlang.time_sun;
                    break;
                case 1:
                    week = dlang.time_mon;
                    break;
                case 2:
                    week = dlang.time_tues;
                    break;
                case 3:
                    week = dlang.time_wed;
                    break;
                case 4:
                    week = dlang.time_thurs;
                    break;
                case 5:
                    week = dlang.time_fri;
                    break;
                case 6:
                    week = dlang.time_satur;
                    break;
            }
            $("#day").html(year + "-" + month + "-" + day + "&nbsp;&nbsp;&nbsp;&nbsp;" + week);
        },
        // 加载实时天气
        loadWeather: function () {
            var citytq = "武汉"; // 获取城市
            var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0";
            $.ajax({
                url: url,
                dataType: "script",
                scriptCharset: "gbk",
                success: function (data) {
                    var _w = window.SWther.w[citytq][0];
                    var _f = _w.f1 + "_0.png";
                    if (new Date().getHours() > 17) {
                        _f = _w.f2 + "_1.png";
                    }
                    $("#weatherIcon").attr("src", "http://php.weather.sina.com.cn/images/yb3/180_180/" + _f);
                }
            });

        },
        // 加载实时时钟
        loadClock: function () {
            var hour = new Date().getHours(),
                minute = new Date().getMinutes();
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            $("#lblCHours").text(hour);
            $("#lblCMinute").text(minute);
            if (minute == "00") {
                if (pweather.num == 0) { //整点执行一次
                    global.zzjt.loadSpeedLine();
                    pweather.num = 1;
                }
            } else {
                pweather.num = 0;
            }
            // 循环执行动画
            window.setTimeout("pweather.loadClock()", 1000);
        }
    };

    //智慧城管模块
    global.zzcg = {
        num_zs: null,  //受理总数特效
        num_today: null, //今日受理数特效
        num_per: null, //今日办结率特效
        timer: null,
        init: function () {
            zzcg.loadNum();
        }
        //设置模块数字滚动
        , loadNum: function () {
            zzcg.num_zs = pfun.setNumEffect("cg_blzs", 0, 36438, 0, 4);
            zzcg.num_today = pfun.setNumEffect("cg_bls", 0, 213, 0, 3);
            zzcg.num_per = pfun.setNumEffect("cg_bzl", 0, 96.5, 1, 3);
            zzcg.getRandomNum();
        }
        //随机获取增长数字和时间
        , getRandomNum: function () {
            var num = parseInt(Math.random() * 20);  //获取0~20范围内随机整数
            var speed = parseInt(Math.random() * 5 + 5); //获取5~10分钟范围内随机整数
            zzcg.timer = setTimeout(function () {
                zzcg.setNumAdd(num);
            }, speed * 60 * 1000);
        }
        //设置模块数字定时新增
        , setNumAdd: function (num) {
            zzcg.num_zs.update(parseInt($("#cg_blzs").text()) + num);
            zzcg.num_today.update(parseInt($("#cg_bls").text()) + num);
            zzcg.getRandomNum();
        },
        destory: function () {
            if (zzcg.timer != null) {
                window.clearTimeout(zzcg.timer);
                zzcg.timer = null;
            }
        }
    };

    // 公共安全模块
    global.ggaq = {
        startnum: 1, // 当前页码的起始数据行

        telChart: null,

        // 初始化
        init: function () {
            ggaq.telChart = global.ggaq.loadSourceType();
            global.ggaq.loadZdcsPie("ggaq_sw", 0.65);
            global.ggaq.loadZdcsPie("ggaq_sf", 0.78);
        },
        // 报警数
        loadSourceType: function () {
            var data = [{
                value: 143,
                name: dlang.ggaq_110
            }, {
                value: 21,
                name: dlang.ggaq_119
            }, {
                value: 103,
                name: dlang.ggaq_122
            }, {
                value: 87,
                name: dlang.ggaq_120
            }];
            var _fontFamily = 'microsoft yahei',
                _fontSize = 16;
            if(language === 'en-au') {
                _fontFamily = 'AgencyFBBold';
                _fontSize = 20;
            }
            var option = {
                title: {
                    text: dlang.ggaq_bajs,
                    subtext: '354',
                    x: 'center',
                    y: '30%',
                    textStyle: {
                        color: '#fff',
                        fontFamily: _fontFamily,
                        fontSize: _fontSize
                    },
                    subtextStyle: {
                        color: '#fff',
                        fontFamily: "AgencyFBBold",
                        fontSize: 22
                    }
                },
                tooltip: {
                    show: true
                },
                legend: {
                    show: false
                },
                animation: false,
                series: [{
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['65%', '95%'],
                    color: ['#1b70a8', '#26baff', '#8ce2ff', '#2f8fb4'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    data: data
                }]
            };
            var chart = echarts.init($("#ggaq_pie")[0]);
            chart.setOption(option);
            return chart;
        },
        // 特征识别环形图
        loadZdcsPie: function (id, percent) {
            function getData() {
                return [{
                    value: percent,
                    itemStyle: {
                        normal: {
                            color: '#f2c967',
                            shadowBlur: 10,
                            shadowColor: '#f2c967'
                        }
                    }
                }, {
                    value: 1 - percent,
                    itemStyle: {
                        normal: {
                            color: 'transparent'
                        }
                    }
                }];
            }

            var option = {
                title: {
                    text: (percent * 100) + '%',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        color: '#ffffff',
                        fontFamily: "AgencyFBBold",
                        fontSize: 20
                    }
                },
                animation: false,
                series: [{
                    type: 'pie',
                    radius: ['68%', '75%'],
                    silent: true,
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data: [{
                        itemStyle: {
                            normal: {
                                color: '#3da1ee',
                                shadowBlur: 2,
                                shadowColor: '#3da1ee'
                            }
                        }
                    }]
                },
                    {
                        name: 'main',
                        type: 'pie',
                        radius: ['82%', '90%'],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: getData()
                    }
                ]
            };
            var chart = echarts.init($("#" + id)[0]);
            chart.setOption(option);
        },
        // 加载疑似人群
        load_data: function () {
            $(".ggaq-zdcs-wxlist > .ggaq-list-box").eq(0).removeClass("animated bounceOut").addClass("animated bounceOut")
                .one('webkitAnimationEnd', function () {
                    $(this).remove();
                    $(".ggaq-zdcs-wxlist > .ggaq-list-box").eq(0).removeClass("animated slideInUp").addClass("animated slideInUp")
                        .one('webkitAnimationEnd', function () {
                            $(this).removeClass("animated slideInUp");
                            // 加载新数据
                            var len = ggaq_ysrq.length;
                            if (ggaq.startnum > len) {
                                ggaq.startnum = 1;
                            }
                            var idx = ggaq.startnum - 1; // 获取索引值
                            // 判断子项是否多余2个，如果多余2个子项则清除后面的子项内容
                            if ($(".ggaq-zdcs-wxlist > .ggaq-list-box").length > 1) {
                                console.log("疑似人群：多余2个子项.");
                                $(".ggaq-zdcs-wxlist > .ggaq-list-box").eq(0).siblings().remove();
                            }
                            var htmls = '';
                            htmls += '<div class="ggaq-list-box animated bounceIn">';
                            htmls += '<div class="ggaq-li-head">';
                            htmls += '<img src="img/ysry-default.png" height="70" width="54"/>';
                            htmls += '</div>';
                            htmls += '<div class="ggaq-li-info">';
                            htmls += '<div class="ggaq-info-list">';
                            htmls += '<span>' + ggaq_ysrq[idx].name + '</span>';
                            htmls += '<span>' + ggaq_ysrq[idx].sex + '</span>';
                            htmls += '<span>' + ggaq_ysrq[idx].old + '</span>';
                            // htmls += '<span>' + ggaq_ysrq[idx].mz + '</span>';
                            htmls += '</div>';
                            htmls += '<div class="ggaq-info-list">' + ggaq_ysrq[idx].address + '</div>';
                            htmls += '<div class="ggaq-info-list">';
                            htmls += '<span>' + ggaq_ysrq[idx].city + '</span>';
                            htmls += '<span style="float: right;">' + ggaq_ysrq[idx].rtype + '</span>';
                            htmls += '</div>';
                            htmls += '</div>';
                            htmls += '</div>';
                            $(".ggaq-zdcs-wxlist").append(htmls);
                            ggaq.startnum++;
                            $(".ggaq-zdcs-wxlist > .ggaq-list-box.bounceIn").one('webkitAnimationEnd', function () {
                                $(this).removeClass("animated bounceIn");
                            });
                        });
                });
        }
    };

    // 智慧环保模块
    global.zzhb = {
        curnum: 4, // 当前加载数量
        startnum: 1, // 当前页码的起始数据行
        speed: 1000 * 12, // 执行动画时间
        timer: null, // 记录循环执行id

        // 初始化
        init: function () {
            global.zzhb.loadRadar();
            global.zzhb.load_data();
        }
        // 雷达图监测
        , loadRadar: function () {
            var option = {
                tooltip: {
                    show: true
                },
                legend: {
                    show: false
                },
                radar: {
                    splitNumber: 4,
                    splitLine: {
                        lineStyle: {
                            color: '#2b70ab',
                            width: 2
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: '#f2c967',
                            opacity: 0.1
                        }
                    },
                    name: {
                        textStyle: {
                            color: "#ffffff",
                            fontWeight: 'bold',
                            fontFamily: "AgencyFBBold",
                            fontSize: 16
                        }
                    },
                    nameGap: 5,
                    indicator: [
                        {name: 'PM2.5', max: 500},
                        {name: 'NO₂', max: 4000},
                        {name: 'PM10', max: 600},
                        {name: 'SO₂', max: 800},
                        {name: 'CO', max: 150},
                        {name: 'O₃', max: 1200}
                    ]
                },
                series: [{
                    type: 'radar',
                    lineStyle: {
                        normal: {
                            color: '#f2c967'
                        }
                    },

                    areaStyle: {
                        normal: {
                            color: '#f2c967'
                        }
                    },
                    data: [
                        {
                            value: [251, 1254, 427, 521, 100, 876],
                            symbolSize: 0,
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#f2c967',
                                        fontWeight: 'bold',
                                        fontSize: 10
                                    },
                                }
                            }
                        }
                    ]
                }]
            };
            var chart = echarts.init($("#hb_radar")[0]);
            chart.setOption(option);
        },
        // 加载数据
        load_data: function () {
            var len = hb_hupodata.length;
            if (((zzhb.startnum - 1) + zzhb.curnum) > len) {
                zzhb.startnum = 1;
            }
            var idx = zzhb.startnum - 1; // 获取索引值
            var htmls = '';
            htmls += '<li>';
            htmls += '<span>' + dlang.zhhb_hupname + '</span>';
            htmls += '<span>' + dlang.zhhb_shuizhi + '</span>';
            htmls += '<span>' + dlang.zhhb_yyzt + '</span>';
            htmls += '<span>' + dlang.zhhb_dbqk + '</span>';
            htmls += '<span>' + dlang.zhhb_szbh + '</span>';
            htmls += '</li>';
            for (var i = 0; i < 4; i++) {
                htmls += '<li class="animated flipInX">';
                htmls += '<span>' + hb_hupodata[idx].name + '</span>';
                htmls += '<span>' + hb_hupodata[idx].sz + '</span>';
                htmls += '<span>' + hb_hupodata[idx].yyzt + '</span>';
                htmls += '<span>' + hb_hupodata[idx].dbqk + '</span>';
                htmls += '<span>' + hb_hupodata[idx].szbh + '</span>';
                htmls += '</li>';
                idx++;
            }
            $(".smart-hb-water").html(htmls);
            zzhb.startnum += zzhb.curnum;

            zzhb.timer = window.setTimeout("zzhb.load_data()", zzhb.speed);
        },
        destory: function () {
            if (zzhb.timer != null) {
                window.clearTimeout(zzhb.timer);
                zzhb.timer = null;
            }
        }
    };

    //智慧交通模块
    global.zzjt = {
        curnum: 3, // 当前加载数量
        startnum: 1, // 当前页码的起始数据行
        speed: 1000 * 15, // 执行动画时间
        timer: null, // 记录循环执行id

        //初始化
        init: function () {
            global.zzjt.loadSpeedLine();
            global.zzjt.loadAreaList();
        }
        //根据拥堵指数获取颜色值
        , getColor: function (data) {
            if (data < 1.5) {
                return "#66ff66";
            } else if (data > 2.0) {
                return "#ff6666";
            } else {
                return "#ff9966";
            }
        }
        //根据拥堵指数设置内圆环效果
        , setInnerCircle: function (data) {
            var val = parseFloat(data);
            var color = global.zzjt.getColor(val);
            var maxZs = 3; //设置最大拥堵值
            var r = 50; //设置半径
            //计算当前值的百分比
            var progress = parseFloat(val / maxZs);
            // 计算当前的进度对应的角度值
            var degrees = progress * 360;
            // 计算当前角度对应的弧度值
            var rad = degrees * (Math.PI / 180);
            //极坐标转换成直角坐标
            var x = (Math.sin(rad) * r).toFixed(2);
            var y = -(Math.cos(rad) * r).toFixed(2);
            //大于180度时候画大角度弧，小于180度的画小角度弧，(deg > 180) ? 1 : 0
            var lenghty = window.Number(degrees > 180);
            //path 属性
            var descriptions = ['M', 0, -r, 'A', r, r, 0, lenghty, 1, x, y];
            // 给path 设置属性
            $("#jt_cir").attr({"d": descriptions.join(' '), "stroke": color});
        }
        //高峰时刻车速图
        , loadSpeedLine: function () {
            //根据当前时间获取最近8小时数据
            var hours = parseInt($("#lblCHours").text());
            var zsval = zhjt.ydKpi[hours];
            $("#jt_ydzs").text(zsval);
            zzjt.setInnerCircle(zsval);

            var xAxisTime = [];
            for (var i = 8; i > 0; i--) {
                xAxisTime.push((hours - i).toString().length == 1 ? "0" + (hours - i) + ":00" : (hours - i) + ":00");
            }
            var seriesData = zhjt.speedData.slice(hours - 8, hours);
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: 10,
                    right: 45,
                    bottom: 5,
                    top: 15,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxisTime,
                        axisLine: {
                            lineStyle: {
                                color: '#535a69',
                                width: 2
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#fff',
                                fontFamily: "AgencyFBBold",
                                fontSize: 14
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 60,
                        interval: 20,
                        axisLine: {
                            lineStyle: {
                                color: '#535a69',
                                width: 2
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontFamily: "AgencyFBBold",
                                fontSize: 16
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#535a69',
                                opacity: 0.6
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: 'SPEED',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 6,
                        itemStyle: {
                            normal: {
                                color: '#f9bd2e'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#efbd56',
                                width: 4,
                                opacity: 0.8,
                                shadowBlur: 10,
                                shadowColor: '#efbd56'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#efbd56',
                                opacity: 0.25
                            }
                        },
                        data: seriesData
                    }
                ]
            };

            var chart = echarts.init($("#jt_poly")[0]);
            chart.setOption(option);
        }
        //拥堵区域列表
        , loadAreaList: function () {
            var len = zhjt.ydrank.length;
            if (((zzjt.startnum - 1) + zzjt.curnum) > len) {
                zzjt.startnum = 1;
            }
            var idx = zzjt.startnum - 1; // 获取索引值
            var htmls = '';
            var color = ''
            for (var i = 0; i < 3; i++) {
                htmls += '<li class="animated flipInX">';
                htmls += '<div class="jt-ydzs-name">';
                htmls += '<span>' + zhjt.ydrank[idx].name + '</span><span>' + zhjt.ydrank[idx].dir + '</span></div>';
                color = zzjt.getColor(parseFloat(zhjt.ydrank[idx].index));
                htmls += '<div class="jt-ydzs-num yczs"><span class="jt-ydzs-color" style="background-color:' + color + '"></span>';
                htmls += '<span>' + zhjt.ydrank[idx].index + '</span></div> <span class="jt-ydzs-num">' + zhjt.ydrank[idx].speed + '</span>';
                htmls += '</li>';
                idx++;
            }
            $("#jt_ydzs_list").html(htmls);
            zzjt.startnum += zzjt.curnum;

            zzjt.timer = window.setTimeout("zzjt.loadAreaList()", zzjt.speed);
        },
        destory: function () {
            if (zzjt.timer != null) {
                window.clearTimeout(zzjt.timer);
                zzjt.timer = null;
            }
        }
    };
    // 扩展扇形函数
    CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sDeg, eDeg) {
        this.save(); // 初始保存
        this.translate(x, y); // 位移到目标点
        this.beginPath();
        this.arc(0, 0, radius, sDeg, eDeg); // 画出圆弧
        this.save(); // 再次保存以备旋转
        this.rotate(eDeg); // 旋转至起始角度
        this.moveTo(radius, 0); // 移动到终点，准备连接终点与圆心
        this.lineTo(0, 0); // 连接到圆心
        this.restore(); // 还原
        this.rotate(sDeg); // 旋转至起点角度
        this.lineTo(radius, 0); // 从圆心连接到起点
        this.closePath();
        this.restore(); // 还原到最初保存的状态
        return this;
    };
    // Canvas画布模块
    global.pcanvas = {
        init: function () {
            pcanvas.drawZwPie();
            pcanvas.drawSwZzt1();
            pcanvas.drawSwZzt2();
            pcanvas.drawSwZzt3();
        },
        // 智慧政务KPI覆盖指数
        drawZwPie: function () {
            var ctx = document.getElementById('smt-zw-cvs').getContext('2d');
            var img = new Image();
            img.src = "img/zw-pie-2.png";
            img.onload = function () {
                var woodfill = ctx.createPattern(img, "no-repeat");
                ctx.fillStyle = woodfill;
                var deg = Math.PI / 180;
                ctx.sector(70, 70, 70, -90 * deg, 230 * deg).fill();
            }
        },
        drawSwZzt1: function () {
            var ctx = document.getElementById('smt-sw-cvs-1').getContext('2d');
            var deg = Math.PI / 180;
            var img = new Image();
            img.src = "img/ybp-h-2.png";
            img.onload = function () {
                var woodfill = ctx.createPattern(img, "no-repeat");
                ctx.fillStyle = woodfill;
                ctx.sector(46.5, 46.5, 46.5, -180 * deg, -28 * deg).fill();
            };
            var img1 = new Image();
            img1.src = "img/ybp-n-2.png";
            img1.onload = function () {
                var woodfill1 = ctx.createPattern(img1, "no-repeat");
                ctx.fillStyle = woodfill1;
                ctx.sector(46.5, 46.5, 46.5, -180 * deg, -30 * deg).fill();
            };
        },
        drawSwZzt2: function () {
            var ctx = document.getElementById('smt-sw-cvs-2').getContext('2d');
            var deg = Math.PI / 180;
            var img = new Image();
            img.src = "img/ybp-h-2.png";
            img.onload = function () {
                var woodfill = ctx.createPattern(img, "no-repeat");
                ctx.fillStyle = woodfill;
                ctx.sector(46.5, 46.5, 46.5, -180 * deg, -46 * deg).fill();
            };
            var img1 = new Image();
            img1.src = "img/ybp-n-2.png";
            img1.onload = function () {
                var woodfill1 = ctx.createPattern(img1, "no-repeat");
                ctx.fillStyle = woodfill1;
                ctx.sector(46.5, 46.5, 46.5, -180 * deg, -50 * deg).fill();
            };
        },
        drawSwZzt3: function () {
            var ctx = document.getElementById('smt-sw-cvs-3').getContext('2d');
            var deg = Math.PI / 180;
            var img = new Image();
            img.src = "img/ybp-h-2.png";
            img.onload = function () {
                var woodfill = ctx.createPattern(img, "no-repeat");
                ctx.fillStyle = woodfill;
                ctx.sector(46.5, 46.5, 46.5, -180 * deg, -62 * deg).fill();
            };
            var img1 = new Image();
            img1.src = "img/ybp-n-2.png";
            img1.onload = function () {
                var woodfill1 = ctx.createPattern(img1, "no-repeat");
                ctx.fillStyle = woodfill1;
                ctx.sector(46.5, 46.5, 46.5, -180 * deg, -60 * deg).fill();
            };
        }
    };

    // 智慧水务
    global.zhsw = {
        init: function () {
            global.zhsw.loadLineArea();
        },
        // 雷达图监测
        loadLineArea: function () {
            var _fontFamily = 'microsoft yahei',
                _fontSize = 14;
            if(language === 'en-au') {
                _fontFamily = 'AgencyFBBold';
                _fontSize = 16;
            }
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: 15,
                    right: 25,
                    bottom: 5,
                    top: 10,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: [dlang.zhsw_hs, dlang.zhsw_wc, dlang.zhsw_jh, dlang.zhsw_ja, dlang.zhsw_hy, dlang.zhsw_qk, dlang.zhsw_qs],
                        axisLine: {
                            lineStyle: {
                                color: '#535a69',
                                width: 2
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontFamily: _fontFamily,
                                fontSize: _fontSize
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0.1,
                        max: 0.5,
                        axisLine: {
                            lineStyle: {
                                color: '#535a69',
                                width: 2
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontFamily: "AgencyFBBold",
                                fontSize: 16
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#535a69',
                                opacity: 0.6
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: 'MPA',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 6,
                        itemStyle: {
                            normal: {
                                color: '#f9bd2e'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#efbd56',
                                width: 4,
                                opacity: 0.8,
                                shadowBlur: 10,
                                shadowColor: '#efbd56'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#efbd56',
                                opacity: 0.25
                            }
                        },
                        data: [0.26, 0.32, 0.28, 0.39, 0.34, 0.33, 0.41]
                    }
                ]
            };
            var chart = echarts.init($("#smt-sw-mpaarea")[0]);
            chart.setOption(option);
        }
    };

    // 智慧政务
    global.zhzw = {
        curnum: 3, // 当前加载数量
        startnum: 1, // 当前页码的起始数据行
        speed: 1000 * 10, // 执行动画时间
        timer: null, // 记录循环执行id
        init: function () {
            global.zhzw.load_data();
        },
        // 加载数据
        load_data: function () {
            var len = zwdata.length;
            if (((zhzw.startnum - 1) + zhzw.curnum) > len) {
                zhzw.startnum = 1;
            }
            var idx = zhzw.startnum - 1; // 获取索引值
            var htmls = '';
            for (var i = 0; i < 3; i++) {
                htmls += '<tr class="animated flipInX">';
                htmls += '<td>' + zwdata[idx].name + '</td>';
                htmls += '<td>' + zwdata[idx].dept + '</td>';
                htmls += '<td>' + zwdata[idx].time + '</td>';
                htmls += '</tr>';
                idx++;
            }
            $(".smt-zw-table tbody").html(htmls);
            zhzw.startnum += zhzw.curnum;

            zhzw.timer = window.setTimeout("zhzw.load_data()", zhzw.speed);
        },
        destory: function () {
            if (zhzw.timer != null) {
                window.clearTimeout(zhzw.timer);
                zhzw.timer = null;
            }
        }
    };

    // 总览--各模块隐藏/显示动画
    global.zlwin = {
        init: function () {
            $(".mtab-box > li").bind("click", function () {
                if (!$(this).hasClass("selected")) {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    var idx = $(".mtab-box > li").index(this);
                    switch (idx) {
                        case 0: // 总览
                            // 清除突发事件相关事件
                            emergency.destory();
                            break;
                        case 1: // 突发
                            // 清除总览的常态动画
                            emergency.clearZlTimer();
                            // 清除总览的窗口
                            global.zlwin.hide();
                            break;
                    }
                }
            });
        },
        hide: function () {
            $(".mkpi-box").addClass("zoomOutUp animated").one('webkitAnimationEnd', function () {
                $(this).removeClass("zoomOutUp animated").hide();
            });
            window.setTimeout(function () {
                $(".smart-cg-box").addClass("fadeOutLeft animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeOutLeft animated").hide();
                    });
            }, 300);
            window.setTimeout(function () {
                $(".smart-ggaq-box").addClass("fadeOutLeft animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeOutLeft animated").hide();
                    });
            }, 400);
            window.setTimeout(function () {
                $(".smart-zw-box").addClass("fadeOutRight animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeOutRight animated").hide();
                    });
            }, 350);
            window.setTimeout(function () {
                $(".smart-sw-box").addClass("fadeOutRight animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeOutRight animated").hide();
                    });
            }, 450);
            window.setTimeout(function () {
                $(".smart-hb-box").addClass("fadeOutDown animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeOutDown animated").hide();
                    });
            }, 320);
            window.setTimeout(function () {
                $(".smart-jt-box").addClass("fadeOutDown animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeOutDown animated").hide();
                        // 加载突发事件相关事件
                        emergency.init();
                    });
            }, 460);
        },
        show: function () {
            $("#windIcon").fadeOut(500, function () {
                $("#weatherIcon").fadeIn(500);
            });
            $(".fengliBox").fadeOut(500, function () {
                $(".wenduBox").fadeIn(500);
            });
            $(".mkpi-box").show().addClass("zoomInUp animated").one('webkitAnimationEnd', function () {
                $(this).removeClass("zoomInUp animated");
            });
            window.setTimeout(function () {
                $(".smart-cg-box").show().addClass("fadeInLeft animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeInLeft animated");
                    });
            }, 300);
            window.setTimeout(function () {
                $(".smart-ggaq-box").show().addClass("fadeInLeft animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeInLeft animated");
                    });
            }, 400);
            window.setTimeout(function () {
                $(".smart-zw-box").show().addClass("fadeInRight animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeInRight animated");
                    });
            }, 350);
            window.setTimeout(function () {
                $(".smart-sw-box").show().addClass("fadeInRight animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeInRight animated");
                    });
            }, 450);
            window.setTimeout(function () {
                $(".smart-hb-box").show().addClass("fadeInUp animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeInUp animated");
                    });
            }, 320);
            window.setTimeout(function () {
                $(".smart-jt-box").show().addClass("fadeInUp animated")
                    .one('webkitAnimationEnd', function () {
                        $(this).removeClass("fadeInUp animated");
                        // 重载总览窗口的常态循环动画
                        emergency.reloadZlTimer();
                    });
            }, 460);
        }
    };

})(window);