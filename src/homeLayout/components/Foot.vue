<template>
  <el-row class="foot-container">
    <el-col :span="20" :offset="2" class="foot-box">
      <el-row>
        <el-col :span="6" class="left-box">
          <div class="name">{{ site_author }}</div>
          <p class="desc">{{ site_word }}</p>
          <div class="record">@2020 {{ site_record }} design by {{ site_author }}</div>
        </el-col>
        <el-col :span="6" class="center-box">
          <div class="name">个人网站地址</div>
          <div class="url">{{ site_url }} <i class="el-icon-right" /></div>
        </el-col>
        <el-col :span="6" class="center-right-box">
          <div class="name">邮箱</div>
          <p class="email">{{ site_email }}</p>
        </el-col>
        <el-col :span="6">
          <img src="" alt="" class="weixin">
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Foot',
  computed: {
    ...mapGetters([
      'site_record',
      'site_author',
      'site_word',
      'site_url',
      'site_email'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import "~@/styles/variables.scss";
.foot-container {
  .foot-box {
    border-top: 1px solid $grayColor;
    height: 180px;
    padding-top: 60px;
  }
  .left-box {
    font-size: 14px;
    .name {
      font-size: 2em;
      font-weight: 500;
    }
    .desc {
      font-weight: 600;
    }
    .record {
      color: $grayColor;
      font-size: 13px;
    }
  }
  .center-box {
    .name {
      font-size: 14px;
      font-weight: 600;
    }
    .url {
      height: 50px;
      line-height: 50px;
      margin-top: 15px;
      background-color: #e5f2ff;
      text-align: center;
      border-radius: 50px;
      width: 80%;
      color: #708090;
      position: relative;
      cursor: pointer;
      .el-icon-right {
        position: absolute;
        right: 20px;
        top:50%;
        margin-top: -8px;
        font-weight: 600;
      }
    }
  }
  .center-right-box {
    font-size: 14px;
    .name {
      font-weight: 600;
    }
    .email {
      color: rgba(0,0,0,0.6);
    }
  }
}
</style>
