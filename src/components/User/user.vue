<template>
    <div>
        <!-- 图像/设置按钮 -->
        <header>
            <img src="../../assets/images/user/person-pic.jpg" alt="">
            <img src="../../assets/images/user/setup.png" alt="">
        </header>
        <!-- 成为VIP -->
        <div class="vip">
            <div class="vip-header">
                <span>立即成为VIP</span>
                <span>会员权益</span>
            </div>
            <!-- 四宫格 -->
            <div class="grid-four">
                <grid :show-lr-borders="false">
                    <grid-item v-for="(item,index) in fourList" :key="index">
                        <img slot="icon" :src="item.img">
                        {{item.title}}
                    </grid-item>
                </grid>
            </div>
        </div>
        <!-- 分割线 -->
        <div class="whiteIder"></div>
        <div class="divIder"></div>
        <!-- 八宫格 -->
        <div class="grid-eight">
            <grid :cols="4" :show-lr-borders="false">
                <grid-item v-for="(item,index) in eightList" :key="index">
                    <img :src="item.img" alt="">
                    <p class="grid-center">{{item.title}}</p>
                </grid-item>
            </grid>
        </div>
        <!-- 底部tabbar -->
        <app-tabbar></app-tabbar>
    </div>
</template>
<script>
import appTabbar from '../public/tabbar.vue'
import { Grid, GridItem } from 'vux'
export default {
  components: {
    appTabbar,
    Grid,
    GridItem
  },
  data () {
    return {
      fourList: [
        {fid: 1, title: '订单', img: require('../../assets/images/user/order.png')},
        {fid: 2, title: '历史纪录', img: require('../../assets/images/user/history.png')},
        {fid: 3, title: '消息', img: require('../../assets/images/user/message.png')},
        {fid: 4, title: '客服', img: require('../../assets/images/user/service.png')}
      ],
      eightList: [
        {eid: 1, title: '我的艺术品', img: require('../../assets/images/user/mygoods.png')},
        {eid: 2, title: '我喜欢的', img: require('../../assets/images/user/heart.png')},
        {eid: 3, title: '优惠券', img: require('../../assets/images/user/voucher.png')},
        {eid: 4, title: '积分商城', img: require('../../assets/images/user/mall.png')},
        {eid: 5, title: '收货地址', img: require('../../assets/images/user/addr.png')},
        {eid: 6, title: '合作伙伴', img: require('../../assets/images/user/distribution.png')},
        {eid: 7, title: '意见反馈', img: require('../../assets/images/user/suggest.png')},
        {eid: 8, title: '关于我们', img: require('../../assets/images/user/about.png')}
      ]
    }
  }
}
</script>
<style lang="less">
header{
    width: 100%;
    height: 60px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        height: 40px;
        border-radius: 50%
    }
    img{
        &:last-child{
            height: 20px
        }
    }
}
.vip{
    width: 90%;
    margin: 5px auto;
    background: url('../../assets/images/user/vipbg.png') top right no-repeat;
    background-size: 100% 110px;
    height: 188px;
    overflow: hidden;
    border-radius: 3px;
    box-shadow: 0px 0px 3px 1px #999;
    .vip-header{
        display: flex;
        justify-content: space-between;
        height: 100px;
        line-height: 100px;
        color: #d1a46a;
        span{
            &:first-child{
                font-size: 16px;
                padding-left: 20px;
                font-weight: bold;
            }
            &:last-child{
                margin-right: 10px;
                font-size: 14px;
                background: url('../../assets/images/user/help.png') no-repeat right center;
                background-size: 20%;
                padding-right: 20px
            }
        }
    }
    .grid-four{
        width: 100%;
        height: 88px;
        border-radius: 3px;
        background: #fff;
        margin-bottom: 5px;
        a{
            color: #333;
            font-size: 14px;
            text-decoration: none;
            height: 88px;
        }
    }
}
.grid-eight{
    .weui-grids{
        a{
            color: #333;
            text-decoration: none;
            font-size: 14px;
            img{
                width: 40%
            }
        }
    }
}

</style>
