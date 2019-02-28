/*
  * 显示部件
  * param data        {Array} 聚合数据,eg.[{
        "toiletId": 1000000,
        "name": "Ocean block",
        "postcode": "6054",
        "facilityType": "Underwater",
        "isOpen": "AllHours",
        "x": -158.036,
        "y": -9.0058
    },{..},{..}]

  * param symbolUrl   {String} 图标的URL路径
*/
export function getFclLayer($Gis_api, data, symbolUrl) {
  var defaultSym = new $Gis_api.PictureMarkerSymbol({
    url: symbolUrl,
    width: '24px',
    height: '24px'
  })

  var renderer = new $Gis_api.ClassBreaksRenderer({
    defaultSymbol: defaultSym
  })
  renderer.field = 'clusterCount'

  var smSymbol = new $Gis_api.PictureMarkerSymbol({
    url: './static/map/icons/clusterIcon/m0.png',
    width: '44px',
    height: '44px'
  })
  var mdSymbol = new $Gis_api.PictureMarkerSymbol({
    url: './static/map/icons/clusterIcon/m1.png',
    width: '46px',
    height: '46px'
  })
  var lgSymbol = new $Gis_api.PictureMarkerSymbol({
    url: './static/map/icons/clusterIcon/m2.png',
    width: '48px',
    height: '48px'
  })

  var xlSymbol = new $Gis_api.PictureMarkerSymbol({
    url: './static/map/icons/clusterIcon/m3.png',
    width: '50px',
    height: '50px'
  })

  renderer.addClassBreakInfo(0, 19, smSymbol)
  renderer.addClassBreakInfo(20, 150, mdSymbol)
  renderer.addClassBreakInfo(151, 1000, lgSymbol)
  renderer.addClassBreakInfo(1001, Infinity, xlSymbol)

  // Set up another class breaks renderer to style the flares individually
  var flareRenderer = new $Gis_api.ClassBreaksRenderer({
    defaultSymbol: renderer.defaultSymbol
  })
  flareRenderer.field = 'clusterCount'

  var smFlareSymbol = new $Gis_api.SimpleMarkerSymbol({
    size: 14,
    color: [255, 204, 102, 0.8],
    outline: new $Gis_api.SimpleLineSymbol({ color: [221, 159, 34, 0.8] })
  })
  var mdFlareSymbol = new $Gis_api.SimpleMarkerSymbol({
    size: 14,
    color: [102, 204, 255, 0.8],
    outline: new $Gis_api.SimpleLineSymbol({ color: [82, 163, 204, 0.8] })
  })
  var lgFlareSymbol = new $Gis_api.SimpleMarkerSymbol({
    size: 14,
    color: [51, 204, 51, 0.8],
    outline: new $Gis_api.SimpleLineSymbol({ color: [41, 163, 41, 0.8] })
  })
  var xlFlareSymbol = new $Gis_api.SimpleMarkerSymbol({
    size: 14,
    color: [250, 65, 74, 0.8],
    outline: new $Gis_api.SimpleLineSymbol({ color: [200, 52, 59, 0.8] })
  })

  flareRenderer.addClassBreakInfo(0, 19, smFlareSymbol)
  flareRenderer.addClassBreakInfo(20, 150, mdFlareSymbol)
  flareRenderer.addClassBreakInfo(151, 1000, lgFlareSymbol)
  flareRenderer.addClassBreakInfo(1001, Infinity, xlFlareSymbol)

  var options = {
    id: 'flare-cluster-layer',
    clusterRenderer: renderer,
    flareRenderer: flareRenderer,
    displaySubTypeFlares: false,
    maxSingleFlareCount: 8,
    clusterToScale: 3000,
    clusterRatio: 75,
    data: data
  }

  var clusterLayer = new $Gis_api.FclLayer.FlareClusterLayer(options)
  return clusterLayer
}

