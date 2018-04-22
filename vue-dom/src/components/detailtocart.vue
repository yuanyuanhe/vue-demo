<template>
      <a  style="background:#64ab5b;color:white;text-shadow:none;" @click="toCart(),toSave(num)">加入购物车</a>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      num:0
    }
  },
  methods:{
    ...mapActions([  
      "toSave"
    ]),
    toCart(){
      console.log("0101010")
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
          var pid = this.$route.query.pid
          if(res.data[0].buyitem){
            // console.log(res.data[0].buyitem)
            console.log("guaguagua")
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

