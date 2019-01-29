<template>
    <div class="app-goods">
        <!-- 顶部 -->
        <header>
            <!-- 客服图标 -->
            <div class="left-kefu">
                <img src="../../assets/images/headerKefu-black.png" alt="">
            </div>
            <!-- 搜索 -->
            <div class="right-search">
                <search></search>
            </div>
        </header>
        <!-- 产品检索列表 -->
        <div class="selectList">
            <!-- 分类 -->
            <div class="class-row">
                <h4>分类</h4>
                <div class="class-col">
                    <scroller lock-y :scrollbar-x=false>
                        <div class="scroll-box">
                            <a v-for='(item,index) in classList' :key='index' @click="handleSearch" data-label='className' :data-val='item' :class='searchObj.className===item?"selected":""'>{{item}}</a>
                        </div>
                    </scroller>
                </div>
            </div>
            <!-- 题材 -->
            <div class="class-row">
                <h4>题材</h4>
                <div class="class-col">
                    <scroller lock-y :scrollbar-x=false>
                        <div class="scroll-box">
                            <a v-for='(item,index) in topicList' :key='index' @click="handleSearch" data-label='topicName' :data-val='item' :class='searchObj.topicName===item?"selected":""'>{{item}}</a>
                        </div>
                    </scroller>
                </div>
            </div>
            <!-- 价格区间 -->
            <div class="class-row">
                <h4>价格</h4>
                <div class="class-col">
                    <scroller lock-y :scrollbar-x=false>
                        <div class="scroll-box">
                            <a v-for='(item,index) in priceList' :key='index' @click="handleSearch" data-label='priceValue' :data-val='item' :class='searchObj.priceValue===item?"selected":""'>{{item}}</a>
                        </div>
                    </scroller>
                </div>
            </div>
        </div>
        <!-- 综合搜索tab功能 -->
        <tab v-model="index">
            <tab-item
                v-for="(item,index) in sortList"
                :key="index"
                :selected="demo===item"
            >{{item}}</tab-item>
        </tab>
        <!-- tab切换 -->
        <swiper v-model="index" :show-dots="false" :aspect-ratio="10">
            <swiper-item v-for="(list,index) in allGoods" :key="index">
                <!-- 产品列表 -->
                <div class="goods-col">
                    <div class="goodsItem" v-for='(item,index) in list' :key='index'>
                        <div v-if='index%2==0'>
                            <p><img :src='item.img' @click="jumpDetail" :data-id="item.pid" alt=""></p>
                            <p>¥{{item.price | priceFilter}}</p>
                            <p>{{item.material}} , {{item.style}}</p>
                        </div>
                    </div>
                </div>
                <div class="goods-col">
                    <div class="goodsItem" v-for='(item,index) in list' :key='index'>
                        <div v-if='index%2==1'>
                            <p><img :src="item.img" @click="jumpDetail" :data-id="item.pid" alt=""></p>
                            <p>¥{{item.price | priceFilter}}</p>
                            <p>{{item.material}} , {{item.style}}</p>
                        </div>
                    </div>
                </div>
            </swiper-item>
        </swiper>
        <!-- 底部tabbar -->
        <app-tabbar></app-tabbar>
    </div>
