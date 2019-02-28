/**
 * 基础 跨河管线
 */
import { getAppAddress } from '@/utils/client'
class Riverpipeline {
  constructor(mapview, Gis_api) {
    this.mapview = mapview || null
    this.$Gis_api = Gis_api || null
    this.layer = null
  }

  // 销毁
  destroy() {
    this.mapview &&
      this.mapview.map &&
      this.layer &&
      this.mapview.map.remove(this.layer)
    this.mapview = null
    this.$Gis_api = null
  }

  initDatas(_this) {
    return new Promise((resolve, reject) => {
      const address = getAppAddress().layerParts
      this.layer = new this.$Gis_api.MapImageLayer({
        url: address,
        sublayers: [
          {
            id: 90,
            visible: true,
            definitionExpression: "城区信息='下城区'"
          }
        ]
      })
      this.layer.layerCode = 'riverpipeline'
      this.layer.layerName = '跨河管线'
      this.mapview && this.mapview.map && this.mapview.map.add(this.layer)
      resolve(this.layer)
    })
  }
}
export default Riverpipeline
