<template>
  <div class="shoppingList">
    <!-- 头部 -->
    <div class="header">
      <!-- <router-link to="/shoppingClass"> -->
      <img @click="goBack" class="arrow" src="../statics/img/icon/arrow-left-black.png" alt>
      <!-- </router-link> -->
      <form action="#">
        <input type="text">
      </form>
      <img class="search" src="../statics/img/icon/search.png" alt>
    </div>
    <!-- 导航头 -->
    <div class="navTitle">
      <ul>
        <li
          @click="changeSelect(index)"
          :class="{activeColor:index ==indexs}"
          v-for="(item, index) in navTitleData"
          :key="index"
        >
          <p class="space-r">{{item.navTxt}}</p>
          <div>
            <div>
              <img @click="upArrow" v-if="item.up" :src="item.normalIconUp" alt>
              <img @click="upArrow" v-else :src="item.activeIconUp" alt>
            </div>
            <div>
              <img @click="downArrow" v-if="item.down" :src="item.normalIconDown" alt>
              <img @click="downArrow" v-else :src="item.activeIconDown" alt>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 列表 -->
    <div v-if="listData.r" class="contentList">
      <ul>
        <li @click="getId(item)" v-for="(item, index) in listData.r.result" :key="index">
          <p class="img">
            <img v-lazy="item.image" alt>
          </p>
          <p class="title">{{item.title}}</p>
          <p class="price">￥{{item.price}}</p>
          <div>
            <p>{{item.soldQuantity}}人已购</p>
            <p>{{item.rateCount}}好评</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 接口失败渲染 -->
    <div class="fail" v-show="failShopping">没有相关商品</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listData: {},
      navTitleData: [
        {
          navTxt: "综合",
          activeIconDown: require("../statics/img/list/activeArrow-d.png"),
          normalIconDown: require("../statics/img/list/normalArrow-d.png"),
          activeIconUp: require("/"),
          normalIconUp: require("/"),
          up: false,
          down: false
        },
        {
          navTxt: "销量",
          activeIconDown: require("/"),
          normalIconDown: require("/"),
          activeIconUp: require("/"),
          normalIconUp: require("/"),
          up: false,
          down: true
        },
        {
          navTxt: "价格",
          activeIconDown: require("../statics/img/list/activeArrow-d.png"),
          normalIconDown: require("../statics/img/list/normalArrow-d.png"),
          activeIconUp: require("../statics/img/list/normalArrow-u.png"),
          normalIconUp: require("../statics/img/list/activeArrow.png"),
          up: false,
          down: true
        },
        {
          navTxt: "新品",
          activeIconDown: require("/"),
          normalIconDown: require("/"),
          activeIconUp: require("/"),
          normalIconUp: require("/"),
          up: false,
          down: true
        },
        {
          navTxt: "品牌",
          activeIconDown: require("/"),
          normalIconDown: require("/"),
          activeIconUp: require("/"),
          normalIconUp: require("/"),
          up: false,
          down: true
        }
      ],

      indexs: 0,
      failShopping: false
    };
  },
  methods: {
    getListData() {
      this.$axios
        .post(
          "https://restapp.tomorrowgold.com/search?cid=" +
            localStorage.getItem("id")
        )
        .then(
          res => {
            // console.log(res.data.data.r.result.length);
            this.listData = res.data.data;
            if (res.data.data.r.result.length == 0) {
              this.failShopping = true;
            }
          },
          err => {
            alert(err);
          }
        );
    },
    getId(item) {
      // console.log(item)
      localStorage.setItem("itemId", item.id);
      this.$router.push("/shoppingDetails");
    },
    changeSelect(index) {
      this.indexs = index;
      if (index == 0) {
        this.navTitleData[0].down = false;
      } else {
        this.navTitleData[0].down = true;
      }
      if (index != 2) {
        this.navTitleData[2].up = false;
        this.navTitleData[2].down = true;
      }
    },
    upArrow() {
      this.navTitleData[2].up = true;
      this.navTitleData[2].down = true;
    },
    downArrow() {
      this.navTitleData[2].up = false;
      this.navTitleData[2].down = false;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getListData();
  }
};
</script>
<style scoped>
@import "../statics/css/shoppingList.css";
</style>
