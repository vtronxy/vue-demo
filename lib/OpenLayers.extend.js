/**
 * Created by Nihaorz on 2015/12/28.
 */
/**
 * Class: OpenLayers.Pyramid
 * 金字塔对象类。
 * 金字塔对象类可以实现地理范围（坐标）与瓦片行、列属性之间的转换。
 * 地图对象必须有一个金字塔属性。本类的实例默认为地理坐标系统360度
 * 顶层瓦片金字塔方案。另外，包含了比例尺，分辨率和级别之间的转换。
 */
OpenLayers.Pyramid = OpenLayers.Class({

    /**
     * APIProperty: name
     * {String} 金字塔名称。
     */
    name: null,

    /**
     * APIProperty: pyramidID
     * {String} 金字塔ID。
     */
    pyramidID: null,

    /**
     * APIProperty: description
     * {String} 金字塔描述。
     */
    description: null,

    /**
     * APIProperty: topLevelIndex
     * {Number} 最顶层级别。
     */
    topLevelIndex: null,

    /**
     * APIProperty: bottomLevelIndex
     * {Number} 最底层级别。
     */
    bottomLevelIndex: null,

    /**
     * APIProperty: scaleX
     * {Number} X轴放大系数。
     */
    scaleX: null,

    /**
     * APIProperty: scaleY
     * {Number} Y轴放大系数。
     */
    scaleY: null,

    /**
     * APIProperty: tileSize
     * {<OpenLayers.Size>} 瓦片尺寸。
     */
    tileSize: null,

    /**
     * APIProperty: originRowIndex
     * {Number} 瓦片行起始编号。
     */
    originRowIndex: null,

    /**
     * APIProperty: originColIndex
     * {Number} 瓦片列起始编号。
     */
    originColIndex: null,

    /**
     * APIProperty: topTileFromX
     * {Float} 顶层瓦片X轴坐标起点。
     */
    topTileFromX: null,

    /**
     * APIProperty: topTileFromY
     * {Float} 顶层瓦片Y轴坐标起点。
     */
    topTileFromY: null,

    /**
     * APIProperty: topTileToX
     * {Float} 顶层瓦片X轴坐标终点。
     */
    topTileToX: null,

    /**
     * APIProperty: topTileToY
     * {Float} 顶层瓦片Y轴坐标终点。
     */
    topTileToY: null,

    /**
     * APIProperty: units
     * {String} 金字塔的单位优先于地图的单位。默认为'degrees'。
     * 值可能为：'degrees' (or 'dd'), 'm', 'ft', 'km', 'mi', 'inches'.
     */
    units: 'degrees',

    /**
     * Constructor: OpenLayers.Pyramid
     * 构造函数。
     *
     * Parameters:
     * options - {object} 金字塔设置选项。
     */
    initialize: function (options) {

        if (!options || options === {}) {
            options = OpenLayers.Pyramid.DEFAULT_PYRAMID;
        }
        OpenLayers.Util.extend(this, options);
    },

    /**
     * APIMethod: getMaxExtent
     * 根据根据金字塔对象相关定义获取最大范围。
     *
     * Returns:
     * {<OpenLayers.Bounds>} 图层最大范围。
     */
    getMaxExtent: function () {
        var left, bottom, right, top;

        if (this.topTileFromX < this.topTileToX) {
            left = this.topTileFromX;
            right = this.topTileToX;
        } else {
            right = this.topTileFromX;
            left = this.topTileToX;
        }

        if (this.topTileFromY < this.topTileToY) {
            bottom = this.topTileFromY;
            top = this.topTileToY;
        } else {
            top = this.topTileFromY;
            bottom = this.topTileToY;
        }
        return new OpenLayers.Bounds(left, bottom, right, top);
    },

    /**
     * APIMethod: getResolutionForLevel
     * 根据分辨率获取级别。
     *
     * Parameters:
     * resolution - 指定分辨率。
     *
     * Returns:
     * {Integer} 级别。
     */
    getLevelForResolution: function (resolution) {
        if (!resolution) {
            return 0;
        }
        var zoom, i, diff;
        var minDiff = Number.POSITIVE_INFINITY;
        var resolutions = this.getResolutions();
        for (i = 0, len = resolutions.length; i < len; i++) {
            //判断当前分辨率与金字塔中分辨率最接近的
            diff = Math.abs(resolutions[i] - resolution);
            if (diff > minDiff) {
                break;
            }
            minDiff = diff;
        }
        zoom = Math.max(0, i - 1);//0和(i - 1)中取大数。
        return zoom;
    },

    /**
     * APIMethod: getLevelForScale
     * 根据比例尺获取级别。
     *
     * Parameters:
     * scale - 指定比例尺。
     *
     * Returns:
     * {Integer} 级别。
     */
    getLevelForScale: function (scale) {
        var resolution = OpenLayers.Util.getResolutionFromScale(scale, this.units);
        var zoom = this.getLevelForResolution(resolution);
        return zoom;
    },

    /**
     * APIMethod: getResolutionForScale
     * 根据比例尺获取分辨率。
     *
     * Parameters:
     * scale - 指定比例尺。
     * units - {String} 单位。
     *
     * Returns:
     * {float} 分辨率。
     */
    getResolutionForScale: function (scale) {
        var level = this.getLevelForScale(scale, this.units);
        var res = this.getResolutionForLevel(level)
        return res;
    },

    /**
     * APIMethod: getResolutionForLevel
     * 根据级别获取分辨率。
     *
     * Parameters:
     * level - 图层级别。
     *
     * Returns:
     * {float} 分辨率。
     */
    getResolutionForLevel: function (level) {
        var maxResolution = (this.getTopTileSize().w / this.tileSize.w)
        return maxResolution / Math.pow(2, level);
    },

    /**
     * APIMethod: getMaxResolution
     * 根据最大级别获取分辨率。
     *
     * Returns:
     * {float} 分辨率。
     */
    getMaxResolution: function () {
        return this.getResolutionForLevel(this.topLevelIndex)
    },

    /**
     * APIMethod: getResolutionForBottomLevel
     * 根据最小级别获取分辨率。
     *
     * Returns:
     * {float} 分辨率。
     */
    getMinResolution: function () {
        return this.getResolutionForLevel(this.bottomLevelIndex)
    },

    /**
     * APIMethod: getResolutions
     * 获取分辨率数组。
     *
     * Returns:
     * {Array} 分辨率数组。
     */
    getResolutions: function () {
        var resolutions = new Array();
        for (var i = this.topLevelIndex; i <= this.bottomLevelIndex; i++) {
            resolutions.push(this.getResolutionForLevel(i));
        }
        return resolutions;
    },

    /**
     * APIMethod: getNumZoomLevels
     * 获取级别差。
     *
     * Returns:
     *  {Integer} 级别差。
     */
    getNumZoomLevels: function () {
        return this.bottomLevelIndex - this.topLevelIndex + 1;
    },

    /**
     * APIMethod: getTopTileSize
     * 获取顶层瓦片尺寸。
     *
     * Returns:
     * {<OpenLayers.Size>} 瓦片大小。
     */
    getTopTileSize: function () {
        var w = Math.abs(this.topTileToX - this.topTileFromX);
        var h = Math.abs(this.topTileToY - this.topTileFromY);
        return new OpenLayers.Size(w, h);
    },

    /**
     * APIMethod: getTileIndex
     * 根据坐标和级别，获取瓦片所在行列号。
     *
     * Parameters:
     * lonlat - 经纬度坐标。
     * level - 图层级别。
     *
     * Returns:
     * {Object} 返回瓦片的行列号。
     */
    getTileIndex: function (lonlat, level) {

        var lon = lonlat.lon;
        var lat = lonlat.lat;
        var size = this.getTopTileSize()
        var degree = size.w / Math.pow(2, level);

        //金字塔宽高
        var width = this.maxExtent.getWidth();
        var height = this.maxExtent.getHeight();

        //总行列数
        var totalCol = Math.round(width / degree);
        var totalRow = Math.round(height / degree);

        //计算列索引号
        var isStartLeft = (this.topTileFromX < this.topTileToX) ? true : false;
        var colIndex = Math.ceil(Math.abs(lon - this.topTileFromX) / degree) - 1;
        if (!isStartLeft) {
            colIndex = totalCol - colIndex;
        }

        var isStartTop = (this.topTileFromY > this.topTileToY) ? true : false;
        var rowIndex = Math.ceil(Math.abs(lat - this.topTileFromY) / degree) - 1;
        if (!isStartTop) {
            rowIndex = totalRow - rowIndex;
        }

        return {
            col: colIndex,
            row: rowIndex
        }

    },

    /**
     * APIMethod: getTileInfoFromBounds
     * 根据范围和级别获得最大最小行列号。
     *
     * Parameters:
     * bounds - 范围。
     * level - 图层级别。
     *
     * Returns:
     * {Object} 返回最大最小行列号。
     */
    getTileInfoFromBounds: function (bounds, level) {
        //判断原点
        var minTileObj = this.getTileIndex(new OpenLayers.LonLat(bounds.left, bounds.top), level);
        var maxTileObj = this.getTileIndex(new OpenLayers.LonLat(bounds.right, bounds.bottom), level);
        return {
            mincol: minTileObj.col,
            minrow: minTileObj.row,
            maxcol: maxTileObj.col,
            maxrow: maxTileObj.row
        }
    },

    /**
     *
     */
    getTileInfoFromLonLat: this.getTileIndex,

    /**
     * APIMethod: clone
     * 复制对象。
     *
     * Returns:
     * {<OpenLayers.Pyramid>} 金字塔对象。
     */
    clone: function () {
        return OpenLayers.Util.extend({}, this);
    },

    CLASS_NAME: "OpenLayers.Pyramid"
});