/*
  * 单次查询结果获取
  * param feaLayer        {Object} 需要查询的featureLayer
  * param limitMax        {Number} 每次查询的数量，不超过1000
  * param i               {Number} 当前循环的次数
  * param areaName        {String} 城区信息
  * param allFeas         {Array} 存放所有要素的数组
  * param geometryType    {Array} 第一项存放要素类型
*/
function getFeature(_el_progress, feaLayer, areaName, allFeas, startId, i, count, clusterLayer, layerCode, layerName, symbolUrl) {
  return new Promise((resolve, reject) => {
    if (!_el_progress.obj_layers[layerCode]) {
      _el_progress.map.remove(clusterLayer[0])
      _el_progress.view_show_loading_progress = false
    } else {
      const query = new _el_progress.$Gis_api.Query()
      query.returnGeometry = true
      query.outFields = ['*']
      query.where = 'OBJECTID > ' + startId[0] + " AND 城区信息 = '" + areaName + "'"
      // query.where = 'FID > ' + startId[0]
      feaLayer.queryFeatures(query).then(results => {
        allFeas.push.apply(allFeas, results.features)
        startId[0] = results.features[results.features.length - 1].attributes.OBJECTID
        // startId[0] = results.features[results.features.length - 1].attributes.FID
        if (results.geometryType === 'point') {
          // 第一次循环的数据添加进地图，每5000条添加一次
          if (i === 0 || i % 5 === 0) {
            // 清空聚合图层
            clusterLayer[0].clear()
            const data = []
            allFeas.map(val => {
              val.attributes.x = val.geometry.longitude || val.geometry.x
              val.attributes.y = val.geometry.latitude || val.geometry.y
              val.attributes.facility = {
                code: layerCode,
                name: layerName
              }
              data.push(val.attributes)
            })
            _el_progress.layercount_progress.map(item => {
              if (item.layerCode === layerCode) {
                item.progressCount = allFeas.length
              }
            })
            clusterLayer[0].setData(data)
          }
          _el_progress.loading_progress_number = ((i / count).toFixed(2)) * 100
          resolve()
        }
      })
    }
  })
}

/*
  * 单次查询结果获取
  * param feaLayer        {Object} 需要查询的featureLayer
  * param limitMax        {Number} 每次查询的数量，不超过1000
  * param feaCount        {Number} featureLayer中要素的总数
  * param symbolUrl       {String} 要素图标的地址
  * param areaName        {String} 城区信息
  * param layerCode       {String} 图层代码
  * param layerName       {String} 图层名称
*/
async function callBackFun(_el_progress, feaLayer, limitMax, feaCount, symbolUrl, areaName, layerCode, layerName) {
  const allFeas = []
  const startId = [0]
  const count = Math.ceil(feaCount / limitMax)
  _el_progress.layercount_progress.push({ layerCode: layerCode, layerName: layerName, layerCount: feaCount, progressCount: 0 })
  const clusterLayer = [getFclLayer(_el_progress.$Gis_api, [], symbolUrl)]
  _el_progress.map.add(clusterLayer[0])
  for (let i = 0; i < count; i++) {
    await getFeature(_el_progress, feaLayer, areaName, allFeas, startId, i, count, clusterLayer, layerCode, layerName, symbolUrl)
  }
  if (allFeas.length > 0) {
    clusterLayer[0].clear()
    const data = []
    allFeas.map(val => {
      val.attributes.x = val.geometry.longitude || val.geometry.x
      val.attributes.y = val.geometry.latitude || val.geometry.y
      val.attributes.facility = {
        code: layerCode,
        name: layerName
      }
      data.push(val.attributes)
    })
    clusterLayer[0].setData(data)
    _el_progress.layercount_progress.map(item => {
      if (item.layerCode === layerCode) {
        item.progressCount = feaCount
      }
    })
    return clusterLayer[0]
  } else {
    return null
  }
}

/*
  * 单次查询结果获取
  * param serverurl       {String} 服务地址
  * param symbolUrl       {String} 要素图标的地址
  * param subId           {Number} 子图层的Id
  * param limitMax        {Number} 每次查询的数量，不超过1000
  * param areaName        {String} 城区信息
  * param layerCode       {String} 图层代码
  * param layerName       {String} 图层名称
*/

export function addPart(_el_progress, serverurl, symbolUrl, subId, limitMax, areaName, layerCode, layerName) {
  return new Promise((resolve) => {
    const feaLayer = new _el_progress.$Gis_api.FeatureLayer({
      url: serverurl + '/' + subId,
      definitionExpression: "城区信息='" + areaName + "'"
    })
    feaLayer.queryFeatureCount().then(feaCount => {
      callBackFun(_el_progress, feaLayer, limitMax, feaCount, symbolUrl, areaName, layerCode, layerName)
        .then(clusterLayer => {
          // 聚合图层存在则展示，不存在则Image图层展示
          if (clusterLayer) {
            resolve(clusterLayer)
          } else {
            const imgLayer = new _el_progress.$Gis_api.MapImageLayer({
              url: serverurl,
              sublayers: [
                {
                  id: subId,
                  visible: true,
                  definitionExpression: "城区信息='" + areaName + "'"
                }
              ]
            })
            imgLayer.layerCode = layerCode
            imgLayer.layerName = layerName
            _el_progress.map.add(imgLayer)
            resolve(imgLayer)
          }
        })
    })
  })
}
