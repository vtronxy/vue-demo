<template>
  <div class="content_center">
    <div id="overlay" style="display: none;"></div>
    <div id="simpleMap"></div>
    <div class="fg_detail">
        <span id="detailTopSpan">∨</span>
        <div class="module_bottom_center bi-corner">
            <div class="content-right-header  fg_header_lgtdzz">
                <div class="fg_header_swit1"></div>
                <div class="fg_header_lgtdzz_text">实时反馈</div>
            </div>
            <div class="fg_detail_lgTd" id="fg_detail_lgTdd">
                <ul>
                    <li class="fg_detail_dt1">
                        <div class="">
                            <img src="imgs/poi/gd.png" width=24 height=32/>
                        </div>
                        <div>
                            <div class="fg_detail_title">7/9/2016 09:33:43</div>
                            <div>施工管理:施工废弃料,在公共场所未按规定时间和地点堆放的建筑</div>
                        </div>
                    </li>
                    <li class="fg_detail_dt1">
                        <div>
                            <img src="imgs/poi/rk.png" width=24 height=32/>
                        </div>
                        <div>
                            <div class="fg_detail_title">7/9/2016 10:33:43</div>
                            <div>街面秩序:机动车乱停放,在未经许可,未合法设置停车泊位的地点</div>
                        </div>
                    </li>
                    <li class="fg_detail_dt1">
                        <div>
                            <img src="imgs/poi/sg.png" width=24 height=32/>
                        </div>
                        <div>
                            <div class="fg_detail_title">7/9/2016 10:44:43</div>
                            <div>街面秩序:机动车乱停放,在未经许可,未合法设置停车泊位的地点</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: [], //组件支持的属性
    data: function() { //响应式数据
        return {}
    },
    methods: {}, //方法中的 this指向 VM实例
    created: function() {},
    mounted: function() { //挂载上DOM树后
        //初始化地图
        var mapInit = require("../../common/js/mapInit");
        //绑定地图相关的业务逻辑
        var map = mapInit.map;
        var vectorLayer = mapInit.vectorLayer;
        var selectControl = mapInit.selectControl;
        var popup = mapInit.popup;
        var points = [{ x: 94.661967, y: 40.262128, imgSrc: "imgs/poi/gd.png" },
            { x: 94.681967, y: 40.322128, imgSrc: "imgs/poi/rk.png" },
            { x: 94.701967, y: 40.242128, imgSrc: "imgs/poi/sg.png" },
            { x: 94.631967, y: 40.302128, imgSrc: "imgs/poi/yq.png" }
        ];

        points.forEach(function(e) {
            var iconFeature2 = new ol.Feature({
                'geometry': new ol.geom.Point([e["x"], e["y"]]) //new ol.geom.Point(e["x"], e["y"])
            });

            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
                    anchor: [-11, -35],
                    size: [219, 401],
                    anchorXUnits: 'pixels',
                    anchorYUnits: 'pixels',
                    src: e["imgSrc"]
                }))
            });
            iconFeature2.setStyle(iconStyle);
            vectorLayer.getSource().addFeature(iconFeature2);
        });

        var overlayerContent = "<div data-dojo-attach-point=\"_containerNode\"" +
            "class=\"esri-container esri-popup-shadow esri-show-footer esri-show-dock esri-dock-to-right esri-has-promise-features esri-feature-updated esri-show-title esri-show-content esri-top\" data-layer-name=\"\" data-layer-id=\"sgzd\" style=\"left: 0px; top: 0px;\">" +
            "<div class=\"esri-popup-main\"><header class=\"esri-popup-header\">" +
            "<h1 data-dojo-attach-point=\"_titleNode\" class=\"esri-title\">处理中</h1>" +
            "<div class=\"esri-popup-header-buttons\">" +
            "<div role=\"button\" tabindex=\"0\" data-dojo-attach-point=\"_closeNode\" class=\"esri-button esri-close\" title=\"关闭\">" +
            "<span aria-hidden=\"true\" class=\"esri-popup-icon esri-close-icon esri-icon-close\"></span>" +
            "<span class=\"esri-icon-font-fallback-text\">关闭</span>" +
            "</div></div></header>" +
            "<article class=\"esri-popup-content\" data-dojo-attach-point=\"_bodyContentNode\">" +
            "<div class=\"esri-popup-renderer esri-widget\" widgetid=\"esri_widgets_Popup_PopupRenderer_0\" id=\"esri_widgets_Popup_PopupRenderer_0\">" +
            "<div class=\"esri-popup-renderer-container\">" +
            "<div class=\"esri-popup-renderer-main\">" +
            "<div class=\"esri-popup-renderer-loading-container\"><span class=\"esri-icon esri-icon-loading-indicator esri-rotating\"></span></div>" +
            "<div data-dojo-attach-point=\"_contentNode\"><div class=\"esri-popup-renderer-text esri-popup-renderer-content-element\"><p>案件编号：70</p><p>城市案件：施工过程中未经审批擅自占道的现象</p><p>案件类型：施工占道</p><p>案件监管单位：城管监察大队</p><p>案件监管人：监督员上报</p></div></div>" +
            "</div></div>" +
            "</div></article></div></div>";
        var ele = popup.getElement();
        ele.innerHTML = overlayerContent;

        $(document).on("click", "div.esri-close", function() {
            var closeEvt = arguments[0];
            popup.setPosition(undefined);
            var mapBrowserEvent = new ol.MapBrowserEvent("singleclick", map, closeEvt);
            ////取消要素点击
            selectControl.handleEvent(mapBrowserEvent);
            return false;

        });

        $("div.esri-close").on("click", function() {
            var closeEvt = arguments[0];
            popup.setPosition(undefined);
            var mapBrowserEvent = new ol.MapBrowserEvent("singleclick", map, closeEvt);
            ////取消要素点击
            selectControl.handleEvent(mapBrowserEvent);
            return false;

        });
    },
    components: { //可以注册嵌套的局部组件，在模板字符串中使用

    }
}
</script>

