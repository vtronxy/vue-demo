(function() {
    window.pmap = {
        map: null,
        map25d: null,
        blayerTemplate: {
            vector: "http://api2.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20161109&scale=1&styles=t%3Awater%7Ce%3Aall%7Cc%3A%23044161%2Ct%3Aland%7Ce%3Aall%7Cc%3A%23091934%2Ct%3Aboundary%7Ce%3Ag%7Cc%3A%23064f85%2Ct%3Arailway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Ahighway%7Ce%3Ag%7Cc%3A%23004981%2Ct%3Ahighway%7Ce%3Ag.f%7Cc%3A%23005b96%7Cl%3A1%2Ct%3Ahighway%7Ce%3Al%7Cv%3Aon%2Ct%3Aarterial%7Ce%3Ag%7Cc%3A%23004981%7Cl%3A-39%2Ct%3Aarterial%7Ce%3Ag.f%7Cc%3A%2300508b%2Ct%3Agreen%7Ce%3Aall%7Cv%3Aoff%7Cc%3A%23056197%2Ct%3Asubway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Amanmade%7Ce%3Aall%7Cv%3Aoff%2Ct%3Alocal%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aarterial%7Ce%3Al%7Cv%3Aon%2Ct%3Aboundary%7Ce%3Ag.f%7Cc%3A%23029fd4%2Ct%3Abuilding%7Ce%3Aall%7Cc%3A%231a5787%2Ct%3Apoi%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aall%7Ce%3Al%7Cv%3Aoff",
            image: "http://shangetu1.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20130506"
        },
        colors: ["#ebbc4f", "#ebda4f", "#c29425", "#f2a867", "#f4dda6", "#fff7e3"],
        Timer: {
            station: null,
            zdcs: null,
            stlay: null,
            jtsg: null,
            jttel: null,
            zpwg: null,
            reload: null
        },
        stations: [{
            id: "station_wcz",
            start: 2900,
            end: 2901,
            point: [114.324353, 30.534239],
            dataStat: null
        },
        {
            id: "station_hkz",
            start: 2180,
            end: 2621,
            point: [114.260807, 30.62553],
            dataStat: null
        },
        {
            id: "station_whz",
            start: 1960,
            end: 2021,
            point: [114.430977, 30.612767],
            dataStat: null
        }],
        czbkOption: null,
        init: function() {
            var a = new maptalks.TileLayer("base", {
                urlTemplate: pmap.blayerTemplate.vector
            });
            var b = new maptalks.Map("map", {
                center: [114.340061, 30.543746],
                zoom: 13,
                minZoom: 1,
                maxZoom: 19,
                view: {
                    projection: "baidu"
                },
                baseLayer: a
            });
            pmap.map = b;
            pmap.loadStationPos();
            pmap.playCarGujiAnim();
            pmap.loadCaseTimer()
        },
        resetMap: function() {
            pmap.map.setZoom(13);
            pmap.map.panTo(new maptalks.Point(114.340061, 30.543746))
        },
        destory: function() {
            clearInterval(pmap.Timer.station);
            clearTimeout(pmap.Timer.zdcs);
            clearTimeout(pmap.Timer.stlay);
            clearInterval(pmap.Timer.jtsg);
            clearInterval(pmap.Timer.jttel);
            clearInterval(pmap.Timer.zpwg);
            clearTimeout(pmap.Timer.reload);
            $(".station_marker,.case").hide();
            pmap.map.getLayer("e3").hide()
        },
        reload: function() {
            $(".station_marker,.case").show();
            pmap.map.getLayer("e3").show();
            pmap.Timer.reload = setTimeout(function() {
                pmap.loadStaNumChange();
                pmap.loadStatDanger();
                pmap.loadCaseTimer()
            },
            10 * 1000)
        },
        setOption: function(l) {
            var a = [];
            var h = l.features.length;
            var f = 300 / (h - 1);
            for (var e = 0; e < h; e++) {
                var k = l.features[e];
                var o = [];
                for (var d = 0; d < k.geometry.paths.length; d++) {
                    var m = k.geometry.paths[d];
                    o = o.concat(m)
                }
                var c = pmap.colors[Math.floor(Math.random() * pmap.colors.length)];
                var g = [3, 4, 5, 6];
                for (var b = 0; b < 2; b++) {
                    a.push({
                        coords: o,
                        lineStyle: {
                            normal: {
                                color: c
                            }
                        }
                    })
                }
            }
            return a
        },
        playCarGujiAnim: function() {
            var c = pmap.setOption(car_wuhan);
            var b = {
                series: [{
                    type: "lines",
                    coordinateSystem: "bmap",
                    polyline: true,
                    data: c,
                    silent: true,
                    lineStyle: {
                        normal: {
                            opacity: 0,
                            width: 0
                        }
                    },
                    progressiveThreshold: 500,
                    progressive: 200
                },
                {
                    type: "lines",
                    coordinateSystem: "bmap",
                    polyline: true,
                    data: c,
                    lineStyle: {
                        normal: {
                            width: 0,
                        }
                    },
                    effect: {
                        constantSpeed: 20,
                        show: true,
                        trailLength: 0.7,
                        symbolSize: 2,
                    },
                    zlevel: 1
                }]
            };
            var a = new maptalks.E3Layer("e3", b).addTo(pmap.map)
        },
        loadStationPos: function() {
            var c = "";
            for (var b = 0; b < pmap.stations.length; b++) {
                c = '<div id="' + pmap.stations[b].id + '" class="station_marker ' + pmap.stations[b].id + '">';
                c += '<div class="dataStatistics">';
                c += '<div class="digit_set"></div>';
                c += '<div class="digit_set"></div>';
                c += '<div class="digit_set"></div>';
                c += '<div class="digit_set"></div>';
                c += '<div class="digit_set set_last"></div>';
                c += "</div></div>";
                var a = new maptalks.ui.UIMarker(pmap.stations[b].point, {
                    draggable: false,
                    single: false,
                    content: c
                });
                a.addTo(pmap.map).show();
                pmap.stations[b].dataStat = $("#" + pmap.stations[b].id).dataStatistics({
                    start: pmap.stations[b].start,
                    end: pmap.stations[b].end,
                    time: 1000,
                    len: 5
                })
            }
            pmap.Timer.stlay = setTimeout(function() {
                pmap.loadStaNumChange();
                pmap.loadStatDanger()
            },
            10 * 1000)
        },
        loadStaNumChange: function() {
            pmap.Timer.station = setInterval(function() {
                var b = Math.round(Math.random() * 2);
                var a = (Math.random() > 0.5 ? 1 : -1) * parseInt(Math.random() * 50 + 50);
                pmap.stations[b].dataStat.Update(a)
            },
            5 * 1000)
        },
        loadStatDanger: function() {
            var a = Math.round(Math.random() * 2);
            var c = pmap.stations[a];
            var b = parseInt(Math.random() * 2 + 1);
            pmap.Timer.zdcs = setTimeout(function() {
                var d = pmap.coordToContain(c.point);
                pmap.playStarTrack(d, map_pos.zdcs,
                function() {
                    c.dataStat.Update(1);
                    ggaq.load_data();
                    pmap.loadStatDanger();
                    $("#zdcs_num").text(parseInt($("#zdcs_num").text(), 10) + 1)
                })
            },
            b * 30 * 1000)
        },
        loadCaseTimer: function() {
            var a = 30;
            pmap.Timer.jtsg = setInterval(function() {
                pmap.loadRandCase("0",
                function(b) {
                    pmap.playStarTrack(b, map_pos.jtsg,
                    function() {
                        $("#jt_sgs").text(parseInt($("#jt_sgs").text()) + 1)
                    })
                })
            },
            ((1 * a) + 10) * 1000);
            pmap.Timer.zpwg = setInterval(function() {
                pmap.loadRandCase("2",
                function(b) {
                    pmap.playStarTrack(b, map_pos.zpwg,
                    function() {
                        $("#jt_zpwg").text(parseInt($("#jt_zpwg").text()) + 1)
                    })
                })
            },
            ((5 * a) - 20) * 1000);
            pmap.Timer.jttel = setInterval(function() {
                pmap.loadRandCase("1",
                function(b) {
                    pmap.playStarTrack(b, map_pos.jttel,
                    function() {
                        $("#ggaq_jt").text(parseInt($("#ggaq_jt").text()) + 1);
                        var c = ggaq.telChart.getOption();
                        c.title[0].subtext = parseInt(c.title[0].subtext) + 1;
                        c.series[0].data[2].value = parseInt(c.series[0].data[2].value) + 1;
                        ggaq.telChart.setOption(c)
                    })
                })
            },
            ((2 * a) + 40) * 1000)
        },
        loadRandCase: function(d, f) {
            var c = "";
            switch (d) {
            case "0":
                c = "";
                break;
            case "1":
                c = "tel";
                break;
            case "2":
                c = "wg";
                break
            }
            var a = map_case[Math.round(Math.random() * 185)];
            var e = "<div class='case " + c + "'></div>";
            var b = new maptalks.ui.UIMarker(a, {
                draggable: false,
                single: true,
                content: e
            });
            b.addTo(pmap.map).show();
            if (typeof f == "function") {
                f(pmap.coordToContain(a));
                setTimeout(function() {
                    $(".case").fadeOut()
                },
                10 * 1000)
            }
        },
        coordToContain: function(a) {
            var b = new maptalks.Coordinate(a);
            return pmap.map.coordinateToContainerPoint(b)
        },
        playStarTrack: function(e, a, d) {
            var c = pmap.getAngle(e.x, e.y, a.x, a.y);
            if (e.x < a.x) {
                c = c + 180
            }
            var b = $("<div class='star'></div>");
            b.appendTo($("body")).css({
                left: e.x - 62 + "px",
                top: e.y - 62 + "px",
                transform: "rotate(" + c + "deg)"
            }).animate({
                left: a.x + "px",
                top: a.y + "px",
            },
            2000,
            function() {
                b.remove();
                if (typeof d == "function") {
                    d()
                }
            })
        },
        getAngle: function(d, c, f, e) {
            var b = f - d,
            a = e - c;
            return 360 * Math.atan(a / b) / (2 * Math.PI)
        },
        switchBaseMap: function(a) {
            var b = null;
            switch (a) {
            case "image":
                b = new maptalks.TileLayer("base", {
                    urlTemplate: pmap.blayerTemplate.image,
                    subdomains: ["01", "02", "03", "04"]
                });
                break;
            case "vector":
                b = new maptalks.TileLayer("base", {
                    urlTemplate: pmap.blayerTemplate.vector
                });
                break
            }
            pmap.map.setBaseLayer(b)
        },
        loadBaiduStreet: function() {
            var a = new BMap.Panorama("street-mapbox");
            a.setPosition(new BMap.Point(114.339521, 30.543566));
            a.setPov({
                heading: 110,
                pitch: 42
            })
        },
        loadChuTian25d: function() {
            var a = new maptalks.TileLayer("tile", {
                tileSystem: [1, -1, 0, 0],
                urlTemplate: function(b, d, c) {
                    return "http://wuhan.ctmap.cn/whMapPic/1/3_" + (6 - c) + "/" + b + "," + d + ".jpg"
                }
            });
            a.on("layerload",
            function() {
                if (pmap.map25d == null) {
                    return
                }
                if (!pmap.map25d.getLayer("houseLayer")) {
                    var b = new maptalks.VectorLayer("houseLayer");
                    pmap.map25d.addLayer(b);
                    var c = new maptalks.Polygon([fire_build_data], {
                        symbol: {
                            polygonFill: "#ffe100",
                            lineOpacity: 1,
                            lineWidth: 2,
                            lineColor: "#fff000",
                            polygonOpacity: 0.1
                        }
                    }).addTo(b);
                    c.on("mouseover",
                    function(d) {
                        d.target.updateSymbol({
                            polygonOpacity: 0.4
                        })
                    });
                    c.on("mouseout",
                    function(d) {
                        d.target.updateSymbol({
                            polygonOpacity: 0.1
                        })
                    });
                    c.on("click",
                    function(d) {
                        emergency.fhtbuild.showBuildWin()
                    })
                }
            });
            pmap.map25d = maptalks.Map("25d-mapbox", {
                center: [712834, 1394526],
                centerCross: false,
                zoom: 3,
                zoomControl: false,
                view: {
                    projection: "identity",
                    resolutions: [null, 16, 8, 4, 2],
                    fullExtent: {
                        top: 0,
                        bottom: 10000000,
                        left: 0,
                        right: 10000000
                    }
                },
                baseLayer: a
            })
        },
        uimarker_fire: null,
        loadFireEvent: function() {
            var a = "<canvas id='surface'></canvas>";
            pmap.uimarker_fire = new maptalks.ui.UIMarker([114.339891, 30.543266], {
                draggable: false,
                single: false,
                content: a,
                dx: 60,
                dy: -100,
                animationOnHide: false
            });
            pmap.uimarker_fire.addTo(pmap.map).show();
            $("#surface").drawFlame();
            pmap.map.setZoom(18);
            pmap.map.panTo(new maptalks.Point(114.340061, 30.543746))
        },
        remove_fire: function() {
            if (pmap.uimarker_fire != null) {
                pmap.uimarker_fire.remove();
                pmap.uimarker_fire = null
            }
        },
        layer_jtlk: null,
        load_jtlt_layer: function() {
            var a = new Date().getTime();
            pmap.layer_jtlk = new maptalks.TileLayer("ly_jtlk", {
                urlTemplate: "http://its.map.baidu.com:8002/traffic/TrafficTileService?time=" + a + "&v=016&level={z}&x={x}&y={y}"
            }).addTo(pmap.map)
        },
        remove_jtlt_layer: function() {
            if (pmap.layer_jtlk != null) {
                pmap.layer_jtlk.remove();
                pmap.layer_jtlk = null
            }
        },
        layer_sdqyxfw: null,
        sdqyfw_yxarea: null,
        uimarker_yxinfo: null,
        load_sdqyxfw_layer: function(d, f) {
            var a = null,
            b = null,
            c = null;
            switch (d) {
            case "rq":
                a = [rq_area_fwei];
                b = "#3da1ee";
                c = [114.341108, 30.544623];
                break;
            case "gs":
                a = [gs_area_fwei];
                b = "#f2c967";
                c = [114.340735, 30.543748];
                break;
            case "dl":
                a = [dl_area_fwei];
                b = "#2db57a";
                c = [114.339599, 30.544113];
                break
            }
            var e = {
                polygonFill: b,
                lineOpacity: 0.8,
                lineWidth: 2,
                lineColor: b,
                polygonOpacity: 0.3
            };
            if (pmap.layer_sdqyxfw != null && pmap.sdqyfw_yxarea != null) {
                pmap.sdqyfw_yxarea.setId(d).setCoordinates(a).setSymbol(e);
                pmap.layer_sdqyxfw.opts = {
                    yxpoint: c,
                    content: f
                }
            } else {
                pmap.layer_sdqyxfw = new maptalks.VectorLayer("ly_sdqyxfw");
                pmap.map.addLayer(pmap.layer_sdqyxfw);
                pmap.sdqyfw_yxarea = new maptalks.Polygon(a, {
                    id: d,
                    symbol: e
                }).addTo(pmap.layer_sdqyxfw);
                pmap.layer_sdqyxfw.opts = {
                    yxpoint: c,
                    content: f
                };
                if (pmap.sdqyfw_yxarea != null) {
                    pmap.sdqyfw_yxarea.on("mouseover",
                    function(h) {
                        var g = h.target.getSymbol();
                        g.polygonOpacity = 0.5;
                        h.target.setSymbol(g)
                    });
                    pmap.sdqyfw_yxarea.on("mouseout",
                    function(h) {
                        var g = h.target.getSymbol();
                        g.polygonOpacity = 0.3;
                        h.target.setSymbol(g)
                    });
                    pmap.sdqyfw_yxarea.on("click", pmap.show_uimarker_yxinfo)
                }
            }
            if (pmap.uimarker_yxinfo != null) {
                pmap.uimarker_yxinfo.remove()
            }
            pmap.uimarker_yxinfo = new maptalks.ui.UIMarker(c, {
                draggable: false,
                single: true,
                content: f,
                dx: -540,
                dy: -400,
                animationOnHide: false
            }).addTo(pmap.map).show()
        },
        remove_sdqyxfw_layer: function() {
            pmap.close_uimarker_yxinfo();
            if (pmap.layer_sdqyxfw != null) {
                pmap.layer_sdqyxfw.remove();
                pmap.layer_sdqyxfw = null;
                pmap.sdqyfw_yxarea = null
            }
        },
        show_uimarker_yxinfo: function(a) {
            a.domEvent.stopPropagation();
            var b = a.target.getId();
            if (pmap.uimarker_yxinfo == null && pmap.layer_sdqyxfw != null) {
                pmap.uimarker_yxinfo = new maptalks.ui.UIMarker(pmap.layer_sdqyxfw.opts.yxpoint, {
                    draggable: false,
                    single: true,
                    content: pmap.layer_sdqyxfw.opts.content,
                    dx: -540,
                    dy: -400,
                    animationOnHide: false
                }).addTo(pmap.map).show()
            }
        },
        close_uimarker_yxinfo: function() {
            event.stopPropagation();
            if (pmap.uimarker_yxinfo != null) {
                pmap.uimarker_yxinfo.remove();
                pmap.uimarker_yxinfo = null
            }
        },
        layer_hzqyfsx: null,
        uimarker_fsxinfo: null,
        load_hzqyfsx_layer: function(c) {
            pmap.layer_hzqyfsx = new maptalks.VectorLayer("ly_hzqyfsx");
            pmap.map.addLayer(pmap.layer_hzqyfsx);
            var d = new maptalks.Polygon([fsx_area_fwei], {
                symbol: {
                    polygonFill: "#43b0f0",
                    polygonOpacity: 0.1,
                    lineOpacity: 0.8,
                    lineWidth: 4,
                    lineColor: "#f6c27e",
                    lineDasharray: [10, 8]
                }
            }).addTo(pmap.layer_hzqyfsx);
            pmap.layer_hzqyfsx.opts = {
                content: c
            };
            if (d != null) {
                d.on("mouseover",
                function(g) {
                    var f = g.target.getSymbol();
                    f.polygonOpacity = 0.5;
                    g.target.setSymbol(f)
                });
                d.on("mouseout",
                function(g) {
                    var f = g.target.getSymbol();
                    f.polygonOpacity = 0.3;
                    g.target.setSymbol(f)
                });
                d.on("click", pmap.show_uimarker_fsxinfo)
            }
            var b = new maptalks.Marker([114.339855, 30.544452], {
                symbol: {
                    markerFile: "img/luzhang.png",
                    markerOpacity: 1,
                    markerWidth: 60,
                    markerHeight: 38,
                    markerDx: 12,
                    markerDy: 0
                }
            }).addTo(pmap.layer_hzqyfsx);
            var a = new maptalks.Marker([114.338571, 30.541967], {
                symbol: {
                    markerFile: "img/luzhang.png",
                    markerOpacity: 1,
                    markerWidth: 60,
                    markerHeight: 38,
                    markerDx: 12,
                    markerDy: 0
                }
            }).addTo(pmap.layer_hzqyfsx);
            if (pmap.uimarker_fsxinfo != null) {
                pmap.uimarker_fsxinfo.remove()
            }
            pmap.uimarker_fsxinfo = new maptalks.ui.UIMarker([114.339635, 30.54416], {
                draggable: false,
                single: false,
                content: c,
                dx: -990,
                dy: -340,
                animationOnHide: false
            }).addTo(pmap.map).show()
        },
        remove_hzqyfsx_layer: function() {
            pmap.close_uimarker_fsxinfo();
            if (pmap.layer_hzqyfsx != null) {
                pmap.layer_hzqyfsx.remove();
                pmap.layer_hzqyfsx = null
            }
        },
        show_uimarker_fsxinfo: function(a) {
            a.domEvent.stopPropagation();
            if (pmap.uimarker_fsxinfo == null && pmap.layer_hzqyfsx != null) {
                pmap.uimarker_fsxinfo = new maptalks.ui.UIMarker([114.339635, 30.54416], {
                    draggable: false,
                    single: false,
                    content: pmap.layer_hzqyfsx.opts.content,
                    dx: -990,
                    dy: -340,
                    animationOnHide: false
                }).addTo(pmap.map).show()
            }
        },
        close_uimarker_fsxinfo: function() {
            event.stopPropagation();
            if (pmap.uimarker_fsxinfo != null) {
                pmap.uimarker_fsxinfo.remove();
                pmap.uimarker_fsxinfo = null
            }
        },
        layer_lujingghua: null,
        load_lujinggh_layer: function() {
            pmap.map.setZoom(17);
            pmap.map.panTo(new maptalks.Point(114.336917, 30.540511));
            pmap.layer_lujingghua = new maptalks.VectorLayer("ly_lujingghua");
            pmap.map.addLayer(pmap.layer_lujingghua);
            var a = new maptalks.LineString(lujing_guihua_line.zjlujing, {
                symbol: {
                    lineWidth: 10,
                    lineColor: "rgba(84,164,255,1)",
                    lineOpacity: 0.8,
                    lineDasharray: [20, 20],
                    lineCap: "round"
                }
            }).addTo(pmap.layer_lujingghua);
            var f = new maptalks.Marker([114.340031, 30.535935], {
                symbol: {
                    markerFile: "img/roadworks.png",
                    markerWidth: 39,
                    markerHeight: 36,
                }
            }).addTo(pmap.layer_lujingghua);
            var c = new maptalks.LineString(lujing_guihua_line.ghlujing, {
                symbol: [{
                    lineWidth: 10,
                    lineColor: "rgba(84,164,255,1)",
                    lineCap: "round"
                },
                {
                    lineWidth: 10,
                    linePatternFile: "img/arrow.png",
                    lineCap: "round"
                }]
            }).addTo(pmap.layer_lujingghua).animateShow({
                duration: 15000,
                easing: "out"
            });
            var d = "img/marker/icon-xf-1.png";
            if (language === "en-au") {
                d = "img/marker/icon-xf-1-en.png"
            }
            var e = new maptalks.Marker(lujing_guihua_line.ghlujing[0], {
                symbol: {
                    markerFile: d,
                    markerDx: 46,
                    markerDy: 19,
                    markerOpacity: 0.8
                }
            }).addTo(pmap.layer_lujingghua);
            var b = new maptalks.Marker(lujing_guihua_line.ghlujing[lujing_guihua_line.ghlujing.length - 1], {
                symbol: {
                    markerFile: "img/marker/end.png",
                    markerDx: 5,
                    markerDy: -3,
                    markerOpacity: 0.8
                }
            }).addTo(pmap.layer_lujingghua)
        },
        remove_lujinggh_layer: function() {
            if (pmap.layer_lujingghua != null) {
                pmap.map.setZoom(18);
                pmap.map.panTo(new maptalks.Point(114.339891, 30.543266));
                pmap.layer_lujingghua.remove();
                pmap.layer_lujingghua = null
            }
        },
        loadCzbkPos: function(g, a) {
            pmap.map.setZoom(a);
            var e = pmap.map.getLayer("czbk");
            if (e == null) {
                var f = function() {
                    var o = function(u) {
                        var t = [];
                        for (var s = 0; s < u.length; s++) {
                            var q = u[s];
                            var p = geoCoordMap[q[1].name];
                            var r = geoCoordMap[q[0].name];
                            if (p && r) {
                                t.push({
                                    fromName: q[1].name,
                                    toName: q[0].name,
                                    coords: [p, r]
                                })
                            }
                        }
                        return t
                    };
                    var h = ["#e14a4a", "#227fe6", "#addf44", "#de7445", "#094fa8", "#ebb143", "#5ccd9f"];
                    var m = [];
                    var n = {
                        xf: false,
                        zbjl: false,
                        zdqy: false,
                        yl: false,
                        rq: false,
                        sw: false,
                        dl: false
                    };
                    var l = g.split(",");
                    for (var k = 0; k < l.length; k++) {
                        n[l[k]] = true
                    } [["xf", xfData], ["zbjl", zbjlData], ["zdqy", zdyqData], ["yl", ylData], ["rq", rqData], ["sw", swData], ["dl", dlData]].forEach(function(q, p) {
                        m.push({
                            name: q[0],
                            type: "scatter",
                            coordinateSystem: "geo",
                            zlevel: 2,
                            label: {
                                normal: {
                                    show: false,
                                    position: "right",
                                    formatter: "{b}"
                                }
                            },
                            symbolSize: [125, 60],
                            symbolOffset: [44, -12],
                            itemStyle: {
                                normal: {
                                    color: h[p],
                                    opacity: 0.9
                                }
                            },
                            data: q[1].map(function(i) {
                                return {
                                    symbol: (language === "en-au") ? i[2].symbol.replace(".png", "-en.png") : i[2].symbol,
                                    name: i[1].name,
                                    value: geoCoordMap[i[1].name],
                                    key: i[1].key
                                }
                            })
                        })
                    });
                    var j = {
                        tooltip: {
                            formatter: function(i) {
                                return dlang[i.data.key]
                            }
                        },
                        legend: {
                            show: false,
                            data: ["xf", "zbjl", "zdqy", "yl", "rq", "sw", "dl"],
                            selectedMode: "multiple",
                            selected: n
                        },
                        series: m
                    };
                    pmap.map.czbkOption = j;
                    return j
                };
                new maptalks.E3Layer("czbk", f()).addTo(pmap.map)
            } else {
                e.show();
                var b = e.getEChartsOption();
                var d = g.split(",");
                for (var c = 0; c < d.length; c++) {
                    b.legend.selected[d[c]] = true
                }
                e.setEChartsOption(b)
            }
        },
        hideCzbkPos: function(e) {
            var d = pmap.map.getLayer("czbk");
            if (d != null) {
                var a = d.getEChartsOption();
                var c = e.split(",");
                for (var b = 0; b < c.length; b++) {
                    a.legend.selected[c[b]] = false
                }
                d.setEChartsOption(a)
            }
            if ($(".czbf-tbox-icon.hide").length == 0) {
                pmap.map.setZoom(18);
                pmap.map.panTo(new maptalks.Point(114.340061, 30.543746));
                d.hide()
            }
        },
        remove_czbk_layer: function() {
            var a = pmap.map.getLayer("czbk");
            if (a != null) {
                a.remove()
            }
        }
    }
})();