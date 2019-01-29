<template>
    <div class="app-header">
        <!-- 头部左边：客服 -->
        <div class="header-left">
            <img src="../../assets/images/headerKefu.png" alt="">
        </div>
        <!-- 头部中间：搜索 -->
        <div class="header-search">
            <search></search>
        </div>
        <!-- 头部右边：咨询 -->
        <div class="header-right">
            <img src="../../assets/images/znx.png" alt="">
        </div>
    </div>
</template>
<script>
import {Search} from 'vux'
export default {
  components: {
    Search
  }
}
</script>
<style lang="less">
.app-header{
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, .2);
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    margin: 0px;
    position: fixed;
    top: 0px;
    z-index: 888;
    .header-left,.header-right{
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 70%
        }
    }
    .header-search{
        width: 80%;
        overflow: hidden;
        .vux-search-fixed{
            top: 8px;
        }
        .vux-search-box{
            height: 40px;
            .weui-search-bar{
                height: 41px;
                background:none;
                overflow: hidden;
                .weui-search-bar__form{
                    height: 30px;
                    line-height: 30px;
                    margin-top: -3px;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
