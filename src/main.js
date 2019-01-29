// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

// 1.1 引入axios库（VueResource）
import axios from 'axios'

// 2.1 引入Toast
import { Toast, ToastPlugin } from 'vux'
// 1.2 跨域保存session值
axios.defaults.withCredentials = true
// 1.3 修改post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 1.4 注册组件
Vue.prototype.axios = axios
// 2.2 注册toast
Vue.use(ToastPlugin)
Vue.component('toast', Toast)

Vue.config.productionTip = false

// 价格过滤器
Vue.filter('priceFilter', (value) => {
  value = value + ''
  // 定义翻转函数
  function rever (str) {
    return str.split('').reverse().join('')
  }
  // 获取翻转后价格
  var price = rever(value)
  // 定义新变量
  var newPrice = ''
  // 遍历拆分的价格数组
  for (var i = 0; i < price.length; i++) {
    newPrice += price[i] // 把价格数字一一放入新价格变量中
    if ((i + 1) % 3 === 0 && (i + 1) !== price.length) { // 如果字符串索引为3，并且不是最后一位
      newPrice += ',' // 在第三位后面加“,”
    }
  }
  return rever(newPrice) // 把加了,号的价格再翻转，获取最终的价格格式
})

// 尺寸过滤器
Vue.filter('sizeFilter', (value) => {
  value = value + ''
  return value.split(',').join('x') + 'cm'
})

// 日期过滤器
Vue.filter('dateFilter', (value) => {
  value = value + ''
  return value.split('T')[0]
})

// 日期过滤器
Vue.filter('timeFilter', function (value) {
  // 创建日期对象
  var data = new Date(value)
  // 获取年月日时分秒
  var year = data.getFullYear()
  var month = data.getMonth() + 1
  var day = data.getDate()
  var hours = data.getHours()
  var minutes = data.getMinutes()
  var second = data.getSeconds()
  // 月、日格式判断
  month < 10 && (month = '0' + month)
  day < 10 && (day = '0' + day)
  hours < 10 && (hours = '0' + hours)
  minutes < 10 && (minutes = '0' + minutes)
  second < 10 && (second = '0' + second)
  // 拼接字符串返回
  return `${year}-${month}-${day} ${hours}:${minutes}:${second}`
})

// 手机号过滤器
Vue.filter('phoneFilter', (value) => {
  return value.substr(0, 3) + '****' + value.substr(7)
})

var myPlugin = {
  install: function (vue) {
    vue.filter('myCurrency', (value) => {
      return '$' + value
    })
  }
}
Vue.use(myPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
