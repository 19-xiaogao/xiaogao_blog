import { createRouter, createWebHashHistory } from "vue-router";
import { isToken } from '../utils/isToken'
import Login from "../layout/login/index.vue";
import Home from "../layout/Home/index.vue";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/",
        component: Login,
      },
    ],
  },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//路由守卫 判断是否存在token
router.beforeEach((to, form, next) => {
  const token = isToken()
  if (!to.path.includes('login') && !token) {
    next('/login')
  } else {
    next()
  }

})

export default router;
