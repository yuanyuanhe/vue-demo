<template>
  <div id="app">
     
      <!-- <home></home> -->
      <!-- <category></category> -->
      <!-- <cart></cart> -->
      <!-- <user></user> -->
      <!-- <login></login> -->
      <!-- <register></register> -->
      <!-- <product></product> -->
      <loading v-show="getLoading"></loading>
      <toCartLogo v-show="getLogo"></toCartLogo>
      <navbar v-show="getNav"></navbar>
      
      <!-- <productlist></productlist> -->
      <router-view></router-view>
     <!-- {{test()}} -->
  </div>
</template>

<script>
import navbar from "./components/navbar"
import toCartLogo from "./components/toCartLogo"
import {mapGetters} from 'vuex'

export default {
  name:'app',
  methods:{
    navState(path){
      if(/product|register/.test(path)){
        this.$store.dispatch('hideNav');
      }
      if(/cart|category|home|login|user/.test(path)){
        this.$store.dispatch('showNav');
      }
      if(/category|home/.test(path)){
        this.$store.dispatch('showLogo');
      }
      if(/cart|login|user|product|register/.test(path)){
        this.$store.dispatch('hideLogo');
      }
      if(/login|user|register/.test(path)){
        this.$store.dispatch('hideLoading');
      }
    }
  },
  watch:{
    $route(route){
      console.log(route.path)
      this.navState(route.path)
      // this.$store.dispatch('hideNav');
      // this.$route.dispatch('hideNav');
    }
  },
  mounted(){
    // this.$store.dispatch('showNav');
    // console.log(this.$store)
    this.navState(this.$route.path)
  },
  computed:mapGetters([
    'getNav',"getLogo","getLoading"
  ]),
  components:{
    navbar,toCartLogo
  },
}
</script>

