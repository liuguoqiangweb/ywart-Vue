// vuex语法糖，用于取值
const getters = {
  token: state => state.app.token,
  loginInfo: state => state.app.loginInfo
}
export default getters
