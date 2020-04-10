<template>
  <el-row class="navbar">
    <el-col :span="5">
      <div class="site-name">
        <a href="/">{{ site_name }}</a>
      </div>
    </el-col>
    <el-col :span="19">
      <a href="/" class="nav-item " :class="cur === 0 ? 'active' : ''">
        设计作品
      </a>
      <span :class="cur === 1 ? 'active' : ''" class="nav-item" @click="goSelfIntro" >
        个人简历
      </span>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  data() {
    return {
      cur: 0
    }
  },
  computed: {
    ...mapGetters([
      'site_name',
      'site_desc',
      'site_author',
      'site_keyword',
      'site_icon_url'
    ])
  },
  updated() {
    document.title = this.site_name
    document.getElementById('site-icon').setAttribute('href', this.site_icon_url)
    document.getElementById('site-author').content = this.site_owner
    document.getElementById('site-desc').content = this.site_desc
    document.getElementById('site-keywords').content = this.site_keyword
  },
  methods: {
    goSelfIntro() {
      this.cur = 1
      this.$router.push({
        name: 'self-intro'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 @import "~@/styles/variables.scss";
  a {
    color:black;
  }
  .navbar {
    height: 120px;
    line-height: 120px;
    border-bottom: 1px solid $grayColor;
    font-size: 16px;
  }
  .site-name {
    font-size: 2em;
    padding-left: 80px;
  }
  .nav-item {
    font-size: 14px;
    padding: 0 20px;
    cursor: pointer;
    &.active {
      color:red;
    }
    &:hover {
      color:red;
    }
  }
 @media only screen and (min-width: 768px) and (max-width: 992px){
    .site-name {
      font-size: 1.5em;
      padding-left: 40px;
    }
  }

  @media only screen and (min-width: 992px) and (max-width: 1200px){
    .site-name {
      font-size: 1.8em;
      padding-left: 60px;
    }
  }
</style>