/**
 * APIProperty: Degree360
 * 360度金字塔定义。
 */
OpenLayers.Pyramid.Degree360 = {
    //360度金字塔定义
    name: "360DegreePyramid",
    topLevelIndex: 0,
    bottomLevelIndex: 20,
    scaleX: 2,
    scaleY: 2,
    topTileFromX: -180.0,
    topTileFromY: 90.0,
    topTileToX: 180.0,
    topTileToY: -270.0,
    tileSize: new OpenLayers.Size(256, 256),
    originRowIndex: 0,
    originColIndex: 0,
    maxExtent: new OpenLayers.Bounds(-180, -90, 180, 90)
};

/**
 * APIProperty: Degree18
 * 18度金字塔定义。
 */
OpenLayers.Pyramid.Degree18 = {
    //18度金字塔定义
    name: "18DegreePyramid",
    topLevelIndex: 0,
    bottomLevelIndex: 20,
    scaleX: 2,
    scaleY: 2,
    topTileFromX: -180.0,
    topTileFromY: -90.0,
    topTileToX: -162.0,
    topTileToY: -72.0,
    tileSize: new OpenLayers.Size(256, 256),
    originRowIndex: 0,
    originColIndex: 0,
    maxExtent: new OpenLayers.Bounds(-180, -90, 180, 90)
};

