<template>
  <div class="register">
    <!-- 头部 -->
    <div class="header">
      <router-link to="/vip">
        <img class="arrow" src="../statics/img/icon/arrow-left-black.png" alt />
      </router-link>
      <p>账号注册</p>
      <p>登录</p>
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
        <p @click="goLogin" class="button">同意协议并登录</p>
      </form>
    </div>
    <!-- 忘记密码？ -->
    <div class="forget">
      <input checked type="checkbox" />
      已同意并阅读《用户注册协议》
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      errShow: false,
      psdShow: false,
      isUserName: "",
      isPassword: "",
      phoneMsg: "",
      psdMsg: ""
    };
  },
  methods: {
    goLogin() {
      var reg = /^1[3,4,5,7,8]\d{9}$/g;
      if (this.isUserName == "") {
        this.phoneMsg = "手机号不能为空";
        this.errShow = true;
        return;
      }
      if (!reg.test(this.isUserName)) {
        this.phoneMsg = "请填写正确的手机号";
        this.errShow = true;
        return;
      } else {
        this.errShow = false;
      }

      var reg1 = /^\w/g;
      if (this.isPassword == "") {
        this.psdMsg = "密码不能为空";

        this.psdShow = true;
        return;
      }
      if (!reg1.test(this.isPassword)) {
        this.psdMsg = "必须为字母或数字或下划线";
        this.psdShow = true;
        return;
      } else {
        this.psdShow = false;
      }
      sessionStorage.setItem('user',this.isUserName)
      sessionStorage.setItem('psd',this.isPassword)
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
@import "../statics/css/register.css";
</style>