<template>
  <ul class="category_cont">
 <li v-for="val in arr1" :key="val[0]">
    
   <router-link tag="div" :to="{name:'product',query:{pid:val.pid}}">
    <img :src="val.src" alt="" class="toproduct">
   </router-link>
   <a href="##">
     <span>{{val.name}}</span>
     <span style="color:green">￥{{val.nowprice}}</span>
     <img src="/src/assets/upload/cart.png" @click="toCart(val.pid),toSave(1)">
   </a>
 </li>
 <!-- <li>
  <a href="product_list.html">肉质根类菜</a>
 </li>
 <li>
  <a href="product_list.html">块根类菜</a>
 </li>
 <li>
  <a href="product_list.html">地下茎类</a>
 </li>
 <li>
  <a href="product_list.html">普通叶菜类</a>
 </li>
 <li>
  <a href="product_list.html">结球叶莱类</a>
 </li>
 <li>
  <a href="product_list.html">辛番叶菜类</a>
 </li>
 <li>
  <a href="product_list.html">鳞茎菜类</a>
 </li>
 <li>
  <a href="product_list.html">茄果类</a>
 </li> -->
</ul>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      arr1:this.arr1,
      arr2:this.arr2
    }
  },
  mounted(){
      var params = new URLSearchParams();
      this.$http({
          // withCredentials: true,
          url:'http://localhost:8003/goodslist',
          method:'post',
          data:params
      }).then((res)=>{
        var arr = [];
        res.data.map(function(val){
            arr.push(val.list)
        })
        this.arr2 = arr
        if(!this.$route.query.pid){
            this.$route.query.pid=0
        }
        var arr1=arr[Number(this.$route.query.pid-1)]
        console.log(this.$route.query.pid)
        var newArr = arr1.split(',')
        var newArr1 = newArr.map(function(val){
            return val.split(':')
        })
        
        var arr3 = newArr1.map((val)=>{
          return val[0]
        })
        this.getData(arr3)
      })
  },
  watch:{
    $route(route){//路由监听     
      var arr1=this.arr2[Number(this.$route.query.pid-1)]
        // console.log(arr1.split(','))
        var newArr = arr1.split(',')
        var newArr1 = newArr.map(function(val){
            // console.log(val)
            return val.split(':')
        })

        console.log(newArr1)
        var arr5 = [];
        newArr1.forEach(val => {
          arr5.push(val[0])
        });
        console.log(arr5)
        this.getData(arr5)
    }
  },
  methods:{
    ...mapActions([  
      "toSave"
    ]),
    getData(arr){
      var params = new URLSearchParams();
        this.$http({
            // withCredentials: true,
            url:'http://localhost:8003/gooddetail',
            method:'post',
            data:params
        }).then((res)=>{
          // console.log(res.data)
          var arr4 = [];
          res.data.map((val)=>{
            for(var n in arr){
              // console.log(arr3[n])
              if(val.pid==arr[n]){
                arr4.push(val)
              }
            }
          })
          console.log(arr4)
          this.arr1=arr4
        })
    },
    toCart(pid){
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
