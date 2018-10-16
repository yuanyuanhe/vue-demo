<template>
  <div id="cart">
    <p class="filterdad"><router-link to="/login" tag="h2" class="filter">请登入</router-link></p>
      <header>
 <a href="javascript:history.go(-1);" class="iconfont backIcon">&#60;</a>
 <h1>购物车</h1>
</header>
<div style="height:1rem;"></div>
<dl class="cart">
 <dt>
  <label><input type="checkbox" class="checkall" @click="checkAll"/>全选</label>
 </dt>

 <dd v-for="val in list" :key="val.pid">
  <input type="checkbox" :checked="val.checked"  class="checkbox" @click="check(val.pid)"/>
  <!-- <a href="##" class="goodsPic"><img :src="val.src"/></a> -->
  <router-link :to="{name:'product',query:{pid:val.pid}}" class="goodsPic"><img :src="val.src"/></router-link>
  <div class="goodsInfor">
   <h2>
    <a href="##">{{val.name}}</a>
    <span>{{val.count}}</span>
   </h2>
   <div class="priceArea">
    <strong>{{val.nowprice}}</strong>
    <del>{{val.beforeprice}}</del>
   </div>
   <div class="numberWidget" id="add" style="display:block">
    <input type="button" value="-" class="minus" @click="minus(val.pid)"/>
    <input type="text" :value="val.count" disabled class="number"/>
    <input type="button" value="+" class="plus" @click="add(val.pid)"/>
   </div>
  </div>
  <a class="delBtn"  id="del" style="display:block" @click="del(val.pid)">删除</a>
 </dd>

</dl>
<div id="sum">
  <span>总价：</span>
  <strong>￥{{total | tofix(2)}}</strong>
</div>
<input type="button" value="去结算" class="btn">
  </div>
