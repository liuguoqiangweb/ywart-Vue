<template>
    <!-- 栏目导航 -->
    <div class="app-nav">
        <ul>
            <li><a>精选</a></li>
            <li><a>原创艺术</a></li>
            <li><a>造艺</a></li>
            <li><a>藏艺术</a></li>
        </ul>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.app-nav{
    position: fixed;
    top: 40px;
    left: 0px;
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, .2);
    z-index: 888;
    ul{
        display: flex;
        justify-content: center;
        li{
            padding: 0px 18px;
            list-style: none;
            line-height: 40px;
            font-size: 12px;
            &:nth-child(2){
                font-size: 14px;
                font-weight: bold
            }
            a{
                color: #fff
            }
        }
    }
}
</style>
