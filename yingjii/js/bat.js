/**
 * Created by Administrator on 2016/12/26 0026.
 */

// 对接处理时空信息云平台--弹性伸缩资源场景
(function () {
    
        window.geobat = {
    
            isrun: false, // 是否执行调用bat批处理文件；如果true则执行，反之false则不执行；
    
            url: "http://172.17.0.139:8080", // 设置服务器调取批处理服务接口地址
    
            init: function () {
                if (!geobat.isrun) { return; }
                // 执行获取服务器存储状态；如果获取服务器失败，则不执行“弹性伸缩资源场景”
                $.getJSON(geobat.url + "/checkServerDate?callback=?", function (json) {
                    if (json) {
                        // 判断是否可以执行下一次的弹性伸缩资源场景
                        if (json.ispost && json.ispost == true) {
                            $.getJSON(geobat.url + "/runBatFile?callback=?", function (xjson) {
                                if (xjson && xjson.run == "success") {
                                    console.log("成功：调取服务器弹性伸缩资源场景批处理脚本成功，等待压力测试执行完毕！" + new Date());
                                }
                            });
                        }
                        else {
                            console.log("提示：服务器弹性伸缩bat批处理文件正在执行中，无法再次触发，请稍后等待执行技术！" + new Date());
                        }
                    }
                });
            },
    
            bindkey: function () {
                // 增加全局快捷键 Ctrl + Q 手动触发
                document.onkeydown = function (e) {
                    e = e || window.event;
                    var key = e.keyCode || e.charCode;
                    if(e.ctrlKey && key == 81) {
                        var tmp_isrun = geobat.isrun;
                        geobat.isrun = true;
                        geobat.init();
                        if(!tmp_isrun) { geobat.isrun = false; }
                        console.log("组合快捷键激活：手动申请服务器弹性伸缩资源场景批处理请求！" + new Date());
                    }
                }
            }
        };
    
        // 激活快捷组合键
        window.geobat.bindkey();
    
    })();