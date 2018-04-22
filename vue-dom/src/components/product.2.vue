<template>
  <div class="product">
      <header>
 <a href="javascript:history.go(-1);" class="iconfont backIcon">&#60;</a>
 <h1>产品详情</h1>
 <a href="cart.html" class="topCart"><em>{{count}}</em></a>
</header>
<div style="height:1rem;"></div>
<div class="pro_bigImg">
 <img :src="obj.src"/>
</div>
<!--base information-->
<section class="pro_baseInfor">
 <h2>{{obj.name}}</h2>
 <p>
  <strong>{{obj.beforeprice}}</strong>
  <del>{{obj.nowprice}}</del>
 </p>
</section>
<!--product attr-->
<dl class="pro_attr">
 <dt>产品属性信息</dt>
 <dd>
  <ul>
   <li>
    <span>上市时间</span>
    <em>{{obj.publictime}}</em>
   </li>
   <li>
    <span>产品规格</span>
    <em>1斤装</em>
   </li>
   <li>
    <span>产品重量</span>
    <em>{{obj.weight}}kg</em>
   </li>
   <li>
    <span>包装方式</span>
    <em>散装</em>
   </li>
   <li>
    <span>保质期</span>
    <em>{{obj.usetime}}个月</em>
   </li>
   <li>
    <span>所属品牌</span>
    <em>{{obj.belongto}}</em>
   </li>
  </ul>
 </dd>
</dl>
<!--bottom nav-->
<div style="height:1rem;"></div>
<aside class="btmNav" style="z-index:1000;">
 <a style="background:#64ab5b;color:white;text-shadow:none;" @click="toCart()">加入购物车</a>
 <a style="background:#87a983;color:white;text-shadow:none;">加入常购单</a>
</aside>
  </div>
</template>
<style>
@import "../assets/css/product.css"

</style>
<script>
import cookie from "../assets/js/cookie.js"
export default {
  data(){
    return {
      obj:this.obj,
      pid:this.$route.query.pid,
      count:0,
      n:0
    }
  },
  mounted(){
    console.log(cookie.getCookie("userName"))
    
    var params = new URLSearchParams();
      this.$http({
          // withCredentials: true,
          url:'http://localhost:8003/gooddetail',
          method:'post',
          data:params
      }).then((res)=>{
        // console.log(res)
        
        console.log(this.$route.query.pid)
        res.data.forEach(val => {
          if(this.$route.query.pid==val.pid){
            // console.log(val)
            this.obj=val
          }
        });
        console.log(this.obj)

        var userName = this.getCookie("userName")
        if(!this.getCookie("pid")){
          var arr = []
          arr.push(this.pid)
          this.setCookie("pid",arr,700);
        }else{
          var str = this.getCookie("pid")
          // console.log(str.split(","))
          var arr2 = str.split(",")
          arr2.push(this.pid);
          this.setCookie("pid",arr2,700);
        }
        console.log(arr2.length)
        this.count=arr2.length
        console.log(arr2)
      })
  },
  methods:{
    toCart(){
      var userName = this.getCookie("userName")
      if(userName){
        var params = new URLSearchParams();
        params.append("userID",userName)
        params.append("act","getcart") 
        this.$http({
          url:'http://localhost:8003/user',
          method:'post',
          data:params
        }).then((res)=>{
          // console.log(res.data[0].buyitem)
          var obj = {}
          var pid = this.$route.query.pid
          if(res.data[0].buyitem){
            console.log(res.data[0].buyitem)
            obj = JSON.parse(res.data[0].buyitem)
            // console.log(obj)
            // console.log(this.$route.query.pid)
            
            if(obj[pid]){
              for(var key in obj){
                if(key==pid){
                  console.log(obj[key])
                  obj[key]++
                  console.log(obj[key])
                }
              }
            }else{
              obj[pid]=1;
            }
          }else{
            obj[pid]=1
          }
          console.log(obj)
          var str = JSON.stringify(obj)
          console.log(str)
          var params = new URLSearchParams();
          params.append("userID",userName)
          params.append("pid",str)
          params.append("act","cart")
          this.$http({
            url:'http://localhost:8003/user',
            method:'post',
            data:params
          }).then((res)=>{
            console.log(res.data)
          })
        })
      }
    },
    setCookie(_name,_val,expires){
        var d = new Date();
        d.setDate(d.getDate()+expires);
        document.cookie = _name+"="+_val+";expires="+d;
    },
    getCookie(_name){
        var cookie = document.cookie;
        var arr = cookie.split("; ")
        for(var i=0;i<arr.length;i++){
            var newArr = arr[i].split("=");
            if(newArr[0]==_name){
                return newArr[1];
            }
        }
    }

  }
}
</script>
