<template>
  <div class="shoppingCar">
    <!-- 头部 -->
    <div class="top">
      <h2 style="font-size:0.18rem;">购物车</h2>
      <p @click="isShow">清空</p>
    </div>
    <!-- guaner -->
    <div v-if="noneData" class="guaner">
      <router-link to="/index">
        <img src="../statics/img/shoppingcar/shopping1.png" alt />
      </router-link>
    </div>
    <!-- 购物车列表 -->
    <div v-else class="shoppingCarList">
      <ul>
        <li v-for="(item, index) in buyData" :key="index">
          <div>
            <van-checkbox v-model="checked"></van-checkbox>
          </div>
          <div>
            <img class="picPath" :src="item.itemDatas.picPath" alt />
          </div>
          <div>
            <p class="title">{{item.itemDatas.title}}</p>
            <div class="priceCount">
              <p>￥{{item.itemDatas.price}}</p>
              <van-stepper v-model="value" />
            </div>
          </div>
          <van-tag @click="del(index)" type="danger">删除</van-tag>
        </li>
      </ul>
    </div>
    <!-- 购买 -->
    <van-submit-bar :price="totalPrice" button-text="提交订单">
      <van-checkbox v-model="allChecked">全选</van-checkbox>
    </van-submit-bar>
    <!-- more -->
    <div class="more">
      <div class="more-l">
        <img class="pic1" src="../statics/img/index/titleBcg.png" alt />
        <p>猜/你/喜/欢</p>
      </div>
      <div class="more-r">
        <router-link to="/index">
          <p>更多宝贝</p>
          <img class="pic2" src="../statics/img/icon/arrow.png" alt />
        </router-link>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="shoppingList">
      <a href="#">
        <li @click="getId(item)" v-for="(item, index) in FiveListMap" :key="index" class="shoplist">
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
    <!-- 底部 -->
    <myFooter></myFooter>
  </div>
</template>
<script>
import myFooter from "./footer";
export default {
  data() {
    return {
      FiveListMap: [],
      noneData: true,
      buyData: [],
      allChecked: true,
      checked: true,
      value: 1
      // totalPrice:0,
    };
  },
  components: {
    myFooter
  },
  computed: {
    totalPrice() {
      return this.buyData[0].itemDatas.price * this.value * 100;
    }
  },
  methods: {
    isShow() {
      (this.buyData = []), (this.noneData = true);
    },
    //获取购物车商品列表
    getShopData() {
      this.$axios
        .get(
          "https://www.easy-mock.com/mock/5d6db90b1d79e9380a11989c/shopcar/shopcar"
        )
        .then(
          res => {
            this.FiveListMap = res.data.data.FiveListMap;
          },
          err => {
            alert(err);
          }
        );
    },
    getId(item) {
      localStorage.setItem("itemId", item.item_id);
      this.$router.push("/shoppingDetails");
    },
    getCarData() {
      let arr = [];
      if (JSON.parse(sessionStorage.getItem("carData")) != null) {
        this.noneData = false;
        arr = JSON.parse(sessionStorage.getItem("carData"));
        // this.buyData.push(arr);
      }
      this.buyData.push(arr);
      console.log(this.buyData);
    },
    del(index) {
      this.buyData.splice(index, 1);
    }
  },
  created() {
    this.getShopData();
    this.getCarData();
  }
};
</script>
<style scoped>
@import "../statics/css/shoppingCar.css";
</style>
