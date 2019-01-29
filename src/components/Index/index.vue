<template>
    <div class="app-index">
        <!-- 头部 -->
        <app-header></app-header>
        <!-- 栏目导航 -->
        <app-nav></app-nav>
        <!-- 轮播图 -->
        <swiper :auto='true' :loop='true' :duration='800' :interval='3000' dots-position="center">
            <swiper-item v-for='(item,index) in bannerList' :key="index"><img :src="item.img" alt=""></swiper-item>
        </swiper>

        <!-- 作品分类导航 -->
        <div class="class-nav">
            <ul>
                <li v-for="(item,index) in classList" :key='index'><a :href="item.url"><img :src="item.img" :alt="item.title"></a></li>
            </ul>
        </div>
        <!-- 分割线 -->
        <div class="divIder"></div>
        <!-- 热门原创 -->
        <div class="part-title">
            <h2>热门原创/POPULAR</h2>
            <p>独一无二，唯你独享</p>
        </div>
        <div class="popular-list">
            <ul>
                <li v-for="(item,index) in papularList" :key='index'><img :src="item.img" alt="">
                <p><span>{{item.atrist}} | {{item.pname}}</span><span>¥{{item.price | priceFilter}}</span></p></li>
            </ul>
        </div>
        <!-- 分割线 -->
        <div class="divIder"></div>
        <!-- 限时抢购 -->
        <div class="part-title">
            <h2>限时抢购/RUSH TO PURCHASE</h2>
            <p>距离结束还有</p>
        </div>
        <div class="purchase-list">
            <ul>
                <li v-for="(item,index) in purchaseList" :key='index'>
                    <img :src="item.img" alt="">
                    <p>¥{{item.price-199 | priceFilter}}</p>
                    <p><del>¥{{item.price | priceFilter}}</del></p>
                </li>
            </ul>
        </div>
        <!-- 分割线 -->
        <div class="divIder"></div>
        <!-- 艺术视野 -->
        <div class="part-title">
            <h2>艺术视野/INSIGHTS</h2>
            <p>为您呈现最前沿的艺术资讯</p>
        </div>
        <div class="insights-list">
            <ul>
                <li v-for='(item,index) in newsTopList' :key='index'><img :src="item.img" alt="" @click="jumpDetail" :data-nid='item.nid'></li>
                <li><img src="../../assets/images/index/insights-02.jpg" alt="" @click='jumpNewsList' data-class='艺术时尚'></li>
                <li><img src="../../assets/images/index/insights-03.jpg" alt="" @click='jumpNewsList' data-class='艺术生活'></li>
                <li><img src="../../assets/images/index/insights-04.jpg" alt="" @click='jumpNewsList' data-class='艺术资讯'></li>
                <li><img src="../../assets/images/index/insights-05.jpg" alt="" @click='jumpNewsList' data-class='艺网动态'></li>
            </ul>
        </div>
        <!-- 分割线 -->
        <div class="divIder"></div>
        <!-- 艺居生活 -->
        <div class="part-title">
            <h2>艺居生活/HOME DECIRATION</h2>
            <p>让艺术成为生活，让生活成为艺术</p>
        </div>
        <div class="home-decoration">
            <img src="../../assets/images/index/homestyle.gif" alt="">
            <span><a>查看更多</a></span>
        </div>
        <!-- 分割线 -->
        <div class="divIder"></div>
        <!-- 尊享定制 -->
        <div class="part-title">
            <h2>尊享定制/BESPOKE</h2>
            <p>空间艺术顾问，尊享定制服务</p>
        </div>
        <div class="home-decoration">
            <img src="../../assets/images/index/bespoke-01.jpg" alt="">
            <span><a>查看更多</a></span>
        </div>
        <!-- 分割线 -->
        <div class="divIder"></div>
        <!-- 走进艺网 -->
        <div class="home-decoration">
            <img src="../../assets/images/index/aboutYW.jpg" alt="">
        </div>
        <!-- 分割线 -->
        <div class="divIder" style='height:40px;'></div>
        <!-- 艺网APP -->
        <div class="YWapp">
            <img src="../../assets/images/index/yw-logo.png" alt="">
            <h4>有艺网，你的APP圈更具艺术范儿</h4>
            <h6>海量作品 购买便捷 实景体验</h6>
            <img src="../../assets/images/index/app-ios.png" alt="">
            <img src="../../assets/images/index/app-android.png" alt="">
        </div>
        <!-- 手风琴栏目列表 -->
        <group>
            <cell title="YWART.com" is-link :border-intent="false" :arrow-direction="showContent001 ? 'up' : 'down'" @click.native="showContent001 = !showContent001"></cell>
            <template v-if="showContent001">
                <cell-box v-for="(item,index) in ywartList" :key='index' :border-intent='false'>{{item.title}}</cell-box>
            </template>
            <cell title="了解艺网" is-link :border-intent="false" :arrow-direction="showContent002 ? 'up' : 'down'" @click.native="showContent002 = !showContent002"></cell>
            <template v-if="showContent002">
                <cell-box v-for="(item,index) in aboutList" :key='index'>{{item.title}}</cell-box>
            </template>
            <cell title="支持与帮助" is-link :border-intent="false" :arrow-direction="showContent003 ? 'up' : 'down'" @click.native="showContent003 = !showContent003"></cell>
            <template v-if="showContent003">
                <cell-box v-for="(item,index) in helpList" :key='index'>{{item.title}}</cell-box>
            </template>
            <cell title="合作" is-link :border-intent="false" :arrow-direction="showContent004 ? 'up' : 'down'" @click.native="showContent004 = !showContent004"></cell>
            <template v-if="showContent004">
                <cell-box v-for="(item,index) in companyList" :key='index'>{{item.title}}</cell-box>
            </template>
        </group>
        <!-- 底部 -->
        <footer>
            <p>京ICP备16003461号 Copyright © 2015-2018 艺网YWART.COM 版权所有</p>
        </footer>
        <!-- 底部tabbar -->
        <app-tabbar></app-tabbar>
    </div>
