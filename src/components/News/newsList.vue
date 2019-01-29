<template>
    <div class="app-article">
        <!-- 头部 -->
        <x-header :left-options="{backText: ''}">艺术视野</x-header>
        <!-- 栏目 -->
        <div class="classList">
            <a href="javascript:;" v-for='(item,index) in classList' :key="index" :data-name='item' @click='jumpNewsList' :class='item===className?"active":""'>{{item}}</a>
        </div>
        <h4 class="topicName">NEW</h4>
        <!-- 文章列表 -->
        <scroller lock-x height='-46px' @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="20">
            <div class="articleList">
                <ul v-for="(item,index) in articleList" :key='index'>
                    <li :class="item.is_special===1?'width100':'width48'"><img :src="item.img" alt=""></li>
                    <li :class="item.is_special===1?'width100':'width48'"><p>{{item.title}}</p>
                    <p><span v-for="(tmp,index) in item.label.split(',')" :key="index">{{'#'+tmp}}</span></p>
                    <p>阅读量：{{item.tread}}</p></li>
                </ul>
                <load-more tip="loading"></load-more>
            </div>
        </scroller>
        <!-- 底部tabbar -->
        <app-tabbar></app-tabbar>
    </div>
</template>
<script>
import {XHeader, Scroller, LoadMore} from 'vux'
import appTabbar from '../public/tabbar'
export default {
  components: {
    XHeader,
    appTabbar,
    Scroller,
    LoadMore
  },
  data () {
    return {
      className: this.$route.query.tag,
      articleList: [],
      classList: ['专题推荐', '艺术时尚', '艺术生活', '艺术资讯', '艺网动态'],
      pno: 0, // 当前页码
      pageSize: 5, // 页大小
      pageCount: 1, // 总页数
      onFetching: false
    }
  },
  created () {
    this.getArtisticVision(this.articleList)
    this.$nxtTick(() => {
      this.$refs.scroller.reset()
    })
  },
  methods: {
    //  请求文章
    getArtisticVision (datamodel) {
      this.pno++
      // 创建变量保存是否有当前页条件
      //   var hasMore = this.pno <= this.pageCount
      // true 有数据  false 无数据
      // 如果没有页数，停止函数执行
      //   if (!hasMore) { return }
      var url = 'http://127.0.0.1:3008/news/newsClass'
      var params = {
        className: this.className,
        pno: this.pno,
        pageSize: this.pageSize
      }
      this.axios.get(url, {params}).then((result) => {
        for (var i = 0; i < result.data.data.length; i++) {
          datamodel.push(result.data.data[i])
        }
      })
    },
    // 跳转到文章列表页
    jumpNewsList (e) {
      var className = e.target.dataset.name
      this.$router.push('/ArtisticVision?tag=' + className)
      this.className = className
      this.articleList = []
      this.getArtisticVision(this.articleList)
    },
    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
      } else {
        this.pno++
        this.onFetching = true
        setTimeout(() => {
          this.getArtisticVision(this.articleList)

          this.onFetching = false
        }, 1000)
      }
    }
  }
}
</script>
<style lang="less">
.app-article{
    padding: 50px 10px;
    // 头部
    .vux-header{
        background: #fff !important;
        position: fixed !important;
        z-index: 222;
        width: 100%;
        top: 0px;
        left: 0px;
        border-bottom: 1px solid #f8f8f8;
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
    }
    // 栏目
    .classList{
        width: 100%;
        box-sizing: border-box;
        padding: 0px 10px;
        height: 50px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        left: 0px;
        top: 46px;
        background: #fff;
        a{
            color: #333;
            text-decoration: none;
            font-size: 14px;
            &.active{
                font-weight: bold;
                line-height: 50px !important;
            }
        }
    }
    .topicName{
        margin-top: 40px;
        height: 50px;
        line-height: 50px;
    }
    // 文章列表
    .articleList{
        ul{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-bottom: 30px;
            .width48{
                width: 48%;
                p{
                    &:first-child{
                        height: 60px;
                        overflow: hidden;
                    }
                }
            }
            .width100{
                width: 100%;
                p{
                    &:first-child{
                        line-height: 36px;
                    }
                }
            }
            li{
                &:last-child{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
                img{
                    width: 100%;
                    border-radius: 3px;
                }
                p{
                    font-size: 12px;
                    text-align: left;
                    color: #666;
                    &:first-child{
                        width: 100%;
                        font-size: 14px;
                        color: #333;
                        font-weight: 600;
                    }
                    span{
                        display: inline-block;
                        padding: 1px 5px;
                        background: #eee;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
