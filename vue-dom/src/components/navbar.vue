<template>
  <div class="navbar">
    <nav>
      <!-- <a href="index.html" class="homeIcon">首页</a> -->
      <router-link to="/home" class="homeIcon" active-class="active">首页</router-link>
      <!-- <a href="category.html" class="categoryIcon">分类</a> -->
      <router-link to="/category/goodname/01?pid=01" class="categoryIcon" active-class="active">分类</router-link>
      <!-- <a href="cart.html" class="cartIcon">购物车</a> -->
      <router-link to="/cart" class="cartIcon" active-class="active">购物车</router-link>
      <!-- <a href="user.html" class="userIcon">我的</a> -->
      <router-link :to="userName?'/user':'/login'"  class="userIcon" active-class="active">我的</router-link>
      
    </nav>
  </div>
</template>
<style>
@import "../assets/css/navbar.css"
</style>
<script>
export default {
  data(){
    return {
      userName:this.userName
    }
  },
  methods:{
    getCookie(_name){
      var cookie = document.cookie;
      console.log('111')
      var arr = cookie.split("; ")
      for(var i=0;i<arr.length;i++){
        var newArr = arr[i].split("=");
        if(newArr[0]==_name){
          return newArr[1];
        }
      }
    }
  },
  mounted(){
    this.userName=this.getCookie('userName')
    console.log(this.userName)
  },
  watch:{
    gettest(){
      this.userName=this.getCookie('userName')
    }
  }
}
</script>


