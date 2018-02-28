<style lang="scss">
    .popup-item {
        height: 30px;
        line-height: 30px;
        font-size: 1.2em; // border-bottom: 1px dashed #78F9FE;
        padding-left: 8px;
        color: whitesmoke;
    }
    .popup-list>li:last-child {
        border-bottom: none;
    }
    .popup-video {
        right: 9.5px;
        top: 9.5px;
        position: absolute; // border: 2px solid green;
    }
</style>



<template>
    <div class="ol-state-select">
    </div>
</template>

<script>
    /**@augments
     * 依赖图层都加载完毕，异步的
     */
    import {
        utils,
        EventBus
    } from '../js/utils'
    export default {
        props: {
            stateName: {
                type: String,
                required: true
            }
        },
        data: function() {
            return {
                selectObj: null
            }
        },
        created: function() {
            this.selectObj = new ol.interaction.Select({
                multi: false,
                wrapX: false,
                style: new ol.style.Style({ //选中后的 要素点放大1.5倍
                    image: new ol.style.Icon({
                        anchor: [0.5, 0.5],
                        src: `../../imgs/poi/cover.png`,
                        scale: 1.2
                    })
                })
            });
            //对外暴露事件
            this.selectObj.on('select', (evt) => {
                let selectObj = evt.target; //拿到操作对象
                //如果选中了元素
                if (evt.selected.length) {
                    let layer = selectObj.getLayer(...evt.selected);
                    //拿到要素所在的图层 这里的this就是 ol.interaction.select对象
                    //设定选中图标的样式,未生效，需要咋点击前设定
                    // selectObj.setProperties({
                    //     style: new ol.style.Style({ //选中后的 要素点放大1.5倍
                    //         image: new ol.style.Icon({
                    //             anchor: [0.5, 0.5],
                    //             src: `../../imgs/poi/cover.png`,
                    //             scale: 1.5
                    //         })
                    //     })
                    // });
                    //触发选中事件
                    Object.assign(evt, {
                        layerName: layer.layerName
                    });
                    this._handleSingleChoose(evt); //添加 overlay
                    this.$emit('select', evt);
                }
            })
            //全局事件，保存
            EventBus.$on('layer-load-completed', (allLayers) => {
                let vm_olMap = this.$parent;
                //此时的地图 已经初始化完毕了 所以没有使用wait函数
                //let olMap = vm_olMap.getOlMap();
                vm_olMap.getOlMap().then((olMap) => {
                    //针对所有的可见图层，都使用选择操作
                    this.selectObj.setProperties({
                        layers: allLayers
                    }, false);
                    olMap.addInteraction(this.selectObj);
                    //在 ol-map 中保存添加的相应地图操作 opName-->op
                    vm_olMap.saveMapState(this.stateName, this.selectObj);
                    //通知地图 保存这个状态 已经添加完成
                    this.$emit('stateAdd', {
                        stateName: this.stateName,
                        stateObj: this.selectObj
                    });
                });
            })
        },
        methods: {
            _createPopupContent: (function() {
                let action = {
                    //道路施工
                    roadwork: function(evt) {
                        var businessData = evt.selected[0].S || evt.selected[0].values_;
                        return `<ul class="popup-list">
                                      <li class="popup-item">施工名称 : ${businessData.name}</li>
                                      <li class="popup-item">施工类型 : ${businessData.const_desc}</li>
                                      <li class="popup-item">施工时间 : ${businessData.const_time}</li>
                                      <li class="popup-item">地理位置 : ${evt.mapBrowserEvent.coordinate[0].toFixed(3)},${evt.mapBrowserEvent.coordinate[1].toFixed(3)}</li>
                                    </ul>`;
                    },
                    //高速探头
                    high_speed_probe: function(evt) {
                        var businessData = evt.selected[0].S || evt.selected[0].values_;
                        return `<ul class="popup-list">
                                      <li class="popup-item">设备名称 : ${businessData.name}</li>
                                      <li class="popup-item">设备编号 : ${businessData.deviceid}</li>
                                      <li class="popup-item">设备方位 : ${businessData.view_}</li>
                                      <li class="popup-item">设备状态 : ${businessData.status?'完好':'故障'}</li>
                                    </ul>
                                    <div class="popup-video">
                                    <object  type="application/x-shockwave-flash" data="./dist/flvplayer.swf" width="170" height="105" id="FlashFile_Monitor01" style="visibility: visible;">
                                        <param name="allowfullscreen" value="false">
                                        <param name="allowscriptaccess" value="always">
                                        <param name="overstretch" value="fit">
                                        <param name="flashvars" value="vcastr_file=M2U00430.flv&amp;IsAutoPlay=1&amp;IsContinue=1&amp;enablejs=true&amp;wmode=transparent&amp;overstretch=fit">
                                    </object>
                                    </div>
                                    `;
                    },
                    //摄像头
                    camera: function(evt) {
                        var businessData = evt.selected[0].S || evt.selected[0].values_;
                        return `<ul class="popup-list">
                                      <li class="popup-item">设备名称 : ${businessData.name}</li>
                                      <li class="popup-item">设备类型 : ${businessData.type}</li>
                                      <li class="popup-item">设备状态 : ${businessData.isnormal?'完好':'故障'}</li>
                                      <li class="popup-item">所属部门 : ${businessData.sup_unit}</li>
                                      <li class="popup-item">地理位置 : ${evt.mapBrowserEvent.coordinate[0].toFixed(3)},${evt.mapBrowserEvent.coordinate[1].toFixed(3)}</li>
                                    </ul>
                                    <div class="popup-video">
                                    <object  type="application/x-shockwave-flash" data="./dist/flvplayer.swf" width="170" height="85" id="FlashFile_Monitor01" style="visibility: visible;">
                                        <param name="allowfullscreen" value="false">
                                        <param name="allowscriptaccess" value="always">
                                        <param name="overstretch" value="fit">
                                        <param name="flashvars" value="vcastr_file=M2U00431.flv&amp;IsAutoPlay=1&amp;IsContinue=1&amp;enablejs=true&amp;wmode=transparent&amp;overstretch=fit">
                                    </object>
                                    </div>`;
                    },
                    //下水道井盖
                    cover: function(evt) {
                        var businessData = evt.selected[0].S || evt.selected[0].values_;
                        return `<ul class="popup-list">
                                      <li class="popup-item">设备名称 : ${businessData.name}</li>
                                      <li class="popup-item">设备材料 : ${businessData.Material}</li>
                                      <li class="popup-item">设备状态 : ${businessData.ObjState}</li>
                                      <li class="popup-item">所属单位 : ${businessData.DeptName1}</li>
                                      <li class="popup-item">数据来源 : ${businessData.DataSource}</li>
                                      <li class="popup-item">地理位置 : ${evt.mapBrowserEvent.coordinate[0].toFixed(3)},${evt.mapBrowserEvent.coordinate[1].toFixed(3)}</li>
                                    </ul>`;
                    },
                    //电子警察
                    streetlight: function(evt) {
                        var businessData = evt.selected[0].S || evt.selected[0].values_;
                        return `<ul class="popup-list">
                                      <li class="popup-item">设备名称 : ${businessData.name}</li>
                                      <li class="popup-item">设备类型 : ${businessData.Material}</li>
                                      <li class="popup-item">设备状态 : ${businessData.ObjState}</li>
                                      <li class="popup-item">所属单位 : ${businessData.sup_unit || businessData.DEPTNAME2}</li>
                                      <li class="popup-item">数据来源 : ${businessData.DataSource}</li>
                                      <li class="popup-item">地理位置 : ${evt.mapBrowserEvent.coordinate[0].toFixed(3)},${evt.mapBrowserEvent.coordinate[1].toFixed(3)}</li>
                                    </ul>`;
                    }
                };
                return function(layerName, evt) {
                    //evt.mapBrowserEvent.coordinate 地理坐标
                    //evt.selected[0].values_ 业务数据
                    return action[layerName](evt);
                }
            })(),
            //处理点选的逻辑
            _handleSingleChoose: function(evt) {
                //具备自定义扩展的 layerName,添加overlay
                console.log(evt);
                let vm_olMap = this.$parent;
                //let olMap = vm_olMap.getOlMap();
                vm_olMap.getOlMap().then((olMap) => {
                    let popup = olMap.getOverlayById('popup-default'); //拿到默认的overlay popup
                    let layerName = evt.layerName; //触发点选事件的图层，由图层的内容
                    //TODO:创建overlay的内容
                    var template = this._createPopupContent(layerName, evt);
                    //POI要素 的业务数据
                    let businessData = evt.selected[0].values_ || evt.selected[0].S;
                    if (template) {
                        vm_olMap.setOverlayContent(template); //设置对话框的内容区域
                        vm_olMap.setOverlayTitle(businessData.name); //设置对话框的标题栏
                    }
                    //设置 overlay 在地图上的位置
                    popup.setPosition(evt.mapBrowserEvent.coordinate);
                });
            },
            getStateObj: function() {
                return this.selectObj;
            },
            //TODO:将其他的地图状态置为 setActive(false)
            change: function() {}
        }
    }
</script>

