<template>
    <div class="app-goodsDetail">
        <!-- 头部 -->
        <x-header :left-options="{backText: ''}" :right-options="{showMore: true}">商品详情</x-header>
        <!-- 详情图 -->
        <swiper height="360px" :auto='true' :loop='true' :duration='800' :interval='3000' dots-position="center">
            <swiper-item v-for='(item,index) in picsList' :key='index'>
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
        <!-- 作品信息 -->
        <div class="part1-info">
            <div class="part1-left">
                <p>{{labels.pname}}</p>
                <p>¥{{labels.price | priceFilter}}</p>
                <p>{{labels.material}} ，{{labels.size | sizeFilter}}</p>
            </div>
            <div class="part1-middle">
                <img src="../../assets/images/tl.png" alt="">
                <span>讨论</span>
            </div>
            <div class="part1-right">
                <img src="../../assets/images/xydhh.png" alt="">
                <span>心愿单</span>
            </div>
        </div>
        <!-- 分割线 -->
        <div class="divIder"></div>
        <!-- 装裱信息 -->
        <div class="part2-mount">
            <div class="part2-top">
                <div>
                    选择画框装裱 <span>{{mount.decoration}}</span>
                </div>
            </div>
            <div class="part2-middle"><span>运费：¥{{mount.transport}}</span> <span>装裱费：免费</span></div>
            <div class="part2-bottom"><span v-for='(item,index) in tags' :key="index">{{item}}</span></div>
        </div>
        <!-- 分割线 -->
        <div class="divIder"></div>
        <!-- 艺术家简介 -->
        <div class="part3-artist">
            <div class="artist-left">
                <img :src="artist.img" alt="">
            </div>
            <div class="artist-right">
                <p><img src="../../assets/images/goods/ysjt.png" alt=""></p>
                <h4>{{labels.atrist}}</h4>
                <p>{{artist.info}}</p>
                <p><a href="#">进入艺术家首页</a></p>
            </div>
        </div>
        <!-- 分割线 -->
        <div class="whiteIder"></div>
        <!-- 艺术品信息 -->
        <div class="part-title">
            <h2>艺术品信息</h2>
            <p>ARTWORK INFORMATION</p>
        </div>
        <div class="part4-artwork">
            <div class="artwork-left">
                <img :src="picsList[0]" alt="">
            </div>
            <div class="artwork-right">
                <h3>{{labels.pname}}</h3>
                <p>尺 寸：{{labels.size | sizeFilter}}</p>
                <p>材 质：{{labels.material}}</p>
                <p>作品类型：{{labels.class}}</p>
                <p>创作时间：{{labels.timer}}</p>
            </div>
        </div>
        <!-- 分割线 -->
        <div class="whiteIder"></div>
        <!-- 艺术评析 -->
        <div class="part-title">
            <h2>艺术评析</h2>
            <p>ART REVIEW</p>
        </div>
        <div class="part5-revien">
            <p>
            {{labels.rec_reason}}
        </p>
        </div>
        <!-- 分割线 -->
        <div class="whiteIder"></div>
        <!-- 艺术品细节 -->
        <div class="part-title">
            <h2>艺术品细节</h2>
            <p>ARTWO RKDETAILS</p>
        </div>
        <div class="part6-detail" v-html='details.detail'>
        </div>
        <!-- 分割线 -->
        <div class="whiteIder"></div>
        <!-- 场景展示 -->
        <div class="part-title">
            <h2>场景展示</h2>
            <p>SCENARIO SHOWS</p>
        </div>
        <div class="part7-show" v-html="others.spaceshow">
        </div>
        <!-- 分割线 -->
        <div class="whiteIder"></div>
        <!-- 其他细节展示 -->
        <div class="part-title">
            <h2>其他细节展示</h2>
            <p>OTHER DETAILS</p>
        </div>
        <div class="part7-show" v-html="others.otherdetail">
        </div>
        <!-- 分割线 -->
        <div class="whiteIder"></div>
        <!-- 购买须知 -->
        <div class="part-title">
            <h2>购买须知</h2>
            <p>PURCHASE NOTES</p>
        </div>
        <div class="part7-show" v-html="others.buynotes">
        </div>
        <!-- 分割线 -->
        <div class="whiteIder"></div>
        <!-- 艺网小贴士 -->
        <div class="part-title">
            <h2>艺网小贴士</h2>
            <p>YWART TIPS</p>
        </div>
        <div class="part7-show" v-html="others.ywtips">
        </div>
        <!-- 评论 -->
        <group title="评论">
            <x-textarea :max="200" name="description" placeholder="请畅所欲言...(最少10个字符,最多200个字)" v-model="commentContent"></x-textarea>
            <x-button mini plain @click.native='sendComment' :disabled='disabled'>发表</x-button>
        </group>
        <div class="commentList">
            <ul>
                <li v-for='(item,index) in commentList' :key='index'>
                    <div class="first-part"><span>{{item.uname | phoneFilter}}</span> <span>{{item.mtime | timeFilter}}</span></div>
                    <div class="second-part">{{item.content}}</div>
                </li>
            </ul>
        </div>
        <!-- 底线 -->
        <load-more :show-loading="false" tip="已经到底啦" background-color="#fbf9fe"></load-more>
        <!-- 固定底部 -->
        <div class="fixed-bottom">
            <div class="bottom-left" @click='jumpCart'>
                <img src="../../assets/images/goods/car.png" alt="">
                <span>购物车</span>
                <badge v-if='isNull'></badge>
            </div>
            <div class="bottom-right">
                <x-button plain mini @click.native='handleAddCart'>加入购物车</x-button>
                <x-button mini type="warn">立即购买</x-button>
            </div>
        </div>
    </div>
