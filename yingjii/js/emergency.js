(function() {
	window.emergency = {
		init: function() {
			emergency.zygis.loadFireEvent();
			geobat.init();
			window.setTimeout(function() {
				emergency.xf.loadZbjlChart();
				emergency.yl.loadRedChart();
				emergency.zdqy.init();
				emergency.zygis.init();
				emergency.event.init();
				emergency.fhtbuild.init();
				emergency.tfwin.show()
			}, 800)
		},
		destory: function() {
			$("ul.tfj-gis-yxlx > li").removeClass("selected");
			pmap.remove_jtlt_layer();
			pmap.remove_sdqyxfw_layer();
			pmap.remove_czbk_layer();
			$(".czbf-tbox-icon").removeClass("hide");
			pmap.remove_hzqyfsx_layer();
			pmap.remove_lujinggh_layer();
			$(".czbf-main-btn").removeClass("selected");
			pmap.remove_fire();
			$("#czlcjl_list").empty();
			pmap.switchBaseMap("vector");
			pmap.resetMap();
			$("#25d-mapbox").empty();
			if (pmap.map25d != null) {
				pmap.map25d = null
			}
			$("#street-mapbox").empty();
			$("#tfwin-fwrk-infbox").remove();
			$(".tfsj-fht-box").hide();
			emergency.tfwin.hide()
		},
		clearZlTimer: function() {
			zhzw.destory();
			zzjt.destory();
			zzhb.destory();
			pmap.destory()
		},
		reloadZlTimer: function() {
			zhzw.load_data();
			zzjt.loadAreaList();
			zzhb.load_data();
			pmap.reload()
		},
		initMapSwitch: function() {
			$("ul.mapgis-box > li").bind("click", function() {
				if (!$(this).hasClass("selected")) {
					$(this).addClass("selected").siblings().removeClass("selected");
					var a = $(this).attr("xtype");
					switch (a) {
					case "mvec":
						pmap.switchBaseMap("vector");
						break;
					case "mimg":
						pmap.switchBaseMap("image");
						break
					}
				}
			})
		}
	};
	emergency.tfwin = {
		show: function() {
			$("#weatherIcon").fadeOut(500, function() {
				$("#windIcon").fadeIn(500)
			});
			$(".wenduBox").fadeOut(500, function() {
				$(".fengliBox").fadeIn(500)
			});
			window.setTimeout(function() {
				$("ul.mapgis-box").show().addClass("fadeIn animated").one("webkitAnimationEnd", function() {
					$(this).removeClass("fadeIn animated")
				});
				$(".tfsj-czlcjl-box").show().addClass("fadeInUp animated").one("webkitAnimationEnd", function() {
					$(this).removeClass("fadeInUp animated")
				})
			}, 200);
			window.setTimeout(function() {
				$(".tfsj-gis-box").show().addClass("fadeInLeft animated").one("webkitAnimationEnd", function() {
					$(this).removeClass("fadeInLeft animated")
				})
			}, 300);
			window.setTimeout(function() {
				$(".tfsj-czbf-box").show().addClass("fadeInRight animated").one("webkitAnimationEnd", function() {
					$(this).removeClass("fadeInRight animated");
					window.setTimeout(function() {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_zhzxbjss)
					}, 1000 * 3)
				})
			}, 350)
		},
		hide: function() {
			window.setTimeout(function() {
				$("ul.mapgis-box").addClass("fadeOut animated").one("webkitAnimationEnd", function() {
					$(this).removeClass("fadeOut animated").hide()
				});
				$(".tfsj-czlcjl-box").addClass("fadeOutDown animated").one("webkitAnimationEnd", function() {
					$(this).removeClass("fadeOutDown animated").hide()
				})
			}, 200);
			window.setTimeout(function() {
				$(".tfsj-gis-box").addClass("fadeOutLeft animated").one("webkitAnimationEnd", function() {
					$(this).removeClass("fadeOutLeft animated").hide()
				})
			}, 300);
			window.setTimeout(function() {
				$(".tfsj-czbf-box").addClass("fadeOutRight animated").one("webkitAnimationEnd", function() {
					$(this).removeClass("fadeOutRight animated").hide();
					zlwin.show()
				})
			}, 350)
		},
		infowin: function(d) {
			if ($("#" + d.id).length <= 0) {
				var b = "";
				b += '<div id="' + d.id + '" class="infwin-box" xtype="' + d.xtype + '">';
				b += '<div class="infwin-ctbox">';
				b += '<div class="infwin-border-lt"></div>';
				b += '<div class="infwin-border-rt"></div>';
				b += '<div class="infwin-border-lb"></div>';
				b += '<div class="infwin-border-rb"></div>';
				b += '<div class="infwin-line"></div>';
				b += '<div class="infwin-content">';
				b += '<div class="infwin-ctitle"><span>' + d.title + "</span>";
				b += '<div class="infwin-ctitle-close" onclick="' + d.close + '"></div></div>';
				b += '<div class="infwin-contbox">' + d.content + "</div>";
				b += "</div>";
				b += "</div>";
				b += "</div>";
				$("body").append(b)
			} else {
				$("#" + d.id).hide();
				$("#" + d.id).attr("xtype", d.xtype);
				$("#" + d.id).find(".infwin-ctitle > span").html(d.title);
				$("#" + d.id).find(".infwin-contbox").html(d.content)
			}
			var c = $("#" + d.id).outerWidth(),
				a = $("#" + d.id).outerHeight();
			$("#" + d.id).css({
				left: (d.left + 80) + "px",
				top: (d.top - a - 72) + "px"
			}).fadeIn(500)
		}
	};
	emergency.zygis = {
		init: function() {
			emergency.zygis.loadStreetMap();
			emergency.zygis.load25dMap();
			emergency.zygis.bindFweiToEvent()
		},
		loadStreetMap: function() {
			pmap.loadBaiduStreet()
		},
		load25dMap: function() {
			pmap.loadChuTian25d()
		},
		loadFireEvent: function() {
			pmap.loadFireEvent();
			emergency.sjcl.loadProcess(dlang.sjczlcjl_hzbj)
		},
		bindFweiToEvent: function() {
			$("ul.tfj-gis-yxlx > li").unbind("click").bind("click", function() {
				if ($(this).attr("xtype") != "jt") {
					if (!$(this).hasClass("selected")) {
						$(this).addClass("selected").siblings("[xtype!='jt']").removeClass("selected");
						var a = null;
						switch ($(this).attr("xtype")) {
						case "rq":
							a = emergency.zygis.load_rqyxfw_win();
							emergency.sjcl.loadProcess(dlang.sjczlcjl_tqzbrqyxfw);
							break;
						case "gs":
							a = emergency.zygis.load_gsyxfw_win();
							emergency.sjcl.loadProcess(dlang.sjczlcjl_tqzbgsyxfw);
							break;
						case "dl":
							a = emergency.zygis.load_dlyxfw_win();
							emergency.sjcl.loadProcess(dlang.sjczlcjl_tqzbdlyxfw);
							break
						}
						pmap.load_sdqyxfw_layer($(this).attr("xtype"), a)
					} else {
						pmap.remove_sdqyxfw_layer();
						$(this).removeClass("selected");
						switch ($(this).attr("xtype")) {
						case "rq":
							emergency.sjcl.loadProcess(dlang.sjczlcjl_gbrqyxfw);
							break;
						case "gs":
							emergency.sjcl.loadProcess(dlang.sjczlcjl_gbgsyxfw);
							break;
						case "dl":
							emergency.sjcl.loadProcess(dlang.sjczlcjl_gbdlyxfw);
							break
						}
					}
				} else {
					$(this).toggleClass("selected");
					if ($(this).hasClass("selected")) {
						pmap.load_jtlt_layer();
						emergency.sjcl.loadProcess(dlang.sjczlcjl_tqssjtlk)
					} else {
						pmap.remove_jtlt_layer();
						emergency.sjcl.loadProcess(dlang.sjczlcjl_gbssjtlk)
					}
				}
			})
		},
		load_rqyxfw_win: function() {
			var a = "";
			a += '<div class="infwin-box" style="display: inherit;">';
			a += '<div class="infwin-ctbox">';
			a += '<div class="infwin-border-lt"></div>';
			a += '<div class="infwin-border-rt"></div>';
			a += '<div class="infwin-border-lb"></div>';
			a += '<div class="infwin-border-rb"></div>';
			a += '<div class="infwin-line"></div>';
			a += '<div class="infwin-content">';
			a += '<div class="infwin-ctitle"><span>' + dlang.map_rq_rqyxfw + "</span>";
			a += '<div class="infwin-ctitle-close" onclick="pmap.close_uimarker_yxinfo();"></div></div>';
			a += '<div class="infwin-contbox">';
			a += '<div class="yxfwei-cbox">';
			a += "<span>" + dlang.map_rq_yjsj + "：<label>6h</label></span>";
			a += "<span>" + dlang.map_rq_syxdl + "：<label>" + dlang.map_rq_dl_znl + "&nbsp;&nbsp;" + dlang.map_rq_dl_zn2l + "</label></span>";
			a += "<span>" + dlang.map_rq_syxsq + "：<label>" + dlang.map_rq_xxjwsq + "&nbsp;&nbsp;" + dlang.map_rq_jstsq + "</label></span>";
			a += "<span>" + dlang.map_rq_yxjms + "：<label>576</label></span>";
			a += "</div>";
			a += "</div>";
			a += "</div>";
			a += "</div>";
			a += "</div>";
			return a
		},
		load_gsyxfw_win: function() {
			var a = "";
			a += '<div class="infwin-box" style="display: inherit;">';
			a += '<div class="infwin-ctbox">';
			a += '<div class="infwin-border-lt"></div>';
			a += '<div class="infwin-border-rt"></div>';
			a += '<div class="infwin-border-lb"></div>';
			a += '<div class="infwin-border-rb"></div>';
			a += '<div class="infwin-line"></div>';
			a += '<div class="infwin-content">';
			a += '<div class="infwin-ctitle"><span>' + dlang.map_gs_gsyxfw + "</span>";
			a += '<div class="infwin-ctitle-close" onclick="pmap.close_uimarker_yxinfo();"></div></div>';
			a += '<div class="infwin-contbox">';
			a += '<div class="yxfwei-cbox">';
			a += "<span>" + dlang.map_rq_yjsj + "：<label>8h</label></span>";
			a += "<span>" + dlang.map_rq_syxdl + "：<label>" + dlang.map_rq_dl_znl + "</label></span>";
			a += "<span>" + dlang.map_rq_syxsq + "：<label>" + dlang.map_rq_jstsq + "</label></span>";
			a += "<span>" + dlang.map_rq_yxjms + "：<label>673</label></span>";
			a += "</div>";
			a += "</div>";
			a += "</div>";
			a += "</div>";
			a += "</div>";
			return a
		},
		load_dlyxfw_win: function() {
			var a = "";
			a += '<div class="infwin-box" style="display: inherit;">';
			a += '<div class="infwin-ctbox">';
			a += '<div class="infwin-border-lt"></div>';
			a += '<div class="infwin-border-rt"></div>';
			a += '<div class="infwin-border-lb"></div>';
			a += '<div class="infwin-border-rb"></div>';
			a += '<div class="infwin-line"></div>';
			a += '<div class="infwin-content">';
			a += '<div class="infwin-ctitle"><span>' + dlang.map_dl_dlyxfw + "</span>";
			a += '<div class="infwin-ctitle-close" onclick="pmap.close_uimarker_yxinfo();"></div></div>';
			a += '<div class="infwin-contbox">';
			a += '<div class="yxfwei-cbox">';
			a += "<span>" + dlang.map_rq_yjsj + "：<label>4h</label></span>";
			a += "<span>" + dlang.map_rq_syxdl + "：<label>" + dlang.map_rq_dl_znl + "&nbsp;&nbsp;" + dlang.map_rq_dl_zn2l + "&nbsp;&nbsp;" + dlang.map_rq_dl_lsl + "</label></span>";
			a += "<span>" + dlang.map_rq_syxsq + "：<label>" + dlang.map_rq_xxjwsq + "&nbsp;&nbsp;" + dlang.map_rq_jstsq + "</label></span>";
			a += "<span>" + dlang.map_rq_yxjms + "：<label>1025</label></span>";
			a += "</div>";
			a += "</div>";
			a += "</div>";
			a += "</div>";
			a += "</div>";
			return a
		}
	};
	emergency.fhtbuild = {
		init: function() {
			emergency.fhtbuild.load_rkpie();
			emergency.fhtbuild.load_shpie()
		},
		load_rkpie: function() {
			var b = {
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				series: [{
					name: dlang.ldfht_lnzzhs,
					type: "pie",
					radius: ["50%", "82%"],
					selectedOffset: 0.5,
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: "center"
						}
					},
					data: [{
						value: 7,
						name: dlang.ldfht_ert,
						selected: true,
						itemStyle: {
							normal: {
								color: "#6ba9dd"
							}
						}
					}, {
						value: 16,
						name: dlang.ldfht_cjr,
						selected: true,
						itemStyle: {
							normal: {
								color: "#bfdff9"
							}
						}
					}, {
						value: 20,
						name: dlang.ldfht_laor,
						selected: true,
						itemStyle: {
							normal: {
								color: "#3b9fed"
							}
						}
					}]
				}]
			};
			var a = echarts.init($("#tfj-bldpie-rk")[0]);
			a.setOption(b)
		},
		load_shpie: function() {
			var b = {
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				series: [{
					name: dlang.ldfht_lnshs,
					type: "pie",
					radius: ["50%", "82%"],
					selectedOffset: 0.5,
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: "center"
						}
					},
					data: [{
						value: 28,
						name: dlang.ldfht_qiye,
						selected: true,
						itemStyle: {
							normal: {
								color: "#6ba9dd"
							}
						}
					}, {
						value: 6,
						name: dlang.ldfht_cku,
						selected: true,
						itemStyle: {
							normal: {
								color: "#bfdff9"
							}
						}
					}, {
						value: 75,
						name: dlang.ldfht_spu,
						selected: true,
						itemStyle: {
							normal: {
								color: "#3b9fed"
							}
						}
					}]
				}]
			};
			var a = echarts.init($("#tfj-bldpie-sh")[0]);
			a.setOption(b)
		},
		showBuildWin: function() {
			$("ul.tfj-fht-lpb ul > li").unbind("click").bind("click", function() {
				var e = "tfwin-fwrk-infbox";
				var a = null;
				var c = $(this).text();
				if ($("#" + e).length > 0) {
					a = $("#" + e).attr("xtype")
				}
				if (a != c) {
					var d = $(this).offset();
					var b = emergency.tfwin.infowin({
						id: e,
						xtype: c,
						title: dlang.ldfht_jsdsd + c + dlang.ldfht_roomxq,
						left: d.left + 38,
						top: d.top + 32,
						content: emergency.fhtbuild.load_fwrk_context(c),
						close: "emergency.fhtbuild.close_fwrk_cwin()"
					})
				} else {
					$("#" + e).remove()
				}
			});
			if ($(".tfsj-fht-box").css("display") != "none" && $("#tfwin-fwrk-infbox").length > 0) {
				$("#tfwin-fwrk-infbox").remove();
				emergency.sjcl.loadProcess(dlang.sjczlcjl_gbshlcfht)
			} else {
				emergency.sjcl.loadProcess(dlang.sjczlcjl_tqshlcfht)
			}
			$(".tfsj-fht-box").fadeToggle(500)
		},
		load_fwrk_context: function(d) {
			var e = fht_fwrk_data["r" + d];
			var c = "";
			c += '<div class="fwrk-infobox">';
			c += '<div class="fwrk-trbox">';
			c += "<span>[" + dlang.ldfht_roominfo + "]</span>";
			c += '<div class="fwrk-xxitem">';
			c += "<span>" + dlang.ldfht_fwyt + "：<label>" + e.fjyt + "</label></span>";
			c += "<span>" + dlang.ldfht_fjxz + "：<label>" + e.fjxz + "</label></span>";
			c += "<span>" + dlang.ldfht_cqxz + "：<label>" + e.cqxz + "</label></span>";
			c += "</div>";
			c += '<div class="fwrk-xxitem">';
			c += "<span>" + dlang.ldfht_cqxx + "：<label>" + e.cqrxx + '</label><label class="margin-left-20">' + e.cqrid + "</label></span>";
			c += "</div>";
			c += "</div>";
			c += '<div class="fwrk-trbox margin-top-10">';
			c += "<span>[" + dlang.ldfht_rkinfo + "]</span>";
			c += '<ul class="fwrk-thu-items">';
			for (var b = 0, a = e.thcy.length; b < a; b++) {
				c += "<li>";
				c += '<div class="fwrk-thu-bsgx">' + e.thcy[b].jtgx + "</div>";
				c += '<div class="fwrk-thu-ryxx">';
				c += "<span>" + e.thcy[b].rkname + "</span>";
				c += "<span>" + e.thcy[b].sex + "</span>";
				c += "<span><label>" + e.thcy[b].idcard + "</label></span>";
				c += '<span class="clear-both">' + e.thcy[b].gj + "</span>";
				c += "<span>" + e.thcy[b].rstyle + "</span>";
				c += "<span>" + e.thcy[b].hyzk + "</span>";
				if (language === "en-au") {
					c += "<span><label>" + e.thcy[b].tel + "</label></span>"
				} else {
					c += "<span>" + dlang.ldfht_lxfs + "：<label>" + e.thcy[b].tel + "</label></span>"
				}
				c += "</div>";
				c += "</li>"
			}
			c += "</ul>";
			c += "</div>";
			c += "</div>";
			return c
		},
		close_fwrk_cwin: function() {
			$("#tfwin-fwrk-infbox").remove()
		}
	};
	emergency.xf = {
		loadZbjlChart: function() {
			var c = {
				normal: {
					label: {
						show: false
					},
					labelLine: {
						show: false
					}
				}
			};
			var d = {
				normal: {
					color: "rgba(0,0,0,0)",
					label: {
						show: false
					},
					labelLine: {
						show: false
					}
				},
				emphasis: {
					color: "rgba(0,0,0,0)"
				}
			};
			var b = {
				color: ["#e96565", "#3da1ee", "#f2c967"],
				tooltip: {
					show: false,
					formatter: "{a} <br/>{b} : {c}"
				},
				series: [{
					name: dlang.czbk_zbjl,
					type: "pie",
					clockWise: false,
					center: ["55%", "50%"],
					radius: [36, 44],
					itemStyle: c,
					hoverAnimation: false,
					data: [{
						value: 8,
						name: dlang.czbk_zbjl_xj
					}, {
						value: 18,
						name: "",
						itemStyle: d
					}]
				}, {
					name: dlang.czbk_zbjl,
					type: "pie",
					clockWise: false,
					center: ["55%", "50%"],
					radius: [28, 35],
					itemStyle: c,
					hoverAnimation: false,
					data: [{
						value: 16,
						name: dlang.czbk_zbjl_jj
					}, {
						value: 18,
						name: "",
						itemStyle: d
					}]
				}, {
					name: dlang.czbk_zbjl,
					type: "pie",
					clockWise: false,
					hoverAnimation: false,
					center: ["55%", "50%"],
					radius: [20, 27],
					itemStyle: c,
					data: [{
						value: 14,
						name: dlang.czbk_zbjl_mj
					}, {
						value: 6,
						name: "",
						itemStyle: d
					}]
				}]
			};
			var a = echarts.init($("#zbjl_chart")[0]);
			a.setOption(b)
		}
	};
	emergency.zdqy = {
		init: function() {
			emergency.zdqy.loadZdqyChart();
			emergency.zdqy.load_tfhz_fsandlj()
		},
		loadZdqyChart: function() {
			var a = ["#5793f3", "#f2c967"];
			var d = "microsoft yahei",
				e = 14;
			if (language === "en-au") {
				d = "AgencyFBBold";
				e = 16
			}
			var c = {
				color: a,
				tooltip: {
					trigger: "axis",
					formatter: function(f) {
						return f[0].data.name + "<br/>" + f[0].seriesName + ":" + f[0].value + "<br/>" + f[1].seriesName + ":" + f[1].value
					}
				},
				grid: {
					left: 0,
					right: 10,
					bottom: 5,
					top: 25,
					containLabel: true
				},
				legend: {
					show: false
				},
				xAxis: [{
					type: "category",
					axisTick: {
						alignWithLabel: true
					},
					axisLine: {
						lineStyle: {
							color: "#fff"
						}
					},
					axisLabel: {
						textStyle: {
							color: "#fff",
							fontFamily: d,
							fontSize: e
						}
					},
					data: ["A", "B", "C", "D", "E", "F", "G"]
				}],
				yAxis: [{
					type: "value",
					name: dlang.czbk_zdqy_zlrs,
					min: 0,
					max: 800,
					show: false
				}, {
					type: "value",
					name: dlang.czbk_zdqy_jlsfdms,
					min: 0,
					max: 300,
					show: false
				}],
				series: [{
					name: dlang.czbk_zdqy_zlrs,
					type: "bar",
					barWidth: "40%",
					data: [{
						name: dlang.czbk_zdqy_kn_znldtz,
						value: 1032
					}, {
						name: dlang.czbk_zdqy_kn_csbjjd,
						value: 520
					}, {
						name: dlang.czbk_zdqy_kn_zsbh,
						value: 220
					}, {
						name: dlang.czbk_zdqy_kn_ssyyesfxx,
						value: 260
					}, {
						name: dlang.czbk_zdqy_kn_jyds,
						value: 290
					}, {
						name: dlang.czbk_zdqy_kn_nsejd,
						value: 120
					}, {
						name: dlang.czbk_zdqy_kn_sjzkxyjsjy,
						value: 320
					}]
				}, {
					name: dlang.czbk_zdqy_jlsfdms,
					type: "line",
					yAxisIndex: 1,
					data: [50, 70, 160, 260, 150, 89, 139]
				}]
			};
			var b = echarts.init($("#czbf_zdqy_chart")[0]);
			b.setOption(c);
			b.on("click", function(f) {
				console.log(f.data.name);
				console.log(f.name)
			})
		},
		load_tfhz_fsandlj: function() {
			$(".czbf-main-btn").unbind("click").bind("click", function() {
				if (!$(this).hasClass("selected")) {
					$(this).addClass("selected");
					switch ($(this).attr("xtype")) {
					case "ljgh":
						pmap.load_lujinggh_layer();
						emergency.sjcl.loadProcess(dlang.sjczlcjl_tqzjghlj);
						break;
					case "fsx":
						var a = "";
						a += '<div class="infwin-box" style="display: inherit;">';
						a += '<div class="infwin-ctbox">';
						a += '<div class="infwin-border-lt"></div>';
						a += '<div class="infwin-border-rt"></div>';
						a += '<div class="infwin-border-lb"></div>';
						a += '<div class="infwin-border-rb"></div>';
						a += '<div class="infwin-line fax-xb"></div>';
						a += '<div class="infwin-content">';
						a += '<div class="infwin-ctitle"><span>' + dlang.czbk_fsqy_name + "</span>";
						a += '<div class="infwin-ctitle-close" onclick="pmap.close_uimarker_fsxinfo();"></div></div>';
						a += '<div class="infwin-contbox">';
						a += '<div class="yxfwei-cbox" style="width: 310px;">';
						a += "<span>" + dlang.czbk_fsqy_fsfw + "：<label>" + dlang.czbk_fsqy_dtzto500 + "&nbsp;&nbsp;" + dlang.czbk_fsqy_zneljhk + "</label></span>";
						a += "<span>" + dlang.czbk_fsqy_jl + "：<label>50m</label>&nbsp;&nbsp;&nbsp;&nbsp;" + dlang.czbk_fsqy_fssj + "：<label>4h</label></span>";
						a += "<span>" + dlang.czbk_fsqy_czyh + "：<label>" + dlang.czbk_fsqy_dtcontent + "</label></span>";
						a += "</div>";
						a += "</div>";
						a += "</div>";
						a += "</div>";
						a += "</div>";
						pmap.load_hzqyfsx_layer(a);
						emergency.sjcl.loadProcess(dlang.sjczlcjl_tqtfsjfsx);
						break
					}
				} else {
					switch ($(this).attr("xtype")) {
					case "ljgh":
						pmap.remove_lujinggh_layer();
						emergency.sjcl.loadProcess(dlang.sjczlcjl_gbzjghlj);
						break;
					case "fsx":
						pmap.remove_hzqyfsx_layer();
						emergency.sjcl.loadProcess(dlang.sjczlcjl_gbtfsjfsx);
						break
					}
					$(this).removeClass("selected")
				}
			})
		}
	};
	emergency.yl = {
		loadRedChart: function() {
			var b = "microsoft yahei",
				c = 14,
				d = 14;
			if (language === "en-au") {
				b = "AgencyFBBold";
				c = 16;
				d = 12
			}
			var a = {
				title: {
					text: dlang.czbk_yl_zjyy + "：" + dlang.czbk_yl_d7yy,
					left: 30,
					textStyle: {
						color: "#ffffff",
						fontSize: c,
						fontWeight: "normal",
						fontFamily: b
					}
				},
				tooltip: {
					trigger: "axis"
				},
				grid: {
					left: 0,
					right: 10,
					bottom: 5,
					top: 25,
					containLabel: true
				},
				xAxis: [{
					type: "category",
					data: [dlang.czbk_yl_hxk, dlang.czbk_yl_ssk, dlang.czbk_yl_gsk, dlang.czbk_yl_wk, dlang.czbk_yl_jiz, dlang.czbk_yl_zzheng],
					axisTick: {
						alignWithLabel: true
					},
					axisLabel: {
						interval: 0,
						textStyle: {
							fontFamily: b,
							fontSize: d
						}
					},
					axisLine: {
						lineStyle: {
							color: "#fff"
						}
					}
				}],
				yAxis: [{
					type: "value",
					name: dlang.czbk_yl_cwei,
					nameLocation: "middle",
					nameTextStyle: {
						color: "#fff",
						fontFamily: b,
						fontSize: c
					},
					nameGap: 5,
					axisTick: {
						show: false
					},
					splitLine: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: "#fff"
						}
					},
					axisLabel: {
						show: false
					}
				}],
				series: [{
					name: dlang.czbk_yl_cwei,
					type: "bar",
					barWidth: "40%",
					itemStyle: {
						normal: {
							color: function(e) {
								if (e.dataIndex % 2 === 0) {
									return "#3da1ee"
								} else {
									return "#f2c967"
								}
							}
						}
					},
					data: [50, 32, 40, 34, 35, 33]
				}]
			};
			echarts.init($("#czbf_yl_chart")[0]).setOption(a)
		}
	};
	emergency.event = {
		init: function() {
			emergency.event.loadEyeEvent()
		},
		loadEyeEvent: function() {
			$(".czbf-tbox-icon").unbind("click").bind("click", function() {
				var b = $(this);
				var c = b.attr("type");
				var a = b.hasClass("hide");
				if (a) {
					b.removeClass("hide")
				} else {
					b.addClass("hide")
				}
				switch (c) {
				case "xf":
					if (a) {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_gbxffb);
						pmap.hideCzbkPos("xf")
					} else {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_tqxffb);
						pmap.loadCzbkPos("xf", 17)
					}
					break;
				case "zbjl":
					if (a) {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_gbzbjlfb);
						pmap.hideCzbkPos("zbjl")
					} else {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_tqzbjlfb);
						pmap.loadCzbkPos("zbjl", 17)
					}
					break;
				case "zdqy":
					if (a) {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_gbzdqyfb);
						pmap.hideCzbkPos("zdqy")
					} else {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_tqzdqyfb);
						pmap.loadCzbkPos("zdqy", 17)
					}
					break;
				case "yl":
					if (a) {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_gbylfb);
						pmap.hideCzbkPos("yl")
					} else {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_tqylfb);
						pmap.loadCzbkPos("yl", 17)
					}
					break;
				case "znbm":
					if (a) {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_gbznbmfb);
						pmap.hideCzbkPos("rq,sw,dl")
					} else {
						emergency.sjcl.loadProcess(dlang.sjczlcjl_tqznbmfb);
						pmap.loadCzbkPos("rq,sw,dl", 17)
					}
					break
				}
			})
		}
	};
	emergency.sjcl = {
		loadProcess: function(d) {
			var a = new Date().getHours(),
				f = new Date().getMinutes(),
				b = new Date().getSeconds();
			var e = a + ":" + f + ":" + b;
			var c = '<div class="czlcjl-list-item animated fadeIn"><div class="list-time-icon"></div><div class="list-event"><div class="list-event-time">' + e + '</div><div class="list-event-text">' + d + "</div></div> </div>";
			$("#czlcjl_list").append(c).animate({
				scrollTop: $("#czlcjl_list")[0].scrollHeight
			}, 200)
		}
	}
})();