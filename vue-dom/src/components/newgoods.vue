<template>
  <div class="goods">
      <ul>
        <li v-for="val in arr1" :key="val.pid">
          <router-link :to="{name:'product',query:{pid:val.pid}}" class="goodsPic">
          <img :src="val.src"/>
          </router-link>
          <div class="goodsInfor">
          <h2>
            <router-link to="/product">{{val.name}}</router-link>
          </h2>
          <p>
            <del>{{val.beforeprice}}</del>
          </p>
          <p>
            <strong class="price">{{val.nowprice}}</strong>
          </p>
          <a class="addToCart" @click="toCart(val.pid),toSave(num)">&#126;</a>
          </div>
        </li>
        <!-- <li>
          <a href="product.html" class="goodsPic">
          <img src="../../upload/goods002.jpg"/>
          </a>
          <div class="goodsInfor">
          <h2>
            <a href="product.html">红萝卜3斤装</a>
          </h2>
          <p>
            <del>12.90</del>
          </p>
          <p>
            <strong class="price">8.90</strong>
          </p>
          <a class="addToCart">&#126;</a>
          </div>
        </li>
        <li>
          <a href="product.html" class="goodsPic">
          <img src="../../upload/goods003.jpg"/>
          </a>
          <div class="goodsInfor">
          <h2>
            <a href="product.html">西红柿5斤装</a>
          </h2>
          <p>
            <del>9.90</del>
          </p>
          <p>
            <strong class="price">6.90</strong>
          </p>
          <a class="addToCart">&#126;</a>
          </div>
        </li> -->
        </ul>
      
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      arr1:this.arr1,
      num:0
    }
  },
  mounted(){
    var params = new URLSearchParams();
      this.$http({
          // withCredentials: true,
          url:'http://localhost:8003/newgoods',
          method:'post',
          data:params
      }).then((res)=>{
        console.log(res)
        this.arr1=res.data
        console.log(this.arr1)
      })
  },
  methods:{
    ...mapActions([  
      "toSave"
    ]),
    toCart(pid){
      var userName = this.getCookie("userName")
      if(userName){
        this.num=1
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
