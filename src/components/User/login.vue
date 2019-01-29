<template>
    <div class="app-login">
        <!-- 关闭按钮 -->
        <router-link to='/' class="closeBtn">✖</router-link>
        <!-- tab标签 -->
        <tab v-model="index">
            <tab-item
                v-for="(item,index) in loginList"
                :key="index"
                :selected="demo===item.title"
                @click="demo=item.title"
            >{{item.title}}</tab-item>
        </tab>
        <!-- tab内容 -->
        <swiper v-model="index" :show-dots="false">
            <swiper-item v-for="(item,index) in loginList" :key="index">
                <group>
                    <div v-if="item.lid==0">
                        <x-input
                            ref="mobile"
                            name="mobile"
                            v-model="phone"
                            :placeholder="item.content"
                            :max="11"
                            keyboard="number"
                            is-type="china-mobile"
                            required
                            @on-change="keyDown"
                        ></x-input>
                    </div>
                    <div v-if="item.lid==1">
                        <x-input
                            :placeholder="item.content"
                            name="email"
                            is-type="email"
                            v-model="email"
                            ref="email"
                        ></x-input>
                    </div>
                    <x-input
                        :placeholder="item.txtPassword"
                        :min="6"
                        :max="6"
                        v-model="upwd"
                        ref="refcode"
                        keyboard="number"
                        :is-type="upwdCode"
                        required
                        @on-change="keyDown"
                    ></x-input>
                </group>
            </swiper-item>
        </swiper>
        <!-- 登录按钮 -->
        <x-button type="warn" @click.native="onSubmit()" :disabled="disabled">登录</x-button>
        <div class="login-bottom">
            <span>
                <a href="#">忘记密码?</a>
            </span>
            <span>|</span>
            <span>
                <a href="/register">立即注册</a>
            </span>
        </div>
    </div>
</template>
<script>
import { XInput, Group, XButton, Tab, TabItem, Swiper, SwiperItem } from 'vux'
export default {
  components: {
    XInput,
    XButton,
    Group,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  created () {
    this.checkLogin()
  },
  data () {
    return {
      loginList: [
        {
          lid: 0,
          title: '手机登录',
          content: '请输入手机号',
          txtPassword: '请输入验证码'
        },
        {
          lid: 1,
          title: '邮箱登录',
          content: '请输入邮箱号',
          txtPassword: '请输入密码'
        }
      ],
      index: 0, // tab切换下标
      demo: '手机登录', // tab切换默认选中
      phone: '', // 手机号
      email: '', // 邮箱
      upwd: '', // 登录密码
      disabled: true, // 按钮是否可以点击
      upwdCode: function (value) {
        return {
          valid: value.length === 6
        }
      }
    }
  },
  methods: {
    keyDown () {
      if (this.index === 0) {
        if (
          this.$refs['mobile'][0].valid === true && this.$refs['refcode'][0].valid === true
        ) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      } else {
        if (
          this.$refs['email'][0].valid === true && this.$refs['refcode'][0].valid === true
        ) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      }
    },
    login (uname) {
      var upwd = this.upwd
      var url = 'http://127.0.0.1:3008/user/login'
      var params = 'uname=' + uname + '&upwd=' + upwd
      this.axios.post(url, params).then((result) => {
        if (result.data.ok === 1) {
          this.$store.commit('SET_TOKEN', true) // 变更state里面的值
          this.$store.commit('SET_LOGIN_INFO', {
            uid: result.data.uid,
            uname: result.data.uname
          })
          this.$vux.toast.show({
            text: '登录成功'
          })
          this.$router.go(-1)
        } else {
          this.$vux.toast.show({
            text: '登录失败',
            type: 'warn'
          })
        }
      })
    },
    onSubmit () {
      if (this.index === 0) {
        this.login(this.phone)
      } else if (this.index === 1) {
        this.login(this.email)
      }
    },
    checkLogin () {
      if (this.$store.state.app.token) {
        this.$router.push('/usercenter')
      }
    }
  }
}
</script>
<style lang="less">
.closeBtn {
    position: fixed;
    top: 0px;
    right: 15px;
    color: #333;
    text-decoration: none;
    font-size: 20px;
}
.app-login {
    padding: 10px 20px;
    .vux-tab-wrap {
        margin-top: 100px;
        .vux-tab-item {
            font-size: 16px;
            &.vux-tab-selected {
                color: #333;
            }
        }
        .vux-tab-ink-bar {
            background-color: #333;
        }
    }
    .vux-slider {
        margin-top: 30px;
        .vux-swiper{
          height: 180px !important;
          overflow: hidden;
          .vux-swiper-item{
            height: 180px;
          }
        }
    }
    .weui-btn {
        margin: 30px 0px 10px;
        background: #333 !important;
    }
    .login-bottom {
        display: flex;
        justify-content: center;
        padding: 15px 0px 100px;
        span {
            padding: 0px 8px;
        }
        a {
            color: #333;
        }
    }
}
</style>
