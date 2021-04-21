import { createApp } from 'vue'

import App from './App.vue'

import './styles/global.scss'

import router from './routers/router'

import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

app.use(Antd);

app.use(router);

app.mount('#app');
