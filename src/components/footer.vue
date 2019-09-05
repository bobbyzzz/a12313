<template>
  <div class="footer">
    <van-tabbar v-model="active" active-color="#c52437" route fixed>
      <van-tabbar-item v-for="(item, index) in icon" :key="index" :to="item.navName">
        <span>{{item.name}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal">
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      icon: [
        {
          name: "首页",
          normal: require("../statics/img/icon/nomarl/sy_home.png"),
          active: require("../statics/img/icon/select/sy_home_red.png"),
          navName:"/index"
        },
        {
          name: "分类",
          normal: require("../statics/img/icon/nomarl/sy_classify.png"),
          active: require("../statics/img/icon/select/sy_classify_red.png"),
          navName:"/shoppingClass"
        },
        {
          name: "购物车",
          normal: require("../statics/img/icon/nomarl/sy_gwc.png"),
          active: require("../statics/img/icon/select/sy_gwc_red.png"),
          navName:"/shoppingCar"
        },
        {
          name: "会员",
          normal: require("../statics/img/icon/nomarl/sy_mine.png"),
          active: require("../statics/img/icon/select/sy_mine_red.png"),
          navName:"/vip"
        }
      ]
    };
  },
};
</script>
<style scoped>
@import "../statics/css/footer.css";
</style>
