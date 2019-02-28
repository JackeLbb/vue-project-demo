/**
 * 基础 共同沟井盖
 */
import { addPart } from '../../utils/FclLayer.js'
import { getAppAddress } from '@/utils/client'

class Groovewellcover {
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
    const address = getAppAddress().layerParts
    this.layer = new this.$Gis_api.MapImageLayer({
      url: address,
      sublayers: [
        {
          id: 29,
          visible: true,
          definitionExpression: "城区信息='下城区'"
        }
      ]
    })
    return addPart(
      _this,
      address,
      './static/map/icons/groovewellcover.png',
      29,
      1000,
      '下城区',
      'groovewellcover',
      '共同沟井盖'
    )
  }
}
export default Groovewellcover
