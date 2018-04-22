<template>
  <div class="hoverCart">
      <router-link to="/cart">{{buycart}}</router-link>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  computed:mapGetters([
        "buycart"
      ])
}
</script>

