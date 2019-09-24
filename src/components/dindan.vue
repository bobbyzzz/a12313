<template>
  <div class="box">
    <!-- 头部 -->
    <div class="top">
      <div class="top-l">
        <router-link to="vip">
          <img src="../statics/img/dindan/x.png" alt />
        </router-link>
      </div>
      <div class="top-m">我的订单</div>
      <div class="top-r">
        <a href="https://m.tomorrowgold.com/#/orderSearch">
          <img src="../statics/img/dindan/x1.png" alt />
        </a>
      </div>
    </div>
    <div class="topBar">
      <div
        @click="topBared(index)"
        :class="topBarIndex==index?'actived':''"
        v-for="(item, index) in topBar"
        :key="index"
      >
        {{item}}
        <span></span>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="hasNots">
      <van-loading size="24px" vertical>加载中...</van-loading>
      <div class="no-order">
        <img src="../statics/img/dindan/x2.png" alt />
        <p class="watch">您还没有相关的订单</p>
        <p class="gobye">可以去看看有哪些想买的</p>
      </div>
      <!-- 更多宝贝 -->
      <div class="more">
        <div class="more-l">
          <img class="pic1" src="../statics/img/index/titleBcg.png" alt />
          <p>猜/你/喜/欢</p>
        </div>
        <div class="more-r">
          <!-- <a href="https://m.tomorrowgold.com/#/home"> -->
          <router-link to="/index">
            <p>更多宝贝</p>
            <img class="pic2" src="../statics/img/icon/arrow.png" alt />
          </router-link>
          <!-- </a> -->
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="shoppingList">
        <a href="#">
          <li
            @click="getId(item)"
            v-for="(item, index) in FiveListMap"
            :key="index"
            class="shoplist"
          >
            <div class="shop1">
              <img :src="item.image_default_id" alt />
            </div>
            <div class="shop2">
              <p class="title">{{item.title}}</p>
            </div>
            <div class="shop3">
              <span>￥</span>
              <p>{{item.price}}</p>
            </div>
          </li>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      FiveListMap: [],
      topBar: ["全部", "待付款", "待发货", "待收货", "待评价"],
      topBarIndex: 0
    };
  },
  methods: {
    topBared(index) {
      this.topBarIndex = index;
    },
    //获取购物车商品列表
    getShopData() {
      this.$axios.get("/shopcar").then(
        res => {
          this.FiveListMap = res.data.data.FiveListMap;
        },
        err => {
          alert(err);
        }
      );
    },
    getId(item) {
      // console.log(item.item_id)
      localStorage.setItem("itemId", item.item_id);
      this.$router.push("/shoppingDetails");
    }
  },
  created() {
    this.getShopData();
  }
};
</script>
<style scoped>
@import "../statics/css/dindan.css";
</style>