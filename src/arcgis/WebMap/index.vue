<template>
  <div class="map-wrapper">
    <div v-if="!is_no_data" :id="map_code" style="width:100%;height:100%;" />
    <!-- <no-data v-else noticeText="地图加载失败" :style-obj="{ fontSize: 2,color: '#295B93'}" :isline="true" class="no-data-item" type="map" /> -->
  </div>
</template>
<script>
import esriLoader from 'esri-loader'
import { GetLayers } from './layers/index.js'
import { getAppAddress } from '@/utils/client'
import '@/assets/styles/webmap-infowindow.scss'
// import NoData from '@/components/Nodata'
export default {
  name: 'WebMap',
  components: {
    // 'no-data': NoData
  },
  data() {
    return {
      is_no_data: false,
      map_code: 'MAP_WEB_' + +new Date() + Math.ceil(Math.random() * 9999),
      $Gis_api: null,
      map: null,
      mapview: null
    }
  },
  mounted() {
    this.loaders()
  },
  beforeDestroy() {
    this.map && this.map.removeAll()
    this.map = null
    this.mapview = null
    this.$Gis_api = null
    this.map_code = ''
  },
  methods: {
    async loaders() {
      const address = getAppAddress().arcgisApi
      try {
        // console.log('加载js')
        await esriLoader.loadScript({
          // 加载js
          url: address + '/arcgis/library/4.7/init.js'
        })
        // console.log('加载css')
        // 加载css
        await esriLoader.loadCss(
          address + '/arcgis/library/4.7/esri/themes/dark/main.css'
        )
        // console.log('加载地图api')
        // 加载地图api
        await this.loadApi()
        // console.log('初始化地图')
        // 初始化地图
        this.initMap()
      } catch (error) {
        console.log(error)
      }
    },
    initMap() {
      // 清空地图实例
      this.map && this.map.removeAll()
      const layer_obj = GetLayers(this.$Gis_api) // 获取地图图层

      // 初始化地图实例
      this.map = new this.$Gis_api.Map({
        spatialReference: {
          wkid: 4326
        },
        basemap: ({
          // baseLayers: [layer_obj.LAYER_VEC]
          baseLayers: [layer_obj.LAYER_XC_BASE]
        })
      })
      // 初始化mapview
      this.mapview = new this.$Gis_api.MapView({
        container: this.map_code,
        spatialReference: {
          wkid: 4326
        },
        map: this.map,
        // zoom: 13,
        scale: 8000,
        center: [120.165, 30.270],
        constraints: {
          minScale: 140000
        }
        // spatialReference: new this.$Gis_api.SpatialReference({ wkid: 3857 })
      })
      // 判断当前环境
      // if (getAppAddress().networkEnvironment === 'outer') {
      //   this.map.basemap.baseLayers.remove(layer_obj.LAYER_VEC)
      //   this.map.basemap.baseLayers.addMany([layer_obj.LAYER_VEC_NET, layer_obj.LAYER_VEC_NETANNO])
      // }
      // this.map.add(layer_obj.LAYER_OUTLINE)
      // layer_obj.LAYER_OUTLINE.watch('loadStatus', lineStatus => {
      //   if (lineStatus === 'loaded') {
      const highlightLayer = new this.$Gis_api.GraphicsLayer({
        id: 'highlightLayer',
        layerType: 'baseLayer'
      })
      this.map.add(highlightLayer)
      this.mapview.when(() => {
        this.$emit('loaded', { mapview: this.mapview, Gis_api: this.$Gis_api, map: this.map })
      })
      //   }
      // })
      // 移除esri zoom
      this.mapview.ui.remove(['attribution', 'zoom'])
      // this.$emit('loaded', { mapview: this.mapview, Gis_api: this.$Gis_api })

      // 设施点击事件
      // this.mapview.on('click', event => {
      //   console.log(event)
      // })
    },
    loadApi() {
      return new Promise((resolve, reject) => {
        esriLoader
          .loadModules([
            'esri/Map',
            'esri/views/MapView',
            'esri/Basemap',
            'esri/geometry/SpatialReference',
            'esri/layers/GraphicsLayer',
            'esri/symbols/PictureMarkerSymbol',
            'esri/geometry/Point',
            'esri/symbols/SimpleLineSymbol',
            'esri/symbols/SimpleFillSymbol',
            'esri/geometry/Polyline',
            'esri/geometry/Polygon',
            'esri/Graphic',
            'esri/symbols/TextSymbol',
            'esri/geometry/support/webMercatorUtils',
            'esri/layers/MapImageLayer',
            'esri/layers/TileLayer',
            'esri/layers/FeatureLayer',
            'esri/renderers/ClassBreaksRenderer',
            'esri/symbols/SimpleMarkerSymbol',
            'esri/tasks/QueryTask',
            'esri/tasks/support/Query',
            'esri/geometry/geometryEngine',
            'esri/layers/support/TileInfo',
            'esri/layers/WebTileLayer',
            './static/map/layers/FlareClusterLayer_v4.js',
            'dojo/domReady!'
          ])
          .then(
            ([
              Map,
              MapView,
              Basemap,
              SpatialReference,
              GraphicsLayer,
              PictureMarkerSymbol,
              Point,
              SimpleLineSymbol,
              SimpleFillSymbol,
              Polyline,
              Polygon,
              Graphic,
              TextSymbol,
              webMercatorUtils,
              MapImageLayer,
              TileLayer,
              FeatureLayer,
              ClassBreaksRenderer,
              SimpleMarkerSymbol,
              QueryTask,
              Query,
              geometryEngine,
              TileInfo,
              WebTileLayer,
              FclLayer
            ]) => {
              this.$Gis_api = {
                Map,
                MapView,
                Basemap,
                SpatialReference,
                GraphicsLayer,
                PictureMarkerSymbol,
                Point,
                SimpleLineSymbol,
                SimpleFillSymbol,
                Polyline,
                Polygon,
                Graphic,
                TextSymbol,
                webMercatorUtils,
                MapImageLayer,
                TileLayer,
                FeatureLayer,
                ClassBreaksRenderer,
                SimpleMarkerSymbol,
                QueryTask,
                Query,
                geometryEngine,
                TileInfo,
                WebTileLayer,
                FclLayer
              }
              // console.log(this.$Gis_api)
              resolve()
            }
          )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-wrapper {
  overflow: hidden;
  background-color: #f5f5f5;
  .no-data-item {
    padding-left: 5.8rem;
    width: 100%;
    height: 100%;
    transform: translateY(50%);
  }
}
</style>

