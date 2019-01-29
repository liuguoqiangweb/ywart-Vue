const app = {
  state: {// 定义全局变量
    token: '',
    loginInfo: {}
  },
  mutations: {// 变量的值进行变更
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOGIN_INFO: (state, loginInfo) => {
      state.loginInfo = loginInfo
    }
  },
  actions: { // 设置只能通过commit方法进行vuex值得变更
    setToken: ({commit}) => {
      commit('SET_TOKEN')
    },
    setLoginInfo: ({ commit }) => {
      commit('SET_LOGIN_INFO')
    }
  }
}
export default app
