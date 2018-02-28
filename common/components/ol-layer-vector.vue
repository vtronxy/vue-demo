<template>
    <div class="ol-layer-vector">
    </div>
</template>

<script>
    import {
        utils
    } from '../js/utils'
    export default {
        props: {
            layerUrl: {
                type:String,
                required:true
            },
            queryCondition:{
                type:String,
                default:'/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson'
            },
            layerName: {
                type: String,
                required: true
            },
            layerStyle:{
                type:Object,
                default:null
            },
            visible: {
                type: Boolean,
                default: true
            }
        },
        data: function() {
            return {
                vectorLayer: null,
                dataSrc:null,
                isLocalSource:false
            }
        },
        created: function() {
            this.layerUrl.includes('http')? this.isLocalSource = true:this.isLocalSource = false;
            if(this.isLocalSource){ //远程资源
                this.dataSrc = this.layerUrl + this.queryCondition;
            }else{ //远程资源
                this.dataSrc = this.layerUrl;
            }
            //矢量图层这里没有区分类型点、线、面，图层由数据源的 类型 来选择相应的渲染方式
            this.vectorLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    url:this.dataSrc,
                    format: new ol.format.EsriJSON()
                }),
                // 设置样式，颜色为红色，线条粗细为1个像素，同时设置了 point line poly的样式
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(222, 252, 199, 0.5)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(110, 110, 110, 255)',
                        width: 2
                    }),
                    image: new ol.style.Icon({
                        anchor: [0.5, 0.5], //图标绘制起始点
                        src:this.layerStyle.img
                    })
                }),
                wrapX: false
            });
            //设置图层初始化的可见性
            this.vectorLayer.setVisible(this.visible)
            //自定义字段 扩展layerName字段
            Object.assign(this.vectorLayer, {
                layerName: this.layerName
            });
            let vm_olMap = this.$parent; //拿到ol.Map 实例
            //等待地图加载完毕，设置了view属性及各个级别的地图分辨率之后
            utils.wait(vm_olMap, 'olMapLoadedFlag', () => {
                vm_olMap.getOlMap().then((olMap) => {
                    olMap.addLayer(this.vectorLayer); //添加图层
                    vm_olMap.saveMapLayer(this.layerName, this.vectorLayer); //保存layerName-->layerObj的映射关系
                    this.$emit('layer-loaded', {
                        layerName: this.layerName,
                        layerObj: this.vectorLayer
                    });
                });
            })
        },
        methods: {
            //todo:进行图层 初始化操作
            _initLayer() {

            },
            getLayerObj: function() {
                return this.vectorLayer;
            },
            getLayerName: function() {
                return this.layerName;
            }
        }
    }
</script>

