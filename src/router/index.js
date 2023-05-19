import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('@/views/home/home.vue'),
    },
    {
        path: '/home',
        component: () => import('@/views/home/home.vue'),
    },
    {
        path: '/city',
        component: () => import('@/views/city/citi.vue'),
        meta: {
            showTabBer: true
        }
    },
    {
        path: '/search',
        component: () => import('@/views/search/search.vue'),
        meta: {
            showTabBer: true
        }
    },
    {
        path: '/detail/:id',
        component: () => import('@/views/detail/detail.vue'),
        meta: {
            showTabBer: true
        }
    },
    {path: '/favor', component: () => import('@/views/favor/favor.vue')},
    {path: '/order', component: () => import('@/views/order/order.vue')},
    {path: '/message', component: () => import('@/views/message/message.vue')},

]

const history = createWebHistory()
const router = createRouter({
    routes,
    history
})
export default router
