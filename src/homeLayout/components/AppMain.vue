<template>
  <el-row class="app-main">
    <el-col :span="24">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {

}
</style>

<style lang="scss">

</style>