</template>
<script>
import { XHeader, Swiper, SwiperItem, XTextarea, Group, XInput, XButton, LoadMore, Badge } from 'vux'
export default {
  components: {
    XHeader,
    Swiper,
    SwiperItem,
    XTextarea,
    Group,
    XInput,
    XButton,
    LoadMore,
    Badge
  },
  data () {
    return {
      pid: this.$route.params.id,
      picsList: [],
      isNull: false,
      details: {},
      labels: {},
      mount: {},
      others: {},
      artist: {},
      tags: [],
      commentContent: '',
      disabled: true,
      commentList: []
    }
  },
  created () {
    this.getGoodsDetail()
    this.getComment()
  },
  watch: {
    commentContent () {
      if (this.commentContent.length >= 10) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  },
  methods: {
    // 获取作品详情
    getGoodsDetail () {
      var url = 'http://127.0.0.1:3008/product/details?pid=' + this.pid
      this.axios.get(url).then((result) => {
        this.picsList = result.data.pics.imgs.split(',')
        this.labels = result.data.labels
        this.mount = result.data.mount
        this.tags = this.mount.lable.split(',')
        this.details = result.data.details
        this.others = result.data.others
        this.artist = result.data.artist
      })
    },
    // 添加购物车
    handleAddCart () {
      if (this.$store.state.app.token) {
        var url = 'http://127.0.0.1:3008/product/insertCart'
        var params = 'uid=' + this.$store.state.app.loginInfo.uid + '&pid=' + this.pid + '&count=1' + '&price=' + this.labels.price
        this.axios.post(url, params).then((result) => {
          if (result.data.code === 1) {
            this.$vux.toast.show({
              text: '加入购物车成功',
              type: 'text',
              time: 800
            })
            this.isNull = true
          } else {
            this.$vux.toast.show({
              text: '购物车已有此商品',
              type: 'text',
              time: 800,
              width: '10em'
            })
          }
        })
      } else {
        this.$vux.toast.show({
          text: '请先登录！',
          type: 'text',
          time: 800
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      }
    },
    // 跳转到购物车
    jumpCart () {
      this.$router.push('/cart')
    },
    // 评论
    sendComment () {
      if (!this.$store.state.app.loginInfo.uid) {
        this.$vux.toast.show({
          text: '请先登录！',
          type: 'text',
          time: 800
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      } else if (this.commentContent.match(/([我卧]|wo)\s*([艹槽操草擦]|cao|fuck)/i) != null) {
        this.$vux.toast.show({
          text: '欢迎评论，请使用文明用语！',
          type: 'text',
          time: 800,
          width: '15em'
        })
      } else {
        var url = 'http://127.0.0.1:3008/product/sendComment'
        var params = 'uid=' + this.$store.state.app.loginInfo.uid + '&pid=' + this.pid + '&content=' + this.commentContent
        this.axios.post(url, params).then((result) => {
          if (result.data.code === 1) {
            this.$vux.toast.show({
              text: '评论成功！',
              type: 'text'
            })
            this.commentContent = ''
            this.getComment()
          } else if (result.data.code === -2) {
            this.$vux.toast.show({
              text: '操作频繁，请稍候再评论！',
              type: 'text',
              width: '15em'
            })
            this.disabled = true
          }
        })
      }
    },
    // 获取当前作品评论
    getComment () {
      var url = 'http://127.0.0.1:3008/product/selComment?pid=' + this.pid
      this.axios.get(url).then((result) => {
        this.commentList = result.data
      })
    }
  }
}
</script>
<style lang="less">
.app-goodsDetail{
    padding-bottom: 58px;
// 头部
.vux-header{
    background: #fff !important;
    position: fixed !important;
    z-index: 222;
    width: 100%;
    top: 0px;
    left: 0px;
    .vux-header-left{
        .left-arrow{
            &::before{
                border-color: #333 !important
            }
        }
    }
    .vux-header-title{
        color: #333 !important;
        font-size: 16px !important;
    }
    .vux-header-right{
        top: 10px !important;
        .vux-header-more{
            width: 30px;
            height: 30px;
            &:after{
                content: '';
                background: url('../../assets/images/Headerkefu-detail.png') no-repeat left center;
                background-size: 26px 26px;
                padding-left: 10px;
                color: #fff;
                width: 26px;
                height: 26px;
                display: block
            }
        }
    }
}
// 作品图片轮播
.vux-slider{
    width: 100%;
    height: 400px;
    margin-top: 50px;
    padding: 10px 0px;
    background: #eee;
    .vux-swiper-item{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #eee;
        /* .vux-swiper-desc{
            height: auto !important;
            white-space: normal !important;
            padding:0px 15px 0px !important;
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0, rgba(0, 0, 0, 0.7) 100%) !important;
            text-align: left !important;
            line-height: 22px;
            font-size: 14px !important;
        } */
        img{
            width: 100%;
        }
    }
    .vux-indicator{
        position: relative;
        bottom: -20px !important;
        a{
            &:first-child{
                .vux-icon-dot{
                    &::before{
                        content: '主图(1/1)'
                    }
                    &:after{
                        content: '>';
                        padding-left: 20px;
                    }
                }
            }
            &:nth-child(2){
                .vux-icon-dot{
                    position: absolute;
                    top: 1px;
                    left: 92px;
                    &::before{
                        content: '细节图(1/2)'
                    }
                }
            }
            &:nth-child(3){
                .vux-icon-dot{
                    position: absolute;
                    top: 1px;
                    left: 92px;
                    &::before{
                        content: '细节图(2/2)'
                    }
                }
            }
            .vux-icon-dot{
                width: 90px !important;
                height: 18px !important;
                font-style: normal !important;
                background: #eee !important;
                color: #333;
                font-size: 12px;
                z-index: 777;
                &.active{
                    z-index: 888 !important;
                    color: #000;
                }
            }

        }
    }
    .vux-indicator-center{
        right: 24% !important
    }
}
// 作品信息
.part1-info{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    div{
        box-sizing: border-box;
        height: 70px;
    }
    .part1-left{
        width: 60%;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-right: 1px solid #eee;
        padding-left: 15px;
        p{
            height: 18px;
            &:first-child{
                font-size: 14px;
            }
            &:nth-child(2){
                color: red;
                font-size: 16px;
                padding: 2px 0px 0px
            }
            &:last-child{
                font-size: 12px;
            }
        }
    }
    .part1-middle,.part1-right{
        width: 20%;
        border-right: 1px solid #eee;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        img{
            width: 30px;
        }
    }
}
// 装裱信息
.part2-mount{
    padding: 10px 0px 0px;
    >div{
        padding: 10px 10px 10px 15px;
        font-size: 14px;
        text-align: left;
        box-sizing: border-box;
        &:not(:last-child){
            border-bottom: 1px solid #eee;
        }
    }
    .part2-top{
        display: flex;
        justify-content: space-between;
        &::after{
            content: '>'
        }
        span{
            padding-left: 20px;
            color: #999
        }
    }
    .part2-middle{
        span{
            padding-right: 30px;
        }
    }
    .part2-bottom{
        span{
            background: url('../../assets/images/bz.png') no-repeat left center;
            background-size: 16px 16px;
            padding: 0px 20px;
        }
    }
}
// 艺术家简介
.part3-artist{
    background: url('../../assets/images/goods/ysjbg.png') no-repeat bottom center;
    background-size: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: 215px;
    padding: 35px 20px 20px 25px;
    overflow: hidden;
    .artist-left{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        img{
            width: 110px;
            height: 140px;
            max-height: 155px;
            box-shadow: -2px 2px 5px 2px #999;
            margin: 5px;
        }
    }
    .artist-right{
        text-align: left;
        padding-left: 20px;
        h4{
            font-size: 14px;
            padding: 20px 0px 5px
        }
        p{
            font-size: 12px;
            line-height: 20px;
            color: #333;
            img{
                height: 42px
            }
            a{
                color: #666;
                line-height: 40px;
                background: url('../../assets/images/goods/jt.png') no-repeat right center;
                background-size: 8px 8px;
                padding-right: 10px;
                text-decoration: none
            }
        }
    }
}
// 艺术品信息
.part4-artwork{
    padding: 20px 20px 20px 25px;
    background: #eee;
    display: flex;
    justify-content: space-between;
    .artwork-left{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        img{
            width: 110px;
            height: 140px;
            box-shadow: 2px 2px 5px 2px #999;
            margin: 5px;
            max-height: 155px;
        }
    }
    .artwork-right{
        text-align: left;
        width: 180px;
        h3{
            font-size: 14px;
            padding: 10px 0px;
            position: relative;
            margin-bottom: 8px;
            &::before{
                content: '';
                width: 20px;
                height: 2px;
                background: #000;
                position: absolute;
                left: 0px;
                bottom: 5px;
            }
        }
        p{
            line-height: 24px;
            font-size: 13px;
            color: #666
        }
    }
}
// 艺术评析
.part5-revien{
    text-align: left;
    padding: 0px 25px 15px;
    font-size: 12px;
    line-height: 26px;
    position: relative;
    &::before{
        content: '';
        width: 40px;
        height: 5px;
        background: #eee;
        margin-left: -20px;
        position: absolute;
        left: 50%;
        bottom: 0px;
    }
}
// 艺术品细节
.part6-detail{
    padding: 0px 25px;
    line-height: 24px;
    text-align: left;
    font-size: 14px;
    img{
        width: 100%;
    }
    p{
        padding: 8px 0px;
    }
}
// 其他图片展示
.part7-show{
    background: #eee;
    img{
        width: 100%
    }
}
// 评论
.weui-cells__title{
    text-align: left;
    color: #000 !important;
    font-size: 16px !important;
    color: #666
}
.weui-cells{
    text-align: left;
    padding-bottom: 30px;
    &::before{
        border: 0px !important
    }
    .vux-x-textarea{
        border: 1px solid #333;
        margin: 16px;
        textarea{
            font-size: 14px;
            color:#555
        }
    }
    .weui-btn{
        margin-left: 15px;
        border-radius: 1px;
        line-height: 26px;
        padding: 0px 20px 0px 30px;
        letter-spacing: 10px
    }
}
// 评论内容展示
.commentList{
    ul{
        li{
            margin: 10px 15px;
            border: 1px solid #ccc;
            padding: 5px 8px;
            text-align: left;
            display: block;
            border-radius: 2px;
            .first-part{
                font-size: 14px;
                height: 26px;
                span{
                    &:last-child{
                        font-size: 14px;
                        color: #666;
                        padding-left: 15px;
                    }
                }
            }
            .second-part{
                font-size: 12px;
                color: #555
            }
        }
    }
}
// 固定底部
.fixed-bottom{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    background: #fff;
    .bottom-left{
        width: 24%;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #666;
        position: relative;
        img{
            height: 24px;
        }
        .vux-badge-dot{
            position: absolute;
            top: 5px;
            right: 27px;
        }
    }
    .bottom-right{
        display: flex;
        justify-content: space-between;
        width: 76%;
        .weui-btn{
            width: 50% !important;
            &:first-child{
                border: 0px;
                font-size: 14px;
                color: #333
            }
            &:last-child{
                height: 50px;
                line-height: 50px;
                margin: 0px;
                border-radius: 0px;
            }
        }
    }
}
}
</style>
