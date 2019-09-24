<template>
  <div class="shoppingDetails" :class="{active:show}">
    <!-- 头部 -->
    <div class="header">
      <p @click="back">
        <!-- <router-link to="/brand"> -->
        <img src="../statics/img/icon/arrow-left-black.png" alt />
        <!-- </router-link> -->
      </p>
      <p>商品详情</p>
      <p>
        <img src="../statics/img/icon/dot.png" alt />
      </p>
    </div>
    <!-- 轮播图 -->
    <div v-if="detailsData.itemDatas" class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in detailsData.itemDatas.imsages" :key="index">
          <img @click="bannerTap" :src="item" alt />
        </van-swipe-item>
      </van-swipe>
      <p class="num">
        <span>{{indexs}}</span>/
        <span>{{detailsData.itemDatas.imsages.length}}</span>
      </p>
    </div>
    <!-- 图片显示 -->
    <!-- <transition name="show"> -->
    <div @click="chanel" class="picShow" v-show="picShow">
      <img :src="imgSrc" alt />
    </div>
    <!-- </transition> -->
    <!-- 价格说明 -->
    <div v-if="detailsData.itemDatas" class="priceNote">
      <p>
        促销价
        <span>￥</span>
        <span class="new">{{detailsData.itemDatas.price}}</span>
      </p>
      <p>
        原价
        <span class="old">￥{{detailsData.itemDatas.mktPrice}}</span>
      </p>
    </div>
    <!-- 促销 -->
    <div v-if="detailsData.itemDatas" class="cuXiao">
      <div>
        <van-tag round type="danger">促销</van-tag>
        <span>{{detailsData.itemDatas.title}}</span>
      </div>
      <div>
        <p>{{detailsData.itemDatas.subTitle}}</p>
      </div>
      <div class="open">
        <p>{{detailsData.itemDatas.soldQuantity}}人已购</p>
        <img src="../statics/img/details/open.png" alt />
      </div>
    </div>
    <!-- 规格选择 -->
    <div class="typeSelect">
      <p>规格选择</p>
      <p>
        <img src="../statics/img/icon/dot.png" alt />
      </p>
    </div>
    <!-- 商品评论 -->
    <div class="shoppingDiscuss">
      <div class="titleDiscuss">
        <p>商品评价</p>
        <p>
          <img src="../statics/img/icon/arrow-left-black.png" alt />
        </p>
      </div>
      <div class="discuss">
        <ul>
          <li v-for="(item, index) in detailsData.rateDatas" :key="index">
            <div class="titlePeploe">
              <div>
                <img src="../statics/img/details/touxiang.png" alt />
              </div>
              <div>
                <p>{{item.account}}</p>
                <p class="star">
                  <van-rate
                    :size="12"
                    color="#f29f7c"
                    v-model="detailsData.itemDatas.rateGrade"
                    readonly
                  />
                </p>
              </div>
              <div>{{item.createdTime}}</div>
            </div>
            <div class="discussContent">
              <p>{{item.content}}}</p>
              <p>{{item.specInfo}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="allDiscuss">查看全部评论</div>
    </div>
    <!-- 参数规格 -->
    <div class="dataType">
      <div class="titleData">
        <p>参数规格</p>
      </div>
      <div v-if="detailsData.itemDatas" class="typeContent" :style="{height: height+'rem',}">
        <p v-for="(item, index) in detailsData.itemDatas.itemProp" :key="index">
          <span>{{item.propName}}：</span>
          <span>{{item.propValue}}</span>
        </p>
      </div>
      <div class="allType">
        <p v-if="isShow" @click="openClick">展开全部</p>
        <p v-else @click="closeClick">收起全部</p>
        <p>
          <img src="../statics/img/details/arrow-down.png" alt />
        </p>
      </div>
    </div>
    <!-- 图文详情 -->
    <div class="picDetails">
      <div class="titleDetails">
        <p>图文详情</p>
        <p>
          <img src="../statics/img/icon/arrow-left-black.png" alt />
        </p>
      </div>
      <div v-if="detailsData.itemDatas" class="picContent" v-html="detailsData.itemDatas.itemDesc"></div>
    </div>
    <!-- 底部 -->
    <div class="footerCar">
      <van-goods-action>
        <img src="../statics/img/details/shoucang.png" alt />
        <van-goods-action-icon text="收藏" />
        <img src="../statics/img/details/shoppingCar.png" alt />
        <van-goods-action-icon :info="car" text="购物车" />
        <van-goods-action-button @click="addCar" color="#ffb55c" type="warning" text="加入购物车" />
        <van-goods-action-button @click="goCar" color="#c62347" type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailsData: {},
      indexs: "1",
      height: "0.95",
      isShow: true,
      imgSrc: "",
      picShow: false,
      show: false,
      car: "",
      num: 0
    };
  },
  methods: {
    //获取商品详情的数据  及根据本地的id获取不同的数据
    getDetailsData() {
      this.$axios
        .get(
          "https://restapp.tomorrowgold.com/item?id=" +
            localStorage.getItem("itemId")
        )
        .then(
          res => {
            // console.log(res.data.data);
            this.detailsData = res.data.data;
          },
          err => {
            alert(err);
          }
        );
    },
    getIndex() {
      setInterval(() => {
        this.indexs++;
        if (this.indexs > this.detailsData.itemDatas.imsages.length) {
          this.indexs = 1;
        }
      }, 3000);
    },
    openClick() {
      this.isShow = false;
      this.height = "1.55";
    },
    closeClick() {
      this.isShow = true;
      this.height = "0.95";
    },
    bannerTap(target) {
      this.imgSrc = target.toElement.currentSrc;
      this.picShow = true;
      this.show = true;
    },
    chanel() {
      this.picShow = false;
      this.show = false;
    },
    back() {
      this.$router.go(-1);
    },
    addCar() {
      this.car = 1;
      this.num += 1;
      let list = JSON.parse(sessionStorage.getItem("carData") || "[]");
      if(this.detailsData.isRoyalmilk ==false){
        this.detailsData.isRoyalmilk = true
        list.push(this.detailsData);
      }
      sessionStorage.setItem("carData", JSON.stringify(list));
      // sessionStorage.setItem("count", this.car);
    },
    goCar() {
      this.$router.push("/shoppingCar");
    }
  },
  created() {
    this.getDetailsData();
    this.getIndex();
  }
};
</script>
<style scoped>
@import "../statics/css/shoppingDetails.css";
</style>