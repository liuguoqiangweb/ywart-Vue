<template>
  <div id="app">
    <!-- 页面模板 -->
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
*{
    margin: 0px;
    padding: 0px;
}
// 分隔行
.divIder{
    height: 8px;
    width: 100%;
    background: #eee;
}
// 分隔行
.whiteIder{
    height: 20px;
    width: 100%;
    background: #fff;
}
// 模块公共标题
.part-title{
    background: #fff;
    padding: 10px 0px;
    h2{
        font-size:16px;
    }
    p{
        font-size: 12px;
        color: #999;
        line-height: 26px;
    }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //清除标签默认样式;
.label(){
    html {margin: 0; padding: 0; border: 0;_background-image:url(n1othing.txt)}
    body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, code, del, dfn, em, img, q, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, caption, tbody, tfoot, thead, article, aside, dialog, figure, footer, header, hgroup, nav, section { margin: 0; padding: 0; border: 0; font-size: 100%; vertical-align: baseline; }
    ol, ul, li { list-style: none; }
    body {line-height: 1.5; background: white; font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif; font-size: 12px; color: #333;}
    table,tr, th, td { border-collapse: collapse; margin: 0; padding: 0;  font-size: 100%; vertical-align: baseline;}
    caption, th, td { text-align: left; font-weight: normal; float: none !important; }
    table, th, td, select, img, input,object{ vertical-align: middle;}
    :focus { outline: 0;}
    input,select{margin:0;}
    a { color: #005EA7; text-decoration: none; }
    a:hover {color: #C7000B; text-decoration: none; }
    p,a,td{word-wrap:break-word;word-break:break-all;}
    img { border: none;vertical-align:top; }
    textarea{ resize:none;border:1px solid #ccc;}
    textarea:hover{border-color:#ccc;}
    input[type="text"],input[type="button"]{-webkit-appearance: none;border-radius: 0;font-family:'Microsoft Yahei','黑体', Arial, Helvetica, sans-serif;}
    input[type="text"]{border:solid 1px #ccc; border-radius:0;}
    dfn {font-style: normal;font-family: Arial;}
}
li{list-style: none} //清除li标签圆点
.fl(){ float:left; } //左浮动;
.fr(){ float:right;} //右浮动;
//设置方向浮动;
.float( @dire : left ){
    float:@dire;
}
//清除浮动;
.clear(){
    *zoom:1;
    &:after{
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
        overflow: hidden;
    }
}
//清右浮动;
.clr(){
    clear: both;
    display: block;
    font-size: 0;
    height: 0;
    line-height: 0;
    overflow: hidden;
}

/**
 * 循环初始字体大小:
 *     @end   : 结束字体大小(数字),必须输;
 *     @begin : 开始字体大小(数字),可以省略;
 *     @un    : 字体单位(字符串),可以省略;
 *     例子   : .base-fonts(28);
 */
.base-fonts( @end,@begin:12,@un:px) when ( @begin =< @end ) {
    .f-@{begin}{
        font-size:unit(@begin, @un);
    }
    .base-fonts( @end,( @begin+2 ),@un );
}

/**
 * 循环初始默认样式:
 *     @name  : 样式前缀名,必须输;
 *    @style : 设置样式,必须输;
 *    @end   : 结束样式,必须输;
 *    @begin : 开始样式,可以省略;
 *    @mult  : 循环累加倍数,可以省略;
 *     @un    : 字体单位(字符串),可以省略;
 *     例子   : .base-styles(mb,margin-bottom,30,5);
 */
.base-styles(@name:name,@style,@end,@begin:5,@mult:5,@un:px ) when ( @begin =< @end ) {
    .@{name}-@{begin}{
        @{style}:unit(@begin, @un);
    }
    .base-styles( @name,@style,@end,(@begin+@mult),@mult,@un );
}

//一行显示。。。。
.ellipsis(){
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
}

//设置字体;
.f(@size:12,@un:px){font-size:unit(@size, @un); }
//设置字体;
.fa(@family:'Microsoft Yahei'){ font-family:@family,'宋体','黑体';}
.tal(){ text-align: left; }
.tar(){ text-align: right; }
.tac(){ text-align: center; }
.text-align( @dir:left ){text-align: @dir;}
.over(){overflow:hidden; }
.ofv(){overflow:visible !important;}
.hide(){ display:none;  }
.block(){ display:block; }
.abs(){ position: absolute; }
.rel(){ position: relative; }
.cur(){ cursor: pointer; }
.def(){ cursor:default;}

//css3过渡;
.tran(@name:all,@time:2s){
    -webkit-transition : @name @time;  /* Safari 和 Chrome */
       -moz-transition : @name @time;  /* Firefox 4 */
        -ms-transition : @name @time;  /* IE */
         -o-transition : @name @time;  /* Opera */
            transition : @name @time;
}

//css3;
.css3( @style,@frames ){
    -webkit-@{style} : @frames;  /* Safari 和 Chrome */
       -moz-@{style} : @frames;  /* Firefox 4 */
        -ms-@{style} : @frames;  /* IE */
         -o-@{style} : @frames;  /* Opera */
            @{style} : @frames;
}

//透明;
.opa(@num:0.8){
    opacity : @num;
    filter  : ~'alpha(opacity='@num*100~')';
}

//css3圆角;
.border-radius(@radius: 5px) {
  -webkit-border-radius : @radius;  /* Safari 和 Chrome */
     -moz-border-radius : @radius;  /* Firefox 4 */
      -ms-border-radius : @radius;  /* IE */
       -o-border-radius : @radius;  /* Opera */
          border-radius : @radius;
}

/**
 * css3动画,只能写在调用页面,配合.css3( @style,@frames )使用;
 * 例子 :
 * .keyframes(starts,{
        0% {transform:rotate(0deg)}
        100%{transform:rotate(360deg)}
    });
    .className{.css3(animation,starts 8s linear infinite .3s );}
 */
.keyframes(@name, @frames) {
    @-webkit-keyframes @name { @frames(); }  /* Safari 和 Chrome */
       @-moz-keyframes @name { @frames(); }  /* Firefox 4 */
        @-ms-keyframes @name { @frames(); }  /* IE */
         @-o-keyframes @name { @frames(); }  /* Opera */
            @keyframes @name { @frames(); }
}

//打包默认样式;
.base(@content:950,@unit:px,@orange:#f60,@yellow:#fff000,@blue:#5fb3d2,@red:#ff546a,@gray:#ccc,@disabled:#ccc,@bor_color:#ccc){
    .label();
    /* 默认浮动 */
    .fl{
        .fl();
    }
    .fr{
        .fr();
    }
    .clear{
        .clear();
    }
    /* 显示隐藏 */
    .hide {
        .hide();
    }
    .show {
        .block();
    }
    /* 文本方向 */
    .tal{
        .tal();
    }
    .tar{
      .tar();
    }
    .tac{
      .tac();
    }
    /* 截取 */
    .over{
      .over();
    }
    .ofv{
      .ofv();
    }
    /* 定位 */
    .abs{
      .abs();
    }
    .rel{
        .rel();
    }
    /* 鼠标手势 */
    .cursor{
        .cur();
    }
    .def{
        .def();
    }
    /* 。。。。 */
    .ellipsis{
        .ellipsis();
    }
    /* 强制折行 */
    .break-word{
        .break-word();
    }
    /* 默认颜色 */
    .colr-red{color: @red;}
    .colr-blue{color: @blue;}
    .colr-gray{color: @gray;}
    .colr-yellow{color: @yellow;}
    .colr-org{color: @orange;}
    /* 默认背景颜色 */
    .bg-red{ background-color: @red;}
    .bg-blue{background-color: @blue;}
    .bg-gray{background-color: @gray;}
    .bg-yellow{background-color: @yellow;}
    .bg-org{background-color: @orange;}
    /* 默认置灰 */
    .disabled{ background-color:@disabled; }
    /* 默认字体 */
    .base-fonts(32,@un:@unit);
    /* margin  padding */
    .mt0 { margin-top: 0 !important; }
    .base-styles(mt,margin-top,30,5,@un:@unit);
    .mb0 { margin-bottom: 0 !important; }
    .base-styles(mb,margin-bottom,30,5,@un:@unit);
    .ml0 { margin-left: 0 !important; }
    .base-styles(ml,margin-left,30,5,@un:@unit);
    .mr0 { margin-right: 0 !important; }
    .base-styles(mr,margin-right,30,5,@un:@unit);
    /* 高度 */
    .base-styles(blk,height,50,5,@un:@unit);
    /* 边框 */
    .bor_t{ border-top:solid 1px @bor_color;}
    .bor_l{ border-left:solid 1px @bor_color;}
    .bor_r{ border-right:solid 1px @bor_color;}
    .bor_b{ border-bottom:solid 1px @bor_color;}
    .bor_t0{ border-top:none!important;}
    .bor_l0{ border-left:none!important;}
    .bor_r0{ border-right:none!important;}
    .bor_b0{ border-bottom:none!important;}
    .bor_das{ border:1px dashed @bor_color;}
    .bor_dot{ border:1px dotted @bor_color;}
    .border{ border:1px solid @bor_color;}
    /* box */
    .content{ width: unit(@content,@unit); margin:0 auto; }
  }
}
</style>
