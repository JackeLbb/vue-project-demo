/**
 *  基础 AI监控事件
 */

import {
  GetMapFacilityList
} from '@/api/webmap.js'

class AiStreetShop {
  constructor(mapview, Gis_api) {
    this.mapview = mapview || null
    this.$Gis_api = Gis_api || null
    this.graphics = {}
    this.layer = new this.$Gis_api.GraphicsLayer()
    this.mapview && this.mapview.map && this.mapview.map.add(this.layer)
    this.count = 1
    this.dataList = []
    // this.getDatas()
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
        // 不同状态图标
        const ICON_LIST = {
          1: 'streetshop.png', // 正常
          2: 'streetshop--selfdealtime.png', // 自治
          3: 'streetshop--subordinate.png' // 下派
        }
        // 图标高度
        const ICON_HEIGHT = {
          1: '30px', // 正常
          2: '39px', // 自治
          3: '39px' // 下派
        }
        const symbol = new this.$Gis_api.PictureMarkerSymbol({
          url: '/static/map/icons/' + ICON_LIST[obj.showflag],
          width: '30px',
          height: ICON_HEIGHT[obj.showflag]
        })
        const geometry = new this.$Gis_api.Point(
          parseFloat(obj.points[0][0]),
          parseFloat(obj.points[0][1]),
          this.mapview.spatialReference
        )
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
  initDatas() {
    const __this = this
    if (this.count === 1) this.dataList = []
    return new Promise((resolve, reject) => {
      GetMapFacilityList({
        facilityCategoryCodes: JSON.stringify(['streetshop']),
        rowsPerPage: 10,
        curPageNum: __this.count
      }).then(res => {
        // 绘制地图图标
        __this.add(res.rows)
        resolve(__this.layer)

        // 查询下十条数据
        __this.dataList = [...__this.dataList, ...res.rows]
        if (Number(res.rowCount) > Number(__this.count) * 10) {
          __this.count += 1
          __this.initDatas()
        }
      })
    })
  }
}
export default AiStreetShop
