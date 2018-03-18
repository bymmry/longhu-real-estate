<template>
  <div style="text-align:center">
    <div style="margin:0 auto;width:50vw;min-height:100vh;padding:20px 0;" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <div class="flex">
        <el-button @click="$router.replace('/')" type="text" icon="el-icon-back">返回</el-button>
        <div style="flex:1;text-align:center">
          <h2>录入小区信息</h2>
        </div>
      </div>
      <el-form ref="form" label-width="200px" v-if="!loading">
        <el-form-item :label="item.label" v-for="item in form" :key="item.value">
          <!-- {{item}} -->
          <div class="flex">
            <el-select style="flex:1" v-if="item.option && item.option.length>0" v-model="item[item.value]" filterable :placeholder="'请输入或选择'+item.label">
              <el-option v-for="option in item.option" :key="option.value" :label="option.label" :value="option.value">
              </el-option>
            </el-select>
            <el-input-number style="flex:1" v-else-if="item.needSum" v-model="item[item.value]" :min="0" :label="'请输入或选择'+item.label"></el-input-number>
            <el-input v-else :placeholder="'请输入'+item.label" v-model="item[item.value]"></el-input>
            <div style="margin-left:20px">
              <el-tag type="danger" size="mini" v-if="item.required">必填字段</el-tag>
              <!-- <el-tag type="success" size="mini" v-if="item.option && item.option.length">可选择</el-tag> -->
              <el-tag type="warning" size="mini" v-if="item.needSum">数字</el-tag>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import field from '../field/community'
  export default {
    data() {
      return {
        loading: true,
        form: [...field]
      }
    },
    methods: {
      async add(data = {}) {
        const loading = this.$loading({
          lock: true,
          text: '正在添加...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let res = await this.$ajax.post('/community', data)
        loading.close()
        if (res) {
          this.$message({
            message: '成功录入一个小区',
            type: 'success'
          })
          this.$router.replace('/')
        }
      },
      async getOption(url) {
        let option = []
        let res = await this.$ajax(url)
        if (res && res.length > 0) {
          res.forEach(item => {
            option.push({
              value: item.name,
              label: item.name
            })
          })
        }
        return option
      },
      onSubmit() {
        let data = {}
        this.form.forEach((item) => {
          data[item.value] = item[item.value]
        })
        this.add(data)
      },
      async setForm() {
        this.loading = true
        this.form = []
        for (let i = 0; i < field.length; i++) {
          let item = field[i]
          if (item.value.indexOf('.name') > -1) {
            item.value = item.value.replace('.name', 'Name')
          }
          if (item.value === 'realEstateName') {
            item.option = await this.getOption('/quick/realEstate')
          }
          // if (item.value === 'setPointName') {
          //   item.option = await this.getOption('/quick/setPoint')
          // }
          // if (item.value === 'propertyManagmentName') {
          //   item.option = await this.getOption('/quick/propertyManagment')
          // }
          if (item.needSum) {
            item[item.value] = 0
          }
          this.form.push(item)
        }
        this.loading = false
      }
    },
    created() {
      this.setForm()
    }
  }
</script>

<style scoped>
  .flex {
    display: flex;
    align-items: center
  }
</style>