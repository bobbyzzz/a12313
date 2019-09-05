import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import axios from 'axios'
axios.defaults.baseURL = "https://www.easy-mock.com/mock/5d69cc7bfe6deb2209936e6c/tomorrow"
Vue.prototype.$axios = axios
//路由
import index from '../components/index.vue'
import shoppingClass from '../components/shoppingClass.vue'
import shoppingCar from '../components/shoppingCar.vue'
import vip from '../components/vip.vue'
import brand from '../components/brand.vue'
import shoppingDetails from '../components/shoppingDetails.vue'
import shoppingList from '../components/shoppingList.vue'

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
},{
    path: '/shoppingList',
    component: shoppingList
}, ]

const router = new VueRouter({
    routes
})
export default router