import { Component, ViewChild, ElementRef, Output, Input, OnInit, SimpleChange, Renderer, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader'; // 地图API装载器
import { MapService } from './map.service'; // 地图常用操作服务类
import * as configData from './map.data'; // 地图配置的数据
/**
 * 地图组件
 * @export
 * @author liuyingxin
 */
@Component({
  selector: 'ths-map',
  template: `<div #map  [class]="default ? 'map defaultMap':'map blueMap'"></div>
  <div #map_layer [class]="default? 'esriSimpleSlider esriSimpleSliderVertical esriMapButton add-tab':'esriSimpleSlider esriSimpleSliderVertical esriMapButton add-tab tabBtn'" style="top: 20px;right: 10px;bottom: inherit;"><div class="esriMaplayerButton"  (click)="chageLayerVisiable()"></div></div>
  <div #map_home  class="esriSimpleSlider esriSimpleSliderVertical esriMapButton add-like"><div class="esriMapHomeButton"  (click)="showHome()"></div></div>
  <div class="fav"><div [class]="isShowFavorite? 'like':'no-like'" style="display: block;"  (click)="favoriteChangeClick()"></div></div>
  <div class="pos-box"><div class="pos" style="display: block;"  (click)="requestLocClick()"></div></div>
  <div id="tempDiv" style="position: absolute;bottom: 0px;right: 0px;visibility: hidden;"></div>
  `

})
export class ThsMapComponent implements OnInit {
  @ViewChild('map') mapEl: ElementRef;
  @ViewChild('map_layer') mapLayerEl: ElementRef;
  @ViewChild('map_home') mapHomeEl: ElementRef;
  @Output() onMapLoaded = new EventEmitter<any>();
  @Output() favoriteChange = new EventEmitter<any>();
  @Output() requestLoc = new EventEmitter<any>();

  //地图对象
  map: any;
  default: boolean = true;
  //tile信息设置
  groupLayers = [];
  isShowFavorite = false;
  constructor(private mapService: MapService, private renderer: Renderer) {
  }
  ngOnInit() {
    //加载地图api
    const options = {
      url: 'assets/js/map/init.js'
    };
    loadModules([], options)
      .then(([]) => {
        // create map with the given options at a DOM node w/ id 'mapNode'
        this.loadMap();
      })
      .catch(err => {
        // handle any script or module loading errors
        console.error(err);
      });

  }
  /**
   * 加载地图图层
   * @memberOf ThsMap
   */
  loadMap() {
    loadModules(['esri/map', 'esri/geometry/Extent', 'esri/layers/WebTiledLayer', 'esri/layers/TileInfo']).then(([Map, Extent, WebTiledLayer, TileInfo]) => {
      //创建地图对象
      this.map = new Map(this.mapEl.nativeElement, {
        id: "thsMap",
        wrapAround180: configData.mapConfig.map.wrapAround180 === undefined ? false : configData.mapConfig.map.wrapAround180,
        logo: false,
        autoResize: true,
        fadeOnZoom: false,
        minZoom: 3,
        sliderPosition: (configData.mapConfig.map.sliderposition === undefined || configData.mapConfig.map.sliderposition === "") ? "top-left" : configData.mapConfig.map.sliderposition,
        sliderOrientation: (configData.mapConfig.map.sliderorientation === undefined || configData.mapConfig.map.sliderposition === "") ? "vertical" : configData.mapConfig.map.sliderorientation
      });

      if (configData.mapConfig.map.initialExtent != undefined && configData.mapConfig.map.initialExtent != null) {
        this.map.setExtent(new Extent(configData.mapConfig.map.initialExtent.xmin, configData.mapConfig.map.initialExtent.ymin, configData.mapConfig.map.initialExtent.xmax, configData.mapConfig.map.initialExtent.ymax));
      }
      let satelliteLayers = [];
      let streetsLayers = [];
      //添加图层操作
      this.addlayers(satelliteLayers, streetsLayers).then(res => {
        if (res) {
          if (streetsLayers.length > 0) {
            this.groupLayers.push(streetsLayers);
          }
          if (satelliteLayers.length > 0) {
            this.groupLayers.push(satelliteLayers);
          }
          if (this.groupLayers.length > 0) {
            if (configData.mapConfig.map.layerSwitch) {
              this.renderer.setElementStyle(this.mapLayerEl.nativeElement, 'display', 'block');
            } else {
              this.renderer.setElementStyle(this.mapLayerEl.nativeElement, 'display', 'none');
            }
          } else {
            this.renderer.setElementStyle(this.mapLayerEl.nativeElement, 'display', 'none');
          }
          if (configData.mapConfig.map.showHome) {
            this.renderer.setElementStyle(this.mapHomeEl.nativeElement, 'display', 'block');
          } else {
            this.renderer.setElementStyle(this.mapHomeEl.nativeElement, 'display', 'none');
          }
          let mapLayerClass: string;
          let mapHomeClass: string;
          if (configData.mapConfig.map.sliderposition === "top-left") {
            mapLayerClass = 'esriMaplayerTL';
            mapHomeClass = 'esriMapHomeTL';
          } else if (configData.mapConfig.map.sliderposition === "top-right") {
            mapLayerClass = 'esriMaplayerTR';
            mapHomeClass = 'esriMapHomeTR';
          } else if (configData.mapConfig.map.sliderposition === "bottom-left") {
            mapLayerClass = 'esriMaplayerBL';
            mapHomeClass = 'esriMapHomeBL';
          } else if (configData.mapConfig.map.sliderposition === "bottom-right") {
            mapLayerClass = 'esriMaplayerBR';
            mapHomeClass = 'esriMapHomeBR';
          }
          this.renderer.setElementClass(this.mapLayerEl.nativeElement, mapLayerClass, true);
          this.renderer.setElementClass(this.mapHomeEl.nativeElement, mapHomeClass, true);
          this.onMapLoaded.emit(this.map);//传递给父元素的方法
        }
      });
      //------------

      // for (let livingmap = 0; configData.mapConfig.map.livingmaps !== undefined && livingmap < configData.mapConfig.map.livingmaps.length; livingmap++) {
      //   this.addLayer(configData.mapConfig.map.livingmaps[livingmap]);
      // }

      //this.mapService.setCenterAndZoom(this.map, 116.409, 39.899, 9);
    });
  }
  /**
   * 添加图层
   * @param layerOptions 图层参数
   * label：图层ID，type：图层类型（dynamic、tiled、image、feature，baidumap、baidusatellitemap、baidulabelmap
   * tiandimap、tiandisatellitemap、tiandilabelmap、googlemap、googlesatellitemap、googleterrainmap）
   * visible：是否可见 opacity：不透明度（0全透明，1不透明）
   */
  addLayer(layerOptions) {
    return new Promise((resolve, reject) => {
      loadModules(['esri/layers/WebTiledLayer', 'esri/layers/FeatureLayer', 'esri/layers/ArcGISDynamicMapServiceLayer', 'esri/layers/ArcGISTiledMapServiceLayer', 'esri/layers/ArcGISImageServiceLayer', 'esri/layers/TileInfo']).then(([WebTiledLayer, FeatureLayer, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, ArcGISImageServiceLayer, TileInfo]) => {
        let layer;
        let layerType = layerOptions.type.toLocaleLowerCase();
        let tiledInfoObj = this.getTiledInfoObj(layerType);
        let tileInfo = null;
        if (tiledInfoObj != null) {
          tileInfo = new TileInfo(tiledInfoObj);
        }
        let urlTemplate = '';
        if (layerType.indexOf("baidu") >= 0) {
          //layer = new ths.layers.BaiDuLayer(layerType);//创建百度地图
          if (layerType === "baidu") {
            urlTemplate = "http://online${subDomain}.map.bdimg.com/tile/?qt=tile&x=${col}&y=${row}&z=${level}&styles=pl&udt=20150421&scaler=1";
          }
          else if (layerType === "baidusatellite") {
            urlTemplate = "http://shangetu${subDomain}.map.bdimg.com/it/u=x=${col};y=${row};z=${level};v=009;type=sate&fm=46&udt=20140929";
          }
          else if (layerType === "baidusatellitelabel") {
            urlTemplate = "http://online${subDomain}.map.bdimg.com/tile/?qt=tile&x=${col}&y=${row}&z=${level}&styles=sl&v=068&udt=20150418";
          }
          else if (layerType === "baidu3d") {
            urlTemplate = "http://d${subDomain}.map.baidu.com/resource/mappic/bj/2/3/lv${level}/${col},${row}.jpg?v=001";
          }
          if (tileInfo != null) {
            layer = new WebTiledLayer(urlTemplate, {
              "id": layerType,
              "tileInfo": tileInfo,
              "subDomains": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            });
          } else {
            layer = new WebTiledLayer(urlTemplate, {
              "id": layerType,
              "subDomains": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            });
          }
        }
        //高德地图
        else if (layerType.indexOf("autonavi") > -1) {
          if (layerType === "autonavigaode") {
            urlTemplate = "http://webrd0${subDomain}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=${col}&y=${row}&z=${level}";
            // "http://webrd0${subDomain}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=${col}&y=${row}&z=${level}"
          }
          else if (layerType === "autonaviroadlabely") {//为影像路网（含路网，含注记）
            urlTemplate = "http://webst0${subDomain}.is.autonavi.com/appmaptile?style=8&x=${col}&y=${row}&z=${level}";
          }
          else if (layerType === "autonaviimage") {//为影像路网（u不含路网，不含注记）
            urlTemplate = "http://webst0${subDomain}.is.autonavi.com/appmaptile?style=6&x=${col}&y=${row}&z=${level}";
          }
          if (tileInfo != null) {
            layer = new WebTiledLayer(urlTemplate, {
              "subDomains": ["1", "2", "3", "4"],
              "id": layerType,
              "tileInfo": tileInfo
            });
          } else {
            layer = new WebTiledLayer(urlTemplate, {
              "subDomains": ["1", "2", "3", "4"],
              "id": layerType
            });
          }
        }
        else if (layerType.indexOf("tianditu") >= 0) {
          if (layerType === "tianditu2000") {//http://t3.tianditu.com/DataServer?T=cva_c&x=106&y=20&l=7
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=vec_c&x=${col}&y=${row}&l=${level}";
          }
          else if (layerType === "tianditusatellite2000") {//http://www.google.cn/maps/vt?lyrs=s@169&gl=cn&&x=${col}&y=${row}&z=${level}
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=img_c&x=${col}&y=${row}&l=${level}";
          }
          else if (layerType === "tiandituterrain2000") {
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=ter_c&x=${col}&y=${row}&l=${level}";
          }
          else if (layerType === "tianditulabel2000") {
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cva_c&x=${col}&y=${row}&l=${level}";
          }
          else if (layerType === "tianditusatellitelabel2000") {
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cia_c&x=${col}&y=${row}&l=${level}";
          }
          else if (layerType === "tiandituterrainlabel2000") {
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cta_c&x=${col}&y=${row}&l=${level}";
          }
          else if (layerType === "tianditumercator") {
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=vec_w&x=${col}&y=${row}&l=${level}";
          }
          else if (layerType === "tianditusatellitemercator") {
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=img_w&x=${col}&y=${row}&l=${level}";

          }
          else if (layerType === "tianditulabelmercator") {
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cva_w&x=${col}&y=${row}&l=${level}";
          }
          else if (layerType === "tianditusatellitelabelmercator") {
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cia_w&x=${col}&y=${row}&l=${level}";
          }
          else if (layerType === "tiandituterrainmercator") {
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=ter_w&x=${col}&y=${row}&l=${level}";
          } else if (layerType === "tiandituterrainlabelmercator") {
            urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cta_w&x=${col}&y=${row}&l=${level}";
          }

          if (tileInfo != null) {
            layer = new WebTiledLayer(urlTemplate, {
              "subDomains": ["0", "1", "2", "3", "4", "5", "6", "7"],
              "id": layerType,
              "tileInfo": tileInfo
            });
          } else {
            layer = new WebTiledLayer(urlTemplate, {
              "subDomains": ["0", "1", "2", "3", "4", "5", "6", "7"],
              "id": layerType
            });
          }

        }
        else if (layerType.indexOf("google") >= 0) {
          // layer = new ths.layers.GoogleMapLayer(layerType);
          if (layerType === "google") {
            urlTemplate = "http://mt${subDomain}.google.cn/vt/lyrs=m@177000000&hl=zh-CN&gl=cn&src=app&x=${col}&y=${row}&z=${level}&style=47,37%7Csmartmaps";
          }
          else if (layerType === "googlesatellite") {
            urlTemplate = "http://mt${subDomain}.google.cn/vt?lyrs=s@165&hl=zh-CN&gl=CN&src=app&x=${col}&y=${row}&z=${level}";
          }
          else if (layerType === "googlesatellitelabel") {
            urlTemplate = "http://mt${subDomain}.google.cn/vt/imgtp=png32&lyrs=h@275000000&hl=zh-CN&gl=CN&src=app&expIds=201527&rlbl=1&x=${col}&y=${row}&z=${level}&s=Gali";
          }
          else if (layerType === "googleterrain") {
            urlTemplate = "http://mt${subDomain}.google.cn/vt?lyrs=t@132,r@258000000&src=apiv3&hl=zh-CN&x=${col}&y=${row}&z=${level}&style=37%7Csmartmaps";
          }

          if (tileInfo != null) {
            layer = new WebTiledLayer(urlTemplate, {
              "id": layerType,
              "tileInfo": tileInfo,
              "subDomains": ["0", "1", "2", "3"]
            });
          } else {
            layer = new WebTiledLayer(urlTemplate, {
              "id": layerType,
              "subDomains": ["0", "1", "2", "3"]
            });
          }
        }
        else if (layerType === "feature") {
          let featureLayerOptions = { outFields: '', displayOnPan: true };
          if (layerOptions.extension !== undefined) {
            if (layerOptions.extension.outfields !== undefined && layerOptions.extension.outfields.length !== 0) {
              featureLayerOptions.outFields = layerOptions.extension.outfields;
            }
            if (layerOptions.extension.wherestring !== undefined && layerOptions.extension.wherestring !== "") {
              layer.setDefinitionExpression(layerOptions.extension.wherestring);
            }
          }
          //featureLayerOptions.mode=esri.layers.FeatureLayer.MODE_ONDEMAND;
          featureLayerOptions.displayOnPan = false;
          layer = new FeatureLayer(layerOptions.url, featureLayerOptions);

        }
        else if (layerType === "dynamic") {
          layer = new ArcGISDynamicMapServiceLayer(layerOptions.url);
          if (layerOptions.visiblelayers !== undefined && layerOptions.visiblelayers.length !== 0) {
            layer.setVisibleLayers(layerOptions.visiblelayers);
          }

        }
        else if (layerType === "tiled") {
          layer = new ArcGISTiledMapServiceLayer(layerOptions.url);
        }
        else if (layerType === "image") {
          layer = new ArcGISImageServiceLayer(layerOptions.url);
        } else if (layerType === "webtiledlayer") {
          layer = new WebTiledLayer(layerOptions.url, {
            "id": layerType
          });
        }
        if (layer === null) {
          alert("图层加载错误，请检查相应参数");
        }
        layer.id = layerOptions.label;
        layer.visible = layerOptions.visible !== undefined ? layerOptions.visible : true;
        layer.opacity = layerOptions.opacity !== undefined ? layerOptions.opacity : 1.0;
        layer.minScale = layerOptions.minScale !== undefined ? layerOptions.minScale : 0;
        layer.maxScale = layerOptions.maxScale !== undefined ? layerOptions.maxScale : 0;
        if (this.map == null) {
          alert("地图控件尚未加载!");
        }
        this.map.addLayer(layer);
        //return layer;
        resolve(layer);
      });
    });
  }
  /**
   * 添加图层
   * @param {any} streetsLayers   
   * @param {any} satelliteLayers 
   * @returns 
   * @memberOf ThsMap
   */
  addlayers(streetsLayers, satelliteLayers) {

    return new Promise((resolve, reject) => {
      for (let baseLayer = 0; baseLayer < configData.mapConfig.map.baseMaps.length; baseLayer++) {
        this.addLayer(configData.mapConfig.map.baseMaps[baseLayer]).then(mlayler => {
          let layler = mlayler
          let groupId = configData.mapConfig.map.baseMaps[baseLayer].groupId;
          if (groupId != undefined && groupId != null) {
            for (let index in groupId) {
              let id = groupId[index];
              if (id === 0) {
                streetsLayers.push(layler);
              } else if (id === 1) {
                satelliteLayers.push(layler);
              }
            }
          }
          if (baseLayer == configData.mapConfig.map.baseMaps.length - 1) {
            resolve(true);
          }
        });

      }
    });
  }

  /**
   * 改变图层显示状态
   * @memberOf ThsMap
   */
  chageLayerVisiable() {

    console.log(this.groupLayers)
    let groupLayer0 = this.groupLayers[0];
    let groupLayer1 = this.groupLayers[1];
    //  alert('地图:' + this.map.getLevel());

    if (groupLayer0[0].visible === true) {
      //   alert('普通地图隐藏')
      this.default = true;
      console.log(this.mapLayerEl);
      for (let index = 0; groupLayer0 !== undefined && index < groupLayer0.length; index++) {
        groupLayer0[index].hide();
      }

      for (let index = 0; groupLayer1 !== undefined && index < groupLayer1.length; index++) {
        groupLayer1[index].show();

      }

    } else {
      // alert('影像地图隐藏');
      let mapBg = document.getElementsByClassName('map').item(0);
      // mapBg.style.backgroundColor = "#b1d1e1";
      this.default = false;
      for (let index = 0; groupLayer1 !== undefined && index < groupLayer1.length; index++) {

        groupLayer1[index].hide();
      }
      for (let index = 0; groupLayer0 !== undefined && index < groupLayer0.length; index++) {
        groupLayer0[0].show();
        groupLayer0[1].show();
        // }
      }
    }
    console.log('显示隐藏执行完成');
  }

  /**
   * 展示地图默认位置
   * @memberOf ThsMap
   */
  showHome() {
    loadModules(['esri/geometry/Extent']).then(([Extent]) => {
      this.map.setExtent(new Extent(configData.mapConfig.map.initialExtent.xmin, configData.mapConfig.map.initialExtent.ymin, configData.mapConfig.map.initialExtent.xmax, configData.mapConfig.map.initialExtent.ymax));
    });

  }
  /**
   * 根据图层类型，获取不同的tiledInfo信息
   */
  getTiledInfoObj(layerType: string) {
    let tileInfoObj = null;
    /**天地图 */
    if (layerType.indexOf("tianditu") != -1) {
      //天地图2000
      if (layerType.indexOf("2000") != -1) {
        tileInfoObj = configData.tdtTileInfo2000;
      } else {
        tileInfoObj = configData.tdtTileInfo;
      }

    } /**百度地图 */
    else if (layerType.indexOf("baidu") != -1) {
      tileInfoObj = configData.baiduTileInfo;
    }/**谷歌地图 */
    else if (layerType.indexOf("google") != -1) {
      tileInfoObj = configData.googleTileInfo;
    }
    /**高德地图 */
    else if (layerType.indexOf("autonavi") != -1) {
      tileInfoObj = configData.gaodeTileInfo;
    }

    return tileInfoObj;
  }
  /**
   * 点击是否展示收藏按钮
   * @param isShowFavite  true展示搜藏 false 不展示搜藏
   */
  favoriteChangeClick() {

    this.isShowFavorite = this.isShowFavorite == false ? true : false;
    this.favoriteChange.emit(this.isShowFavorite);
  }
  /**
   * 请求更新位置
   */
  requestLocClick() {
    this.requestLoc.emit();
  }

}
