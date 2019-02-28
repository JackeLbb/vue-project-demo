<template>
  <el-container class="page-wrapper">
    <el-header>
      <page-header />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
/**
  * @name page-wrapper (组件名称)
  * @module 组件存放位置
  * @desc 组件描述： 主页面一张图
  * @author Jacke
  * @date 2019-02-28 10:36
  * @param {Object} [title]    - 参数说明
  * @param {String} [columns] - 参数说明
  * @example 调用示例
  *  <page-wrapper></page-wrapper>
  */

import PageHeader from '@/components/frontend/PageHeader'

export default {
  name: 'page-wrapper',
  components: {
    'page-header': PageHeader
  },
  props: {},
  data () {
    return {

    }
  },
  created () { },
  mounted () { },
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.page-wrapper {
}
</style>
