<template>
    <div class="app-newsInfo">
        <!-- 头部 -->
        <x-header :left-options="{backText: ''}">{{this.details.title}}</x-header>
        <article>
            <h3>{{this.details.title}}</h3>
            <div v-html="this.details.detail">
            </div>
        </article>
    </div>
</template>
<script>
import {XHeader} from 'vux'
export default {
  components: {
    XHeader
  },
  created () {
    this.getNewsInfo()
  },
  data () {
    return {
      nid: this.$route.params.id,
      details: {}
    }
  },
  methods: {
    getNewsInfo () {
      var url = 'http://127.0.0.1:3008/news/newsInfo?nid=' + this.nid
      this.axios.get(url).then((result) => {
        this.details = result.data
        console.log(result)
      })
    }
  }
}
</script>
<style lang="less">
.app-newsInfo{
    padding: 50px 20px 30px;
    overflow: hidden;
    background: #eee;
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
    article{
        padding-top: 30px;
        h3{
            text-align: center;
            font-size: 18px;
            line-height: 36px;
            border-bottom: 1px solid #ccc;
            margin-bottom: 30px;
        }
        div{
            text-align: left;
            font-size: 14px;
            line-height: 24px;
            img{
                width: 100%;
                padding: 15px 0px 0px;
            }
            p{
                &:nth-child(3),
                &:nth-child(4),
                &:nth-child(5),
                &:nth-child(6),
                &:nth-child(7),
                &:nth-child(8),
                &:nth-child(9),
                &:last-child{
                    text-align: center
                }
            }
        }
    }
}
</style>
