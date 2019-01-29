<template>
    <div style="margin-bottom:120px;">
        <!-- 头部 -->
        <x-header :left-options="{showBack: false}">
            <span>购物车</span>
            <img src="../../assets/images/Headerkefu-cart.png" alt="">
        </x-header>
        <!-- 购物车详情 -->
        <div class="cart-section">
            <h4>我的购物车({{this.cartList.length}})</h4>
            <div class="cart-item" v-for="(item,index) in cartList" :key='index'>
                <div class="cart-time">{{item.ctime | dateFilter}}</div>
                <div class="cart-box">
                    <input type="checkbox" v-model="item.isSelected" @change="handleSelectOnt"/>
                    <img :src="item.img" alt="">
                    <div class="cart-info">
                        <p>{{item.atrist}}</p>
                        <p>{{item.pname}}</p>
                        <p>{{item.size | sizeFilter}}</p>
                        <p>¥ {{item.price | priceFilter}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 全选/结算 -->
        <div class="allSelect">
            <div><input type="checkbox" id="secAll" v-model="isAllSelected" @change="handleChangeAll"><label for="secAll">全选</label></div>
            <div>
                <x-button plain mini @click.native='handleDelete'>移除</x-button>
            </div>
            <div>
                <span>(不含运费)</span>
                合计:
                <b>¥{{getTotalPrice().totalPrice | priceFilter}}</b>
            </div>
            <div>
                <x-button type="warn" :disabled="disabled">结算({{getTotalPrice().totalCount}})</x-button>
            </div>
        </div>
        <!-- tabbar -->
        <app-tabbar></app-tabbar>
    </div>
</template>
<script>
import { XHeader, XButton } from 'vux'
import appTabbar from '../public/tabbar.vue'
export default {
  components: {
    XHeader,
    appTabbar,
    XButton
  },
  created () {
    this.getCart()
  },
  data () {
    return {
      uid: this.$store.state.app.loginInfo.uid,
      cartList: [],
      isAllSelected: false,
      disabled: true
    }
  },
  methods: {
    // 全选事件
    handleChangeAll () {
      for (var i = 0; i < this.cartList.length; i++) {
        this.cartList[i].isSelected = this.isAllSelected
      }
    },
    // 单个选框事件
    handleSelectOnt () {
      var result = true
      for (var i = 0; i < this.cartList.length; i++) {
        result = result && this.cartList[i].isSelected
      }
      this.isAllSelected = result
    },
    // 获取用户购物车信息
    getCart () {
      var url = 'http://127.0.0.1:3008/product/myShopcart?uid=' + this.uid
      this.axios.get(url).then((result) => {
        this.cartList = result.data
      })
    },
    // 计算选中订单总价格/个数
    getTotalPrice () {
      var calcAll = {
        totalPrice: 0,
        totalCount: 0
      }
      for (var i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].isSelected) {
          calcAll.totalPrice += this.cartList[i].price // 如果被选中，则价格相加
          calcAll.totalCount += 1// 如果被选中，个数加1
        }
      }
      if (calcAll.totalCount > 0) { // 如果被选中个数大于0，结算按钮高亮显示且可点击
        this.disabled = false
      } else { // 反之不能点击
        this.disabled = true
      }
      return calcAll
    },
    // 删除订单
    handleDelete () {
      for (var i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].isSelected) {
          var url = 'http://127.0.0.1:3008/product/deleteGoods?cid=' + this.cartList[i].cid
          this.axios.get(url).then((result) => {
            if (result.data.code === 1) {
              this.$vux.toast.show({
                text: '移除成功！',
                type: 'text',
                time: 800
              })
            } else {
              this.$vux.toast.show({
                text: '移除失败！',
                type: 'text',
                time: 800
              })
            }
            setTimeout(() => {
              this.getCart()
            }, 1000)
          })
        }
      }
    }
  }
}
</script>
<style lang="less">
// 头部
.vux-header{
    background: #fff !important;
    position: fixed !important;
    height: 40px;
    overflow: hidden;
    top: 0px;
    width: 100%;
    .vux-header-title{
        span{
            color: #333 !important;
            font-size: 16px;
        }
    }
    img{
        position: absolute;
        width: 26px;
        left: 10px;
        top: 8px;
    }
}
// 购物车详情
.cart-section{
    width: 100%;
    margin-top: 40px;
    >h4{
        background: #f8f8f8;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc
    }
    .cart-item{
        height: 170px;
        overflow: hidden;
        margin-bottom: 10px;
        &:last-child{
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
        }
        .cart-time{
            height: 30px;
            overflow: hidden;
            line-height: 36px;
            background: #eee;
            font-size: 14px;
        }
        .cart-box{
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 10px;
            input{
                width: 16px;
                margin-left: 8px;
            }
            img{
                width: 120px;
                height: 120px;
            }
            .cart-info{
                width: 46%;
                text-align: left;
                p{
                    font-size: 14px;
                    color: #666;
                    &:first-child{
                        height: 20px;
                    }
                    &:nth-child(2){
                        height: 30px;
                    }
                    &:nth-child(3){
                        height: 56px;
                        font-size: 12px;
                        color: #a8a8a8
                    }
                    &:last-child{
                        height: 20px;
                    }
                }
            }
        }
    }
}
// 全选/结算
.allSelect{
    width: 100%;
    box-sizing: border-box;
    padding-left: 10px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    position: fixed;
    left: 0px;
    bottom: 50px;
    background: #fff;
    b{
        color: red;
        font-size: 14px;
    }
    span{
        font-size: 0.6em !important;
        color: #bbb
    }
    .weui-btn{
        border: 0px;
        height: 50px;
        border-radius: 0px;
    }
}
</style>
