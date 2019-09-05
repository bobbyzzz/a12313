<template>
  <div class="shoppingList">
    <!-- 头部 -->
    <div class="header">
      <router-link to="/shoppingClass">
        <img class="arrow" src="../statics/img/icon/arrow-left-black.png" alt />
      </router-link>
      <form action="#">
        <input type="text" />
      </form>
      <img class="search" src="../statics/img/icon/search.png" alt />
    </div>
    <!-- 导航头 -->
    <div class="navTitle">
      <ul>
        <li
          @click="indexs = index"
          :class="{activeColor:index ==indexs}"
          v-for="(item, index) in navTitleData"
          :key="index"
        >
          <p class="space-r">{{item.navTxt}}</p>
          <div>
            <div>
              <img v-if="false" :src="item.normalIconUp" alt />
              <img v-else :src="item.activeIconUp" alt />
            </div>
            <div>
              <img v-if="false" :src="item.normalIconDown" alt />
              <img v-else :src="item.activeIconDown" alt />
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
            <img v-lazy="item.image" alt />
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
          normalIconUp: require("/")
        },
        {
          navTxt: "销量",
          activeIconDown: require("/"),
          normalIconDown: require("/"),
          activeIconUp: require("/"),
          normalIconUp: require("/")
        },
        {
          navTxt: "价格",
          activeIconDown: require("../statics/img/list/activeArrow-d.png"),
          normalIconDown: require("../statics/img/list/normalArrow-d.png"),
          activeIconUp: require("../statics/img/list/normalArrow-u.png"),
          normalIconUp: require("../statics/img/list/activeArrow.png")
        },
        {
          navTxt: "新品",
          activeIconDown: require("/"),
          normalIconDown: require("/"),
          activeIconUp: require("/"),
          normalIconUp: require("/")
        },
        {
          navTxt: "品牌",
          activeIconDown: require("/"),
          normalIconDown: require("/"),
          activeIconUp: require("/"),
          normalIconUp: require("/")
        }
      ],

      indexs: 0
    };
  },
  methods: {
    getListData() {
      this.$axios
        .post(
          "https://restapp.tomorrowgold.com/search?cid="+
            localStorage.getItem("id")
        )
        .then(
          res => {
            // console.log(res.data.data);
            this.listData = res.data.data;
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