</template>
<script>
import {Search, Tab, TabItem, Swiper, SwiperItem, Scroller} from 'vux'
import appTabbar from '../public/tabbar.vue'
export default {
  created () {
    this.getAllGoods('http://127.0.0.1:3008/product/allProduct', 0)
    this.getAllGoods('http://127.0.0.1:3008/product/orderByHot', 1)
    this.getAllGoods('http://127.0.0.1:3008/product/orderByPrice', 2)
  },
  data () {
    return {
      classList: ['油画', '版画', '水墨', '水彩(粉)', '雕塑', '摄影', '书法', '其他'],
      topicList: ['风景', '人物', '静物', '动物', '花鸟', '山水', '其他'],
      priceList: ['2000以下', '2000-8000', '8000-15000', '15000-30000', '30000以上'],
      sortList: ['综合排序', '热度排序', '价格排序', '筛选'],
      index: 0, // tab切换下标
      demo: '综合排序', // tab切换默认选中
      allGoods: [[], [], []],
      searchObj: {className: '', topicName: '', priceValue: '', keyWord: ''}
    }
  },
  methods: {
    getAllGoods (url, index) {
      this.axios.get(url, {
        params: {
          keyWord: this.searchObj.keyWord,
          className: this.searchObj.className,
          topicName: encodeURI(this.searchObj.topicName),
          priceValue: this.searchObj.priceValue
        }
      }).then((result) => {
        this.allGoods[index] = result.data
        this.$forceUpdate()// 强制刷新
      })
    },
    jumpDetail (e) {
      // 获取商品编号
      var id = e.target.dataset.id
      // 跳转不同组件
      this.$router.push('/detail/' + id)
    },
    // 作品检索点击事件
    handleSearch (e) {
      var value = e.target.dataset.val
      var label = e.target.dataset.label
      if (label === 'className') {
        if (this.searchObj.className === value) {
          this.searchObj.className = ''
        } else {
          this.searchObj.className = value
        }
      } else if (label === 'topicName') {
        if (this.searchObj.topicName === value) {
          this.searchObj.topicName = ''
        } else {
          this.searchObj.topicName = value
        }
      } else if (label === 'priceValue') {
        if (this.searchObj.priceValue === value) {
          this.searchObj.priceValue = ''
        } else {
          this.searchObj.priceValue = value
        }
      }
      this.getAllGoods('http://127.0.0.1:3008/product/allProduct', 0)
      this.getAllGoods('http://127.0.0.1:3008/product/orderByHot', 1)
      this.getAllGoods('http://127.0.0.1:3008/product/orderByPrice', 2)
    }
  },
  components: {
    Search,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    appTabbar,
    Scroller
  }
}
</script>
<style lang="less">
.app-goods{
    padding: 45px 0px 0px;
// 头部
header{
    width: 100%;
    padding: 0px 10px;
    box-sizing: border-box;
    height: 44px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    z-index: 100;
    background: #FFF;
    .left-kefu{
        width:10%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 26px;
            height: 26px
        }
    }
    .right-search{
        width: 90%;
        .weui-search-bar{
            line-height: 26px;
            background-color: #fff;
            .weui-search-bar__label{
                background: #F2F2F2 !important;
                border-radius: 3px;
                text-align: left;
                i{
                    height: 20px;
                    width: 20px;
                    &::before{
                        content: '';
                        background: url('../../assets/images/ss.png') no-repeat 3px center;
                        background-size: 20px;
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
    }
}
// 检索列表
.selectList{
    width: 100%;
    padding: 0px 10px;
    box-sizing: border-box;
    overflow: hidden;
    text-align: left;
    .class-row{
        width: 100%;
        height: 26px;
        line-height: 26px;
        margin-bottom: 20px;
        display: flex;
        justify-content:start;
        h4{
            display: inline-block;
            font-weight: normal;
            border-right: 1px solid #dddddd;
            padding-right: 10px;
            font-size: 14px;
            width: 10%;
        }
        .class-col{
            width: 85%;
            padding: 0px 5px;
            .xs-container{
                font-size: 14px;
                .scroll-box{
                    position: relative;
                    &:first-child{
                        width: 95%;
                    }
                    &:last-child{
                        width: 168%;
                    }
                }
                .selected{
                    background: #333;
                    display: inline-block;
                    color: #fff
                }
                a{
                    padding: 0px 8px 0px 5px;
                    color: #999;
                    margin-left: 10px;
                }
            }
        }
    }
}
// 综合排序
.vux-tab {
    .vux-tab-item {
        font-size: 14px;
        padding: 0px 10px;
        overflow: hidden;
        &:nth-child(4){
            border-left: 1px solid #e5e5e5 !important;
            padding: 0px 0px 0px 10px;
            &::after{
                content: ' ';
                background: url('../../assets/images/sxct.png') no-repeat center;
                background-size: 12px 12px;
                width: 12px;
                height: 12px;
                padding-left:12px;
                overflow: hidden;
                color: #fff
            }
        }
        &.vux-tab-selected {
            color: #444 !important;
            font-weight: bold;
            &::after{
                content: '▼'
            }
        }
    }
    .vux-tab-ink-bar {
        background-color: #fff;
        border-bottom:1px solid #e5e5e5
    }
}
// 作品列表
.vux-slider{
    width: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
    background: #f8f8f8;
    .vux-swiper{
        height: auto;
        display: block;
        .vux-swiper-item{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .goods-col{
                width: 49%;
                .goodsItem{
                    width: 100%;
                    background: #fff;
                    p{
                        text-align: right;
                        &:first-child{
                            margin-top: 10px;
                        }
                        &:nth-child(2){
                            padding-top: 5px;
                            font-size: 15px;
                            color: #000;
                            padding-right: 4px
                        }
                        &:last-child{
                            font-size: 12px;
                            color: #999;
                            padding-right: 4px;
                            padding-bottom: 5px;
                        }
                        img{
                            width: 100%;
                            max-height: 330px;
                        }
                    }
                }
            }
        }
    }
}
}
</style>
