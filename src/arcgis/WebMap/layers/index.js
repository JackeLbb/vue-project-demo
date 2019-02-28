// import { getAppAddress } from '@/utils/client'
import json_data from '@/assets/datas/xiacheng.json'

export function GetLayers ($Gis_api) {
  // const address = getAppAddress()
  const address = {}
  console.log('process', address)
  // 边界线
  // const LAYER_OUTLINE = new $Gis_api.MapImageLayer({
  //   url: address.layerOutline,
  //   layerType: 'baseLayer'
  // })
  const LAYER_OUTLINE = new $Gis_api.GraphicsLayer()

  const gras = []
  json_data.features.map((feature, i) => {
    const gra = new $Gis_api.Graphic({
      geometry: new $Gis_api.Polygon({
        rings: feature.geometry.coordinates
      }),
      attributes: {
        ObjectID: i,
        title: feature.properties.name
      },
      symbol: {
        type: 'simple-fill',
        color: [0, 0, 0, 0],
        outline: {
          color: [78, 78, 78],
          width: 2,
          style: 'dash'
        }
      }
    })
    gras.push(gra)
  })
  LAYER_OUTLINE.addMany(gras)

  const tileInfo = new $Gis_api.TileInfo({
    dpi: 90.71428571427429,
    rows: 256,
    cols: 256,
    compressionQuality: 0,
    origin: {
      x: -180,
      y: 90
    },
    spatialReference: {
      wkid: 4326
    },
    lods: [{
      level: 2,
      levelValue: 2,
      resolution: 0.3515625,
      scale: 147748796.52937502
    },
    {
      level: 3,
      levelValue: 3,
      resolution: 0.17578125,
      scale: 73874398.264687508
    },
    {
      level: 4,
      levelValue: 4,
      resolution: 0.087890625,
      scale: 36937199.132343754
    },
    {
      level: 5,
      levelValue: 5,
      resolution: 0.0439453125,
      scale: 18468599.566171877
    },
    {
      level: 6,
      levelValue: 6,
      resolution: 0.02197265625,
      scale: 9234299.7830859385
    },
    {
      level: 7,
      levelValue: 7,
      resolution: 0.010986328125,
      scale: 4617149.8915429693
    },
    {
      level: 8,
      levelValue: 8,
      resolution: 0.0054931640625,
      scale: 2308574.9457714846
    },
    {
      level: 9,
      levelValue: 9,
      resolution: 0.00274658203125,
      scale: 1154287.4728857423
    },
    {
      level: 10,
      levelValue: 10,
      resolution: 0.001373291015625,
      scale: 577143.73644287116
    },
    {
      level: 11,
      levelValue: 11,
      resolution: 0.0006866455078125,
      scale: 288571.86822143558
    },
    {
      level: 12,
      levelValue: 12,
      resolution: 0.00034332275390625,
      scale: 144285.93411071779
    },
    {
      level: 13,
      levelValue: 13,
      resolution: 0.000171661376953125,
      scale: 72142.967055358895
    },
    {
      level: 14,
      levelValue: 14,
      resolution: 8.58306884765625e-005,
      scale: 36071.483527679447
    },
    {
      level: 15,
      levelValue: 15,
      resolution: 4.291534423828125e-005,
      scale: 18035.741763839724
    },
    {
      level: 16,
      levelValue: 16,
      resolution: 2.1457672119140625e-005,
      scale: 9017.8708819198619
    },
    {
      level: 17,
      levelValue: 17,
      resolution: 1.0728836059570313e-005,
      scale: 4508.9354409599309
    },
    {
      level: 18,
      levelValue: 18,
      resolution: 5.3644180297851563e-006,
      scale: 2254.4677204799655
    },
    {
      level: 19,
      levelValue: 19,
      resolution: 2.68220901489257815e-006,
      scale: 1127.23386023998275
    },
    {
      level: 20,
      levelValue: 2,
      resolution: 1.341104507446289075e-006,
      scale: 563.616930119991375
    }
    ]
  })

  // 互联网底图
  const LAYER_VEC_NET = new $Gis_api.WebTileLayer('http://{subDomain}.tianditu.com/DataServer?T=vec_c&x={col}&y={row}&l={level}', {
    subDomains: ['t0'],
    tileInfo: tileInfo
  })
  // 互联网底图注记层
  var LAYER_VEC_NETANNO = new $Gis_api.WebTileLayer('http://{subDomain}.tianditu.com/DataServer?T=cva_c&x={col}&y={row}&l={level}', {
    subDomains: ['t0'],
    tileInfo: tileInfo
  })
  // 矢量底图
  const LAYER_VEC = new $Gis_api.TileLayer({
    url: address.layerBase,
    layerType: 'baseLayer'
  })
  // 自己发布的下城底图
  const LAYER_XC_BASE = new $Gis_api.MapImageLayer({
    url: 'http://47.104.78.253:6080/arcgis/rest/services/XC_BASE/MapServer',
    layerType: 'baseLayer'
  })

  // const LAER_IMG = new $Gis_api.TileLayer({
  //   url:
  //     'http://47.104.78.253:6080/arcgis/rest/services/hangzhou/tdtSatellite/MapServer'
  // })
  return {
    LAYER_OUTLINE: LAYER_OUTLINE,
    LAYER_VEC: LAYER_VEC,
    LAYER_VEC_NET: LAYER_VEC_NET,
    LAYER_VEC_NETANNO: LAYER_VEC_NETANNO,
    LAYER_XC_BASE: LAYER_XC_BASE
  }
}
