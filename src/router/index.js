import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import axios from 'axios'
axios.defaults.baseURL = "https://mock.yonyoucloud.com/mock/2074"
Vue.prototype.$axios = axios
//路由
import index from '../components/index.vue'
import shoppingClass from '../components/shoppingClass.vue'
import shoppingCar from '../components/shoppingCar.vue'
import vip from '../components/vip.vue'
import brand from '../components/brand.vue'
import shoppingDetails from '../components/shoppingDetails.vue'
import shoppingList from '../components/shoppingList.vue'
import dindan from '../components/dindan.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'

//地址
const routes = [{
    path: '/',
    redirect: '/index'
}, {
    path: '/index',
    component: index
}, {
    path: '/shoppingClass',
    component: shoppingClass,
}, {
    path: '/shoppingCar',
    component: shoppingCar
}, {
    path: '/vip',
    component: vip
}, {
    path: '/brand',
    component: brand
}, {
    path: '/shoppingDetails',
    component: shoppingDetails
}, {
    path: '/shoppingList',
    component: shoppingList
}, {
    path: '/dindan',
    component: dindan
}, {
    path: '/login',
    component: login
}, {
    path: '/register',
    component: register
}]

const router = new VueRouter({
    routes
})
export default router