OpenLayers.Pyramid.WebMercator = {
    name: "web墨卡托金字塔",
    topLevelIndex: 0,
    bottomLevelIndex: 20,
    scaleX: 2,
    scaleY: 2,
    topTileFromX: -20037508.3427892,
    topTileFromY: 20037508.3427892,
    topTileToX: 20037508.3427892,
    topTileToY: -20037508.3427892,
    tileSize: new OpenLayers.Size(256, 256),
    originRowIndex: 0,
    originColIndex: 0,
    maxExtent: new OpenLayers.Bounds(-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892),
    units: "m"
}

/**
 * APIProperty: DEFAULT_PYRAMID
 * 默认金字塔定义（360度金字塔定义）。
 */
OpenLayers.Pyramid.DEFAULT_PYRAMID = OpenLayers.Pyramid.Degree360;

OpenLayers.Layer.ESRICache = OpenLayers.Class(OpenLayers.Layer.TMS, {
    initialize: function (name, url, options) {
        OpenLayers.Layer.TMS.prototype.initialize.apply(this, [name, url, options]);
    },
    getURL: function (bounds) {
        var z = this.map.getZoom();
        var res = this.map.getResolution(z);
        var x = parseInt((bounds.getCenterLonLat().lon - this.tileOrigin.lon) / (this.tileSize.w * res));
        var y = parseInt((this.tileOrigin.lat - bounds.getCenterLonLat().lat) / (this.tileSize.h * res));
        return this.url + '/tile/' + z + '/' + y + '/' + x;
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.ESRICache(this.name, this.url, this.options);
        }
        return OpenLayers.Layer.TMS.prototype.clone.apply(this, [obj]);
    },
    CLASS_NAME: "OpenLayers.Layer.ESRICache"
});


/**
 * Class: OpenLayers.Popup.Anchored
 *
 * Inherits from:
 *  - <OpenLayers.Popup>
 */
