<template>
  <el-row class="self-container">
    <el-col :span="24">
      <el-row>
        <el-col :span="4">
          <el-upload
            class="upload"
            :action="action"
            :headers="headers"
            :before-upload="beforeUpload"
            :limit="1"
            name="file"
            :on-exceed="handleExceed"
            :on-success="uploadSuccess"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
          </el-upload>
        </el-col>
        <el-col :span="20" />
      </el-row>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="updated_at"
          label="日期"
          align="center"
        />
        <el-table-column
          prop="file_path"
          label="路径"
          align="center"
        />
        <el-table-column
          prop="password"
          label="密码"
          align="center"
        >
          <template slot-scope="{row}">
            <el-input v-model="password" clearable :placeholder=" row.password || '请输入密码'" @keyup.enter.native="editPassword(row.id)" />
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { getSelfIntro, editIntroPassword } from '../../../api/site'
import { getToken } from '../../../utils/auth'

export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      fileList: [],
      action: '',
      headers: {},
      password: ''
    }
  },
  created() {
    this.selfIntro()
    this.action = process.env.VUE_APP_UPLOAD_FILE_ACTION
    this.headers = {
      Authorization: 'Bearer ' + getToken()
    }
  },
  methods: {
    async selfIntro() {
      const res = await getSelfIntro()
      if (res.code === 1) {
        this.tableData = []
        this.tableData.push(res.data)
        this.password = res.data.password
      }
    },
    async editPassword(id) {
      const res = await editIntroPassword({ id: id, password: this.password })
      this.$message({
        message: res.msg,
        type: res.code === 1 ? 'success' : 'error'
      })
      this.selfIntro()
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    uploadSuccess(res) {
      this.$message({
        message: res.msg,
        type: res.code === 1 ? 'success' : 'error'
      })
      if (res.code !== 1) {
        this.fileList = []
      }
      this.selfIntro()
    },
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf'
      if (!isPDF) {
        this.$message.error('只可上传PDF文件!')
      }
      return isPDF
    }
  }
}
</script>

<style scoped lang="scss">
.self-container {
  padding:20px;
}
</style>
