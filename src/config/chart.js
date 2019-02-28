import Vue from 'vue'
import VCharts from 'vue-echarts'
import Echarts from 'echarts'
// 手动引入 ECharts 各模块来减小打包体积
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'

// 引入地图数据
// import echarts from 'echarts'
// import json_data from '../datas/xiacheng.json'
// if (!echarts) {
//   log('ECharts is not Loaded')
//   return
// }
// if (!echarts.registerMap) {
//   log('ECharts Map is not loaded')
//   return
// }
// echarts.registerMap('xiacheng', json_data)

Vue.component('v-chart', VCharts)
Vue.component('chart', Echarts)