OpenLayers.Popup.AnchoredPopup = OpenLayers.Class(OpenLayers.Popup, {

    /**
     * Parameter: relativePosition
     * {String} Relative position of the popup ("br", "tr", "tl" or "bl").
     */
    relativePosition: null,

    // "popup" "feature"
    popupType: "popup",
    /**
     * APIProperty: keepInMap
     * {Boolean} If panMapIfOutOfView is false, and this property is true,
     *     contrain the popup such that it always fits in the available map
     *     space. By default, this is set. If you are creating popups that are
     *     near map edges and not allowing pannning, and especially if you have
     *     a popup which has a fixedRelativePosition, setting this to false may
     *     be a smart thing to do.
     *
     *     For anchored popups, default is true, since subclasses will
     *     usually want this functionality.
     */
    keepInMap: true,
    disableFirefoxOverflowHack: true,
    /**
     * Parameter: anchor
     * {Object} Object to which we'll anchor the popup. Must expose a
     *     'size' (<OpenLayers.Size>) and 'offset' (<OpenLayers.Pixel>).
     */
    anchor: null,

    /**
     * Constructor: OpenLayers.Popup.Anchored
     *
     * Parameters:
     * id - {String}
     * lonlat - {<OpenLayers.LonLat>}
     * contentSize - {<OpenLayers.Size>}
     * contentHTML - {String}
     * anchor - {Object} Object which must expose a 'size' <OpenLayers.Size>
     *     and 'offset' <OpenLayers.Pixel> (generally an <OpenLayers.Icon>).
     * closeBox - {Boolean}
     * closeBoxCallback - {Function} Function to be called on closeBox click.
     */
    initialize: function (id, lonlat, contentSize, contentHTML, anchor, closeBox,
                          closeBoxCallback) {
        var newArguments = [
            id, lonlat, contentSize, contentHTML, closeBox, closeBoxCallback
        ];
        //OpenLayers.Popup.prototype.initialize.apply(this, newArguments);


        if (id == null) {
            id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }

        this.id = id;
        this.lonlat = lonlat;

        this.contentSize = (contentSize != null) ? contentSize
            : new OpenLayers.Size(
            OpenLayers.Popup.WIDTH,
            OpenLayers.Popup.HEIGHT);
        if (contentHTML != null) {
            this.contentHTML = contentHTML;
        }
        this.backgroundColor = OpenLayers.Popup.COLOR;
        this.opacity = OpenLayers.Popup.OPACITY;
        this.border = OpenLayers.Popup.BORDER;

        this.div = OpenLayers.Util.createDiv(this.id, null, null,
            null, null, null, "hidden");
        this.div.className = this.displayClass;
        //
        //this.div.appendChild(contentHTML);
        this.div.innerHTML = contentHTML;
        if (closeBox) {
            this.addCloseBox(closeBoxCallback);
        }

        this.registerEvents();


        this.anchor = (anchor != null) ? anchor
            : {
            size: new OpenLayers.Size(0, 0),
            offset: new OpenLayers.Pixel(0, 0)
        };
    },

    /**
     * APIMethod: destroy
     */
    destroy: function () {
        this.anchor = null;
        this.relativePosition = null;

        this.id = null;
        this.lonlat = null;
        this.size = null;
        this.contentHTML = null;

        this.backgroundColor = null;
        this.opacity = null;
        this.border = null;

        if (this.closeOnMove && this.map) {
            this.map.events.unregister("movestart", this, this.hide);
        }

        this.events.destroy();
        this.events = null;

        if (this.closeDiv) {
            OpenLayers.Event.stopObservingElement(this.closeDiv);
        }
        this.closeDiv = null;

        if (this.map != null) {
            this.map.removePopup(this);
        }
        this.map = null;
        this.div = null;

        this.autoSize = null;
        this.minSize = null;
        this.maxSize = null;
        this.padding = null;
        this.panMapIfOutOfView = null;
    },

    /**
     * APIMethod: show
     * Overridden from Popup since user might hide popup and then show() it
     *     in a new location (meaning we might want to update the relative
     *     position on the show)
     */
    show: function () {
        this.updatePosition();
        OpenLayers.Popup.prototype.show.apply(this, arguments);
    },

    /**
     * Method: moveTo
     * Since the popup is moving to a new px, it might need also to be moved
     *     relative to where the marker is. We first calculate the new
     *     relativePosition, and then we calculate the new px where we will
     *     put the popup, based on the new relative position.
     *
     *     If the relativePosition has changed, we must also call
     *     updateRelativePosition() to make any visual changes to the popup
     *     which are associated with putting it in a new relativePosition.
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     */
    moveTo: function (px) {
        var oldRelativePosition = this.relativePosition;
        this.relativePosition = this.calculateRelativePosition(px);

        var newPx = this.calculateNewPx(px);

        var newArguments = new Array(newPx);
        OpenLayers.Popup.prototype.moveTo.apply(this, newArguments);

        //if this move has caused the popup to change its relative position,
        // we need to make the appropriate cosmetic changes.
        if (this.relativePosition != oldRelativePosition) {
            this.updateRelativePosition();
        }
    },

    /**
     * APIMethod: setSize
     *
     * Parameters:
     * contentSize - {<OpenLayers.Size>} the new size for the popup's
     *     contents div (in pixels).
     */
    setSize: function (contentSize) {
        OpenLayers.Popup.prototype.setSize.apply(this, arguments);

        if ((this.lonlat) && (this.map)) {
            var px = this.map.getLayerPxFromLonLat(this.lonlat);
            this.moveTo(px);
        }
    },

    /**
     * Method: calculateRelativePosition
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     *
     * Returns:
     * {String} The relative position ("br" "tr" "tl" "bl") at which the popup
     *     should be placed.
     */
    calculateRelativePosition: function (px) {
        var lonlat = this.map.getLonLatFromLayerPx(px);

        var extent = this.map.getExtent();
        var quadrant = extent.determineQuadrant(lonlat);

        return OpenLayers.Bounds.oppositeQuadrant(quadrant);
    },

    /**
     * Method: updateRelativePosition
     * The popup has been moved to a new relative location, so we may want to
     *     make some cosmetic adjustments to it.
     *
     *     Note that in the classic Anchored popup, there is nothing to do
     *     here, since the popup looks exactly the same in all four positions.
     *     Subclasses such as the AnchoredBubble and Framed, however, will
     *     want to do something special here.
     */
    updateRelativePosition: function () {
        //to be overridden by subclasses
    },

    /**
     * Method: calculateNewPx
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     *
     * Returns:
     * {<OpenLayers.Pixel>} The the new px position of the popup on the screen
     *     relative to the passed-in px.
     */
    calculateNewPx: function (px) {
        /*
         var newPx = px.offset(this.anchor.offset);

         //use contentSize if size is not already set
         var size = this.size || this.contentSize;

         var top = (this.relativePosition.charAt(0) == 't');
         newPx.y += (top) ? -size.h : this.anchor.size.h;

         var left = (this.relativePosition.charAt(1) == 'l');
         newPx.x += (left) ? -size.w : this.anchor.size.w;

         return newPx;
         */
        var newPx = px.offset(this.anchor.offset);
        newPx.y += this.anchor.size.h;
        newPx.x += this.anchor.size.w;
        return newPx;
    },

    /******
     addCloseBox: function(callback) {
        var closePopup = callback || function(e) {
            this.hide();
            OpenLayers.Event.stop(e);
        };
        OpenLayers.Event.observe(this.closeDiv, "touchend",
                OpenLayers.Function.bindAsEventListener(closePopup, this));
        OpenLayers.Event.observe(this.closeDiv, "click",
                OpenLayers.Function.bindAsEventListener(closePopup, this));
    },
     *******/
    CLASS_NAME: "OpenLayers.Popup.AnchoredPopup"
});


