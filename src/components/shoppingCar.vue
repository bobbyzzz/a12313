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
            <van-checkbox @click="singleSelect(index)" v-model="item.checked"></van-checkbox>
          </div>
          <div>
            <img class="picPath" :src="item.itemDatas.picPath" alt />
          </div>
          <div>
            <p class="title">{{item.itemDatas.title}}</p>
            <div class="priceCount">
              <p>￥{{singleProce(index)}}</p>
              <div class="MathCount">
                <p @click="reduce(item,index)">-</p>
                <p>{{item.value}}</p>
                <p @click="add(item,index)">+</p>
              </div>
            </div>
          </div>
          <van-tag @click="del(index)" type="danger">删除</van-tag>
        </li>
      </ul>
    </div>
    <!-- 购买 -->
    <van-submit-bar @submit="onSubmit" :price="num" button-text="提交订单">
      <van-checkbox v-model="allChecked" @click="allSelect">全选</van-checkbox>
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
      buyData: [{ itemDatas: { picPath: "", title: "", price: "" } }],
      allChecked: true,
      num: 0
    };
  },
  components: {
    myFooter
  },
  // computed: {
  //   totalPrice() {
  //     let money = 0;
  //     this.buyData.forEach(element => {
  //       if (element.checked) {
  //         money += element.value * element.itemDatas.price * 100;
  //       }
  //     });
  //     return money;
  //   }
  // },
  methods: {
    isShow() {
      this.buyData = [];
      sessionStorage.clear();
      this.noneData = true;
      this.totalPrice();
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
    // 获取ID并跳转
    getId(item) {
      localStorage.setItem("itemId", item.item_id);
      this.$router.push("/shoppingDetails");
    },
    // 获取商品列表
    getCarData() {
      let arr = JSON.parse(sessionStorage.getItem("carData") || "[]");
      if (arr != "") {
        this.buyData = arr;
        this.noneData = false;
        for (var i = 0; i < this.buyData.length; i++) {
          this.buyData[i].value = 1;
          this.buyData[i].checked = true;
        }
      } else {
        this.noneData = true;
      }
    },
    // 删除商品
    del(index) {
      this.buyData.splice(index, 1);
      sessionStorage.setItem("carData", JSON.stringify(this.buyData));
      if (this.buyData == "") {
        this.noneData = true;
      }
      this.totalPrice();
    },
    // 增加数量
    add(item, index) {
      item.value++;
      this.buyData[index].value = item.value;
      this.$set(this.buyData, index, this.buyData[index]);
      this.totalPrice();
    },
    // 减少数量
    reduce(item, index) {
      item.value--;
      this.buyData[index].value = item.value;
      this.$set(this.buyData, index, this.buyData[index]);
      if (item.value <= 1) {
        item.value = 1;
      }
      this.totalPrice();
    },
    // 单价
    singleProce(index) {
      return this.buyData[index].value * this.buyData[index].itemDatas.price;
    },
    // 总价
    totalPrice() {
      let money = 0;
      this.buyData.forEach(element => {
        if (element.checked) {
          money += element.value * element.itemDatas.price * 100;
        }
      });
      this.num = money;
    },
    // 全选
    allSelect() {
      this.allChecked = !this.allChecked;
      for (var i = 0; i < this.buyData.length; i++) {
        if (this.allChecked) {
          this.buyData[i].checked = true;
        } else {
          this.buyData[i].checked = false;
        }
      }
      this.totalPrice();
    },
    // 单选
    singleSelect(index) {
      let flag = true;
      this.buyData[index].checked = !this.buyData[index].checked;
      this.$set(this.buyData, index, this.buyData[index]);
      for (var i = 0; i < this.buyData.length; i++) {
        if (this.buyData[i].checked) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      this.allChecked = flag;
      this.totalPrice();
    },
    // 提交
    onSubmit() {
      // console.log(1)
      if (sessionStorage.getItem("user") == null) {
        this.$router.push("/login");
      }
    }
  },
  created() {
    this.getShopData();
    this.getCarData();
    this.totalPrice();
  },
};
</script>
<style scoped>
@import "../statics/css/shoppingCar.css";
</style>
