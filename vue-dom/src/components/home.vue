<template>
  <div class="home">
      <header>
      <!-- {{buycart}} -->
        
      <a href="##" class="location">西安市</a>
      <h1 class="logoIcon" style="font-size:.85rem;">&#35;</h1>
      </header>
      <div style="height:1rem;"></div>
      <!--slide-->
      <!-- <div id="slide">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
          <a href="#">
            <img src="../assets/upload/slide001.jpg"/>
          </a>
          </div>
          <div class="swiper-slide">
          <a href="#">
            <img src="upload/slide002.jpg"/>
          </a>
          </div>
        </div>
        <div class="pagination"></div>  
      </div> -->
      <swiper :options="swiperOption" ref="mySwiper" id="slide">
          <swiper-slide><img src="../assets/upload/slide001.jpg"></swiper-slide>
          <swiper-slide><img src="../assets/upload/slide002.jpg"/></swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
          <!-- <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>

      <!--categoryList-->
      <ul class="categoryLiIcon">
      <li v-for="val in arr" :key="val.pid">
        <router-link :to="{name:'goodname',params:{uid:val.pid},query:{pid:val.pid}}">
          <img :src="val.src">
          <em>{{val.goodname}}</em>
        </router-link>
        <!-- <a href="category.html">
          <img :src="val.src">
          <em>{{val.name}}</em>
        </a> -->
      </li>
      <!-- <li>
        <a href="category.html">
        <img src="/src/assets/upload/menu_bg_06.png"/>
        <em>禽蛋肉类</em>
        </a>
      </li>
      <li>
        <a href="category.html">
        <img src="/src/assets/upload/menu_bg_10.png"/>
        <em>水产火锅</em>
        </a>
      </li>
      <li>
        <a href="category.html">
        <img src="/src/assets/upload/menu_bg_14.png"/>
        <em>熟食豆制</em>
        </a>
      </li>
      <li>
        <a href="category.html">
        <img src="/src/assets/upload/menu_bg_03.png"/>
        <em>米面粮油</em>
        </a>
      </li>
      <li>
        <a href="category.html">
        <img src="/src/assets/upload/menu_bg_07.png"/>
        <em>调料干货</em>
        </a>
      </li>
      <li>
        <a href="category.html">
        <img src="/src/assets/upload/menu_bg_11.png"/>
        <em>餐厨用品</em>
        </a>
      </li>
      <li>
        <a href="category.html">
        <img src="/src/assets/upload/menu_bg_15.png"/>
        <em>常购品</em>
        </a>
      </li> -->
      </ul>
      <!--Tab:productList-->
      <dl class="tab_proList">
      <dt  @click="bl=false">
        <!-- <a>热销</a> -->
        <router-link to="/home/hotgoods" active-class="active" :class="bl?'active':''">热销</router-link>
        <!-- <a>新品</a> -->
        <router-link to="/home/newgoods" active-class="active">新品</router-link>
        <!-- <a>打折</a> -->
        <router-link to="/home/disgoods" active-class="active">打折</router-link>
      </dt>
      <dd>
        <router-view></router-view>
      </dd>
      </dl>
      <!--floatCart-->
      <!-- <div class="hoverCart">
      <router-link to="/cart">{{buycart}}</router-link>
      </div> -->
      <div style="height:1.2rem;"></div>
  </div>
</template>
<style>
@import "../assets/css/home.css"

</style>
<script>
import {mapGetters,mapActions} from 'vuex'
import goods from "./goods.vue"
import hotgoods from "./hotgoods"
import newgoods from "./newgoods"
import disgoods from "./disgoods"
import cookie from "../assets/js/cookie"
import { swiper, swiperSlide } from 'vue-awesome-swiper' 
export default {
  // el:'.home',
  name:"mySwiper",
  data(){
    
    return {
      sum:0,
      arr:this.arr,
      bl:true,
      swiperOption:{
        autoplay:true,
        notNextTick: true,  
        pagination: '.swiper-pagination',  
        slidesPerView: 'auto',  
        centeredSlides: true,  
        paginationClickable: true,  
        spaceBetween: 30,
        onSlideChangeEnd: swiper => {  
            //这个位置放swiper的回调方法  
            this.page = swiper.realIndex+1;  
            this.index = swiper.realIndex;  
        } 
      }
     
    }
  },
  methods:{
    ...mapActions([  
      "toTip"
    ])
  },
  components:{
      goods,hotgoods,newgoods,disgoods,swiper,swiperSlide
  },
  mounted(){
    this.swiper.slideTo(0, 0, false); 
    console.log("2379218heu")
    var params = new URLSearchParams();
      this.$http({
          // withCredentials: true,
          url:'http://localhost:8003/goodslist',
          method:'post',
          data:params
      }).then((res)=>{
        console.log(res)
        this.arr=res.data
        console.log(res.data)
        var username = cookie.getCookie('userName')
        if(username){
          var params = new URLSearchParams();
          params.append("act","getcart")
          params.append("userID",username)
          this.$http({
              url:'http://localhost:8003/user',
              method:'post',
              data:params
          }).then((res1)=>{
            console.log(res1.data)
            var obj = JSON.parse(res1.data[0].buyitem)
            console.log(obj)
            for(var key in obj){
              this.sum+=obj[key]
            }
            this.toTip(this.sum) 
          })
        }
      })
  },
  computed: {  
      swiper() {  
        return this.$refs.mySwiper.swiper;  
      },
      ...mapGetters([
        "buycart"
      ])
     
  }
  // computed:mapGetters([
  //       "buycart","toTip"
  //     ])
  // computed:mapGetters([
  //       "buycart"
  //     ])
}
</script>

