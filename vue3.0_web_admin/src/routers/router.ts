import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../layout/login/index.vue'
import Home from '../layout/Home/index.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path: '/', component: Home
    },
    { path: '/login', component: Login },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export default router