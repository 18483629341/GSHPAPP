/**
 * Created by xubo on 2015/1/13.
 * mapView基类指令
 */
angular.module('ThsMapDirectives', ['ionic'])
    .directive("thsMapView", function ($document, $q, $http) {
        return {
            restrict: "E",
            replace: true,
            template: '<div style="height: 100%;width: 100%;" data-tap-disabled="true"><div/><div/></div>',
            scope: true,
            controller: function ($scope, $element, $attrs,$ionicLoading,$timeout) {
                $scope.map = null;
                $scope.buttonTag = null;
                $scope.mapOptions = null;

                /**
                 * 地图增加功能按钮
                 * @param img 按钮图片url
                 * @param clickFunction 点击事件的function方法
                 * @returns {*} 元素按妞
                 */
                $scope.addButtonForImg = function (img, clickFunction) {
                    var divButton = $document[0].createElement('div');
                    divButton.style.backgroundImage = "url(" + img + ")";
                    divButton.className = "mapButton home";
                    $scope.addEventListener(divButton, "click", clickFunction);
                    var index = $scope.buttonTag.childElementCount;
                    $scope.buttonTag.insertBefore(divButton, $scope.buttonTag.childNodes[index]);
                    return divButton;
                };

                /**
                 * 元素增加事件
                 * @param element 元素
                 * @param event 事件
                 * @param eventFunction 事件方法
                 */
                $scope.addEventListener = function (element, event, eventFunction) {
                    if (window.addEventListener) {
                        element.addEventListener(event, eventFunction, false);
                    }
                    else {
                        element.attachEvent("on" + event, eventFunction);
                    }
                };

                /**-------------------------地图图层操作相关的方法---------------------------------------*/

                /**
                 *  初始化基础按钮
                 * @param postion 按钮位置, top-left, top-right, bottom-left, bottom-right
                 * @param orientation 排列方向,vertical和horizontal
                 */
                $scope.initBaseButtonTag = function (postion, orientation,hideButtonTag) {
                    if(hideButtonTag){
                      return;
                    }
                    var left = "20px";
                    var top = "20px";
                    var right = "20px";
                    var buttomLeft = "40px";
                    var buttomRight = "45px";
                    var buttonTag = $document[0].createElement('div');
                    if (postion === "top-left") {
                        if (orientation === "vertical") {
                            buttonTag.style.top = "100px";
                            buttonTag.style.left = left;
                            buttonTag.className = "mapOrientationVertical HomeButton";
                        } else {
                            buttonTag.style.top = top;
                            buttonTag.style.left = "100px";
                            buttonTag.className = "mapOrientationHorizontal HomeButton";
                        }
                    } else if (postion === "top-right") {
                        if (orientation === "vertical") {
                            buttonTag.style.top = "100px";
                            buttonTag.style.right = right;
                            buttonTag.className = "mapOrientationVertical HomeButton";
                        } else {
                            buttonTag.style.top = top;
                            buttonTag.style.right = "100px";
                            buttonTag.className = "mapOrientationHorizontal HomeButton";
                        }
                    } else if (postion === "bottom-left") {
                        if (orientation === "vertical") {
                            buttonTag.style.bottom = "120px";
                            buttonTag.style.left = left;
                            buttonTag.className = "mapOrientationVertical HomeButton";
                        } else {
                            buttonTag.style.bottom = buttomLeft;
                            buttonTag.style.left = "100px";
                            buttonTag.className = "mapOrientationHorizontal HomeButton";
                        }
                    } else if (postion === "bottom-right") {
                        if (orientation === "vertical") {
                            buttonTag.style.bottom = "315px";
                            buttonTag.style.right = right;
                            buttonTag.className = "mapOrientationVertical HomeButton";
                        } else {
                            buttonTag.style.bottom = buttomRight;
                            buttonTag.style.right = "100px";
                            buttonTag.className = "mapOrientationHorizontal HomeButton";
                        }
                    }
                    $scope.buttonTag = buttonTag;
                    var showHome = $scope.mapOptions.showHome !== undefined ? $scope.mapOptions.showHome : true;
                    if ($scope.mapOptions.initialExtent !== undefined && $scope.mapOptions.initialExtent !== null && showHome) {
                        $scope.addButtonForImg("js/map/img/map_home.png", function () {
                            $scope.map.setExtent(new esri.geometry.Extent($scope.mapOptions.initialExtent.xmin, $scope.mapOptions.initialExtent.ymin, $scope.mapOptions.initialExtent.xmax, $scope.mapOptions.initialExtent.ymax));
                        });
                    }
                    /**
                     * 注释掉定位按钮
                     */
                    //$scope.locBtn=$scope.addButtonForImg("js/map/img/map_location.png", null);
                    $element[0].appendChild(buttonTag);
                };

                /**
                 * 初始化地图控件
                 * @param mapOptions 地图参数
                 */
                $scope.initialMap = function (mapOptions) {
                    $scope.map = new esri.Map($element[0], {
                        wrapAround180: mapOptions.wrapAround180 === undefined ? false : mapOptions.wrapAround180,
                        logo: false,
                        autoResize: true,
                        fadeOnZoom: false,
          
                        displayGraphicsOnPan: !dojo.isIE,
                        sliderPosition: (mapOptions.sliderposition === undefined || mapOptions.sliderposition === "") ? "top-left" : mapOptions.sliderposition,
                        sliderOrientation: (mapOptions.sliderorientation === undefined || mapOptions.sliderposition === "") ? "vertical" : mapOptions.sliderorientation
                    });
                    if ($scope.mapOptions.initialExtent != undefined && $scope.mapOptions.initialExtent != null) {
                        $scope.map.setExtent(new esri.geometry.Extent(mapOptions.initialExtent.xmin, mapOptions.initialExtent.ymin, mapOptions.initialExtent.xmax, mapOptions.initialExtent.ymax));
                    }
                    $scope.$emit("mapLoaded", $scope.map);//地图控件初始化完毕
                };

                /**
                 * 添加图层
                 * @param layerOptions 图层参数
                 * label：图层ID，type：图层类型（dynamic、tiled、image、feature，baidumap、baidusatellitemap、baidulabelmap
                 * tiandimap、tiandisatellitemap、tiandilabelmap、googlemap、googlesatellitemap、googleterrainmap）
                 * visible：是否可见 opacity：不透明度（0全透明，1不透明）
                 */
                $scope.addLayer = function (layerOptions) {
                    var layer;
                    var layerType = layerOptions.type.toLocaleLowerCase();
                    if (layerType.indexOf("baidu") >= 0) {
                        layer = new ths.layers.BaiDuLayer(layerType);//创建百度地图
                    }
                    else if (layerType.indexOf("tianditu") >= 0) {
                        layer = new ths.layers.TianDiTuLayer(layerType);
                    }
                    else if (layerType.indexOf("google") >= 0) {
                        layer = new ths.layers.GoogleMapLayer("layerType");
                    }
                    else if (layerType === "feature") {
                        var featureLayerOptions = {};
                        if (layerOptions.extension !== undefined) {
                            if (layerOptions.extension.outfields !== undefined && layerOptions.extension.outfields.length !== 0) {
                                featureLayerOptions.outFields = layerOptions.extension.outfields;
                            }
                            if (layerOptions.extension.wherestring !== undefined && layerOptions.extension.wherestring !== "") {
                                layer.setDefinitionExpression(layerOptions.extension.wherestring);
                            }
                        }
                        //featureLayerOptions.mode=esri.layers.FeatureLayer.MODE_ONDEMAND;
                        featureLayerOptions.displayOnPan=false;
                        layer = new esri.layers.FeatureLayer(layerOptions.url, featureLayerOptions);
                        var timeout;
                        layer.on('update-end',function(data){
                             $ionicLoading.hide();
                             $timeout.cancel(timeout);
                        });
                        layer.on('update-start',function(data){
                            $ionicLoading.show({template:  '<span class="icon load-spin font-size-3"></span>'});
                            timeout= $timeout(function(){
                                $ionicLoading.hide();
                            },15000);
                        });
                    }
                    else if (layerType === "dynamic") {
                        layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerOptions.url);
                        if (layerOptions.visiblelayers !== undefined && layerOptions.visiblelayers.length !== 0) {
                            layer.setVisibleLayers(layerOptions.visiblelayers);
                        }

                    }
                    else if (layerType === "tiled") {
                        layer = new esri.layers.ArcGISTiledMapServiceLayer(layerOptions.url);
                    }
                    else if (layerType === "image") {
                        layer = new esri.layers.ArcGISImageServiceLayer(layerOptions.url);
                    }
                    if (layer === null) {
                        alert("图层加载错误，请检查相应参数");
                    }
                    layer.id = layerOptions.label;
                    layer.visible = layerOptions.visible !== undefined ? layerOptions.visible : true;
                    layer.opacity = layerOptions.opacity !== undefined ? layerOptions.opacity : 1.0;
                    layer.minScale = layerOptions.minScale !== undefined ? layerOptions.minScale : 0;
                    layer.maxScale = layerOptions.maxScale !== undefined ? layerOptions.maxScale : 0;
                    if ($scope.map == null) {
                        alert("地图控件尚未加载!");
                    }
                    $scope.map.addLayer(layer);
                    return layer;
                };

                require([
                    "esri/map"
                ], function () {
                    //读取配置文件
                    var config = $attrs.config;
                    if (config === undefined || config !== config || config === "") {
                        config = "js/map/map-config.json";
                    }
                    //加载配置文件，并生成地图
                    $http.get(config).then(function (response) {
                        var groupLayers = [];
                        var satelliteLayers = [];
                        var streetsLayers = [];
                        var groupIndex;

                        $scope.mapOptions = response.data.map;
                        $scope.initialMap(response.data.map);
                        //for (var baseLayer in response.data.map.baseMaps) {
                        for (var baseLayer= 0;baseLayer< response.data.map.baseMaps.length;baseLayer++) {
                            var layer = $scope.addLayer(response.data.map.baseMaps[baseLayer]);
                            var groupId = response.data.map.baseMaps[baseLayer].groupId;
                            if (groupId != undefined && groupId != null) {
                                for (var index in groupId) {
                                    var id = groupId[index];
                                    if (id === 0) {
                                        streetsLayers.push(layer);
                                    } else if (id === 1) {
                                        satelliteLayers.push(layer);
                                    }
                                }
                            }
                            if (baseLayer === "0" && groupId != undefined) {
                                var visible = response.data.map.baseMaps[baseLayer].visible;
                                if (visible === undefined || visible === true) {
                                    if (groupId[0] === 0) {
                                        groupIndex = 0;
                                    } else {
                                        groupIndex = 1;
                                    }
                                } else {
                                    if (groupId[0] === 1) {
                                        groupIndex = 0;
                                    } else {
                                        groupIndex = 1;
                                    }
                                }
                            }

                        }
                        for (var livingmap=0;response.data.map.livingmaps!==undefined&&livingmap< response.data.map.livingmaps.length;livingmap++) {
                            $scope.addLayer(response.data.map.livingmaps[livingmap]);
                        }
                        var showBaseButton=$attrs.hidebasebuttontag!=='true';
                        if(showBaseButton){
                          var postion = (response.data.map.sliderposition === undefined || response.data.map.sliderposition.trim() === "") ? "top-left" : response.data.map.sliderposition;
                          var orientation = (response.data.map.sliderorientation === undefined || response.data.map.sliderposition.trim() === "") ? "vertical" : response.data.map.sliderorientation;
                          $scope.initBaseButtonTag(postion, orientation);
                        }
                        if (streetsLayers.length > 0) {
                            groupLayers.push(streetsLayers);
                        }
                        if (satelliteLayers.length > 0) {
                            groupLayers.push(satelliteLayers);
                        }
                        var showSwitchLayer = response.data.map.showSwitchLayer != undefined ? response.data.map.showSwitchLayer : true;
                        if (groupLayers.length > 0 && showSwitchLayer&&showBaseButton) {
                            $scope.addButtonForImg("js/map/img/map_layer.png", function () {
                                var groupLayer0 = groupLayers[0];
                                var groupLayer1 = groupLayers[1];
                                if (groupIndex === 0) {
                                    for (var index=0;groupLayer0!==undefined&&index<groupLayer0.length;index++) {
                                        groupLayer0[index].hide();
                                    }
                                    for (var index=0;groupLayer1!==undefined&&index<groupLayer1.length;index++) {
                                        groupLayer1[index].show();
                                    }
                                    groupIndex = 1;
                                } else {
                                    for (var index=0;groupLayer1!==undefined&&index<groupLayer1.length;index++) {
                                        groupLayer1[index].hide();
                                    }
                                    for (var index=0;groupLayer0!==undefined&&index<groupLayer0.length;index++) {
                                        groupLayer0[index].show();
                                    }
                                    groupIndex = 0;
                                }
                            });
                        }
                        //初始化完成
                        $scope.$broadcast('initOver');
                    }, function (error) {
                        alert("地图加载错误，请检查配置文件！");
                    });
                });
            },
            link: function (scope, elements, attrs, controller) {

            }
        };
    })
;
