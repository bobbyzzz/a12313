<template>
  <div class="login">
    <!-- 头部 -->
    <div class="header">
      <router-link to="/vip">
        <img class="arrow" src="../statics/img/icon/arrow-left-black.png" alt />
      </router-link>
      <p>密码登录</p>
    </div>
    <!-- logo -->
    <div class="logo">
      <img src="../statics/img/login/login_top.png" alt />
    </div>
    <!-- 表单 -->
    <div class="inputTable">
      <form action="#">
        <p>
          <input v-model="isUserName" type="text" placeholder="请输入手机号" />
        </p>
        <p class="phone" v-show="errShow">{{phoneMsg}}</p>
        <p>
          <input v-model="isPassword" type="password" placeholder="请输入密码" />
        </p>
        <p class="psd" v-show="psdShow">{{psdMsg}}</p>
        <p class="register" @click="goRegister">注册？</p>
        <p class="button" @click="goIndex">登录</p>
      </form>
    </div>
    <!-- 忘记密码？ -->
    <div class="forget">忘记密码？</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      errShow: false,
      psdShow: false,
      phoneMsg: "",
      psdMsg: "",
      isUserName: "",
      isPassword: ""
    };
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },
    goIndex() {
      //   var reg = /^1[3,4,5,7,8]\d{9}$/g;
      if (this.isUserName == "") {
        this.phoneMsg = "手机号不能为空";
        this.errShow = true;
        return;
      }
      if (this.isUserName != sessionStorage.getItem("user")) {
        this.phoneMsg = "手机号错误，请重新输入";
        this.errShow = true;
        return;
      } else {
        this.errShow = false;
      }

      //   var reg1 = /^\w/g;
      if (this.isPassword == "") {
        this.psdMsg = "密码不能为空";
        this.psdShow = true;
        return;
      }

      if (this.isPassword != sessionStorage.getItem("psd")) {
        this.psdMsg = "密码错误请重新输入";
        this.psdShow = true;
        return;
      } else {
        this.psdShow = false;
      }

      this.$router.push("/index");
    }
  }
};
</script>
<style scoped>
@import "../statics/css/login.css";
</style>