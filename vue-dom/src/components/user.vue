<template>
  <div class="user">
    <header>
        <a href="javascript:history.go(-1);" class="iconfont backIcon">&#60;</a>
        <h1>个人中心</h1>
    </header>
    <div style="height:1rem;"></div>
        <div class="userInfor">
            <a class="userIcon"><img src="/src/assets/images/icon/apple-touch-icon-196x196-precomposed.png"/></a>
            <h2>{{userName}}</h2>
        </div>
        
    <ul class="userList">
        <li><a href="##" class="orderListIcon">我的订单</a></li>
        <li><a href="##" class="collectionIcon">常购清单</a></li>
        <li><a href="##" class="profileIcon">个人资料</a></li>
    </ul>

    <div class="logout" style="margin:.1rem 0">
        <router-link to="/login"><input type="button" value="注销" @click="logout"/></router-link>
    </div>
  </div>
</template>
<style>
@import "../assets/css/user.css"
</style>
<script>
export default {
    data(){
        return {
            userName:this.aa
        }
    },
    methods:{
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
        logout(){
            // console.log('111')
            this.setCookie("userName","xx",-1)
            this.setCookie("pid","xx",-1)
            location.reload();
        }
    },
    created(){
        
        this.aa = this.getCookie('userName')
        this.userName = this.aa
        console.log(22)
    }
}
</script>