OpenLayers.Control.Measure.prototype.deactivate = function () {
    this.cancelDelay();
    //return OpenLayers.Control.prototype.deactivate.apply(this, arguments);

    if (this.active) {
        if (this.handler) {
            //this.handler.deactivate();

            if (!OpenLayers.Handler.prototype.deactivate.apply(this.handler, arguments)) {
                return false;
            }
            // this.handler.cancel();

            var key = true ? "cancel" : "done";
            this.handler.mouseDown = false;
            this.handler.lastDown = null;
            this.handler.lastUp = null;
            this.handler.lastTouchPx = null;
            this.handler.callback(key, [this.handler.geometryClone()]);
            //this.destroyFeature(cancel);

            // If a layer's map property is set to null, it means that that layer
            // isn't added to the map. Since we ourself added the layer to the map
            // in activate(), we can assume that if this.layer.map is null it means
            // that the layer has been destroyed (as a result of map.destroy() for
            // example.
            if (this.handler.layer.map != null) {

                //this.handler.destroyFeature(true);
                //this.handler.layer.destroy(false);
            }
            //this.handler.layer = null;
            this.handler.touch = false;
            //return true;

        }
        this.active = false;
        if (this.map) {
            OpenLayers.Element.removeClass(
                this.map.viewPortDiv,
                this.displayClass.replace(/ /g, "") + "Active"
            );
        }
        this.events.triggerEvent("deactivate");
        return true;
    }
    return false;
}

OpenLayers.Control.Measure.prototype.cancel = function () {
    if (this.lengthPopup && this.lengthPopup.length) {
        for (var i = this.lengthPopup.length - 1; i >= 0; i--) {
            try {
                popup = this.lengthPopup[i];
                if (popup.id == this.handler.layer.id) {
                    this.map.removePopup(popup);
                }
            } catch (error) {
            }
        }
    }
    this.cancelDelay();
    this.handler.cancel();
}

/**
 * APIMethod: meterToDegree
 * 根据地理坐标位置，将米转换成经纬度。
 *
 * Parameters:
 * meter - {Number} 以米为单位的距离值
 * lonlat - {<OpenLayers.LonLat>}
 */
OpenLayers.Util.meterToDegree = function (meter, lonlat) {
    var a = 0.00000899; //赤道上的距离1公里=0.000008993220293度
    var templat = lonlat.lat;
    return meter * (a / Math.cos(OpenLayers.Util.rad(templat)));
}

/**
 * Class: OpenLayers.Control.PanZoomBar
 * The PanZoomBar is a visible control composed of a
 * <OpenLayers.Control.PanPanel> and a <OpenLayers.Control.ZoomBar>.
 * By default it is displayed in the upper left corner of the map as 4
 * directional arrows above a vertical slider.
 *
 * Inherits from:
 *  - <OpenLayers.Control.PanZoom>
 */
