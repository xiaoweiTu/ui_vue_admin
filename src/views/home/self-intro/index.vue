<template>
  <el-row class="self-container">
    <el-col :span="20" :offset="2">
        <h1>输入密码查看</h1>
    </el-col>
  </el-row>
</template>

<script>
import { getSelfIntro } from '../../../api/site'

export default {
  name: 'Index',
  data() {
    return {
      intro: {}
    }
  },
  created() {
    this.selfIntro()
  },
  methods: {
    async selfIntro() {
      const res = await getSelfIntro()
      if (res.code === 1) {
        this.intro = res.data
      }
    }
  }
}
</script>

<style scoped>
.self-container {
    min-height: 650px;
}
</style>
