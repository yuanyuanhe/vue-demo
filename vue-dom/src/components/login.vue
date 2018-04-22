<template>
  <div class="login">
<section class="formLogo">
 <h2>&#35;</h2>
</section>
<ul class="formarea">
 <li>
  <label class="lit">账号：</label>
  <input type="text" placeholder="手机号码" class="textbox username"/>
 </li>
 <li>
  <label class="lit">密码：</label>
  <input type="password" placeholder="登陆密码" class="textbox password"/>
 </li>
 <li class="liLink lg_liLink">
  <span><router-link to="/register">新用户注册</router-link></span>
 </li>
 <li>
  <input type="button" @click="login" value="立即登陆"/>
 </li>
</ul>
  </div>
</template>
<style>
@import "../assets/css/login.css"
</style>
<script>
export default {
    methods:{
        login(){
            var userVal = document.querySelector('.username');
            var passVal = document.querySelector('.password');
            console.log(userVal.value)
            var params = new URLSearchParams();
            params.append("userID", userVal.value);
            params.append("password", passVal.value);
            params.append("act", "login");
            this.$http({
                // withCredentials: true,
                url:'http://localhost:8003/user',
                method:'post',
                data:params
            }).then((res)=>{
                console.log(res.data);
                if(res.data==2){
                    // alert('登入成功');
                    this.setCookie("userName",userVal.value,7);
                    window.location='/user'
                }else if(res.data==1){
                    alert('网络错误');
                }else{
                    alert('帐号或密码错误');
                }
            })
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