</template>
<style>
@import "../assets/css/cart.css"
</style>
<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      list:[],
      bl:false,
      arr:[],
      arr2:[],
      arr4:[],
      sum:0
    }
  },

  mounted(){

    var username = this.getCookie('userName')
    console.log(username)
    if(username){

      document.querySelector(".filterdad").style.display="none"
      var params = new URLSearchParams();
      params.append("act","getcart")
      params.append("userID",username)
      this.$http({
          url:'http://localhost:8003/user',
          method:'post',
          data:params
      }).then((res)=>{
        var obj = JSON.parse(res.data[0].buyitem)
        console.log(obj)
        for(var key in obj){
          this.sum+=obj[key]
        }
        this.toTip(this.sum)
        console.log(this.sum)
        var params = new URLSearchParams();
        this.$http({
          url:'http://localhost:8003/gooddetail',
          method:'post',
          data:params
        }).then((res)=>{
            // console.log(this.list)
            res.data.forEach(val => {
              for(var key in obj){
                if(val.pid==key){
                  // console.log(val);
                  val["count"]=obj[key]
                  this.list.push(val)
                }
              }
            });
            var savecheck = this.getCookie('savecheck')
            console.log('111')

            // if(savecheck){
            //   //{1,2,3,4}
            //   console.log(savecheck)
            //   var arr = savecheck.split(',')
            //   console.log(arr)
            //   var arr2 = []
            //   this.list.forEach((val1)=>{
            //     arr.forEach(val2=>{
            //       if(val1.pid==val2){
            //         console.log(val1.pid)
            //         val1["checked"]=true
            //         val1["bulala"]="bulala"
            //         console.log(val1)
            //       }
            //     })
            //   })
            //   var str = localStorage.getItem("totalprice")
              // console.log(arr5)
            // }
        })
      })
    }else{
      // alert("请登入")
    }

  },
  methods:{
    ...mapActions([
      "toTip"
    ]),
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
    },
    del(pid){
      this.list.forEach((val,key)=>{
        if(val.pid==pid){
          this.list.splice(key,1)
        }
      })
      this.arr4.forEach((val,key)=>{
        if(val.pid==pid){
          this.arr4.splice(key,1)
        }
      })
      var userName = this.getCookie('userName')
      var params = new URLSearchParams();
      params.append("act","getcart")
      params.append("userID",userName)
      this.$http({
          url:'http://localhost:8003/user',
          method:'post',
          data:params
      }).then((res)=>{
        console.log(res)
        var obj = JSON.parse(res.data[0].buyitem)
        console.log(obj)
        delete obj[pid]
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
    },
    add(pid){
      this.list.forEach((val,key)=>{
        if(val.pid==pid){
          val.count++
        }
        var userName = this.getCookie('userName')
        var params = new URLSearchParams();
        params.append("act","getcart")
        params.append("userID",userName)
        this.$http({
            url:'http://localhost:8003/user',
            method:'post',
            data:params
        }).then((res)=>{
          // console.log(res)
          var obj = JSON.parse(res.data[0].buyitem)
          // console.log(obj)
          obj[pid]++
          // console.log(obj)
          var str = JSON.stringify(obj)
          // console.log(str)
          var params = new URLSearchParams();
          params.append("userID",userName)
          params.append("pid",str)
          params.append("act","cart")
          this.$http({
            url:'http://localhost:8003/user',
            method:'post',
            data:params
          }).then((res)=>{
            // console.log(res.data)
          })
        })

      })
    },
    minus(pid){
      this.list.forEach((val,key)=>{
        if(val.pid==pid){
          if(val.count==1){
            val.count==1
          }else{
          val.count--
          }
        }
        var userName = this.getCookie('userName')
        var params = new URLSearchParams();
        params.append("act","getcart")
        params.append("userID",userName)
        this.$http({
            url:'http://localhost:8003/user',
            method:'post',
            data:params
        }).then((res)=>{
          console.log(res)
          var obj = JSON.parse(res.data[0].buyitem)
          console.log(obj)
          if(obj[pid]==1){
            obj[pid]==1
          }else{
          obj[pid]--
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
      })
    },
    check(pid){
      console.log(pid)
      // this.arr.push(pid)


      var check = document.querySelectorAll(".checkbox")
      console.log(check)
      var arr1 = []
      check.forEach((val,key)=>{
        if(val.checked==true){
          console.log(this.list[key])
          arr1.push(this.list[key])
        }
      })
      var arr3 = []
      arr1.forEach(val=>{
        arr3.push(val.pid)
      })
      this.arr2=arr1
      console.log(arr3)
      this.setCookie("savecheck",arr3)
      this.list.forEach(val=>{
        if(val.pid==pid){
          console.log(!val.checked)
          val.checked=!val.checked
          if(val.checked==true){
            this.arr4.push(val)
          }
        }
      })
      this.arr4.forEach((val,key)=>{
        if(val.checked!=true){
          this.arr4.splice(key,1)
        }
      })
      // var arr5=[]
      // this.arr4.forEach((val,key)=>{
      //   if(val.checked==false){
      //     this.arr4.splice(key,1)
      //   }
      //   arr5.push(val.pid)
      // })
      // console.log(arr5)
      // var str = arr5.join(',')
      // console.log(str)
      // localStorage.setItem("bulala",str)
      // localStorage.getItem("bulala")
    },
    checkAll(){
      var checkAll = document.querySelector('.checkall')
      if(checkAll.checked==true){
        this.list.forEach(val=>{
          val["checked"]=true
          console.log(val.checked)
        })
        this.list.push(this.list[this.list.length-1])
        this.list.splice(this.list.length-1,1)
        this.arr4=[]
        this.list.forEach(val=>{
              this.arr4.push(val)
        })
      }else{
        this.list.forEach(val=>{
          val["checked"]=false
          console.log(val.checked)
        })
        this.list.push(this.list[this.list.length-1])
        this.list.splice(this.list.length-1,1)
        this.arr4.forEach((val,key)=>{
          if(val.checked!=true){
            this.arr4=[];
          }
        })
      }
      console.log(checkAll.checked)


      console.log(this.arr4)
    }
  },
  computed:{
    total(pid){
      console.log(this.list)
      var str = ""
      var total = 0;
      this.arr4.forEach((val,key)=>{
          var num = val.count*val.nowprice
          total+=num;
          str+=val.pid
      })
      // var aa = localStorage.getItem("totalprice",str)
      // localStorage.setItem("totalprice",aa+str+",")
      // console.log(localStorage.getItem("totalprice"))


      // console.log(total)
      return total
    }
  },
  filters:{
    tofix(data,digit){
      digit=digit||2;
      return data.toFixed(digit);
    }
  }
}
</script>

