<template>
  <div class="vip-box">
    <div class="top">
      <!-- 头部 -->
      <div class="top-t">
        <div class="top-tl">
          <a href="https://m.tomorrowgold.com/#/person/setting">
            <img src="../statics/img/vip/y7.png" alt />
          </a>
        </div>
        <div class="top-tr">
          <a
            href="https://m.tomorrowgold.com/#/msg/index?req=%5B%7B%22count%22%3A0,%22id%22%3A805930,%22type%22%3A1%7D,%7B%22count%22%3A0,%22id%22%3A805930,%22type%22%3A2%7D,%7B%22count%22%3A0,%22id%22%3A805930,%22type%22%3A3%7D,%7B%22count%22%3A1,%22id%22%3A805930,%22type%22%3A4%7D%5D&from_back=mine"
          >
            <img src="../statics/img/vip/y6.png" alt />
          </a>
        </div>
      </div>
      <!-- 头中 -->
      <div class="top-m">
        <div class="top-ml">
          <img v-if="touxShow" src="../statics/img/vip/my_img.png" alt />
          <img v-else width="0.5rem" height="0.5rem" src="../statics/img/touxiang.jpg" alt="">
        </div>
        <div class="top-mr">
          <div class="top-mrl">
            <a href="#">
              <img v-show="isShow" @click="goLogin" src="../statics/img/vip/y5.png" alt />
              <p v-show="!isShow" class="isUserName">{{userName}}</p>
            </a>
          </div>
          <div class="top-mrr">
            <img src="../statics/img/vip/y4.png" alt />
            <span>普通会员</span>
          </div>
        </div>
      </div>
      <!-- 头底 -->
      <div class="main-box">
        <img class="mine" src="../statics/img/vip/mine_mj.4436772.png" alt />
        <li
          @click="hunderClick(index)"
          :class="topBarIndex==index"
          v-for="(item, index) in lister"
          :key="index"
        >
          <big class="big">{{item.big}}</big>
          <img class="egg" :src="item.Img" alt />
          <span class="txt">{{item.txt}}</span>
        </li>
      </div>
      <!-- 订单 -->
      <div class="myorder">
        <div class="myorder_top">
          <span class="leftcolor"></span>
          &nbsp;我的订单
          <!-- <a href=""> -->
          <router-link to="dindan">
            <span class="allorder">
              全部订单
              <img src="../statics/img/vip/y2.png" alt />
            </span>
          </router-link>
          <!-- </a> -->
        </div>
        <div class="orderList">
          <a href="https://m.tomorrowgold.com/#/allOrder/1">
            <span>
              <img src="../statics/img/vip/my_obligation@3x.png" alt />
              <br />待付款
              <!---->
            </span>
          </a>
          <a href="https://m.tomorrowgold.com/#/allOrder/2">
            <span>
              <img src="../statics/img/vip/my_consignment@3x.png" alt />
              <br />待发货
              <!---->
            </span>
          </a>
          <a href="https://m.tomorrowgold.com/#/allOrder/3">
            <span>
              <img src="../statics/img/vip/car@3x.png" alt />
              <br />待收货
              <!---->
            </span>
          </a>
          <a href="https://m.tomorrowgold.com/#/allOrder/4">
            <span>
              <img src="../statics/img/vip/my_evaluate@3x.png" alt />
              <br />待评价
              <!---->
            </span>
          </a>
          <a href="https://m.tomorrowgold.com/#/saleAfter">
            <span>
              <img src="../statics/img/vip/my_tksh@3x.png" alt />
              <br />退款/售后
              <!---->
            </span>
          </a>
        </div>
      </div>
      <ul class="centerList">
        <a
          href="https://m.tomorrowgold.com/#/applyagree?str=%E5%B0%8F%E5%BA%97%E5%BA%97%E4%B8%BB%E5%8D%8F%E8%AE%AE%E9%82%A3%E6%88%91%E5%B0%B1%E9%9A%8F%E4%BE%BF%E8%81%8A%E8%81%8A%E5%90%A7%26amp%3Bnbsp%3B%20%E5%85%B6%E5%AE%9E%E4%B9%9F%E6%B2%A1%E5%95%A5%E5%A5%BD%E8%AF%B4%E7%9A%84%26amp%3Bnbsp%3B%20%E5%B0%B1%E8%BF%99%E5%90%A7%26amp%3Bnbsp%3B"
        >
          <li>
            <img src="../statics/img/vip/y1.png" alt />
            <span class="shop">我的小店</span>
          </li>
        </a>
        <!---->
        <a href="https://m.tomorrowgold.com/#/CustomCenter">
          <li>
            <img src="../statics/img/vip/my_kefu.png" alt />
            <span class="shop">客服中心</span>
          </li>
        </a>
        <a href="https://m.tomorrowgold.com/#/mall">
          <li>
            <img src="../statics/img/vip/sc.png" alt />
            <span class="shop">商城推广</span>
          </li>
        </a>
        <a href="https://m.tomorrowgold.com/#/entrepreneur">
          <li>
            <img src="../statics/img/vip/my_cyztg.png" alt />
            <span class="shop">创业者推广</span>
          </li>
        </a>
        <a href="https://m.tomorrowgold.com/#/youhuiquan">
          <li>
            <img src="../statics/img/vip/youhuiquan.png" alt />
            <span class="shop">我的优惠券</span>
          </li>
        </a>
        <a href="https://m.tomorrowgold.com/#/guquan/guquanzhu">
          <li>
            <img src="../statics/img/vip/guquan.png" alt />
            <span class="shop">股权中心</span>
          </li>
        </a>
        <a href="https://m.tomorrowgold.com/#/collection">
          <li>
            <img src="../statics/img/vip/my_favorite.png" alt />
            <span class="shop">我的收藏</span>
          </li>
        </a>
        <a href="https://m.tomorrowgold.com/#/comment">
          <li>
            <img src="../statics/img/vip/pj.png" alt />
            <span class="shop">我的评价</span>
          </li>
        </a>
        <a href>
          <li>
            <img src="../statics/img/vip/my_evaluate.png" alt />
            <span class="shop">投诉记录</span>
          </li>
        </a>
        <a href="https://m.tomorrowgold.com/#/record">
          <li>
            <img src="../statics/img/vip/my_security.png" alt />
            <span class="shop">安全中心</span>
          </li>
        </a>
        <a href="https://m.tomorrowgold.com/#/safeCenter/safe">
          <li>
            <img src="../statics/img/vip/my_liuyan.png" alt />
            <span class="shop">留言列表</span>
          </li>
        </a>
        <a href="http://mrzg-game.tomorrowgold.com/?s=9c222ffc-12dc-4099-bd72-c88e9ef7fbd2">
          <li>
            <img src="../statics/img/vip/yy.png" alt />
            <span class="shop">我的游戏</span>
          </li>
        </a>
      </ul>
      <div class="dan">
        <div class="center" v-for="(item, index) in topBar[0]" :key="index">
          <p class="txt">{{item.title}}</p>
          <p class="txt1">{{item.text}}</p>
          <span @click="handelClick(index)">
            <img src="../statics/img/vip/zz.png" alt />
          </span>
        </div>
      </div>
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
      topBarIndex: 0,
      touxShow: true,
      lister: [
        {
          big: "￥0",
          Img: require("../statics/img/vip/y3.png"),
          txt: "消费累计"
        },
        {
          big: "￥0",
          Img: require("../statics/img/vip/y3.png"),
          txt: "消费投资"
        },
        {
          big: "￥0",
          Img: require("../statics/img/vip/y3.png"),
          txt: "投资收益"
        },
        {
          big: "￥0",
          Img: require("../statics/img/vip/y3.png"),
          txt: "众购期权"
        }
      ],
      topBar: [
        [
          {
            title: "消费收益",
            text:
              " 投资分润：1.根据消费投资在平台的运行情况确定每天或者每阶段的分润比例，每天0时生成前一天分成金额，满一百即可申请提现。2.年满60岁，每天获得投资分润是正常投资人2倍，用于补充消费养老。60岁以上注册的消费者，满一年后直接提高至双倍分润。 "
          }
        ],
        [
          {
            title: "消费收益",
            text:
              " 投资分润：1.根据消费投资在平台的运行情况确定每天或者每阶段的分润比例，每天0时生成前一天分成金额，满一百即可申请提现。2.年满60岁，每天获得投资分润是正常投资人2倍，用于补充消费养老。60岁以上注册的消费者，满一年后直接提高至双倍分润。 "
          }
        ],
        [
          {
            title: "消费收益",
            text:
              " 投资分润：1.根据消费投资在平台的运行情况确定每天或者每阶段的分润比例，每天0时生成前一天分成金额，满一百即可申请提现。2.年满60岁，每天获得投资分润是正常投资人2倍，用于补充消费养老。60岁以上注册的消费者，满一年后直接提高至双倍分润。 "
          }
        ],
        [
          {
            title: "消费收益",
            text:
              " 投资分润：1.根据消费投资在平台的运行情况确定每天或者每阶段的分润比例，每天0时生成前一天分成金额，满一百即可申请提现。2.年满60岁，每天获得投资分润是正常投资人2倍，用于补充消费养老。60岁以上注册的消费者，满一年后直接提高至双倍分润。 "
          }
        ]
        
      ],
      userName: "",
      isShow: true
    };
  },
  components: {
    myFooter
  },
  methods: {
    hunderClick(index) {
      this.topBarIndex = index;
    },
    goLogin() {
      this.$router.push("/login");
    },
    getUserName() {
      this.userName = sessionStorage.getItem("user");
      if (this.userName != null) {
        this.isShow = false;
        this.touxShow = false
      }else{
        this.isShow = true;
      }
    }
  },
  created() {
    this.getUserName();
  }
};
</script>
<style scoped>
@import "../statics/css/vip.css";
</style>
