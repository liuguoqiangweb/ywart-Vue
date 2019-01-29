<template>
    <!-- 底部导航 -->
    <tabbar style="position:fixed">
        <tabbar-item v-for='(item,index) in tabbarList' :key='index' :link="item.link">
            <img slot="icon" :src="item.img">
            <span slot="label">{{item.title}}</span>
        </tabbar-item>
    </tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      tabbarList: [
        {nid: 1, title: '首页', img: require('../../assets/images/tabbar-01.png'), link: '/'},
        {nid: 2, title: '分类', img: require('../../assets/images/tabbar-02.png'), link: '/buy'},
        {nid: 3, title: '视野', img: require('../../assets/images/tabbar-03.png'), link: '/ArtisticVision'},
        {nid: 4, title: '购物车', img: require('../../assets/images/tabbar-04.png'), link: '/cart'},
        {nid: 5, title: '我', img: require('../../assets/images/tabbar-05.png'), link: '/login'}
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.weui-tabbar {
    a {
        text-decoration: none;
    }
}
</style>
