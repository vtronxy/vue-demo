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
            }
        },
        data: function() {
            return {
                vectorLayer: null
            }
        },
        created: function() {
            //发起ajax请求，添加图层到 ol.map容器
            this.vectorLayer = new ol.layer.Vector({
                //visible: false, //TODO:把图层以属性扩展
                source: new ol.source.Vector({
                    url: `../../data/${this.layerName}.json`,
                    format: new ol.format.EsriJSON()
                }),
                // 设置样式，颜色为红色，线条粗细为1个像素
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 0.5], //图标绘制起始点
                        src: `../../imgs/poi/${this.layerName}.png`
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
            //todo:预先加载 图层使用 数据.json 及 图片资源
            _initGetData() {
                return new Promise((resolve) => {
                    //获取图层的配置信息
                })
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

