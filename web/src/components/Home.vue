<template>
  <el-container style="height: 100vh">
    <el-container>
      <el-header>
        <div class="flex">
          <div style="color:#606266">
            数据深度:
          </div>
          <el-select @change="deepChange" v-model="deep" collapse-tags style="margin: 0 20px;" placeholder="请选择">
            <el-option v-for="item in deepArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div style="color:#606266">
            筛选字段
            <el-switch v-model="selectAll" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </div>
          <el-select @change="change" v-model="select" multiple collapse-tags style="margin: 0 20px;" placeholder="请选择">
            <el-option v-for="item in selectField" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div style="color:#606266">
            统计方式:
          </div>
          <el-select @change="sumsTypeChange" v-model="sumsType" collapse-tags style="margin-left: 20px;" placeholder="请选择">
            <el-option v-for="item in sumsTypeArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div style="flex:1"></div>
          <el-menu active-text-color="#409EFF" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">数据展示</el-menu-item>
            <el-submenu index="2">
              <div slot="title">数据录入
              </div>
              <el-menu-item index="2-1">录入小区</el-menu-item>
              <el-menu-item index="2-2">录入楼宇</el-menu-item>
              <el-menu-item index="2-3">录入房屋</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-main v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table v-if="table.length>0" show-summary :summary-method="getSummaries" :span-method="objectSpanMethod" :data="table" v-for="(table,index) in tableData" :key="index" max-height="500">
          <el-table-column :class-name="'1,'+table.length+','+field.needSum" :prop="field.value" :label="field.label" v-for="field in dataField" :key="field.value">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import houseField from '../field/house'
  import buildingField from '../field/building'
  import communityField from '../field/community'
  export default {
    data() {
      return {
        url: '/house',
        activeIndex: '1',
        selectAll: true,
        dataField: [...houseField],
        loading: true,
        tableData: [],
        needSpan: ['realEstate.name', 'community.name'],
        deepArr: [{
          value: 'community',
          label: '小区'
        }, {
          value: 'building',
          label: '楼宇'
        }, {
          value: 'house',
          label: '房屋'
        }],
        deep: 'house',
        selectField: [...houseField],
        select: [],
        sumsTypeArr: [{
          value: 'sum',
          label: '求和'
        }, {
          value: 'average',
          label: '平均'
        }, {
          value: 'max',
          label: '最大'
        }, {
          value: 'min',
          label: '最小'
        }],
        sumsType: 'sum'
      }
    },
    watch:{
      selectAll(val){
        if (val) {
          this.setSelectFiled()
        }else{
          this.select = []
        }
        this.change(this.select)
      }
    },
    methods: {
      async getData() {
        this.loading = true
        let res = await this.$ajax(this.url)
        this.loading = false
        if (res) {
          return res
        }
      },
      setSelectFiled() {
        this.select = []
        this.selectField.forEach((item) => {
          this.select.push(item.value)
        })
      },
      async setTableData() {
        let res = await this.getData()
        if (res) {
          this.tableData = []
          this.tableData = res
        }
      },
      objectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        let spanArr = column.className.split(',')
        let needSpan = false
        this.needSpan.forEach((item) => {
          if (column.property == item) {
            needSpan = true
          }
        })
        if (columnIndex <= Number(spanArr[0]) && needSpan) {
          let length = Number(spanArr[1]) || 5
          if (rowIndex % length === 0) {
            return {
              rowspan: length,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      getSummaries({
        columns,
        data
      }) {
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            this.sumsTypeArr.forEach((item) => {
              if (this.sumsType == item.value) {
                sums[index] = item.label
              }
            })
            return;
          } else {
            let spanArr = column.className.split(',')
            let needSum = spanArr[2]
            if (needSum == 'true') {
              let result = 0
              let dataArr = []
              data.forEach((item) => {
                let pushItem = 0
                if (item[column.property] != undefined) {
                  pushItem = Number(item[column.property])
                }
                dataArr.push(pushItem)
              })
              if (this.sumsType === 'sum') {
                sums[index] = eval(dataArr.join("+"))
              } else if (this.sumsType === 'average') {
                sums[index] = (Number(eval(dataArr.join("+"))) / dataArr.length)
              } else if (this.sumsType === 'max') {
                sums[index] = Math.max.apply(null, dataArr)
              } else if (this.sumsType === 'min') {
                sums[index] = Math.min.apply(null, dataArr)
              } else {
                sums[index] = 'N/A'
              }
            } else {
              sums[index] = '-'
            }
          }
        });
        return sums;
      },
      change(val) {
        this.dataField = []
        this.selectField.forEach((item, index) => {
          let pushFlag = false
          val.forEach((valItem) => {
            if (valItem == item.value) {
              pushFlag = true
            }
          })
          if (pushFlag) {
            this.dataField.push(item)
          }
        })
      },
      handleSelect(val) {
        if (val == '2-1') {
          this.$router.push('/addCommunity')
        }
        if (val == '2-2') {
          this.$router.push('/addBuilding')
        }
        if (val == '2-3') {
          this.$router.push('/addHouse')
        }
      },
      deepChange(val) {
        this.dataField = []
        this.url = '/' + val
        if (val == 'house') {
          this.dataField = [...houseField]
          this.selectField = [...houseField]
          this.setSelectFiled()
        }
        if (val == 'building') {
          this.dataField = [...buildingField]
          this.selectField = [...buildingField]
          this.setSelectFiled()
        }
        if (val == 'community') {
          this.dataField = [...communityField]
          this.selectField = [...communityField]
          this.setSelectFiled()
        }
        this.setTableData()
      },
      sumsTypeChange(val) {}
    },
    created() {
      this.setSelectFiled()
    },
    mounted() {
      this.setTableData()
    }
  };
</script>

<style scoped>
  .el-header {
    color: #333;
    border-bottom: solid 1px #e6e6e6
  }
  .el-aside {
    color: #333;
  }
  .flex {
    display: flex;
    align-items: center
  }
</style>