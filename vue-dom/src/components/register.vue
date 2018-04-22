<template>
  <div class="register">
      <header>
 <a href="javascript:history.go(-1);" class="iconfont backIcon">&#60;</a>
 <h1>注册</h1>
</header>
<div style="height:1rem;"></div>
<!-- <mark class="formMark">这里放电话做什么，请联系400-8200-5385</mark> -->
<ul class="formarea">
 <li>
  <label class="lit">账号：</label>
  <input type="tel" placeholder="手机号码" class="textbox username"/>
 </li>
 <li>
  <label class="lit">密码：</label>
  <input type="password" placeholder="设置密码" class="textbox password"/>
 </li>
 
 <li class="liLink" style="display:flex;justify-content:space-between">
  <div>
  <a href="article.html" class="fl">已阅读《用户协议》</a>
  <input type="checkbox" style="vertical-align:middle" class="checkbox">
  </div>
  <!-- <a href="login.html" class="fr">已有账号，登陆</a> -->
  <router-link to="/login">已有账号，登陆</router-link>
 </li>
 <li>
  <input type="button" value="立即注册" @click="register"/>
 </li>
</ul>
<div style="height:1.2rem;"></div>
  </div>
</template>
<style>
@import "../assets/css/login.css"
</style>
<script>
export default {
  methods:{
      register(){
        var oCheckbox = document.querySelector('.checkbox');
        if(oCheckbox.checked){
        var userVal = document.querySelector('.username');
        var passVal = document.querySelector('.password');
        console.log(userVal.value)
        var params = new URLSearchParams();
        params.append("userID", userVal.value);
        params.append("password", passVal.value);
        params.append("act", "reg");
        this.$http({
            // withCredentials: true,
            url:'http://localhost:8003/user',
            method:'post',
            data:params
        }).then((res)=>{
            console.log(res);
            if(!(userVal.value&&passVal.value)){
                alert("帐号或密码不能为空")
            }else{
                if(res.data==2){
                    // var oCheckbox = document.querySelector('.checkbox');
                    // if(oCheckbox.checked){
                            alert("注册成功")
                            window.location="/login?username="+userVal                               
                    // }else{
                    //     alert("请阅读用户协议")
                    // }
                    
                }else if(res.data==1){
                    alert('帐号已存在');
                }else{
                    alert('网络错误');
                }
            }
            
            
        })
        }else{
            alert("请阅读用户协议")
        }
    }
  }
}
</script>
