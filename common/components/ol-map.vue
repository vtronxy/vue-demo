<style lang="scss">
    .ol-map {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .ol-zoom .ol-zoom-out {
        display: none;
    }
    .ol-zoom .ol-zoom-in {
        display: none;
    }
    .ol-popup {
        position: relative;
        background-image: url('../../imgs/popover.png');
        background-repeat: no-repeat;
        background-size: 100% 100%; // width: 250px;
        // height: 250px;
        width: 350px;
        height: 250px;
        z-index: 15;
        padding: 2px;
    }
    .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 5px;
        right: 8px;
    }
    .ol-popup-closer:after {
        content: "✖";
        color: whitesmoke;
    }
    .popup-content {
        position: absolute;
        bottom: 10%;
        height: 77%;
        width: 99%;
        overflow: auto;
        box-sizing: border-box;
    }
    .popup-title {
        display: inline-block;
        color: #83F5FF;
        font-size: 1.3em;
        padding-top: 2px;
        padding-left: 8px;
    }
</style>

<template>
    <div class="mapContainer">
        <div ref="leadMap" class="ol-map">
        </div>
        <slot>分发内容layer、interaction组件</slot>
        <div ref="popupContainer" class="ol-popup">
            <span ref="popupTitle" class="popup-title">华中科技大学</span >
                    <a href="#" class="ol-popup-closer" @click="_closePopup"></a>
                    <div ref="popupContent" class="popup-content"></div>
                </div>
            </div>
</template>

