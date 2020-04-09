<template>
  <el-row class="article-container">
    <el-col :span="20" :offset="2">
      <div class="content">
        <div class="content-html" v-html="articleRow.content" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getArticleRow } from '../../../api/article'
// import Talk from '../components/talks'
import './css/markdown.css'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    // Talk
  },
  data() {
    return {
      articleId: 0,
      articleRow: {}
    }
  },
  computed: {
    ...mapGetters([
      'site_author'
    ])
  },
  created() {
    this.articleId = this.$route.params.article_id
    if (this.articleId === undefined) {
      this.$message({
        message: '无ID',
        type: 'error'
      })
    }
    this.article()
  },
  methods: {
    async article() {
      const res = await getArticleRow({ id: this.articleId })
      if (res.code === 1) {
        this.articleRow = res.data
      }
    }
  }
}
</script>

<style scoped lang="scss">
.article-container {
  background-color: #fff;
  min-height: 650px;
  .content {
    padding: 35px 0;
  }
}
</style>
