import Vue from 'vue'
import { setTimeout, clearTimeout } from 'timers';
import { inspect } from 'util';
//消息总线
var EventBus = new Vue();

//扩展Number
Number.prototype.formatDNZero = function() {
    if (this < 10) { return '0' + this } else { return this; }
};

/** 封装ajax get 及 post请求
 * @returns jqXHR对象 一个XMLHttpRequest对象和$.Deferred对象的结合体 
 * 具备 done(),fail() 方法 支持链式写法
 */

var $http = Object.create(null);

["get", "post"].forEach((value) => {
    $http[value] = function(url, param, timeout) {
        var method = value.toUpperCase();
        var options = {
            url: url,
            type: method,
            data: param,
            dataType: "json", //json 期望服务器端返回的数据类型,使用默认值
            cache: false,
            timeout: 20000

        };
        if (method == 'POST') {
            Object.assign(options, { contentType: "application/json;charset=utf-8" });
        }
        return $.ajax(options);
    }
})

const utils = {
    wait: function(obj, flagName, callBack) {
        //使用闭包，保存临时变量 flag 及 callBack 避免在setTimeout时传参数
        var fn = function() {
            if (obj[flagName]) {
                callBack();
            } else {
                setTimeout(fn, 200);
            }
        };
        fn();
    },
    sleep: function(millisecond = 2000) { //默认休眠2秒
        return new Promise((resolve) => {
            let tt = setTimeout(() => {
                clearTimeout(tt);
                resolve();
            }, millisecond);
        })
    },
    /**
     * 偏函数的用法
     * @deprecated 管理单例逻辑
     * @param fn {Function} 管理创建对象的逻辑,必须有返回值，返回创建的对象
     * 函数当做参数传递(策略模式)  组合 创建逻辑的逻辑 --> 惰性单例模式
     */
    getSingle: function(fn) {
        if (Object.prototype.toString.call(fn) != 'object Function') {
            throw new Error(`TypeError:need function as parameter`);
        }
        let instance = null;
        return function() {
            if (instance) return instance;
            return instance = fn.apply(null, arguments)
        }
    },
    getEchartsScaleFactor: function() {
        return parseInt(window.getComputedStyle(document.documentElement, null).fontSize) / 12;
    },
    adjustEcharts: function(option, echartsScaleFactor) {
        if (echartsScaleFactor > 1) {
            //存在X轴 设置X轴上的数字
            if (option['xAxis'] && option['xAxis'][0]) {
                option['xAxis'][0]['axisLabel']['fontSize'] = 8 * echartsScaleFactor;
            }
            //设置X轴的 名称字体大小
            if (option['xAxis'] && option['xAxis'][0]['nameTextStyle']) {
                option['xAxis'][0]['nameTextStyle']['fontSize'] = 8 * echartsScaleFactor;
            }
            //存在y轴 设置y轴上的数字大小
            if (option['yAxis'] && option['yAxis'][0]) {
                option['yAxis'][0]['axisLabel']['fontSize'] = 8 * echartsScaleFactor;
            }
            //设置y轴 名称字体大小
            if (option['yAxis'] && option['yAxis'][0]['nameTextStyle']) {
                option['yAxis'][0]['nameTextStyle']['fontSize'] = 7 * echartsScaleFactor;
            }
            //存在第二个Y轴
            if (option['yAxis'] && option['yAxis'][1]) {
                option['yAxis'][1]['axisLabel']['fontSize'] = 8 * echartsScaleFactor;
                if (option['yAxis'][1]['nameTextStyle']) {
                    option['yAxis'][1]['nameTextStyle']['fontSize'] = 8 * echartsScaleFactor;
                }
            }
            //设置图表顶栏上 legend的字体大小
            if (option['legend'] && option['legend']['textStyle']) {
                option['legend']['textStyle']['fontSize'] = 9 * echartsScaleFactor;
            }
            //设置系列标号的 字体大小
            if (option['series'][0]['label']) {
                option['series'][0]['label']['normal']['fontSize'] = 9 * echartsScaleFactor;
            }

        }
    },
    //将比例尺 scale 换算成 分辨率,该算法不精确
    scaleToResolution: (function() {
        const DOTS_PER_INCH = 96;
        const INCHES_PER_UNIT = {
            'inches': 1.0,
            'ft': 12.0,
            'mi': 63360.0,
            'm': 39.37,
            'km': 39370,
            'degrees': 4374754,
            'yd': 36
        }
        var normalizeScale = function(scale) {
            var normScale = (scale > 1.0) ? (1.0 / scale) : scale;
            return normScale;
        }
        return function(scale, units) {
            var resolution;
            if (scale) {
                if (units == null) {
                    units = "degrees";
                }
                var normScale = normalizeScale(scale);
                resolution = 1 / (normScale * INCHES_PER_UNIT[units] * DOTS_PER_INCH);
            }
            return resolution;
        }
    })(),
}

export { EventBus, $http, utils };