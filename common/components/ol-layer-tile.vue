<template>
    <div class="ol-layer-tile">
    </div>
</template>

<script>
    import {
        $http,
        utils,
        EventBus
    } from '../js/utils'
    export default {
        props: {
            layerUrl: {
                type: String,
                required: true
            },
            layerName: {
                type: String,
                required: true
            },
            visible: {
                type: Boolean,
                default: true
            },
            serverType:{
                type:String,
                default:'arcgis'
            }
        },
        data: function() {
            return {
                vm_olMap: null, //得到父组件引用
                olMap: null, //拿到ol对象
                tileLayer: null
            }
        },
        created: function() {
            //先添加基础瓦片图层，再添加覆盖瓦片图层
            let vm_olMap = this.$parent; //拿到父组件对象
            this.vm_olMap = vm_olMap;
            //添加基础瓦片图层之后，加载覆盖瓦片图层
            utils.wait(vm_olMap, 'olMapLoadedFlag', () => {
                let olMap = vm_olMap.getOlMap(); //拿到地图实例     
                this.olMap = olMap;
                //获取服务的能力描述信息
                let capaPromise = this._getCapabilities(this.layerUrl, this.serverType);
                //加载瓦片图层
                capaPromise.then((tileLayerConfig) => {
                    this.loadTileLayer(tileLayerConfig, this.serverType);
                    //必须要触发，因为按现在的设计，图层的可见性是在所有图层加载完毕后，才能设置，触发了本消息，地图对象才知道图层已加载完毕
                    this.$emit('layerLoaded', {
                        layerName: this.layerName,
                        layerObj: this.tileLayer
                    });
                });
            })
        },
        methods: {
            _getCapabilities: function(layerUrl, serverType) {
                let queryPromise = new Promise((resolve, reject) => {
                    switch (serverType) {
                        case 'arcgis':
                            {
                                $http.get(layerUrl + "?f=pjson").done((capa) => {
                                    //拼装请求参数
                                    let tileLayerConfig = {};
                                    let resolutions = [];
                                    for (let j in capa.tileInfo.lods) {
                                        resolutions.push(capa.tileInfo.lods[j].resolution);
                                    }
                                    Object.assign(tileLayerConfig, {
                                        resolutions: resolutions
                                    });
                                    Object.assign(tileLayerConfig, {
                                        origin: [capa.tileInfo.origin.x, capa.tileInfo.origin.y]
                                    });
                                    //成功请求到数据，状态变为成功
                                    resolve(tileLayerConfig);
                                });
                            }
                            break;
                        case 'wmts':
                            {
                                let tileLayerConfig = {};
                                fetch(layerUrl.trim() + "?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities").then((response)=>{
                                    return response.text();
                                }).then((text)=>{
                                    const parser = new ol.format.WMTSCapabilities();
                                    const result = parser.read(text);
                                    let resolutions = [];
                                    let matrixIds = [];
                                    //初始化一些全局属性
                                    Object.assign(tileLayerConfig, {
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
                                   window.layerInfo = tileLayerConfig;
                                    result.Contents.TileMatrixSet[0].TileMatrix.forEach((item) => {
                                        
                                        matrixIds.push(item.Identifier);
                                        //由比例尺换算出 分辨率
                                        //let r = utils.scaleToResolution(item.ScaleDenominator);
                                        resolutions.push(item.Resolution);
                                    });
                                    
                                    resolve(tileLayerConfig);
                                });
                            }
                            break;
                        default:
                            {
                                throw new Error(`${serverType} is not support`);
                            }
                    }
                });
                return queryPromise;
            },
            loadTileLayer: function(tileLayerConfig, serverType) { //加载瓦片图层
                let epsg = this.$parent.olMapView.projection; //获取坐标系
                let tileLayerObj = null;
                switch (serverType) {
                    case 'arcgis':
                        {
                            tileLayerObj = new ol.layer.Tile({
                                name: this.layerName,
                                visible: this.visible,
                                source: new ol.source.ESRICache({ //TODO:source后面需要提取出来，不仅仅支持ESRICache类
                                    origin: tileLayerConfig.origin,
                                    resolutions: tileLayerConfig.resolutions,
                                    projection: epsg,
                                    url: this.layerUrl + "/tile/{z}/{y}/{x}"
                                })
                            });
                        }
                        break;
                    case 'wmts':
                        {
                             tileLayerObj = new ol.layer.Tile({
                                source: new ol.source.WMTS({
                                    url: this.layerUrl,
                                    layer: tileLayerConfig.WMTS.layer,
                                    projection: epsg, //设置为mapConfig.json中的4326
                                    matrixSet: tileLayerConfig.WMTS.matrixSet,
                                    format: tileLayerConfig.WMTS.format ,
                                    style: tileLayerConfig.WMTS.style,
                                    wrapX: true,
                                    tileGrid: new ol.tilegrid.WMTS({
                                        origin: tileLayerConfig.WMTS.projectionExtent,
                                        resolutions: tileLayerConfig.WMTS.resolutions,
                                        matrixIds: tileLayerConfig.WMTS.matrixIds
                                    }),
                                })
                            });
                        }
                        break;
                    default:
                        {
                            throw new Error(`${serverType} is not support`);
                        }
                }
                //加入断言验证
                if(tileLayerObj)
                this._insertTileLayers(tileLayerObj);
            },
            _insertTileLayers: function(tileLayerObj) {
                let layers = this.olMap.getLayers();
                //positionNext是第一个矢量图层的位置，瓦片要插入在它的前面
                let positionNext = this._getTileInsertPosition(layers);
                layers.insertAt(positionNext, tileLayerObj);
                this.vm_olMap.saveMapLayer(this.layerName, tileLayerObj); //保存 baseMap的信息
            },
            _getTileInsertPosition: function(layers) {
                //找到第一个矢量图层的位置，瓦片图层要放在矢量图层的前面
                let vectorLayerIndex = layers.getArray().findIndex((value, index, arr) => {
                    return value instanceof ol.layer.Vector;
                });
                return vectorLayerIndex;
            },
            getLayerObj: function() {
                return this.tileLayer;
            },
            getLayerName: function() {
                return this.layerName;
            }
        }
    }
</script>

