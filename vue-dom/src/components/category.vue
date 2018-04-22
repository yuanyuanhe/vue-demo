<template>
  <div class="category">
      <header>
 <h1>动态分类名称</h1>
</header>
<div style="height:1rem;"></div>
<!--category list-->
<!--模板不变，异步处理，链接传参数，静态写过于累赘-->
<aside class="class_tree">
 <ul>
   
  <!-- <li v-for="val in arr1" :key="val.pid"> -->
   <router-link tag="li"
   v-for="val in arr1" 
   :key="val.pid"
    :to="{name:'goodname',params:{uid:val.pid},query:{pid:val.pid}}"
     active-class="current_style"
     >
     <a>
      <img :src="val.src"/>
      <strong>{{val.goodname}}{{aaa}}</strong>
    </a>
   </router-link>
  <!-- </li> -->
  <!-- <li class="current_style">
   <a>
    <img src="upload/menu_bg_06.png"/>
    <strong>禽蛋肉类</strong>
   </a>
  </li>
  <li>
   <a>
    <img src="upload/menu_bg_10.png"/>
    <strong>水产火锅</strong>
   </a>
  </li>
  <li>
   <a>
    <img src="upload/menu_bg_14.png"/>
    <strong>熟食豆品</strong>
   </a>
  </li>
  <li>
   <a>
    <img src="upload/menu_bg_03.png"/>
    <strong>米面粮油</strong>
   </a>
  </li>
  <li>
   <a>
    <img src="upload/menu_bg_07.png"/>
    <strong>调料干货</strong>
   </a>
  </li>
  <li>
   <a>
    <img src="upload/menu_bg_11.png"/>
    <strong>餐厨用品</strong>
   </a>
  </li>
  <li>
   <a>
    <img src="upload/menu_bg_15.png"/>
    <strong>常购品</strong>
   </a>
  </li> -->
 </ul>
</aside>
<!--category content-->
<!-- <goodname></goodname> -->
<router-view></router-view>
<div style="height:1.2rem;"></div>
  </div>
</template>
<style>
@import "../assets/css/category.css"
</style>
<script>
import goodname from "./goodname"
export default {
  data(){
    return {
      arr1:this.arr1,
      aaa:this.a,
      bool:false
    }
  },
  components:{
    goodname
  },
  mounted(){
    var params = new URLSearchParams();
      this.$http({
          // withCredentials: true,
          url:'http://localhost:8003/goodslist',
          method:'post',
          data:params
      }).then((res)=>{
        // console.log(res)
        this.arr1=res.data
        // console.log(this.arr1)
        
      })
  },
  watch:{
    $route(route){
      console.log(this.$route.query.pid,111);
      var a = this.$route.query.pid+1
      
      console.log(this.a)
    }
  }
  
}
</script>

