<template>
  <div class="page-news">
    新闻页面
  </div>
</template>

<script>
/**
 * @name  (组件名称) page-news
 * @module 组件存放位置
 * @desc 组件描述
 * @author Jacke
 * @date 2019-11-14 16:35
 * @param {Object} [title]    - 参数说明
 * @param {String} [columns] - 参数说明
 * @example 调用示例
 *  <></>
 */
import mewsMixin from '@/mixins/news-mixin'
console.log('mewsMixin', mewsMixin)
export default {
  name: 'PageNews',
  components: {},
  mixins: [mewsMixin],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  async created() {
    await this.NEWS_LIST()
    console.log('this.getNewsResponse', this.getNewsResponse)
  },
  mounted() { },
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-news {
}
</style>
