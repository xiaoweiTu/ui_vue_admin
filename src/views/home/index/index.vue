<template>
  <el-row class="index-container">
    <el-col :span="20" :offset="2">
      <p class="title">设计 ● 概况</p>
      <div class="tag-wrap clearfix">
         <div class="total fl">
            <span style="color:red;">{{ total }}</span>个精选作品
         </div>
        <div class="tag fr">
          类别：<el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ curClickedName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in tags" :key="item.id" :command="item">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
      </div>
      <el-row class="content-wrap">
          <el-col v-for="item in articles" :key="item.id" :span="8" class="item-box">
            <div class="item-wrap" @click="goRead(item.id)">
              <img :src="item.icon" alt="" class="main-pic">
              <div class="info-wrap clearfix">
                <div class="fl display-inline font-600">
                  {{ item.title }}
                </div>
                <div class="tag fr display-inline color-gray">
                  {{ item.tag.name }}
                </div>
              </div>
            </div>
          </el-col>
      </el-row>
      <div v-if="page < totalPage" class="load-more"><span v-loading="loading" @click="loadMore" >加载更多....</span></div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { getHomeTagList } from '../../../api/tag'
import { getHomeArticleList } from '../../../api/article'
export default {
  name: 'Index',
  data() {
    return {
      showMore: false,
      tags: [],
      curClickedName: '全部',
      tagId: 0,
      articles: [],
      page: 1,
      totalPage: 1,
      total: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'site_name',
      'site_desc'
    ])
  },
  created() {
    this.tagList()
    this.tagArticles()
  },
  methods: {
    async tagList() {
      const res = await getHomeTagList()
      if (res.code === 1) {
        this.tags = res.data
      }
    },
    async tagArticles(save = false) {
      this.loading = true
      const res = await getHomeArticleList({ tag_id: this.tagId, page: this.page })
      this.loading = false
      if (res.code === 1) {
        if (save) {
          this.articles = this.articles.concat(res.data.data)
        } else {
          this.articles = res.data.data
        }
        this.totalPage = res.data.last_page
        if (this.tagId === 0) {
          this.total = res.data.total
        }
      }
    },
    loadMore() {
      if (this.page < this.totalPage) {
        this.page += 1
        this.tagArticles(true)
      } else {
        this.$message({
          message: '已经到底啦...',
          type: 'warning'
        })
      }
    },
    goRead(id) {
      const url = this.$router.resolve({ name: 'homeArticle', params: { article_id: id }})
      window.open(url.href, '_blank')
    },
    handleCommand(item) {
      this.curClickedName = item.name
      this.tagId = item.id
      this.page = 1
      this.tagArticles()
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
.display-inline {
  display: inline-block;
}
.color-gray {
  color: $grayColor;
}
.font-600 {
  font-weight:600;
}
.index-container {
  padding: 50px 0;
  .tag-wrap {
    padding:0 15px;
  }
  .title {
    color: $grayColor;
    text-align: center;
  }
  .total,.tag {
    display: inline-block;
  }
  .content-wrap {
    padding: 30px 0;
    .item-wrap {
      width: 100%;
      overflow: hidden;
      height: 400px;
      cursor: pointer;
      .main-pic {
        width: 100%;
        height: 360px;
      }
      .info-wrap {
        padding-top:15px;
      }
    }
  }
  .item-box {
    padding: 0 15px;
    margin-top: 40px;
  }
  .load-more {
    text-align: center;
    cursor: pointer;
    &:hover {
      color:red;
    }
  }
}

@media only screen and (min-width: 850px) and (max-width: 1000px){
  .index-container {
    .content-wrap {
      .item-wrap {
        height: 250px;
        .main-pic {
          height: 180px;
        }
      }
    }
  }
}

@media only screen and (min-width: 1010px) and (max-width: 1400px){
  .index-container {
    .content-wrap {
      .item-wrap {
        height: 300px;
        .main-pic {
          height: 250px;
        }
      }
    }
  }
}
</style>
