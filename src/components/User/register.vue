<template>
    <div class="app-register">
        <!-- 关闭按钮 -->
        <router-link to='/' class="closeBtn">✖</router-link>
        <!-- 注册标语 -->
        <div class="regMessage">注册艺网，立获首购优惠！</div>
        <!-- 注册表单 -->
        <group>
            <x-input
                ref="mobile"
                name="mobile"
                v-model="phone"
                keyboard="number"
                is-type="china-mobile"
                required
                placeholder='请输入手机号码'
                mask="999 9999 9999"
                :max="13"
                @on-blur='checkUname()'>
            </x-input>
            <x-input
                placeholder='请输入6位验证码'
                :min="6"
                :max="6"
                v-model="upwd"
                ref="refcode"
                keyboard="number"
                :is-type="upwdCode"
                required
                @on-change="keyDown">
            </x-input>
        </group>
        <!-- 注册按钮 -->
        <x-button type="warn" @click.native="onSubmit()" :disabled="disabled">立即注册</x-button>
       <div class="reg-bottom">已有账号？请<a href="/login">登录</a></div>
    </div>
</template>
<script>
import {XInput, Group, XButton, Grid, GridItem} from 'vux'
export default {
  components: {
    XInput,
    XButton,
    Group,
    Grid,
    GridItem
  },
  creaded () {
    this.keyDown()
  },
  data () {
    return {
      maskValue: '',
      upwd: '',
      phone: '',
      disabled: true,
      isReg: false,
      upwdCode: function (value) {
        return {
          valid: value.length === 6
        }
      }
    }
  },
  methods: {
    checkUname () {
      var uname = this.phone.replace(/\s/g, '')
      if (!uname) {
        return
      }
      var params = 'uname=' + uname
      var url = 'http://127.0.0.1:3008/user/checkUname'
      this.axios.post(url, params).then((result) => {
        if (result.data.ok === 0) {
          this.$vux.toast.show({
            text: '手机号已被注册',
            type: 'text',
            time: '1500'
          })
          this.isReg = false
        } else if (result.data.ok === 1) {
          this.isReg = true
        }
        this.keyDown()
      })
    },
    keyDown () {
      if (
        this.isReg === true && this.$refs['mobile'].valid === true && this.$refs['refcode'].valid === true
      ) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    onSubmit () {
      var uname = this.phone.replace(/\s/g, '')
      var upwd = this.upwd
      var url = 'http://127.0.0.1:3008/user/register'
      var params = 'uname=' + uname + '&upwd=' + upwd
      console.log(uname)
      this.axios.post(url, params).then((result) => {
        if (result.data.ok === 1) {
          this.$vux.toast.show({
            text: '注册成功!',
            time: '800'
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this.$vux.toast.show({
            text: '注册超时，请重新注册!',
            time: '800'
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
.app-register{
    padding: 10px 15px;
    .regMessage{
        font-size: 22px;
        text-align: left;
        margin: 60px 0px 60px;
    }
    .weui-btn{
        margin: 50px 0px 20px;
        background: #333 !important;
    }
    .reg-bottom{
        a{
            color: #444
        }
    }
}
.closeBtn{
    position: fixed;
    top: 0px;
    right: 15px;
    color: #333;
    text-decoration: none;
    font-size: 20px;
}
</style>