OpenLayers.Control.PanZoomBar_soso = OpenLayers.Class(OpenLayers.Control.PanZoom, {

    /**
     * APIProperty: zoomStopWidth
     */
    zoomStopWidth: 10,

    /**
     * APIProperty: zoomStopHeight
     */
    zoomStopHeight: 7,

    /**
     * Property: slider
     */
    slider: null,

    /**
     * Property: sliderEvents
     * {<OpenLayers.Events>}
     */
    sliderEvents: null,

    /**
     * Property: zoombarDiv
     * {DOMElement}
     */
    zoombarDiv: null,

    /**
     * APIProperty: zoomWorldIcon
     * {Boolean}
     */
    zoomWorldIcon: false,

    /**
     * APIProperty: panIcons
     * {Boolean} Set this property to false not to display the pan icons. If
     * false the zoom world icon is placed under the zoom bar. Defaults to
     * true.
     */
    panIcons: true,

    /**
     * APIProperty: forceFixedZoomLevel
     * {Boolean} Force a fixed zoom level even though the map has
     *     fractionalZoom
     */
    forceFixedZoomLevel: false,

    /**
     * Property: mouseDragStart
     * {<OpenLayers.Pixel>}
     */
    mouseDragStart: null,

    /**
     * Property: deltaY
     * {Number} The cumulative vertical pixel offset during a zoom bar drag.
     */
    deltaY: null,

    /**
     * Property: zoomStart
     * {<OpenLayers.Pixel>}
     */
    zoomStart: null,

    /**
     * Constructor: OpenLayers.Control.PanZoomBar
     */

    /**
     * APIMethod: destroy
     */
    destroy: function () {

        this._removeZoomBar();

        this.map.events.un({
            "changebaselayer": this.redraw,
            "updatesize": this.redraw,
            scope: this
        });

        OpenLayers.Control.PanZoom.prototype.destroy.apply(this, arguments);

        delete this.mouseDragStart;
        delete this.zoomStart;
    },

    /**
     * Method: setMap
     *
     * Parameters:
     * map - {<OpenLayers.Map>}
     */
    setMap: function (map) {
        OpenLayers.Control.PanZoom.prototype.setMap.apply(this, arguments);
        this.map.events.on({
            "changebaselayer": this.redraw,
            "updatesize": this.redraw,
            scope: this
        });
    },

    /**
     * Method: redraw
     * clear the div and start over.
     */
    redraw: function () {
        if (this.div != null) {
            this.removeButtons();
            this._removeZoomBar();
        }
        this.draw();
    },

    /**
     * Method: draw
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     */
    draw: function (px) {
        // initialize our internal div
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        px = this.position.clone();

        // place the controls
        this.buttons = [];

        var sz = {w: 20, h: 20};
        if (this.panIcons) {
            var centered = new OpenLayers.Pixel(px.x + sz.w / 2, px.y);
            var wposition = sz.w;

            if (this.zoomWorldIcon) {
                centered = new OpenLayers.Pixel(px.x + sz.w, px.y);
            }
            this._addButton("rudder", "soso/rudder.png", {x: 0, y: 0}, {w: 56, h: 56});
            var panup = this._addButton("panup", "soso/north-mini.png", {x: 20, y: 6}, {w: 16, h: 10});
            px.y = centered.y + sz.h;
            var panleft = this._addButton("panleft", "soso/west-mini.png", {x: 8, y: 20}, {w: 10, h: 16});
            if (this.zoomWorldIcon) {
                this._addButton("zoomworld", "soso/zoom-world-mini.png", px.add(sz.w, 0), sz);
                wposition *= 2;
            }
            var panright = this._addButton("panright", "soso/east-mini.png", {x: 38, y: 20}, {w: 10, h: 16});
            var pandown = this._addButton("pandown", "soso/south-mini.png", {x: 20, y: 36}, {w: 16, h: 10});
            var zoomin = this._addButton("zoomin", "soso/zoom-plus-mini.png", {x: 15, y: 64}, {w: 26, h: 26});
            centered = this._addZoomBar(centered.add(9, sz.h * 4 + 5));
            var zoomout = this._addButton("zoomout", "soso/zoom-minus-mini.png", centered.add(-8, 7), {w: 26, h: 26});

            var list = [panup, panleft, panright, pandown, zoomin, zoomout, this.slider];
            for (var i in list) {
                list[i].onmouseover = function () {
                    if (this.firstChild) {
                        var src = this.firstChild.src;
                        src = src.substring(0, src.length - ".png".length) + "-v.png";
                        this.firstChild.src = src;
                    }
                };
                list[i].onmouseout = function (e) {
                    if (this.firstChild) {
                        var src = this.firstChild.src;
                        src = src.substring(0, src.length - "-v.png".length) + ".png";
                        this.firstChild.src = src;
                    }
                };
            }
        }
        else {
            this._addButton("zoomin", "soso/zoom-plus-mini.png", px, sz);
            centered = this._addZoomBar(px.add(0, sz.h));
            this._addButton("zoomout", "soso/zoom-minus-mini.png", centered, sz);
            if (this.zoomWorldIcon) {
                centered = centered.add(0, sz.h + 3);
                this._addButton("zoomworld", "soso/zoom-world-mini.png", centered, sz);
            }
        }
        return this.div;
    },

    /**
     * Method: _addZoomBar
     *
     * Parameters:
     * centered - {<OpenLayers.Pixel>} where zoombar drawing is to start.
     */
    _addZoomBar: function (centered) {
        var imgLocation = OpenLayers.Util.getImageLocation("soso/slider.png");
        var id = this.id + "_" + this.map.id;
        var minZoom = this.map.getMinZoom();
        var zoomsToEnd = this.map.getNumZoomLevels() - 1 - this.map.getZoom();
        var slider = OpenLayers.Util.createAlphaImageDiv(id,
            centered.add(-7, zoomsToEnd * this.zoomStopHeight),
            {w: 24, h: 14},
            imgLocation,
            "absolute");
        slider.style.cursor = "move";
        this.slider = slider;
        this.sliderEvents = new OpenLayers.Events(this, slider, null, true,
            {includeXY: true});
        this.sliderEvents.on({
            "touchstart": this.zoomBarDown,
            "touchmove": this.zoomBarDrag,
            "touchend": this.zoomBarUp,
            "mousedown": this.zoomBarDown,
            "mousemove": this.zoomBarDrag,
            "mouseup": this.zoomBarUp
        });

        var sz = {
            w: this.zoomStopWidth,
            h: this.zoomStopHeight * (this.map.getNumZoomLevels() - minZoom + 1)
        };
        var imgLocation = OpenLayers.Util.getImageLocation("soso/zoombar.png");
        var div = null;
        if (OpenLayers.Util.alphaHack()) {
            var id = this.id + "_" + this.map.id;
            div = OpenLayers.Util.createAlphaImageDiv(id, centered,
                {w: sz.w, h: this.zoomStopHeight},
                imgLocation,
                "absolute", null, "crop");
            div.style.height = sz.h + "px";
        } else {
            div = OpenLayers.Util.createDiv(
                'OpenLayers_Control_PanZoomBar_Zoombar' + this.map.id,
                centered,
                sz,
                imgLocation);
        }
        div.style.cursor = "pointer";
        div.className = "olButton";
        this.zoombarDiv = div;

        this.div.appendChild(div);

        this.startTop = parseInt(div.style.top);
        this.div.appendChild(slider);

        this.div.style.left = "20px";

        this.div.appendChild(OpenLayers.Util.createDiv('OpenLayers_Control_PanZoomBar_Tooltip' + this.map.id, {
            x: -14,
            y: 84
        }, {w: 33, h: 17}, OpenLayers.Util.getImageLocation("soso/zoom_street.png")));

        this.div.appendChild(OpenLayers.Util.createDiv('OpenLayers_Control_PanZoomBar_Tooltip' + this.map.id, {
            x: -14,
            y: 104
        }, {w: 33, h: 17}, OpenLayers.Util.getImageLocation("soso/zoom_community.png")));

        this.div.appendChild(OpenLayers.Util.createDiv('OpenLayers_Control_PanZoomBar_Tooltip' + this.map.id, {
            x: -14,
            y: 124
        }, {w: 33, h: 17}, OpenLayers.Util.getImageLocation("soso/zoom_towns.png")));

        this.div.appendChild(OpenLayers.Util.createDiv('OpenLayers_Control_PanZoomBar_Tooltip' + this.map.id, {
            x: -4,
            y: 144
        }, {w: 23, h: 17}, OpenLayers.Util.getImageLocation("soso/zoom_district.png")));

        this.map.events.register("zoomend", this, this.moveZoomBar);

        centered = centered.add(0,
            this.zoomStopHeight * (this.map.getNumZoomLevels() - minZoom));
        return centered;
    },

    /**
     * Method: _removeZoomBar
     */
    _removeZoomBar: function () {
        this.sliderEvents.un({
            "touchstart": this.zoomBarDown,
            "touchmove": this.zoomBarDrag,
            "touchend": this.zoomBarUp,
            "mousedown": this.zoomBarDown,
            "mousemove": this.zoomBarDrag,
            "mouseup": this.zoomBarUp
        });
        this.sliderEvents.destroy();

        this.div.removeChild(this.zoombarDiv);
        this.zoombarDiv = null;
        this.div.removeChild(this.slider);
        this.slider = null;

        this.map.events.unregister("zoomend", this, this.moveZoomBar);
    },

    /**
     * Method: onButtonClick
     *
     * Parameters:
     * evt - {Event}
     */
    onButtonClick: function (evt) {
        OpenLayers.Control.PanZoom.prototype.onButtonClick.apply(this, arguments);
        if (evt.buttonElement === this.zoombarDiv) {
            var levels = evt.buttonXY.y / this.zoomStopHeight;
            if (this.forceFixedZoomLevel || !this.map.fractionalZoom) {
                levels = Math.floor(levels);
            }
            var zoom = (this.map.getNumZoomLevels() - 1) - levels;
            zoom = Math.min(Math.max(zoom, 0), this.map.getNumZoomLevels() - 1);
            this.map.zoomTo(zoom);
        }
    },

    /**
     * Method: passEventToSlider
     * This function is used to pass events that happen on the div, or the map,
     * through to the slider, which then does its moving thing.
     *
     * Parameters:
     * evt - {<OpenLayers.Event>}
     */
    passEventToSlider: function (evt) {
        this.sliderEvents.handleBrowserEvent(evt);
    },

    /*
     * Method: zoomBarDown
     * event listener for clicks on the slider
     *
     * Parameters:
     * evt - {<OpenLayers.Event>}
     */
    zoomBarDown: function (evt) {
        if (!OpenLayers.Event.isLeftClick(evt) && !OpenLayers.Event.isSingleTouch(evt)) {
            return;
        }
        this.map.events.on({
            "touchmove": this.passEventToSlider,
            "mousemove": this.passEventToSlider,
            "mouseup": this.passEventToSlider,
            scope: this
        });
        this.mouseDragStart = evt.xy.clone();
        this.zoomStart = evt.xy.clone();
        this.div.style.cursor = "move";
        // reset the div offsets just in case the div moved
        this.zoombarDiv.offsets = null;
        OpenLayers.Event.stop(evt);
    },

    /*
     * Method: zoomBarDrag
     * This is what happens when a click has occurred, and the client is
     * dragging.  Here we must ensure that the slider doesn't go beyond the
     * bottom/top of the zoombar div, as well as moving the slider to its new
     * visual location
     *
     * Parameters:
     * evt - {<OpenLayers.Event>}
     */
    zoomBarDrag: function (evt) {
        if (this.mouseDragStart != null) {
            var deltaY = this.mouseDragStart.y - evt.xy.y;
            var offsets = OpenLayers.Util.pagePosition(this.zoombarDiv);
            if ((evt.clientY - offsets[1]) > 0 &&
                (evt.clientY - offsets[1]) < parseInt(this.zoombarDiv.style.height) - 2) {
                var newTop = parseInt(this.slider.style.top) - deltaY;
                this.slider.style.top = newTop + "px";
                this.mouseDragStart = evt.xy.clone();
            }
            // set cumulative displacement
            this.deltaY = this.zoomStart.y - evt.xy.y;
            OpenLayers.Event.stop(evt);
        }
    },

    /*
     * Method: zoomBarUp
     * Perform cleanup when a mouseup event is received -- discover new zoom
     * level and switch to it.
     *
     * Parameters:
     * evt - {<OpenLayers.Event>}
     */
    zoomBarUp: function (evt) {
        if (!OpenLayers.Event.isLeftClick(evt) && evt.type !== "touchend") {
            return;
        }
        if (this.mouseDragStart) {
            this.div.style.cursor = "";
            this.map.events.un({
                "touchmove": this.passEventToSlider,
                "mouseup": this.passEventToSlider,
                "mousemove": this.passEventToSlider,
                scope: this
            });
            var zoomLevel = this.map.zoom;
            if (!this.forceFixedZoomLevel && this.map.fractionalZoom) {
                zoomLevel += this.deltaY / this.zoomStopHeight;
                zoomLevel = Math.min(Math.max(zoomLevel, 0),
                    this.map.getNumZoomLevels() - 1);
            } else {
                zoomLevel += this.deltaY / this.zoomStopHeight;
                zoomLevel = Math.max(Math.round(zoomLevel), 0);
            }
            this.map.zoomTo(zoomLevel);
            this.mouseDragStart = null;
            this.zoomStart = null;
            this.deltaY = 0;
            OpenLayers.Event.stop(evt);
        }
    },

    /*
     * Method: moveZoomBar
     * Change the location of the slider to match the current zoom level.
     */
    moveZoomBar: function () {
        var newTop =
            ((this.map.getNumZoomLevels() - 1) - this.map.getZoom()) *
            this.zoomStopHeight + this.startTop + 1;
        this.slider.style.top = newTop + "px";
    },

    CLASS_NAME: "OpenLayers.Control.PanZoomBar_soso"
});

