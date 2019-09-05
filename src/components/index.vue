<template>
  <div class="homePage">
    <!-- 头部 -->
    <div class="header">
      <form action="#">
        <input type="text" />
      </form>
      <img class="search" src="../statics/img/icon/search.png" alt />
      <img class="msg" src="../statics/img/icon/msg.png" alt />
    </div>
    <!-- 轮播 -->
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item @click="bannerTap(index)" v-for="(item, index) in bannerArr" :key="index">
          <img :src="item.src" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 视图 -->
    <div class="view">
      <ul>
        <li v-for="(item, index) in viewArr" :key="index">
          <div>
            <img v-lazy="item.pic" alt />
          </div>
          <p>{{item.title}}</p>
        </li>
      </ul>
    </div>
    <!-- 每日头条 -->
    <div class="dayNews">
      <div>
        <img src="../statics/img/index/tomorrow.png" alt />
      </div>
      <div class="scrollNews">
        <van-swipe style="height: 0.2rem;" :autoplay="3000" vertical :show-indicators="false">
          <van-swipe-item v-for="(item, index) in dayNewsArr" :key="index">{{item.content}}</van-swipe-item>
        </van-swipe>
      </div>
      <div class="more">更多</div>
    </div>
    <!-- 主体 -->
    <div class="main">
      <ul class="father-ul" v-for="(item, index) in mainArr" :key="index">
        <li class="mainBanner">
          <img class="picBanner" v-lazy="item.banner" alt />
        </li>
        <li class="mainTitle">
          <div class="mainTitle-left">
            <img src="../statics/img/index/titleBcg.png" alt />
            <p>{{item.title}}</p>
          </div>
          <div class="mainTitle-right">
            <p>更多分类</p>
            <img src="../statics/img/icon/arrow.png" alt />
          </div>
        </li>
        <ul class="child-ul">
          <li v-for="(items, index) in item.shopList" :key="index">
            <img v-lazy="items.shopImg" alt />
          </li>
        </ul>
      </ul>
    </div>
    <!-- 底部 -->
    <myFooter></myFooter>
  </div>
</template>
<script>
import myFooter from './footer'
export default {
  data() {
    return {
      bannerArr: [],
      viewArr: [],
      dayNewsArr: [],
      mainArr: [],
      birdData: {},
      shortData: {},
    };
  },
  components: {
    myFooter
  },
  methods: {
    //   获取轮播数据
    getBannerData() {
      this.$axios.get("/lunbo").then(
        res => {
          //   console.log(res.data.data.bannerList);
          this.bannerArr = res.data.data.bannerList;
        },
        err => {
          alert(err);
        }
      );
    },
    // 获取视图数据
    getViewData() {
      this.$axios.get("/viewList").then(
        res => {
          // console.log(res.data.data);
          this.viewArr = res.data.data;
        },
        err => {
          alert(err);
        }
      );
    },
    // 获取每日头条数据
    getdayNewsData() {
      this.$axios.get("/news").then(
        res => {
          // console.log(res.data.data);
          this.dayNewsArr = res.data.data;
        },
        err => {
          alert(err);
        }
      );
    },
    // 获取主体数据
    getMainData() {
      this.$axios.get("/shoppingList").then(
        res => {
          // console.log(res.data.data.classifydata);
          this.mainArr = res.data.data.classifydata;
        },
        err => {
          alert(err);
        }
      );
    },
    //获取啄木鸟特惠数据
    bird() {
      this.$axios.get("/zuomuniao").then(
        res => {
          // console.log(res.data.data.info);
          this.birdData = res.data.data.info;
        },
        err => {
          alert(err);
        }
      );
    },
    //获取标数特惠数据
    short() {
      this.$axios.get("/biaosu").then(
        res => {
          // console.log(res.data.data.info);
          this.shortData = res.data.data.info;
        },
        err => {
          alert(err);
        }
      );
    },

    // 轮播图的路由
    bannerTap(index) {
      // console.log(index)
      if (index == 0) {
        this.$router.push("/brand");
        localStorage.setItem("brand", JSON.stringify(this.birdData));
      } else if (index == 1) {
        this.$router.push("/brand");
        localStorage.setItem("brand", JSON.stringify(this.shortData));
      } else {
        this.$router.push("/shoppingClass");
      }
    }
  },
  created() {
    this.getBannerData();
    this.getViewData();
    this.getdayNewsData();
    this.getMainData();
    this.bird();
    this.short();
  }
};
</script>
<style scoped>
@import "../statics/css/index.css";
</style>
