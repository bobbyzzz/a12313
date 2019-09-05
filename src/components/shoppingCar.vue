<template>
    <div class="shoppingCar">
        购物车
        <!-- 底部 -->
    <myFooter></myFooter>
    </div>
</template>
<script>
import myFooter from './footer'
export default {
    components: {
    myFooter
  },
}
</script>
<style scoped>
@import '../statics/css/shoppingCar.css';
</style>