OpenLayers.Control.OverviewMap.prototype.draw = function () {
    OpenLayers.Control.prototype.draw.apply(this, arguments);
    if (this.layers.length === 0) {
        if (this.map.baseLayer) {
            var layer = this.map.baseLayer.clone();
            this.layers = [layer];
        } else {
            this.map.events.register("changebaselayer", this, this.baseLayerDraw);
            return this.div;
        }
    }

    // create overview map DOM elements
    this.element = document.createElement('div');
    this.element.className = this.displayClass + 'Element';
    this.element.style.display = 'none';

    this.mapDiv = document.createElement('div');
    this.mapDiv.style.width = this.size.w + 'px';
    this.mapDiv.style.height = this.size.h + 'px';
    this.mapDiv.style.position = 'relative';
    this.mapDiv.style.overflow = 'hidden';
    this.mapDiv.id = OpenLayers.Util.createUniqueID('overviewMap');

    this.extentRectangle = document.createElement('div');
    this.extentRectangle.style.position = 'absolute';
    this.extentRectangle.style.zIndex = 1000;  //HACK
    this.extentRectangle.className = this.displayClass + 'ExtentRectangle';

    this.element.appendChild(this.mapDiv);

    this.div.appendChild(this.element);

    // Optionally add min/max buttons if the control will go in the
    // map viewport.
    if (!this.outsideViewport) {
        this.div.className += " " + this.displayClass + 'Container';
        // maximize button div
        var img = OpenLayers.Util.getImageLocation('amap/layer-switcher-maximize.png');
        this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv(
            this.displayClass + 'MaximizeButton',
            null,
            null,
            img,
            'absolute');
        this.maximizeDiv.style.display = 'none';
        this.maximizeDiv.className = this.displayClass + 'MaximizeButton olButton';
        if (this.maximizeTitle) {
            this.maximizeDiv.title = this.maximizeTitle;
        }
        this.div.appendChild(this.maximizeDiv);

        // minimize button div
        var img = OpenLayers.Util.getImageLocation('amap/layer-switcher-minimize.png');
        this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv(
            'OpenLayers_Control_minimizeDiv',
            null,
            null,
            img,
            'absolute');
        this.minimizeDiv.style.display = 'none';
        this.minimizeDiv.className = this.displayClass + 'MinimizeButton olButton';
        if (this.minimizeTitle) {
            this.minimizeDiv.title = this.minimizeTitle;
        }
        this.div.appendChild(this.minimizeDiv);
        this.minimizeControl();
    } else {
        // show the overview map
        this.element.style.display = '';
    }
    if (this.map.getExtent()) {
        this.update();
    }

    this.map.events.on({
        buttonclick: this.onButtonClick,
        moveend: this.update,
        scope: this
    });

    if (this.maximized) {
        this.maximizeControl();
    }
    return this.div;
}
