(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else {
        var a = factory();
        for (var i in a)(typeof exports === 'object' ? exports : root)[i] = a[i];
    }
})(this, function() {
    return /******/ (function(modules) { // webpackBootstrap
            /******/ // The module cache
            /******/
            var installedModules = {};
            /******/
            /******/ // The require function
            /******/
            function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/
                if (installedModules[moduleId]) {
                    /******/
                    return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/
                var module = installedModules[moduleId] = {
                    /******/
                    i: moduleId,
                    /******/
                    l: false,
                    /******/
                    exports: {}
                    /******/
                };
                /******/
                /******/ // Execute the module function
                /******/
                modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/
                module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/
                return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/
            __webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/
            __webpack_require__.c = installedModules;
            /******/
            /******/ // identity function for calling harmony imports with the correct context
            /******/
            __webpack_require__.i = function(value) { return value; };
            /******/
            /******/ // define getter function for harmony exports
            /******/
            __webpack_require__.d = function(exports, name, getter) {
                /******/
                if (!__webpack_require__.o(exports, name)) {
                    /******/
                    Object.defineProperty(exports, name, {
                        /******/
                        configurable: false,
                        /******/
                        enumerable: true,
                        /******/
                        get: getter
                            /******/
                    });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/
            __webpack_require__.n = function(module) {
                /******/
                var getter = module && module.__esModule ?
                    /******/
                    function getDefault() { return module['default']; } :
                    /******/
                    function getModuleExports() { return module; };
                /******/
                __webpack_require__.d(getter, 'a', getter);
                /******/
                return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/
            __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
            /******/
            /******/ // __webpack_public_path__
            /******/
            __webpack_require__.p = "/dist/";
            /******/
            /******/ // Load entry module and return exports
            /******/
            return __webpack_require__(__webpack_require__.s = 18);
            /******/
        })
        /************************************************************************/
        /******/
        ([
            /* 0 */
            /***/
            (function(module, exports, __webpack_require__) {

                // Thank's IE8 for his funny defineProperty
                module.exports = !__webpack_require__(1)(function() {
                    return Object.defineProperty({}, 'a', { get: function() { return 7; } }).a != 7;
                });

                /***/
            }),
            /* 1 */
            /***/
            (function(module, exports) {

                module.exports = function(exec) {
                    try {
                        return !!exec();
                    } catch (e) {
                        return true;
                    }
                };

                /***/
            }),
            /* 2 */
            /***/
            (function(module, exports) {

                // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
                var global = module.exports = typeof window != 'undefined' && window.Math == Math ?
                    window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
                if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

                /***/
            }),
            /* 3 */
            /***/
            (function(module, exports) {

                module.exports = function(it) {
                    return typeof it === 'object' ? it !== null : typeof it === 'function';
                };

                /***/
            }),
            /* 4 */
            /***/
            (function(module, exports, __webpack_require__) {

                module.exports = { "default": __webpack_require__(21), __esModule: true };

                /***/
            }),
            /* 5 */
            /***/
            (function(module, exports) {

                var core = module.exports = { version: '2.4.0' };
                if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

                /***/
            }),
            /* 6 */
            /***/
            (function(module, exports) {

                // 7.2.1 RequireObjectCoercible(argument)
                module.exports = function(it) {
                    if (it == undefined) throw TypeError("Can't call method on  " + it);
                    return it;
                };

                /***/
            }),
            /* 7 */
            /***/
            (function(module, exports, __webpack_require__) {

                // fallback for non-array-like ES3 and non-enumerable old V8 strings
                var cof = __webpack_require__(25);
                module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
                    return cof(it) == 'String' ? it.split('') : Object(it);
                };

                /***/
            }),
            /* 8 */
            /***/
            (function(module, exports) {

                // 7.1.4 ToInteger
                var ceil = Math.ceil,
                    floor = Math.floor;
                module.exports = function(it) {
                    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
                };

                /***/
            }),
            /* 9 */
            /***/
            (function(module, exports, __webpack_require__) {

                // to indexed object, toObject with fallback for non-array-like ES3 strings
                var IObject = __webpack_require__(7),
                    defined = __webpack_require__(6);
                module.exports = function(it) {
                    return IObject(defined(it));
                };

                /***/
            }),
            /* 10 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                var _featureanimation = __webpack_require__(16);

                var _featureanimation2 = _interopRequireDefault(_featureanimation);

                var _increaseanimation = __webpack_require__(17);

                var _increaseanimation2 = _interopRequireDefault(_increaseanimation);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

                /***/
            }),
            /* 11 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                var Map = ol.Map;

                //扩展地图库
                Map.prototype.getExtent = function() {
                    var amap = this;
                    var view = amap.getView();
                    var size = amap.getSize();
                    var extent = view.calculateExtent(size);
                    return extent;
                };

                Map.prototype.getLayersById = function(id) {
                    var currentLayer;
                    var layers = this.getLayers().getArray();
                    for (var i = layers.length - 1; i >= 0; i--) {
                        if (layers[i].get("id") === id) {
                            currentLayer = layers[i];
                            return currentLayer;
                        }
                    }

                    return currentLayer;
                };

                /***/
            }),
            /* 12 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                //解决点击坐标列表，要素没有完全呈现在可视区的bug
                ol.Overlay.prototype.panIntoView_ = function() {
                    var map = this.getMap();

                    if (map === undefined || !map.getTargetElement()) {
                        return;
                    }

                    var mapRect = this.getRect_(map.getTargetElement(), map.getSize());
                    var element = this.getElement();
                    var overlayRect = this.getRect_(element, [ol.dom.outerWidth(element), ol.dom.outerHeight(element)]);

                    var margin = this.autoPanMargin_;
                    if (!ol.extent.containsExtent(mapRect, overlayRect)) {
                        // 由于覆盖图层有时候不是完全在可视区，所以需要移动覆盖图层
                        var offsetLeft = overlayRect[0] - mapRect[0];
                        var offsetRight = mapRect[2] - overlayRect[2];
                        var offsetTop = overlayRect[1] - mapRect[1];
                        var offsetBottom = mapRect[3] - overlayRect[3];

                        var delta = [0, 0];
                        if (offsetLeft < 0) {
                            delta[0] = offsetLeft - margin;
                        } else if (offsetRight < 0) {
                            delta[0] = Math.abs(offsetRight) + margin;
                        }
                        if (offsetTop < 0) {
                            delta[1] = offsetTop - margin;
                        } else if (offsetBottom < 0) {
                            delta[1] = Math.abs(offsetBottom) + margin + 100;
                        }

                        if (delta[0] !== 0 || delta[1] !== 0) {
                            var center = map.getView().getCenter();
                            var centerPx = map.getPixelFromCoordinate(center);
                            var newCenterPx = [centerPx[0] + delta[0], centerPx[1] + delta[1]];

                            map.getView().animate({
                                center: map.getCoordinateFromPixel(newCenterPx),
                                duration: this.autoPanAnimation_.duration,
                                easing: this.autoPanAnimation_.easing
                            });
                        }
                    }
                };

                /***/
            }),
            /* 13 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                var _esriCache = __webpack_require__(19);

                var _esriCache2 = _interopRequireDefault(_esriCache);

                var _ishowMapTiled = __webpack_require__(20);

                var _ishowMapTiled2 = _interopRequireDefault(_ishowMapTiled);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

                /***/
            }),
            /* 14 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                Object.defineProperty(exports, "__esModule", {
                    value: true
                });

                var utils = {};

                utils.extend = function(dest) {
                    var i, j, len, src;
                    //TODO:arguments已过时，待用不定参数替代：http://www.infoq.com/cn/articles/es6-in-depth-rest-parameters-and-defaults/
                    for (j = 1, len = arguments.length; j < len; j++) {
                        src = arguments[j];
                        for (i in src) {
                            dest[i] = src[i];
                        }
                    }
                    return dest;
                };

                exports.default = {
                    utils: utils
                };

                /***/
            }),
            /* 15 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                exports.__esModule = true;

                var _assign = __webpack_require__(4);

                var _assign2 = _interopRequireDefault(_assign);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

                exports.default = _assign2.default || function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];

                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }

                    return target;
                };

                /***/
            }),
            /* 16 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                /**
                 * create by gaoyi
                 * create time:2017-8-22
                 */
                /** 
                 * 要素动画基类
                 *	@fire animationstart|animationend
                 *	@param {ol.featureAnimationOptions} options
                 *		- duration {number} 动画执行时间
                 *		- revers {bool} 是否反过来执行
                 *		- fade {ol.easing} 动画类型
                 */
                ol.featureAnimation = function(options) {
                    options = options || {};

                    this.duration_ = typeof options.duration == 'number' ? options.duration >= 0 ? options.duration : 0 : 1000;
                    this.fade_ = typeof options.fade == 'function' ? options.fade : null;
                    this.repeat_ = Number(options.repeat);

                    var easing = typeof options.easing == 'function' ? options.easing : ol.easing.linear;
                    if (options.revers) this.easing_ = function(t) {
                        return 1 - easing(t);
                    };
                    else this.easing_ = easing;

                    this.hiddenStyle = options.hiddenStyle;

                    ol.Object.call(this);
                };
                ol.inherits(ol.featureAnimation, ol.Object);

                /** 绘制要素
                 *	@param {olx.animateFeatureEvent} 要素动画事件
                 *	@param {ol.geom} 要绘制的要素
                 *	@param {ol.geom} 要素阴影效果
                 */
                ol.featureAnimation.prototype.drawGeom_ = function(e, geom, shadow) {
                    if (this.fade_) {
                        e.context.globalAlpha = this.fade_(1 - e.elapsed);
                    }
                    var style = e.style;
                    for (var i = 0; i < style.length; i++) {
                        var imgs = style[i].getImage();
                        var sc = 0;
                        // OL < v4.3 : setImageStyle doesn't check retina
                        if (imgs && !ol.Map.prototype.getFeaturesAtPixel) {
                            sc = imgs.getScale();
                            imgs.setScale(e.frameState.pixelRatio * sc);
                        }
                        e.vectorContext.setStyle(style[i]);
                        if (style[i].getZIndex() < 0) e.vectorContext.drawGeometry(shadow || geom);
                        else e.vectorContext.drawGeometry(geom);
                        if (sc && imgs) imgs.setScale(sc);
                    }
                };

                /** 
                 * 返回false结束动画
                 * @param {ol.featureAnimation.event} e
                 * @return {bool} 
                 * @api 
                 */
                ol.featureAnimation.prototype.animate = function(e) {
                    return false;
                };

                /** 绘制要素到地图
                 *	@fires animationend
                 *	@param {ol.Feature} feature 运动的要素
                 *	@param {ol.featureAnimation|Array<ol.featureAnimation>} 要素动画对象
                 */
                ol.Map.prototype.animateFeature =

                    /** 添加动画要素对象到图层
                     *	@fires animationend
                     *	@param {ol.Feature} feature 动画要素
                     *	@param {ol.featureAnimation|Array<ol.featureAnimation>} 要素动画对象
                     *	@return {animationControler} 
                     *		- start {function} 开始执行动画
                     *		- stop {function} 结束动画
                     *		- isPlaying {function} 判断动画是否正在执行
                     */
                    ol.layer.Vector.prototype.animateFeature = function(feature, fanim) {
                        var self = this;
                        var listenerKey;

                        // 
                        var style = feature.getStyle();
                        var flashStyle = style || (this.getStyleFunction ? this.getStyleFunction()(feature) : null);
                        if (!flashStyle) flashStyle = [];
                        if (!(flashStyle instanceof Array)) flashStyle = [flashStyle];

                        // 正是因为设置了setStyle,才触发了postcompose事件。
                        feature.setStyle(fanim.hiddenStyle || []);

                        // 定义动画相关属性
                        var event = { // 矢量图层绘制上下文
                            vectorContext: null,
                            frameState: null, //?
                            start: 0,
                            time: 0,
                            elapsed: 0,
                            extent: false,
                            feature: feature,
                            geom: feature.getGeometry(),
                            typeGeom: feature.getGeometry().getType(),
                            bbox: feature.getGeometry().getExtent(),
                            coord: ol.extent.getCenter(feature.getGeometry().getExtent()),
                            style: flashStyle
                        };

                        if (!(fanim instanceof Array)) fanim = [fanim];
                        // 移除没有动画的动画对象
                        for (var i = fanim.length - 1; i >= 0; i--) {
                            if (fanim[i].duration_ === 0) fanim.splice(i, 1);
                        }

                        var nb = 0,
                            step = 0;

                        function animate(e) {
                            event.vectorContext = e.vectorContext;
                            event.frameState = e.frameState;
                            if (!event.extent) {
                                event.extent = e.frameState.extent;
                                event.start = e.frameState.time;
                                event.context = e.context;
                            }
                            event.time = e.frameState.time - event.start;
                            //event.elapsed = 当前执行的时间/动画总时间
                            event.elapsed = event.time / fanim[step].duration_;
                            if (event.elapsed > 1) event.elapsed = 1;

                            // 是否停止动画
                            if (!fanim[step].animate(event)) {
                                nb++;
                                // 重复动画
                                if (nb < fanim[step].repeat_) {
                                    event.extent = false;
                                } else if (step < fanim.length - 1) {
                                    fanim[step].dispatchEvent({ type: 'animationend', feature: feature });
                                    step++;
                                    nb = 0;
                                    event.extent = false;
                                }
                                // 停止动画
                                else {
                                    stop();
                                }
                            }

                            // tell OL3 to continue postcompose animation （任何地图渲染操作都会触发postcompose事件，包括要素渲染，瓦片渲染等）
                            e.frameState.animate = true;
                        }

                        // 停止动画
                        function stop(options) {
                            //移除postcompose的事件监听
                            ol.Observable.unByKey(listenerKey);
                            listenerKey = null;
                            feature.setStyle(style);
                            // Send event 并且派发动画结束事件
                            var event = { type: 'animationend', feature: feature };
                            if (options) {
                                for (var i in options) {
                                    if (options.hasOwnProperty(i)) {
                                        event[i] = options[i];
                                    }
                                }
                            }
                            //派发动画停止事件
                            fanim[step].dispatchEvent(event);
                            self.dispatchEvent(event);
                        }

                        //开始动画
                        function start(options) {
                            if (fanim.length && !listenerKey) {
                                //注册渲染事件监听。触发animate方法的关键代码
                                listenerKey = self.on('postcompose', animate, self);
                                //map or layer?
                                if (self.renderSync) {
                                    self.renderSync();
                                } else {
                                    self.changed();
                                }
                                // Send event 定义动画开始事件
                                var event = { type: 'animationstart', feature: feature };
                                if (options) {
                                    for (var i in options) {
                                        if (options.hasOwnProperty(i)) {
                                            event[i] = options[i];
                                        }
                                    }
                                }
                                //派发动画开始事件
                                fanim[step].dispatchEvent(event);
                                self.dispatchEvent(event);
                            }
                        }
                        start();

                        // 返回动画控制器
                        return {
                            start: start,
                            stop: stop,
                            //通过listenerKey来判断动画是否存在
                            isPlaying: function isPlaying() {
                                return !!listenerKey;
                            }
                        };
                    };

                /***/
            }),
            /* 17 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                /**
                 * create by gaoyi	
                 * create time: 2017-8-23
                 * 继承featureAnimation,实现线路自动增长的动画。
                 */
                ol.featureAnimation.Increase = function(options) {
                    options = options || {};
                    this.speed_ = options.speed || 0;
                    ol.featureAnimation.call(this, options);
                    this.side_ = options.side || 'top';
                    //自动增长的线
                    this._lineStringAdd = new ol.geom.LineString([]);
                };
                ol.inherits(ol.featureAnimation.Increase, ol.featureAnimation);

                /**
                 * 执行动画操作
                 * @param {ol.featureAnimationEvent} e
                 */
                ol.featureAnimation.Increase.prototype.animate = function(e) {

                    var length = e.geom.getLength();
                    var coordinates = e.geom.getCoordinates();
                    this._drawAnimFrame(e.time, this.duration_, length, coordinates, e);

                    return e.time <= this.duration_;
                };

                //TODO:补充ol3中的接口，计算两点间长度的api
                ol.geom.Point.getLength = function(point1, point2) {
                    var x0 = point1[0];
                    var y0 = point1[1];
                    var x1 = point2[0];
                    var y1 = point2[1];
                    var distance = Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
                    return distance;
                };

                /**
                 * 实时绘制线
                 * @param {Number} t   为当前动画执行的时间
                 * @param {Number} duration  动画执行的总时间
                 * @param {Number} length 线的长度
                 * @return {array} coordinates 线的点集合
                 * @api
                 */
                ol.featureAnimation.Increase.prototype._drawAnimFrame = function(t, duration, length, coordinates, e) {
                    if (t === 0) {
                        this._lineStringAdd.setCoordinates([]);
                        return;
                    }
                    //执行时间/总的运行时间*总长度=targetLength（运行t时间后执行的长度）
                    var targetLength = t / duration * length;
                    if (!this._animIdx) {
                        this._animIdx = 0;
                        this._animLenSoFar = 0;
                    }
                    var segLen = 0;
                    var i = void 0,
                        l = void 0;
                    for (i = this._animIdx, l = coordinates.length; i < l - 1; i++) {
                        //得到两点间的长度
                        segLen = ol.geom.Point.getLength(coordinates[i], coordinates[i + 1]); //e.geom.getLength()(coordinates[i], coordinates[i + 1]);
                        if (this._animLenSoFar + segLen > targetLength) {
                            break;
                        }
                        this._animLenSoFar += segLen;
                    }
                    this._animIdx = i;
                    if (this._animIdx >= l - 1) {
                        this._lineStringAdd.setCoordinates(coordinates);
                        var flashGeom = e.geom.clone();
                        this.drawGeom_(e, this._lineStringAdd.clone(), this._lineStringAdd.clone());
                        return;
                    }
                    var idx = this._animIdx;
                    var p1 = coordinates[idx],
                        p2 = coordinates[idx + 1],

                        //执行的时间长度 - 
                        span = targetLength - this._animLenSoFar,
                        r = span / segLen;
                    //计算两点间的线上的某一点的坐标位置
                    var x = p1[0] + (p2[0] - p1[0]) * r,
                        //p1.x + (p2.x - p1.x) * r,
                        y = p1[1] + (p2[1] - p1[1]) * r,
                        //p1.y + (p2.y - p1.y) * r,
                        targetCoord = [x, y];
                    var animCoords = coordinates.slice(0, this._animIdx + 1);
                    animCoords.push(targetCoord);

                    this._lineStringAdd.setCoordinates(animCoords);
                    var flashGeom = e.geom.clone();
                    this.drawGeom_(e, this._lineStringAdd.clone(), this._lineStringAdd.clone());
                };

                /***/
            }),
            /* 18 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                Object.defineProperty(exports, "__esModule", {
                    value: true
                });

                var _extends2 = __webpack_require__(15);

                var _extends3 = _interopRequireDefault(_extends2);

                exports.noConflict = noConflict;

                var _map = __webpack_require__(11);

                var _map2 = _interopRequireDefault(_map);

                var _overlay = __webpack_require__(12);

                var _overlay2 = _interopRequireDefault(_overlay);

                var _index = __webpack_require__(13);

                var _index2 = _interopRequireDefault(_index);

                var _index3 = __webpack_require__(10);

                var _index4 = _interopRequireDefault(_index3);

                var _utils = __webpack_require__(14);

                var _utils2 = _interopRequireDefault(_utils);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

                // import Echarts from './echarts/index';


                var ld = (0, _extends3.default)({
                    version: "1.0.0"
                }, _index2.default, _utils2.default);
                // 混合L到ol中
                ld = ol = ld.utils.extend(ol, ld);
                window.ld = window.L = ld;

                var oldld = window.ol;

                function noConflict() {
                    window.ld = oldld;
                    return this;
                }

                /***/
            }),
            /* 19 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                var _assign = __webpack_require__(4);

                var _assign2 = _interopRequireDefault(_assign);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

                ol.tilegrid.extentFromProjection = function(projection) {
                    projection = ol.proj.get(projection);
                    var extent = projection.getExtent();
                    if (!extent) {
                        var half = 180 * ol.proj.METERS_PER_UNIT[ol.proj.Units.DEGREES] / projection.getMetersPerUnit();
                        extent = ol.extent.createOrUpdate(-half, -half, half, half);
                    }
                    return extent;
                };
                if (!ol.obj) {
                    ol.obj = {};
                }
                ol.tilegrid.createESRICache = function(opt_options) {
                    var options = /** @type {olx.tilegrid.TileGridOptions} */ {};
                    ol.obj.assign(options, opt_options !== undefined ? opt_options : /** @type {olx.tilegrid.XYZOptions} */ {});
                    if (options.extent === undefined) {
                        options.extent = ol.proj.get('EPSG:3857').getExtent();
                    }
                    options.resolutions = options.resolutions;
                    /*ol.tilegrid.resolutionsFromExtent(
                     options.extent, options.maxZoom, options.tileSize)*/
                    ;

                    return new ol.tilegrid.TileGrid(options);
                };

                ol.source.ESRICache = function(opt_options) {
                    var options = opt_options || {};
                    var projection = options.projection !== undefined ? options.projection : 'EPSG:3857';

                    var tileGrid = options.tileGrid !== undefined ? options.tileGrid : ol.tilegrid.createESRICache({
                        origin: options.origin,
                        extent: ol.tilegrid.extentFromProjection(projection),
                        resolutions: options.resolutions,
                        tileSize: options.tileSize
                    });
                    /* var crossOrigin = options.crossOrigin !== undefined ?
                     options.crossOrigin : 'anonymous';*/
                    ol.source.XYZ.call(this, {
                        attributions: options.attributions,
                        cacheSize: options.cacheSize,
                        crossOrigin: options.crossOrigin,
                        logo: options.logo,
                        opaque: options.opaque,
                        projection: projection,
                        reprojectionErrorThreshold: options.reprojectionErrorThreshold,
                        tileGrid: tileGrid,
                        tileLoadFunction: options.tileLoadFunction,
                        tilePixelRatio: options.tilePixelRatio,
                        tileUrlFunction: options.tileUrlFunction,
                        url: options.url,
                        urls: options.urls,
                        wrapX: options.wrapX !== undefined ? options.wrapX : true
                    });
                };

                ol.format.WMTSCapabilities.TM_PARSERS_ = ol.xml.makeStructureNS(
                    ol.format.WMTSCapabilities.NAMESPACE_URIS_, {
                        'TopLeftCorner': ol.xml.makeObjectPropertySetter(
                            ol.format.WMTSCapabilities.readCoordinates_),
                        'ScaleDenominator': ol.xml.makeObjectPropertySetter(
                            ol.format.XSD.readDecimal),
                        'Resolution': ol.xml.makeObjectPropertySetter(
                            ol.format.XSD.readDecimal),
                        'TileWidth': ol.xml.makeObjectPropertySetter(
                            ol.format.XSD.readNonNegativeInteger),
                        'TileHeight': ol.xml.makeObjectPropertySetter(
                            ol.format.XSD.readNonNegativeInteger),
                        'MatrixWidth': ol.xml.makeObjectPropertySetter(
                            ol.format.XSD.readNonNegativeInteger),
                        'MatrixHeight': ol.xml.makeObjectPropertySetter(
                            ol.format.XSD.readNonNegativeInteger)
                    }, ol.xml.makeStructureNS(ol.format.WMTSCapabilities.OWS_NAMESPACE_URIS_, {
                        'Identifier': ol.xml.makeObjectPropertySetter(
                            ol.format.XSD.readString)
                    }));

                ol.obj.assign = typeof _assign2.default === 'function' ? _assign2.default : function(target, var_sources) {
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    var output = Object(target);
                    for (var i = 1, ii = arguments.length; i < ii; ++i) {
                        var source = arguments[i];
                        if (source !== undefined && source !== null) {
                            for (var key in source) {
                                if (source.hasOwnProperty(key)) {
                                    output[key] = source[key];
                                }
                            }
                        }
                    }
                    return output;
                };

                ol.inherits(ol.source.ESRICache, ol.source.XYZ);

                // module.exports = ol.source.ESRICache;

                /***/
            }),
            /* 20 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";


                /**
                 * create by gaoyi
                 * create time:2017-7-15
                 * 作用：加载arcgis 缓存瓦片服务
                 */
                ol.source.IShowMapTiled = function(opt_options) {

                    var options = opt_options || {};

                    var attributions;
                    if (options.attributions !== undefined) {
                        attributions = options.attributions;
                    } else {
                        attributions = [ol.source.IShowMapTiled.ATTRIBUTION];
                    }
                    var projection = opt_options.projection || ol.proj.get('EPSG:3857');
                    var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';

                    var url = options.url !== undefined ? options.url : 'http://tile5.ishowchina.com/v3/tile/{z}/{x}/{y}.png';

                    ol.source.XYZ.call(this, {
                        //attributions: attributions,
                        cacheSize: options.cacheSize,
                        crossOrigin: crossOrigin,
                        projection: projection,
                        opaque: options.opaque !== undefined ? options.opaque : true,
                        maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
                        reprojectionErrorThreshold: options.reprojectionErrorThreshold,
                        tileLoadFunction: options.tileLoadFunction,
                        url: url,
                        wrapX: options.wrapX
                    });
                };
                ol.inherits(ol.source.IShowMapTiled, ol.source.XYZ);

                /***/
            }),
            /* 21 */
            /***/
            (function(module, exports, __webpack_require__) {

                __webpack_require__(47);
                module.exports = __webpack_require__(5).Object.assign;

                /***/
            }),
            /* 22 */
            /***/
            (function(module, exports) {

                module.exports = function(it) {
                    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
                    return it;
                };

                /***/
            }),
            /* 23 */
            /***/
            (function(module, exports, __webpack_require__) {

                var isObject = __webpack_require__(3);
                module.exports = function(it) {
                    if (!isObject(it)) throw TypeError(it + ' is not an object!');
                    return it;
                };

                /***/
            }),
            /* 24 */
            /***/
            (function(module, exports, __webpack_require__) {

                // false -> Array#indexOf
                // true  -> Array#includes
                var toIObject = __webpack_require__(9),
                    toLength = __webpack_require__(43),
                    toIndex = __webpack_require__(42);
                module.exports = function(IS_INCLUDES) {
                    return function($this, el, fromIndex) {
                        var O = toIObject($this),
                            length = toLength(O.length),
                            index = toIndex(fromIndex, length),
                            value;
                        // Array#includes uses SameValueZero equality algorithm
                        if (IS_INCLUDES && el != el)
                            while (length > index) {
                                value = O[index++];
                                if (value != value) return true;
                                // Array#toIndex ignores holes, Array#includes - not
                            } else
                                for (; length > index; index++)
                                    if (IS_INCLUDES || index in O) {
                                        if (O[index] === el) return IS_INCLUDES || index || 0;
                                    }
                        return !IS_INCLUDES && -1;
                    };
                };

                /***/
            }),
            /* 25 */
            /***/
            (function(module, exports) {

                var toString = {}.toString;

                module.exports = function(it) {
                    return toString.call(it).slice(8, -1);
                };

                /***/
            }),
            /* 26 */
            /***/
            (function(module, exports, __webpack_require__) {

                // optional / simple context binding
                var aFunction = __webpack_require__(22);
                module.exports = function(fn, that, length) {
                    aFunction(fn);
                    if (that === undefined) return fn;
                    switch (length) {
                        case 1:
                            return function(a) {
                                return fn.call(that, a);
                            };
                        case 2:
                            return function(a, b) {
                                return fn.call(that, a, b);
                            };
                        case 3:
                            return function(a, b, c) {
                                return fn.call(that, a, b, c);
                            };
                    }
                    return function( /* ...args */ ) {
                        return fn.apply(that, arguments);
                    };
                };

                /***/
            }),
            /* 27 */
            /***/
            (function(module, exports, __webpack_require__) {

                var isObject = __webpack_require__(3),
                    document = __webpack_require__(2).document
                    // in old IE typeof document.createElement is 'object'
                    ,
                    is = isObject(document) && isObject(document.createElement);
                module.exports = function(it) {
                    return is ? document.createElement(it) : {};
                };

                /***/
            }),
            /* 28 */
            /***/
            (function(module, exports) {

                // IE 8- don't enum bug keys
                module.exports = (
                    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
                ).split(',');

                /***/
            }),
            /* 29 */
            /***/
            (function(module, exports, __webpack_require__) {

                var global = __webpack_require__(2),
                    core = __webpack_require__(5),
                    ctx = __webpack_require__(26),
                    hide = __webpack_require__(31),
                    PROTOTYPE = 'prototype';

                var $export = function(type, name, source) {
                    var IS_FORCED = type & $export.F,
                        IS_GLOBAL = type & $export.G,
                        IS_STATIC = type & $export.S,
                        IS_PROTO = type & $export.P,
                        IS_BIND = type & $export.B,
                        IS_WRAP = type & $export.W,
                        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
                        expProto = exports[PROTOTYPE],
                        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
                        key, own, out;
                    if (IS_GLOBAL) source = name;
                    for (key in source) {
                        // contains in native
                        own = !IS_FORCED && target && target[key] !== undefined;
                        if (own && key in exports) continue;
                        // export native or passed
                        out = own ? target[key] : source[key];
                        // prevent global pollution for namespaces
                        exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
                            // bind timers to global for call from export context
                            :
                            IS_BIND && own ? ctx(out, global)
                            // wrap global constructors for prevent change them in library
                            :
                            IS_WRAP && target[key] == out ? (function(C) {
                                var F = function(a, b, c) {
                                    if (this instanceof C) {
                                        switch (arguments.length) {
                                            case 0:
                                                return new C;
                                            case 1:
                                                return new C(a);
                                            case 2:
                                                return new C(a, b);
                                        }
                                        return new C(a, b, c);
                                    }
                                    return C.apply(this, arguments);
                                };
                                F[PROTOTYPE] = C[PROTOTYPE];
                                return F;
                                // make static versions for prototype methods
                            })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
                        // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
                        if (IS_PROTO) {
                            (exports.virtual || (exports.virtual = {}))[key] = out;
                            // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
                            if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
                        }
                    }
                };
                // type bitmap
                $export.F = 1; // forced
                $export.G = 2; // global
                $export.S = 4; // static
                $export.P = 8; // proto
                $export.B = 16; // bind
                $export.W = 32; // wrap
                $export.U = 64; // safe
                $export.R = 128; // real proto method for `library` 
                module.exports = $export;

                /***/
            }),
            /* 30 */
            /***/
            (function(module, exports) {

                var hasOwnProperty = {}.hasOwnProperty;
                module.exports = function(it, key) {
                    return hasOwnProperty.call(it, key);
                };

                /***/
            }),
            /* 31 */
            /***/
            (function(module, exports, __webpack_require__) {

                var dP = __webpack_require__(34),
                    createDesc = __webpack_require__(39);
                module.exports = __webpack_require__(0) ? function(object, key, value) {
                    return dP.f(object, key, createDesc(1, value));
                } : function(object, key, value) {
                    object[key] = value;
                    return object;
                };

                /***/
            }),
            /* 32 */
            /***/
            (function(module, exports, __webpack_require__) {

                module.exports = !__webpack_require__(0) && !__webpack_require__(1)(function() {
                    return Object.defineProperty(__webpack_require__(27)('div'), 'a', { get: function() { return 7; } }).a != 7;
                });

                /***/
            }),
            /* 33 */
            /***/
            (function(module, exports, __webpack_require__) {

                "use strict";

                // 19.1.2.1 Object.assign(target, source, ...)
                var getKeys = __webpack_require__(37),
                    gOPS = __webpack_require__(35),
                    pIE = __webpack_require__(38),
                    toObject = __webpack_require__(44),
                    IObject = __webpack_require__(7),
                    $assign = Object.assign;

                // should work with symbols and should have deterministic property order (V8 bug)
                module.exports = !$assign || __webpack_require__(1)(function() {
                    var A = {},
                        B = {},
                        S = Symbol(),
                        K = 'abcdefghijklmnopqrst';
                    A[S] = 7;
                    K.split('').forEach(function(k) { B[k] = k; });
                    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
                }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
                    var T = toObject(target),
                        aLen = arguments.length,
                        index = 1,
                        getSymbols = gOPS.f,
                        isEnum = pIE.f;
                    while (aLen > index) {
                        var S = IObject(arguments[index++]),
                            keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
                            length = keys.length,
                            j = 0,
                            key;
                        while (length > j)
                            if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
                    }
                    return T;
                } : $assign;

                /***/
            }),
            /* 34 */
            /***/
            (function(module, exports, __webpack_require__) {

                var anObject = __webpack_require__(23),
                    IE8_DOM_DEFINE = __webpack_require__(32),
                    toPrimitive = __webpack_require__(45),
                    dP = Object.defineProperty;

                exports.f = __webpack_require__(0) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
                    anObject(O);
                    P = toPrimitive(P, true);
                    anObject(Attributes);
                    if (IE8_DOM_DEFINE) try {
                        return dP(O, P, Attributes);
                    } catch (e) { /* empty */ }
                    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
                    if ('value' in Attributes) O[P] = Attributes.value;
                    return O;
                };

                /***/
            }),
            /* 35 */
            /***/
            (function(module, exports) {

                exports.f = Object.getOwnPropertySymbols;

                /***/
            }),
            /* 36 */
            /***/
            (function(module, exports, __webpack_require__) {

                var has = __webpack_require__(30),
                    toIObject = __webpack_require__(9),
                    arrayIndexOf = __webpack_require__(24)(false),
                    IE_PROTO = __webpack_require__(40)('IE_PROTO');

                module.exports = function(object, names) {
                    var O = toIObject(object),
                        i = 0,
                        result = [],
                        key;
                    for (key in O)
                        if (key != IE_PROTO) has(O, key) && result.push(key);
                        // Don't enum bug & hidden keys
                    while (names.length > i)
                        if (has(O, key = names[i++])) {
                            ~arrayIndexOf(result, key) || result.push(key);
                        }
                    return result;
                };

                /***/
            }),
            /* 37 */
            /***/
            (function(module, exports, __webpack_require__) {

                // 19.1.2.14 / 15.2.3.14 Object.keys(O)
                var $keys = __webpack_require__(36),
                    enumBugKeys = __webpack_require__(28);

                module.exports = Object.keys || function keys(O) {
                    return $keys(O, enumBugKeys);
                };

                /***/
            }),
            /* 38 */
            /***/
            (function(module, exports) {

                exports.f = {}.propertyIsEnumerable;

                /***/
            }),
            /* 39 */
            /***/
            (function(module, exports) {

                module.exports = function(bitmap, value) {
                    return {
                        enumerable: !(bitmap & 1),
                        configurable: !(bitmap & 2),
                        writable: !(bitmap & 4),
                        value: value
                    };
                };

                /***/
            }),
            /* 40 */
            /***/
            (function(module, exports, __webpack_require__) {

                var shared = __webpack_require__(41)('keys'),
                    uid = __webpack_require__(46);
                module.exports = function(key) {
                    return shared[key] || (shared[key] = uid(key));
                };

                /***/
            }),
            /* 41 */
            /***/
            (function(module, exports, __webpack_require__) {

                var global = __webpack_require__(2),
                    SHARED = '__core-js_shared__',
                    store = global[SHARED] || (global[SHARED] = {});
                module.exports = function(key) {
                    return store[key] || (store[key] = {});
                };

                /***/
            }),
            /* 42 */
            /***/
            (function(module, exports, __webpack_require__) {

                var toInteger = __webpack_require__(8),
                    max = Math.max,
                    min = Math.min;
                module.exports = function(index, length) {
                    index = toInteger(index);
                    return index < 0 ? max(index + length, 0) : min(index, length);
                };

                /***/
            }),
            /* 43 */
            /***/
            (function(module, exports, __webpack_require__) {

                // 7.1.15 ToLength
                var toInteger = __webpack_require__(8),
                    min = Math.min;
                module.exports = function(it) {
                    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
                };

                /***/
            }),
            /* 44 */
            /***/
            (function(module, exports, __webpack_require__) {

                // 7.1.13 ToObject(argument)
                var defined = __webpack_require__(6);
                module.exports = function(it) {
                    return Object(defined(it));
                };

                /***/
            }),
            /* 45 */
            /***/
            (function(module, exports, __webpack_require__) {

                // 7.1.1 ToPrimitive(input [, PreferredType])
                var isObject = __webpack_require__(3);
                // instead of the ES6 spec version, we didn't implement @@toPrimitive case
                // and the second argument - flag - preferred type is a string
                module.exports = function(it, S) {
                    if (!isObject(it)) return it;
                    var fn, val;
                    if (S && typeof(fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
                    if (typeof(fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
                    if (!S && typeof(fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
                    throw TypeError("Can't convert object to primitive value");
                };

                /***/
            }),
            /* 46 */
            /***/
            (function(module, exports) {

                var id = 0,
                    px = Math.random();
                module.exports = function(key) {
                    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
                };

                /***/
            }),
            /* 47 */
            /***/
            (function(module, exports, __webpack_require__) {

                // 19.1.3.1 Object.assign(target, source)
                var $export = __webpack_require__(29);

                $export($export.S + $export.F, 'Object', { assign: __webpack_require__(33) });

                /***/
            })
            /******/
        ]);
});
//# sourceMappingURL=lmap.js.map