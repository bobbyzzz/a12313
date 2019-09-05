<template>
  <div class="brand" :class="{active:show}">
    <!-- 头部 -->
    <div class="header">
      <div @click="backIndex()">
        <img src="../statics/img/icon/arrow-left.png" alt />
      </div>
      <p class="title">{{brandArr[0].activity_name}}</p>
      <p class="select" @click="showPopup">筛选</p>
    </div>
    <!-- 遮罩层 -->
    <div v-show="show" class="maskLayer"></div>
    <!-- 筛选列表 -->
    <div v-show="show" class="selectList">
      <div class="title">分类</div>
      <div class="nav">
        <div>
          <p
            :class="{line:index==indexs}"
            @click="indexs = index"
            v-for="(item, index) in selectObj.catlist"
            :key="index"
          >{{item.categoryName}}</p>
        </div>
      </div>
      <div class="title">
        <span>品牌</span>
        <span>(可多选)</span>
      </div>
      <div class="content">
        <p
          v-for="(item, index) in selectObj.brandlist"
          :key="index"
          @click="showList(index)"
          :class="{isSelecter:selectObj.brandlist[index].flag}"
        >{{item.brand_name}}</p>
      </div>
      <div class="foot">
        <p>重置</p>
        <p @click="showPopup">确定</p>
      </div>
    </div>
    <!-- 商品列表 -->
    <ul class="shoppingList">
      <li v-for="(item, index) in brandArr" :key="index" @click="postDetails(index)">
        <div class="shoppingPic">
          <img v-lazy="item.image_default_id" alt />
        </div>
        <div class="content">
          <p>
            <van-tag round type="danger">促销</van-tag>
            {{item.title}}
          </p>
          <div class="price">
            <p class="newPrice">
              促销价
              <span>￥</span>
              <span>{{item.promotion_price}}</span>
            </p>
            <p class="oldPrice">
              原价
              <span>￥</span>
              <span>{{item.mkt_price}}</span>
            </p>
            <p class="goToBuy">
              <van-tag round type="danger">立即购买</van-tag>
            </p>
          </div>
          <div class="rob">
            <p
              :style="{'background-color':'#ffcccc',width: '100%',height: .225+'rem',position: 'absolute',left:item.promotionRate,'z-index': 0}"
            ></p>
            <p>{{item.promotionDesc}}</p>
            <p>{{item.promotionRate}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      brandArr: [],
      selectObj: {},
      show: false,
      indexs: "0",
    };
  },
  methods: {
    getSelectList() {
      this.$axios.get("/selectList").then(
        res => {
          this.selectObj = res.data.data;
          for (var i = 0; i < this.selectObj.brandlist.length; i++) {
            this.selectObj.brandlist[i].flag = false;
          }
          // console.log(this.selectObj.brandlist);
        },
        err => {
          alert(err);
        }
      );
    },
    getData() {
      let obj = JSON.parse(localStorage.getItem("brand"));
      this.brandArr = obj.list;
      //   console.log(this.brandArr);
    },
    backIndex() {
      this.$router.push("/index");
    },
    showPopup() {
      this.show = !this.show;
    },
    showList(index) {
      this.selectObj.brandlist[index].flag = !this.selectObj.brandlist[index].flag
      // 解决vue数组对象中属性变化而没有实时渲染bug
      this.$set(this.selectObj.brandlist,index,this.selectObj.brandlist[index])
    },
    postDetails(index){
      //this.brandArr[index].item_id
      localStorage.setItem('itemId',this.brandArr[index].item_id)
      this.$router.push("/shoppingDetails");
      //console.log(this.brandArr[index].item_id)
    }
    
  },
  created() {
    this.getData();
    this.getSelectList();
  }
};
</script>
<style scoped>
@import "../statics/css/brand.css";
</style>