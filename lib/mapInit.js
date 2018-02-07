/**
 * create by gaoyi
 * create time 2017-9-6
 * 说明：初始化地图
 */
//import './mapConfig'
require('./mapConfig');
//初始化地图
var mapTiledUrl = window.mapConfig["baseMapTiled"][0];
var center = window.mapConfig["center"];
var mapZoom = window.mapConfig["zoom"];
var mapType;
var projectType;
var map, source, vector, selectControl, popup;
var capabilitiesDeferred = $.ajax({
    type: "get",
    async: false, //同步执行
    url: mapTiledUrl + "?f=pjson",
    dataType: "json",
    error: function() {
        alert('fail');
    }
});

var _initMapInfo = function(capabilities) {

    var capa = capabilities;
    var resolutions = [];
    for (var j in capa.tileInfo.lods) {
        resolutions.push(capa.tileInfo.lods[j].resolution);
    }
    var epsg = "EPSG:" + 4326;
    map = new ol.Map({
        projection: epsg,
        target: 'simpleMap',
        controls: ol.control.defaults({ attribution: false }),
        layers: [
            new ol.layer.Tile({
                name: "baseMap",
                source: new ol.source.ESRICache({
                    origin: [capa.tileInfo.origin.x, capa.tileInfo.origin.y],
                    resolutions: resolutions,
                    projection: epsg,
                    url: mapTiledUrl + "/tile/{z}/{y}/{x}"
                })
            })
        ],
        view: new ol.View({
            projection: epsg,
            resolutions: resolutions,
            center: center, //ol.proj.transform([/*94.65424626536483, 40.14363363555644*/114.34, 30.55], 'EPSG:4326', 'EPSG:3857'),
            zoom: mapZoom
        })
    });

    source = new ol.source.Vector({
        wrapX: false
    });

    vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'red'
            }),
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({
                    color: 'red'
                })
            })
        })
    });

    map.addLayer(vector);

    initControlInfo();

    initPopupInfo();
}

var initControlInfo = function() {
    //选择要素的控件
    selectControl = new ol.interaction.Select({
        layers: [vector],
        multi: false // multi is used in this example if hitTolerance > 0
    });

    map.addInteraction(selectControl);
}

var initPopupInfo = function() {
    var child = document.createElement("div");
    popup = new ol.Overlay({
        position: ol.proj.fromLonLat([0, 0]),
        positioning: "bottom-right",
        element: child
    });
    map.addOverlay(popup);
    child.className = "esri-popup esri-widget";
    child.style.overflow = "visible";
    child.style.filter = "none";

    selectControl.on('select', function(evt) {

        if (evt.selected.length > 0) {
            var lonlat = evt.selected[0].getGeometry().getCoordinates();

            popup.setPosition(lonlat);
        }

    });


}

$.when(capabilitiesDeferred).done(function(capabilities) {
    _initMapInfo(capabilities);
});

// export default {
//     map: map,
//     vectorLayer: vector,
//     selectControl: selectControl,
//     popup: popup
// }
//需要 与 require配套使用,在bi-content-center的mounted回调中使用 require导入所以这里使用CMD写法
module.exports = {
    map: map,
    vectorLayer: vector,
    selectControl: selectControl,
    popup: popup
}