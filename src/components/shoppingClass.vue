<template>
  <div class="shoppingClass">
    <!-- 左边导航 -->
    <van-sidebar v-model="activeKey">
      <van-sidebar-item
        @click="changeKey(index)"
        v-for="(item, index) in classData"
        :key="index"
        :title="item.namecat1"
      />
    </van-sidebar>
    <!-- 右边内容 -->
    <div class="contentRight">
      <ul v-show="index == indexs" v-for="(item, index) in classData" :key="index">
        <li class="navTitle">
          <img v-lazy="item.imgcat1" alt />
        </li>
        <li class="content2" v-for="(items, index) in item.child" :key="index">
          <p class="tabTitle">
            <van-divider
              :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
            >{{items.namecat2}}</van-divider>
          </p>
          <ul class="tab2">
            <li
              @click="goToList(itemss)"
              class="content3"
              v-for="(itemss, index) in items.list"
              :key="index"
            >
              <p class="shoppingImg">
                <img v-lazy="itemss.img" alt />
              </p>
              <p class="shoppingName">{{itemss.namecat3}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 底部 -->
    <myFooter></myFooter>
  </div>
</template>
<script>
import myFooter from "./footer";
export default {
  components: {
    myFooter
  },
  data() {
    return {
      activeKey: 0,
      classData: [],
      test: 15,
      indexs: 0
    };
  },
  methods: {
    getData() {
      this.$axios.get("/shoppingClass").then(
        res => {
          //   console.log(res.data.data);
          this.classData = res.data.data.dataItem;
        },
        err => {
          alert(err);
        }
      );
    },
    changeKey(index) {
      this.indexs = index;
    },
    goToList(itemss) {
      // console.log(itemss.id)
      localStorage.setItem("id", itemss.id);
      this.$router.push("/shoppingList");
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
@import "../statics/css/shoppingClass.css";
</style>
