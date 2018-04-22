<template>
  <div class="product">
      <!--header-->
<header>
 <a href="javascript:history.go(-1);" class="iconfont backIcon">&#60;</a>
 <h1>某类产品列表</h1>
 <a href="search.html" class="rt_searchIcon">&#63;</a>
</header>
<div style="height:1rem;"></div>
 <!--asc->1[升序asc_icon];des->0[降序des_icon]-->
 <ul class="sift_nav">
  <li><a class="des_icon">价格</a></li>
  <li><a class="des_icon">销量优先</a></li>
  <li>
   <a class="nav_li drop_icon">品牌筛选</a>
   <ul class="drop_list">
    <li><a>品牌名</a></li>
    <li><a>品牌名</a></li>
    <li><a>品牌名</a></li>
    <li><a>品牌名</a></li>
   </ul>
  </li>
 </ul>
<!--productList-->
<section class="productList">
  <goods></goods>
  <a class="more_btn">加载更多</a>
</section>
<!--floatCart-->
<div class="hoverCart">
 <a href="cart.html"></a>
</div>
  </div>
</template>
<style>
@import "../assets/css/productlist.css"
</style>
<script>
import goods from "./goods"
export default {
  components:{
      goods
  }
}
</script>


