<template>
  <el-row class="self-container">
    <el-col :span="20" :offset="2">
      <div class="pass-box">
        <el-input v-model="password" placeholder="请输入密码查看" @keyup.enter.native="look" clearable="" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHomeIntro } from '../../../api/site'

export default {
  name: 'Index',
  data() {
    return {
      password: ''
    }
  },
  methods: {
    async selfIntro() {
      const res = await getHomeIntro({ password: this.password })
      if (res.code === 1) {
        window.open(res.data.file_path)
      }
    },
    look() {
      if (this.password === '') {
        this.$message.error('请输入密码')
        return
      }
      this.selfIntro()
    }
  }
}
</script>

<style scoped lang="scss">
.self-container {
    min-height: 650px;
  .pass-box {
    height: 300px;
    width: 300px;
    margin:50px auto;
    line-height: 300px;
  }
}
</style>
