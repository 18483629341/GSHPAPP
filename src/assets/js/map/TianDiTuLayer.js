define("ths/layers/TianDiTuLayer", ["dojo/_base/declare", "esri/layers/TiledMapServiceLayer", "esri/layers/TileInfo", "esri/SpatialReference", "esri/geometry/Extent", "dojo/string"], function (declare, TiledMapServiceLayer, TileInfo, SpatialReference, Extent, string) {
    declare("ths.layers.TianDiTuLayer", TiledMapServiceLayer, {
        constructor: function (type) {
            this.subDomains = [0, 1, 2, 3, 4, 5, 6, 7];
            if (!type || type === "tianditu2000") {
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=vec_c&x=${col}&y=${row}&l=${level}";
            }
            else if (type === "tianditusatellite2000") {//http://www.google.cn/maps/vt?lyrs=s@169&gl=cn&&x=${col}&y=${row}&z=${level}
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=img_c&x=${col}&y=${row}&l=${level}";
            }
            else if (type === "tiandituterrain2000") {
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=ter_c&x=${col}&y=${row}&l=${level}";
            }
            else if (type === "tianditulabel2000") {
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cva_c&x=${col}&y=${row}&l=${level}";
            }
            else if (type === "tianditusatellitelabel2000") {
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cia_c&x=${col}&y=${row}&l=${level}";
            }
            else if (type === "tiandituterrainlabel2000") {
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cta_c&x=${col}&y=${row}&l=${level}";
            }
            if (!type || type === "tianditumercator") {
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=vec_w&x=${col}&y=${row}&l=${level}";
            }
            else if (type === "tianditusatellitemercator") {//http://www.google.cn/maps/vt?lyrs=s@169&gl=cn&&x=${col}&y=${row}&z=${level}
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=img_w&x=${col}&y=${row}&l=${level}";
            }
            else if (type === "tiandituterrainmercator") {
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=ter_w&x=${col}&y=${row}&l=${level}";
            }
            else if (type === "tianditulabelmercator") {
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cva_w&x=${col}&y=${row}&l=${level}";
            }
            else if (type === "tianditusatellitelabelmercator") {
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cia_w&x=${col}&y=${row}&l=${level}";
            }
            else if (type === "tiandituterrainlabelmercator") {
                this.urlTemplate = "http://t${subDomain}.tianditu.com/DataServer?T=cta_w&x=${col}&y=${row}&l=${level}";
            }
            if (type.indexOf("2000") > 0) {
                this.spatialReference = new SpatialReference({wkid: 4326});
                this.initialExtent = new Extent(-180, -90, 180, 90, this.spatialReference);
                this.fullExtent = new Extent(-180, -90, 180, 90, this.spatialReference);
                this.tileInfo = new TileInfo({
                    "dpi": "90.71428571427429",
                    "format": "image/png",
                    "compressionQuality": 0,
                    "spatialReference": this.spatialReference,
                    "rows": 256,
                    "cols": 256,
                    "origin": {"x": -180, "y": 90},
                    "lods": [
                        {"level": 1, "scale": 2.958293554545656E8, "resolution": 0.703125},
                        {"level": 2, "scale": 1.479146777272828E8, "resolution": 0.351563},
                        {"level": 3, "scale": 7.39573388636414E7, "resolution": 0.175781},
                        {"level": 4, "scale": 3.69786694318207E7, "resolution": 0.0878906},
                        {"level": 5, "scale": 1.848933471591035E7, "resolution": 0.0439453},
                        {"level": 6, "scale": 9244667.357955175, "resolution": 0.0219727},
                        {"level": 7, "scale": 4622333.678977588, "resolution": 0.0109863},
                        {"level": 8, "scale": 2311166.839488794, "resolution": 0.00549316},
                        {"level": 9, "scale": 1155583.419744397, "resolution": 0.00274658},
                        {"level": 10, "scale": 577791.7098721985, "resolution": 0.00137329},
                        {"level": 11, "scale": 288895.85493609926, "resolution": 0.000686646},
                        {"level": 12, "scale": 144447.92746804963, "resolution": 0.000343323},
                        {"level": 13, "scale": 72223.96373402482, "resolution": 0.000171661},
                        {"level": 14, "scale": 36111.98186701241, "resolution": 8.58307e-05},
                        {"level": 15, "scale": 18055.990933506204, "resolution": 4.29153e-05},
                        {"level": 16, "scale": 9027.995466753102, "resolution": 2.14577e-05},
                        {"level": 17, "scale": 4513.997733376551, "resolution": 1.07289e-05},
                        {"level": 18, "scale": 2256.998866688275, "resolution": 5.36445e-06}
                    ]
                });
            }
            else {
                this.spatialReference = new SpatialReference({wkid: 3857});
                this.initialExtent = new Extent(-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892, this.spatialReference);
                this.fullExtent = new Extent(-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892, this.spatialReference);
                this.tileInfo = new TileInfo({
                    "dpi": "90.71428571427429",
                    "format": "image/png",
                    "compressionQuality": 0,
                    "spatialReference": this.spatialReference,
                    "rows": 256,
                    "cols": 256,
                    "origin": {"x": -20037508.3427892, "y": 20037508.3427892},
                    "lods": [
                        {"level": 1, "scale": 2.958293554545656E8, "resolution": 77664.761018562790697674418604651},
                        {"level": 2, "scale": 1.479146777272828E8, "resolution": 38832.380509281395348837209302326},
                        {"level": 3, "scale": 7.39573388636414E7, "resolution": 19416.190254640697674418604651163},
                        {"level": 4, "scale": 3.69786694318207E7, "resolution": 9708.0951273203488372093023255814},
                        {"level": 5, "scale": 1.848933471591035E7, "resolution": 4854.0475636601744186046511627907},
                        {"level": 6, "scale": 9244667.357955175, "resolution": 2427.0237818300872093023255813953},
                        {"level": 7, "scale": 4622333.678977588, "resolution": 1213.5118909150436046511627906977},
                        {"level": 8, "scale": 2311166.839488794, "resolution": 606.75594545752180232558139534884},
                        {"level": 9, "scale": 1155583.419744397, "resolution": 303.37797272876090116279069767442},
                        {"level": 10, "scale": 577791.7098721985, "resolution": 151.68898636438045058139534883721},
                        {"level": 11, "scale": 288895.85493609926, "resolution": 75.844493182190225290697674418605},
                        {"level": 12, "scale": 144447.92746804963, "resolution": 37.922246591095112645348837209302},
                        {"level": 13, "scale": 72223.96373402482, "resolution": 18.961123295547556322674418604651},
                        {"level": 14, "scale": 36111.98186701241, "resolution": 9.4805616477737781613372093023256},
                        {"level": 15, "scale": 18055.990933506204, "resolution": 4.7402808238868890806686046511628},
                        {"level": 16, "scale": 9027.995466753102, "resolution": 2.3701404119434445403343023255814},
                        {"level": 17, "scale": 4513.997733376551, "resolution": 1.1850702059717222701671511627907},
                        {"level": 18, "scale": 2256.998866688275, "resolution": 0.59253510298586113508357558139535}
                    ]
                });
            }

            this.loaded = true;
            this.onLoad(this);
        },
        getTileUrl: function (level, row, col) {
            return string.substitute(this.urlTemplate, {
                subDomain: this.subDomains[row % this.subDomains.length],
                col: col, row: row, level: level
            });
        }

    });
});
