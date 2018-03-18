import Vue from 'vue'

import ajax from './ajax'

export default {
  install(Vue) {
    Vue.use(ajax)
  }
}
