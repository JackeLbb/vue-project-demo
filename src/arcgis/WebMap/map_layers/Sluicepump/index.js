/**
 *  基础 闸泵站
 */

import { GetMapFacilityList } from '@/api/webmap.js'

class Sluicepump {
  constructor(mapview, Gis_api) {
    this.mapview = mapview || null
    this.$Gis_api = Gis_api || null
    this.graphics = {}
    this.layer = new this.$Gis_api.GraphicsLayer()
    this.mapview && this.mapview.map && this.mapview.map.add(this.layer)
  }

  // 添加
  add(arrs) {
    if (JSON.stringify(arrs).match('^{(.+:.+,*){1,}}$')) {
      arrs = [arrs]
    }
    const list = []
    arrs.map(obj => {
      // 如果存在 则删除旧元素
      if (this.graphics[obj.id]) {
        this.layer.remove(this.graphics[obj.id])
        this.graphics[obj.id] = null
      }
      // 如果存在坐标 则添加
      if (obj.points && obj.points.length > 0) {
        const symbol = new this.$Gis_api.PictureMarkerSymbol({
          url: '/static/map/icons/sluicepump.png',
          width: '30px',
          height: '30px'
        })
        const geometry = new this.$Gis_api.Point(
          parseFloat(obj.points[0][0]),
          parseFloat(obj.points[0][1]),
          this.mapview.spatialReference
        )

        // geometry = this.$Gis_api.webMercatorUtils.geographicToWebMercator(
        //   geometry
        // )
        const attributes = obj
        const graphic = new this.$Gis_api.Graphic(geometry, symbol, attributes)
        this.graphics[obj.id] = graphic
        list.push(graphic)
      }
    })
    this.layer.addMany(list)
  }

  // 删除
  remove(arrs) {
    if (JSON.stringify(arrs).match('^{(.+:.+,*){1,}}$')) {
      arrs = [arrs]
    }
    const list = []
    arrs.map(obj => {
      this.graphics[obj] && list.push(this.graphics[obj])
    })
    this.layer.removeMany(list)
  }

  // 销毁
  destroy() {
    this.mapview &&
      this.mapview.map &&
      this.layer &&
      this.mapview.map.remove(this.layer)
    this.mapview = null
    this.$Gis_api = null
    this.graphics = null
  }

  // 获取数据
  initDatas(_this) {
    return new Promise((resolve, reject) => {
      GetMapFacilityList({
        facilityCategoryCodes: JSON.stringify(['sluicepump'])
      }).then(res => {
        _this.layercount_progress.push({ layerCode: 'sluicepump', layerName: '闸泵站', layerCount: res.rowCount, progressCount: res.rows.length })
        res && res.rows.length > 0 && this.add(res.rows)
        resolve(this.layer)
      })
    })
  }
}
export default Sluicepump