</template>
<script>
import appHeader from '../public/header.vue'
import appNav from '../public/nav.vue'
import appTabbar from '../public/tabbar.vue'
import {Swiper, SwiperItem, Cell, CellBox, CellFormPreview, Group} from 'vux'
export default {
  components: {
    appHeader,
    appNav,
    appTabbar,
    Swiper,
    SwiperItem,
    Group,
    Cell,
    CellBox,
    CellFormPreview
  },
  created () {
    this.getList('/product/popular', this.papularList) // 热门原创
    this.getList('/product/purchase', this.purchaseList)// 限时抢购
    this.getList('/news/top', this.newsTopList)// 头条新闻
  },
  data () {
    return {
      bannerList: [
        {url: 'javascript:;', img: require('../../assets/images/index/banner1.jpg'), title: '艺网-艺术品电商'},
        {url: 'javascript:;', img: require('../../assets/images/index/banner2.jpg'), title: '艺网-艺术品电商'},
        {url: 'javascript:;', img: require('../../assets/images/index/banner3.jpg'), title: '艺网-艺术品电商'},
        {url: 'javascript:;', img: require('../../assets/images/index/banner4.jpg'), title: '艺网-艺术品电商'},
        {url: 'javascript:;', img: require('../../assets/images/index/banner5.jpg'), title: '艺网-艺术品电商'}
      ], // 轮播图
      classList: [
        {url: 'javascript:;', img: require('../../assets/images/index/class-bg1.png'), title: '油画'},
        {url: 'javascript:;', img: require('../../assets/images/index/class-bg2.png'), title: '水墨'},
        {url: 'javascript:;', img: require('../../assets/images/index/class-bg3.png'), title: '版画'},
        {url: 'javascript:;', img: require('../../assets/images/index/class-bg4.png'), title: '摄影'},
        {url: 'javascript:;', img: require('../../assets/images/index/class-bg5.png'), title: '雕塑'}
      ], // 作品类型
      papularList: [], // 热门原创
      purchaseList: [], // 限时抢购
      newsTopList: [], // 头条新闻
      ywartList: [
        {title: '精选', url: '/'},
        {title: '原创艺术', url: '/buy'},
        {title: '造艺', url: '/'},
        {title: '藏艺术', url: '/'},
        {title: '艺居生活', url: '/'},
        {title: '我的珍藏', url: '/login'}
      ],
      aboutList: [
        {title: '关于我们', url: '/'},
        {title: '工作机会', url: '/'},
        {title: '网站地图', url: '/'}
      ],
      helpList: [
        {title: '如何购买', url: '/'},
        {title: '物流说明', url: '/'},
        {title: '联系我们', url: '/'}
      ],
      companyList: [
        {title: '作品征集', url: '/'},
        {title: '合作伙伴入驻', url: '/'}
      ],
      showContent001: false,
      showContent002: false,
      showContent003: false,
      showContent004: false
    }
  },
  methods: {
    // 调用作品、新闻方法
    getList (api, datamodel) {
      var url = 'http://127.0.0.1:3008' + api
      this.axios.get(url).then((result) => {
        for (var i = 0; i < result.data.length; i++) {
          datamodel.push(result.data[i])
        }
      })
    },
    // 跳转到新闻栏目页
    jumpNewsList (e) {
      var className = e.target.dataset.class
      this.$router.push('/ArtisticVision?tag=' + className)
    },
    // 跳转到详情页
    jumpDetail (e) {
      var id = e.target.dataset.nid
      this.$router.push('/newsinfo/' + id)
    }
  }
}
</script>
<style lang="less">
.app-index{
// 轮播图
.vux-slider{
    .vux-swiper{
        height: 350px !important;
        .vux-swiper-item{
            img{
                width: 100%;
                height: 350px;
            }
        }
    }
}
// 栏目导航
.class-nav{
    width: 100%;
    height: 60px;
    padding: 10px 0px;
    background: #fff;
    ul{
        width: 100%;
        display: flex;
        justify-content: space-around;
        li{
            list-style: none;
            width: 18%;
            img{
                width: 100%;
            }
        }
    }
}
// 热门原创
.popular-list{
    ul{
        li{
            width: 330px;
            overflow: hidden;
            margin: 0px auto 10px;
            padding: 5px 0px;
            img{
                width: 320px;
                margin: 5px;
                box-shadow: 0px 0px 5px 2px #eee
            }
            p{
                text-align: right;
                span{
                    padding-left: 20px;
                    font-size: 14px;
                    color: #333
                }
            }
        }
    }
}
// 限时抢购
.purchase-list{
    ul{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 88%;
        margin: 0px auto;
        li{
            width: 47%;
            height: 140px;
            padding-bottom: 40px;
            overflow: hidden;
            position: relative;
            margin-bottom: 15px;
            img{
                position: absolute;
                top:50%;
                left: 50%;
                transform: translate(-50%,-65%);
                width: 100%;
                min-height: 140px;
            }
            p{
                background: #fff;
                width: 100%;
                height: 20px;
                display: block;
                text-align: right;
                font-size: 14px;
                position: absolute;
                line-height: 20px;
                left: 0px;
                &:nth-child(2){
                    color: #d7473e;
                    bottom: 20px
                }
                &:last-child{
                    color: #ccc;
                    font-size: 13px;
                    bottom: 0px
                }
            }
        }
    }
}
// 艺术视野
.insights-list{
    width: 92%;
    margin: 0px auto;
    ul{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
            width: 48%;
            padding: 5px 0px;
            &:first-child{
                width: 100%;
            }
            img{
                width: 100%
            }
        }
    }
}
// 艺居生活/尊享定制/走进艺网
.home-decoration{
    width: 92%;
    margin: 0px auto;
    padding: 15px 0px 10px;
    img{
        width: 100%;
    }
    span{
        font-size: 14px;
        display: block;
        margin-top: 15px;
        &:after{
            content: '▶';
            font-size: 10px;
            padding-left: 5px;
        }
    }
}
// APP下载
.YWapp{
    width: 100%;
    text-align: center;
    padding: 40px 0px 30px;
    h4{
        line-height: 30px;
        font-weight: normal;
    }
    h6{
        padding-bottom: 30px;
    }
    img{
        max-width: 100%;
        &:first-child{
            width: 100px;
        }
        &:nth-child(4),&:nth-child(5){
            width: 40%;
            padding: 5px 10%;
        }
    }
}
// 手风琴栏目列表
.weui-cells{
    text-align: left;
    .vux-cell-primary{
        font-size: 14px;
    }
    .vux-cell-box{
        font-size: 12px;
        padding-left: 25px;
        color: #666
    }
    .weui-cell_access{
        .weui-cell__ft{
            &::after{
                border-color: #333 !important
            }
        }
        .vux-cell-arrow-up{
            &::after{
                border-color: #333 !important
            }
        }
    }
}
// 底部
footer{
    margin-top: 20px;
    padding: 5px 50px 5px 15px;
    font-size: 14px;
    text-align: left;
    color: #666;
    font-size: 14px;
}
}
</style>
