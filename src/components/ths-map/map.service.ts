import { Injectable, Component, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader'; // 地图API装载器;
// import { ConfigProvider } from '../../providers/config/config';
// import { HomeProvider } from '../../providers/home/home';//页面服务，主要是详情使用
/**
 * 地图服务类
 * @export
 * @author liuyingxin
 */
@Injectable()

export class MapService {
    @ViewChild('info') infoEle: ElementRef;
    pointLayer: any;
    faceLayer: any;
    infoPointLayer: any;
    pointInfoLayer: any;
    echartLayer: any;
    infoLayer: any;
    map: any;
    infoStyle: string;
    provinceLayer;
    // constructor(public configProvider: ConfigProvider) {
    constructor() {

    }
    /**
     * 通过经纬度以及缩放级别设置地图中心
     * @param {any} map 地图对象
     * @param {number} x  坐标 经度
     * @param {number} y  坐标 经度
     * @param {number} zoomLv 缩放级别
     * @param {number} [wkid=4326]
     * @memberOf MapService
     */
    setCenterAndZoom(map, x: number, y: number, level, wkid = 4326) {
        this.map = map;
        loadModules(['esri/geometry/Point']).then(([Point]) => {
            map.centerAndZoom(new Point({
                'x': x,
                'y': y,
                'spatialReference': {
                    'wkid': wkid
                }
            }), level);

        });
    }

    // setCenterAndZoom(map, x: number, y: number, wkid = 4326) {
    //     this.map = map;
    //     console.log(wkid);
    //     // let level = map.getLevel();
    //     // if (level < 4) {
    //     //     level = 4;
    //     // }
    //     loadModules(['esri/geometry/Point']).then(([Point]) => {
    //         map.centerAndZoom(new Point({
    //             'x': x,
    //             'y': y,
    //             'spatialReference': {
    //                 'wkid': wkid
    //             }
    //         }));

    //     });
    // }

    /**
     * 设置范围
     * @param map 地图对象
     * @param xmin
     * @param ymin
     * @param xmax
     * @param ymax
     * @param wkid
     */
    public setExtent(map, xmin, ymin, xmax, ymax, wkid = 4326) {

        loadModules(['esri/geometry/Extent', 'esri/SpatialReference']).then(([Extent, SpatialReference]) => {
            const spatialRef = new SpatialReference({ wkid: wkid });
            const startExtent = new Extent();
            startExtent.xmin = xmin - 0.01;
            startExtent.ymin = ymin - 0.01;
            startExtent.xmax = xmax + 0.01;
            startExtent.ymax = ymax + 0.01;
            startExtent.spatialReference = spatialRef;
            map.setExtent(startExtent, true);
        });

    }
    /**
        * 设置map显示范围
        * @param map map对象(必填)
        * @param minX(必填)
        * @param minY(必填)
        * @param maxX(必填)
        * @param maxY(必填)
        */
    public setExtent2(map, minX, minY, maxX, maxY): void {
        loadModules(['esri/geometry/Extent']).then(([Extent]) => {
            const extentaa = new Extent(minX, minY, maxX, maxY);
            map.setExtent(extentaa, true);
        });
    }
    /**
     * 给指定map设置定位点
     * @param map map对象(必填)
     * @param graphicsLayer 图形图层(必填)
     * @param x 定位点经度(必填)
     * @param y 定位点纬度(必填)
     * @param locationIcon 定位图标(必填)
     * @param attrTemplate 绑定模版数据(选填)
     * @param infoTemplate 模版(选填)
     */
    location(map, graphicsLayer, x, y, locationIcon, attrTemplate?, infoTemplate?): void {
        // tslint:disable-next-line:max-line-length
        loadModules(['esri/geometry/Point', 'esri/symbols/PictureMarkerSymbol', 'esri/layers/graphic']).then(([Point, PictureMarkerSymbol, Graphic]) => {
            //   //创建点位点
            const point = new Point(x, y);
            // 创建定位图片符号
            const pictureMarkerSymbol = new PictureMarkerSymbol(locationIcon, 30, 30);
            // 创建定位Graphic
            const graphic = new Graphic(point, pictureMarkerSymbol, attrTemplate, infoTemplate);
            // 添加定位Graphic
            graphicsLayer.add(graphic);
            map.centerAt(point);
        });
    }
    /**
  * 创建图形图层
  * then返回graphicsLayer
  */
    public createGraphicsLayer(layerName, map): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // loadModules(['esri/layers/GraphicsLayer']).then(([GraphicsLayer]) => {
            // //创建图形图层
            //  let graphicsLayer = new GraphicsLayer();
            //  resolve(graphicsLayer);
            // });
            loadModules(['esri/layers/GraphicsLayer']).then(([GraphicsLayer]) => {
                const layer = map.getLayer(layerName);
                if (layer !== undefined) {
                    resolve(layer);
                } else {
                    // 创建图形图层
                    const option = {
                        id: layerName,
                        visible: true
                    };
                    const graphicsLayer = new GraphicsLayer(option);
                    map.addLayer(graphicsLayer);
                    resolve(graphicsLayer);
                }

            });
        });
    }
    /**
   * 创建图形图层
   * then返回graphicsLayer
   */
    public createHtmlGraphicsLayer(layerName, map): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // loadModules(['esri/layers/GraphicsLayer']).then(([GraphicsLayer]) => {
            // //创建图形图层
            //  let graphicsLayer = new GraphicsLayer();
            //  resolve(graphicsLayer);
            // });
            loadModules(['esri/layers/CustomGraphicsLayer']).then(([CustomGraphicsLayer]) => {
                // 创建图形图层
                let layer = map.getLayer(layerName);
                if (layer !== undefined) {
                    resolve(layer);
                } else {
                    let option = {
                        id: layerName,
                        visible: true
                    };
                    let graphicsLayer = new CustomGraphicsLayer(option, map);
                    map.addLayer(graphicsLayer);
                    resolve(graphicsLayer);
                }

            });
        });
    }
    /**
   * 添加点位
   * @param x 经度
   * @param y 纬度
   * @param graphicsLayer  图层
   * @param picUrl  地图点位图片
   * @param attrTemplate  属性列表
   * @param infoTemplate  信息框
   */
    public addMarker(data, graphicsLayer, picUrl, attrTemplate, infoTemplate, picW = 24, picH = 24) {
        loadModules(['esri/symbols/PictureMarkerSymbol', 'esri/symbols/Font', 'esri/symbols/TextSymbol',
            'esri/graphic', 'esri/geometry/Point', 'esri/InfoTemplate']).then(([PictureMarkerSymbol, Font, TextSymbol, Graphic, Point, InfoTemplate]) => {
                //创建点
                const point = new Point(data.longitude, data.latitude);
                //创建Graphic
                let pictureMarkerSymbol = new PictureMarkerSymbol(picUrl, picW, picH);
                pictureMarkerSymbol.setOffset(0, 20);
                var graphicPic = new Graphic(point, pictureMarkerSymbol, attrTemplate, infoTemplate);
                //图层增加图片点
                graphicsLayer.add(graphicPic);
                graphicsLayer.on('click', (e) => {
                    //   console.log(e.graphic.attributes)

                });
            })
    }
    /**
     * 添加点位
     * @param x 经度
     * @param y 纬度
     * @param graphicsLayer  图层
     * @param picUrl  地图点位图片
     * @param attrTemplate  属性列表
     * @param infoTemplate  信息框
     */
    public addMarkerHtml(data, graphicsLayer, picUrl) {
        loadModules(['esri/symbols/PictureMarkerSymbol', 'esri/symbols/Font', 'esri/symbols/TextSymbol',
            'esri/layers/CustomGraphic', 'esri/geometry/Point', 'esri/InfoTemplate', 'esri/SpatialReference']).then(([PictureMarkerSymbol, Font, TextSymbol, CustomGraphic, Point, InfoTemplate, SpatialReference]) => {
                let p = new Point(data.longitude, data.latitude, new SpatialReference({ 'wkid': 4326 }));
                let graphic = new CustomGraphic(p);
                let distance = parseInt(data.distance);
                let distanceStr = '';
                if (data.graphic.attributes.distance.indexOf('-') > -1) {
                    distanceStr = data.graphic.attributes.distance;
                } else if (distance > 1000) {
                    distanceStr = (distance / 1000) + 'km'
                } else {
                    distanceStr = distance + 'm';
                }
                graphic.htmlTemplate = `<div style='display: inline-block;position: relative;overflow: hidden;padding-bottom: 50px;'>
          <div style='background: #fff;padding: 8px 10px;border-radius: 20px; display: inline-block;'>
              <p style='padding: 0;margin: 0;font-size: 10px;white-space:nowrap;'>${data.DEVCOMPANY}</p>
              <p style='padding: 0;margin: 0;font-size: 10px;white-space:nowrap;color: #Fba660;'>${distanceStr}</p>
          </div>
          <div style='width: 0;height: 0;border:7px solid transparent; border-bottom: none; border-top:14px solid #fff;margin: 0 auto;'></div>
          <div style='position: absolute; left: 50%; margin-left: -8px;'>
              <img src='${picUrl}'  width='16' height='16'/> 
          </div>
          </div>`;
                //document.getElementById('b').innerHTML('');
                let tempDiv = document.getElementById('tempDiv');//生成临时div,计算宽度
                tempDiv.innerHTML = graphic.htmlTemplate;
                graphic.infowindow = {//弹框
                    'click': `pointClick('${JSON.stringify(data)}')`//点击调用对应的方法
                };
                graphic.xoffset = -tempDiv.offsetWidth / 2;//组件宽度/2
                graphic.yoffset = -(46 + 14 + 16 / 2);  //偏移量要根据
                //图层增加图片点
                graphicsLayer.add(graphic);
            })
    }
    /**
     * 创建模版
     * @param template 模版信息(必填)
     * then返回模版
     */
    public createInfoTemplate(template): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            loadModules(['esri/InfoTemplate']).then(([InfoTemplate]) => {
                let infoTemplate = new InfoTemplate(template);
                resolve(infoTemplate);
            });
        });
    }
    /**
     * 给指定图层设置弹出窗口模版
     * @param layer 图层(必填)
     * @param template 模版信息(必填)
     */
    setLayerTemplate(layer, template) {
        loadModules(['esri/InfoTemplate']).then(([InfoTemplate]) => {
            let infoTemplate = new InfoTemplate(template);
            //设置模版
            layer.setInfoTemplate(infoTemplate);
        });
    }
    //[{x:,y:},{}]
    /**
     * 设置所有的点在一定的范围内可视
     * @param {!Array} dataJaon  [{'xmin':112.3,'ymin':75.6,'xmax':113.7,'ymax':78.5},{'xmin':113.3,'ymin':71.6,'xmax':115.7,'ymax':76.5}]
     * @param {!numble} wkd   空间参考 默认值4326
     */
    unionExtent(map, dataJson, wkd?) {
        loadModules(['esri/geometry/Extent', 'esri/SpatialReference']).then(([Extent, SpatialReference]) => {
            wkd = wkd || 4326;
            var extent = new Extent(dataJson[0].xmin, dataJson[0].ymin, dataJson[0].xmax, dataJson[0].ymax, new SpatialReference({ wkid: wkd }));
            for (var single in dataJson) {
                if (dataJson[single].xmin != undefined) {
                    let curExtent = new Extent(dataJson[single].xmin, dataJson[single].ymin, dataJson[single].xmax, dataJson[single].ymax, new SpatialReference({ wkid: wkd }));
                    //     console.log(curExtent);
                    extent = extent.union(curExtent);
                }
            }
            map.setExtent(extent.expand(2.0));

        })


    }




    /**
     * 添加图层
     */
    allLayer(map, infoData, allThis) {
        let thisMapClass = this;
        loadModules(['esri/layers/GraphicsLayer', 'esri/layers/CustomGraphic', 'esri/geometry/Point', 'esri/SpatialReference']).then(([GraphicsLayer, CustomGraphic, Point, SpatialReference]) => {
            // 可根据需要添加图层 ,添加了点的图层
            let pointLayer = new GraphicsLayer({ id: 'pointLayer' });
            let pointLayerInfo = new GraphicsLayer({ id: 'pointLayerInfo' });
            let infoPointLayer = new GraphicsLayer({ id: 'infoPointLayer' });
            let provinceLayer = new GraphicsLayer({ id: 'provinceLayer' });
            pointLayer.on('click', (evt) => {//注册click事件，只要点击这个图层就执行这里面的方法
                event.stopPropagation();

                this.removePointInfo();//移除定位的图标
                thisMapClass.pointInfo(thisMapClass, evt, infoData, allThis, map);
                // if (map.getZoom() > 10) {
                //     thisMapClass.pointInfo(thisMapClass, evt, infoData, allThis, map);
                // } else {
                //     allThis.changePoint(evt);//点击大点 小点显示

                // }
            })
            //省份打点点击变成小点
            provinceLayer.on('click', function (evt) {//注册click事件，只要点击这个图层就执行这里面的方法
                event.stopPropagation();
                allThis.changePoint(evt);//点击大点 小点显示

            })

            infoPointLayer.on('click', function () {
                //  console.log('详情页面的点')
            })
            map.on('click', () => {
                // let infoDiv = document.getElementById('info');
                // infoDiv.style.display = 'none';
                // this.configProvider.selectPoint = '';
                this.removePointInfo();
                let img = document.getElementById('clickImg');
                if (img != undefined && img != null) {
                    // img.style.width = '28px';
                    // img.style.height = '28px';
                    // img.style.display = 'block';
                    img.removeAttribute('id');
                } else {
                    console.log('没有id为clickImg')
                }
                //  img.removeAttribute('id');
                //  console.log(img)
            })
            map.addLayers([pointLayer, pointLayerInfo, infoPointLayer, provinceLayer]);
            this.pointLayer = pointLayer;
            this.pointInfoLayer = pointLayerInfo;
            this.infoPointLayer = infoPointLayer;
            this.provinceLayer = provinceLayer;
        })
    }
    /**
     * 企业点位
     */
    point(map, data) {
        loadModules(['esri/layers/GraphicsLayer', 'esri/graphic', 'extras/ClusterLayer', 'esri/symbols/SimpleMarkerSymbol', 'esri/renderers/ClassBreaksRenderer', 'esri/symbols/PictureMarkerSymbol']).then(([GraphicsLayer, Graphic, ClusterLayer, SimpleMarkerSymbol, ClassBreaksRenderer, PictureMarkerSymbol]) => {
            //   console.log(data)
            data.forEach(item => {
                this.pointLayer.add(new Graphic(item))
            })
            //   console.log(this.pointLayer)
        })
    }

    /**
        * 企业大点
        */
    provincePoint(map, data) {
        loadModules(['esri/layers/GraphicsLayer', 'esri/graphic', 'extras/ClusterLayer', 'esri/symbols/SimpleMarkerSymbol', 'esri/renderers/ClassBreaksRenderer', 'esri/symbols/PictureMarkerSymbol']).then(([GraphicsLayer, Graphic, ClusterLayer, SimpleMarkerSymbol, ClassBreaksRenderer, PictureMarkerSymbol]) => {

            data.forEach(item => {
                this.provinceLayer.add(new Graphic(item))
            })

        })
    }


    /**
     * 企业详情点位
     */
    pointInfoLay(map, data) {
        loadModules(['esri/layers/GraphicsLayer', 'esri/graphic', 'extras/ClusterLayer', 'esri/symbols/SimpleMarkerSymbol', 'esri/renderers/ClassBreaksRenderer', 'esri/symbols/PictureMarkerSymbol']).then(([GraphicsLayer, Graphic, ClusterLayer, SimpleMarkerSymbol, ClassBreaksRenderer, PictureMarkerSymbol]) => {

            //   this.removePointInfo();
            data.forEach(item => {
                this.pointInfoLayer.add(new Graphic(item))
            })
            let infoDiv = document.getElementById('info');
            infoDiv.style.display = 'block';

        })
    }
    /**
     * 移除图层的内容
     */
    removePoint() {
        this.pointLayer.clear();
    }
    /**
     * 移除省份图层的内容
     */
    removeProvicePoint() {
        this.provinceLayer.clear();
    }

    removeAll() {
        this.map.graphicsLayerIds.forEach(item => {
            this.map.getLayer(item).clear();
        })
    }
    /**
     * 移除详情定位的内容
     */
    removePointInfo() {
        this.pointInfoLayer.clear();
        let infoDiv = document.getElementById('info');
        infoDiv.style.display = 'none';
    }
    /**
     * html详情
     */
    infoHtml(data, map, layerName) {
        loadModules(['esri/symbols/PictureMarkerSymbol', 'esri/symbols/Font', 'esri/symbols/TextSymbol',
            'esri/layers/CustomGraphic', 'esri/geometry/Point', 'esri/InfoTemplate', 'esri/SpatialReference', 'dojo/echart/CustomGraphicsLayer',]).then(([PictureMarkerSymbol, Font, TextSymbol, CustomGraphic, Point, InfoTemplate, SpatialReference, CustomGraphicsLayer]) => {
                //创建图形图层
                let layer = map.getLayer(layerName);
                if (layer !== undefined) {

                } else {
                    let option = {
                        id: layerName,
                        visible: true
                    };
                    let graphicsLayer = new CustomGraphicsLayer(option, map);
                    map.addLayer(graphicsLayer);
                    this.addMarkerHtml(data, graphicsLayer, '')
                }
            })
    }


    /**
     * 企业点位详情
     */
    pointInfo(mapThis, data, infoData, allThis, map) {
        let infoDiv = document.getElementById('info');
        infoDiv.style.display = 'block';
        let imgId = document.getElementById('clickImg');
        if (imgId != undefined && imgId != null) {
            imgId.removeAttribute('id');
            // imgId.style.width = '26px';
            // imgId.style.height = '26px';
        }
        // data.target.style.width = '0';
        // data.target.style.height = '0';
        // data.target.style.display = 'none';
        //  data.target.id = 'clickImg';


        let pointResult = data.graphic.attributes.item;

        // this.configProvider.selectPoint = pointResult.XKZNUM;

        //  this.configProvider.selectPoint = data.graphic.attributes.item.XKZNUM;

        infoData(data, allThis);
        let arrayInfo = [];
        let obj = {
            'geometry': {
                'x': pointResult.longitude,
                'y': pointResult.latitude,
                'spatialReference': { 'wkid': 4326 }
            },
            'symbol': {
                'type': 'esriPMS', // autocasts as new SimpleMarkerSymbol()
                'url': 'assets/imgs/dingwei.png', //图片位置   
                'width': 40, //当前图片宽度
                'height': 40,//当前图片高度
                'xoffset': 0,
                'yoffset': 5
            },
            'attributes': {
                'type': pointResult.fqwtype,
                'name': pointResult.DEVCOMPANY,
                'distance': pointResult.distance,
                'like': pointResult.status,
                'num': pointResult.XKZNUM,
                'item': pointResult
            }
        };
        arrayInfo.push(obj)
        this.pointInfoLay(map, arrayInfo);
        //  this.setCenterAndZoom(map, data.graphic.attributes.item.longitude, data.graphic.attributes.item.latitude, map.getLevel(), 4326);//设置当前点为地图中心点

    }



    /**
        * 添加详情页-添加图层
        */
    infoAddLayer(map) {
        let thisMapClass = this;
        loadModules(['esri/layers/GraphicsLayer', 'esri/layers/CustomGraphic', 'esri/geometry/Point', 'esri/SpatialReference']).then(([GraphicsLayer, CustomGraphic, Point, SpatialReference]) => {
            // 可根据需要添加图层 ,添加了点的图层

            let infoPointLayer = new GraphicsLayer({ id: 'infoPointLayer' });
            infoPointLayer.on('click', function () {
                // console.log('详情页面的点')

            })
            map.on('click', () => {
                // console.log('地图点击')
            })
            map.addLayers([infoPointLayer]);

            this.infoPointLayer = infoPointLayer;
        })
    }
    /**
     * 详情页面地图 -打点
     */

    infoPoint(map, data) {
        loadModules(['esri/layers/GraphicsLayer', 'esri/graphic', 'extras/ClusterLayer', 'esri/symbols/SimpleMarkerSymbol', 'esri/renderers/ClassBreaksRenderer', 'esri/symbols/PictureMarkerSymbol']).then(([GraphicsLayer, Graphic, ClusterLayer, SimpleMarkerSymbol, ClassBreaksRenderer, PictureMarkerSymbol]) => {

            data.forEach(item => {
                this.infoPointLayer.add(new Graphic(item))
            })

        })
    }
    /**
         * 详情页面地图 -清除图层内容
         */

    removeInfoPoint() {
        this.infoPointLayer.clear();
    }

    retMapPoint(map, x, y, wkid, item, page, flag, callback?) {
        loadModules(['esri/geometry/Point', 'esri/SpatialReference']).then(([Point, SpatialReference]) => {
            alert(x + '接收到的纬度：' + y)
            let screenPoint = map.toScreen(new Point(x, y, new SpatialReference({ wkid: wkid })));
            alert(screenPoint.x + '屏幕纬度：' + screenPoint.y)
            let pointX = screenPoint.x;
            let pointY = screenPoint.y + 10;
            let mapPoint = map.toMap({ x: pointX, y: pointY });
            alert(mapPoint.x + '导出去的纬度：' + mapPoint.y)
            callback(item, page, flag, mapPoint)

        })
    }



}