<script>
    //如何拿到已经实例化完毕的 olMap对象？
    import wuhan_car from '../../data/wuhan-car.json'
    import {
        $http,
        utils,
        EventBus
    } from '../js/utils'
    export default {
        props: {
            map: {
                type: Array,
                required: true
            },
            mapView: {
                type: Object,
                required: true
            }
        },
        data: function() {
            return {
                olMap: null, //openLayers 的地图实例对象
                olMapPopup: null,
                olMapLoadedFlag: false, //标识地图resolution 已经调用了setView()，调用了setView() 设置 resolutions,此后添加其他图层时才能正常显示
                olMapLayerLoaderFlag: false,
                baseMapInfo: this.map, //传递的参数 {array} 可以包含多个 地图
                olMapView: this.mapView, //地图的视图
                baseMapName: [], //基础地图的 name ,以下两个字段，记录了 layerName--> ol.layer对象的映射
                baseMap: {}, //记录瓦片地图数据信息( mapName -->  ol.layer)
                interactionNameSet: [],
                interactions: {}, //地图的交互状态对象
                overlayNameSet: [],
                overlays: {},
                baseMapConifg: {}, //记录tile各个级别的分辨率 及 切图的起始点
                olMapRenderCompleted: false //地图已经挂载到DOM上
            }
        },
        created: function() {
            let that = this;
            //step1:实例化OpenLayers地图
            this.olMap = new ol.Map({
                controls: ol.control.defaults({
                    attribution: false
                })
            });
            //debug信息
            window.mapInfo = this.baseMapConifg;
            //step1:获取地图的配置信息
            const promiseArray = [];
            for (let item of this.baseMapInfo) {
                let mapUrl = item.mapUrl;
                switch (item.serverType) {
                    case "arcgisMapServer":
                        {
                            let p = new Promise(function(resolve) {
                                //$http.get() 返回的是jqXHR对象，兼容$.defer对象
                                $http.get(mapUrl + "?f=pjson").done((capabilities) => {
                                    let capa = capabilities;
                                    let epsg = that.mapView.projection; //获取坐标系
                                    //step-1:获取地图各级别的分辨率
                                    let resolutions = [];
                                    for (let j in capa.tileInfo.lods) {
                                        resolutions.push(capa.tileInfo.lods[j].resolution);
                                    }
                                    that._saveResolutionToVM(resolutions);
                                    Object.assign(that.baseMapConifg, {
                                        origin: [capa.tileInfo.origin.x, capa.tileInfo.origin.y]
                                    });
                                    resolve(resolutions); //改变promise的状态
                                });
                            });
                            promiseArray.push(p);
                        }
                        break;
                    case "wmts":
                        {
                            const parser = new ol.format.WMTSCapabilities();
                            let p = new Promise(function(resolve) {
                                //封装的$http.get() 指定了dataType的类型是json
                                fetch(mapUrl + "?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities").then((response) => {
                                    return response.text();
                                }).then((text) => {
                                    const result = parser.read(text);
                                    window.result = result;
                                    let resolutions = [];
                                    let matrixIds = [];
                                    //初始化一些全局属性
                                    Object.assign(that.baseMapConifg, {
                                        'WMTS': {
                                            'projectionExtent': result.Contents.TileMatrixSet[0].TileMatrix[0].TopLeftCorner,
                                            'matrixSet': result.Contents.Layer[0].TileMatrixSetLink[0].TileMatrixSet,
                                            'format': result.Contents.Layer[0].Format[0] == 'PNG32' ? 'PNG':result.Contents.Layer[0].Format[0],
                                            'style': result.Contents.Layer[0].Style[0].Identifier,
                                            'layer': result.Contents.Layer[0].Identifier,
                                            'resolutions': resolutions,
                                            'matrixIds': matrixIds
                                        }
                                    });
                                    result.Contents.TileMatrixSet[0].TileMatrix.forEach((item) => {
                                        matrixIds.push(item.Identifier);
                                        //由比例尺换算出 分辨率
                                        //let r = utils.scaleToResolution(item.ScaleDenominator);
                                        resolutions.push(item.Resolution);
                                    });
                                    that._saveResolutionToVM(resolutions);
                                    resolve(result);
                                });
                            });
                            promiseArray.push(p);
                        }
                        break;
                    default:
                        {
                            throw new Error(`${item.serverType} is not support`);
                        }
                }
            }
            this._renderMap(promiseArray); //渲染地图
            //图层加载完毕
            EventBus.$on('layer-load-completed', () => {
                this.olMapLayerLoaderFlag = true; //图层加载完毕
            });
            //图层可见性切换,
            EventBus.$on('layer-switch', (data) => {
                let layerName = data.layerName; //图层名称
                let visible = data.visible; //图层的可见性
                //等待图层加载完毕,再监听各个图层的，是否可见(界面控件控制)
                utils.wait(this, 'olMapLayerLoaderFlag', () => {
                    let layerObj = this.getLayerByName(layerName);
                    if (layerObj) {
                        layerObj.setVisible(visible);
                    }
                })
            });
            //控制echartsLayer可见性单独处理
            EventBus.$on('echartsLayer-switch', (visible) => {
                this.setEchartsLayerVisible(visible);
            });
        },
        methods: {
            _saveResolutionToVM: function(resolutions) {
                //保存分辨率到全局对象上,取长度 长的分辨率字段,默认是取长度较长的分辨率作为 挂载在view对象上
                if (!this.baseMapConifg.resolutions || resolutions.length > this.baseMapConifg.resolutions.length) {
                    Object.assign(this.baseMapConifg, {
                        resolutions
                    }); //保存地图的分辨率
                }
            },
            _renderMap: async function(promiseArray) {
                //这里的res是以数组的形式 拿到 resolve()的值
                let res = await Promise.all(promiseArray);
                //初始化地图的ol.view 对象,在view对象上 挂载 resolution字段
                this._initMapView();
                //step2-new tile 实例化图层ol.layer.tile
                for (let item of this.baseMapInfo) {
                    this._initBaseMap(item.mapName, item.mapUrl, item.serverType,item.visible);
                }
                //设置地图加载完毕,添加了ol.layer.tile图层
                this.olMapLoadedFlag = true;
                //step3-挂载地图 到DOM 完成渲染
                this.$nextTick(() => {
                    this.olMap.setTarget(this.$refs.leadMap);
                    this.olMapRenderCompleted = true; //地图挂载到 DOM树之后
                    //添加一个默认的overlay
                    this.olMapPopup = new ol.Overlay({
                        id: 'popup-default',
                        element: this.$refs.popupContainer,
                        autoPan: true, //移动地图 将overlay出现在 窗口中
                        positioning: "bottom-center",
                        autoPanAnimation: {
                            duration: 250
                        }
                    });
                    this.olMap.addOverlay(this.olMapPopup);
                    //将overlay的位置做一个偏移，将箭头刚好移动到热点
                    this.olMapPopup.setOffset([-20, 0]);
                });
            },
            //初始化地图的中点级别
            _initMapView: function() {
                //设置视图 当前的分辨率
                Object.assign(this.olMapView, {
                    'resolutions': this.baseMapConifg.resolutions
                });
                //设置视图 当前的中心点与级别
                Object.assign(this.olMapView, {
                    'center': this.mapView.center,
                    'zoom': this.mapView.zoom
                });
                //step1-设置视图
                this.olMap.setView(new ol.View(this.olMapView));
            },
            //实例化 ol.layer.tile底图图层
            _initBaseMap: (function() {
                const mapLayerFactory = {
                    "arcgisMapServer": function(context, baseMapName, mapUrl,visible) {
                        let that = context;
                        let epsg = that.mapView.projection; //获取坐标系
                        let tileLayerObj = new ol.layer.Tile({
                            name: baseMapName,
                            source: new ol.source.ESRICache({
                                origin: that.baseMapConifg.origin,
                                resolutions: that.baseMapConifg.resolutions,
                                projection: epsg,
                                url: mapUrl + "/tile/{z}/{y}/{x}"
                            })
                        });
                        return tileLayerObj;
                    },
                    "wmts": function(context, baseMapName, mapUrl) {
                        let that = context;
                        let epsg = that.mapView.projection; //获取坐标系
                        let tileLayerObj = new ol.layer.Tile({
                            name: baseMapName,
                            source: new ol.source.WMTS({
                                url: mapUrl,
                                layer: that.baseMapConifg.WMTS.layer,
                                projection: epsg, //设置为mapConfig.json中的4326
                                matrixSet: that.baseMapConifg.WMTS.matrixSet,
                                format: that.baseMapConifg.WMTS.format,
                                style: that.baseMapConifg.WMTS.style,
                                wrapX: true,
                                tileGrid: new ol.tilegrid.WMTS({
                                    origin: that.baseMapConifg.WMTS.projectionExtent,
                                    resolutions: that.baseMapConifg.resolutions,
                                    matrixIds: that.baseMapConifg.WMTS.matrixIds
                                }),
                            })
                        });
                        return tileLayerObj;
                    }
                };
                //以上是创建闭包，私有变量
                return function(baseMapName, mapUrl, serverType,visible) {
                    if (!mapLayerFactory[serverType]) {
                        throw new Error(`${serverType} is not support`);
                    }
                    //这里传递vm 作为工厂函数的上下文
                    let tileLayerObj = mapLayerFactory[serverType](this, baseMapName, mapUrl);
                    this.saveMapLayer(baseMapName, tileLayerObj); //保存 baseMap的信息
                    this.olMap.addLayer(tileLayerObj); //添加瓦片底图
                    tileLayerObj.setVisible(visible); //设置初始化的可见性
                }
            })(),
            //保存所有的图层
            saveMapLayer: function(mapName, tileLayerObj) {
                if (this.baseMapName.includes(mapName)) { //判断是否有图层名字重复
                    throw new Error('baseMap 指定的名字重复-->' + mapName);
                }
                this.baseMapName.push(mapName);
                //使用了ES6的计算属性名
                Object.assign(this.baseMap, {
                    [mapName]: tileLayerObj
                });
            },
            //通过图层名称拿到基础地图
            getLayerByName: function(layerName) {
                if (!this.baseMap[layerName]) {
                    console.warn('图层不存在-->' + layerName);
                }
                return this.baseMap[layerName];
            },
            //在 wait的回调中 调用该方法 拿到实例化的 olMap实例
            getOlMap: function() {
                // if (!this.olMapLoadedFlag) {
                //     throw new Error('请使用utils.wait() 来获取olMap实例');
                // }
                // return this.olMap;

                return new Promise((resolve)=>{
                    utils.wait(this,'olMapLoadedFlag',()=>{
                        resolve(this.olMap);
                    })
                })
            },
            //设置echarts图层可见性
            setEchartsLayerVisible: function(visible) {
                let echartsLayer = this.getLayerByName("echartsLayer");
                var domJquery = $(echartsLayer._echartsContainer);
                visible ? domJquery.show() : domJquery.hide();
            },
            //添加echarts扩展图层,默认的可见性是 true
            //{visible=true}的写法函数体内不能读取visible属性,并报错，改为{visible}={visible:true}即可
            addEchartsLayer: function({
                visible
            } = {
                visible: true
            }) {
                //等待地图渲染完毕之后
                utils.wait(this, 'olMapRenderCompleted', () => {
                    let echartsLayer = new ol.extecharts.MapLayer(this.olMap);
                    const colors = ["#ebbc4f", "#ebda4f", "#c29425", "#f2a867", "#f4dda6", "#fff7e3"];
                    let getbmapTolonlat = function(lonlat) {
                        return [lonlat[0] - 0.01185, lonlat[1] - 0.003391];
                    }
                    let setOption = function(features) {
                        let a = [];
                        let h = features.length;
                        let f = 300 / (h - 1);
                        for (let e = 0; e < h; e++) {
                            let k = features[e];
                            let o = [];
                            for (let d = 0; d < k.geometry.paths.length; d++) {
                                let m = k.geometry.paths[d];
                                o = o.concat(m)
                            }
                            let c = colors[Math.floor(Math.random() * colors.length)];
                            let g = [3, 4, 5, 6];
                            for (let b = 0; b < 2; b++) {
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
                    }
                    let data = setOption(wuhan_car.features); //拿到修改后的要素数据
                    const option = {
                        LDMap: {},
                        series: [{
                            type: "lines",
                            coordinateSystem: "LDMap",
                            polyline: true,
                            data: data,
                            silent: true,
                            lineStyle: {
                                normal: {
                                    opacity: 0,
                                    width: 0
                                }
                            },
                            progressiveThreshold: 500,
                            progressive: 200
                        }, {
                            type: "lines",
                            coordinateSystem: "LDMap",
                            polyline: true,
                            data: data,
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
                    echartsLayer.chart.setOption(option);
                    this.saveMapLayer("echartsLayer", echartsLayer);
                    this.setEchartsLayerVisible(visible); //设置初始化 echarts扩展图层的可见性
                })
            },
            //保存交互对象
            saveMapState: function(stateName, interactionObj) {
                if (this.interactionNameSet.includes(stateName)) {
                    throw new Error(`${stateName} interaction is  exist`);
                }
                this.interactionNameSet.push(stateName);
                Object.assign(this.interactions, {
                    [stateName]: interactionObj
                });
            },
            getMapStateByName: function(stateName) {
                if (!this.interactionNameSet.includes(stateName)) {
                    throw new Error(`${stateName} is not exist`);
                }
                return this.interactions[stateName];
            },
            //添加overlay的内容
            setOverlayContent: function(contentHTML) {
                this.$refs.popupContent.innerHTML = contentHTML;
            },
            //设置浮动框的标题栏
            setOverlayTitle: function(popupTitle) {
                this.$refs.popupTitle.innerText = popupTitle;
            },
            //关闭浮动框
            _closePopup: function() {
                //关闭浮动框
                this.olMapPopup.setPosition(undefined);
                //清空选中的要素
                let singleChoose = this.getMapStateByName('single-choose');
                //拿到当前选中的要素
                if (singleChoose) {
                    singleChoose.getFeatures().clear();
                }
            }
        },
    }
</script>
