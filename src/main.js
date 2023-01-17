import 'babel-polyfill';
import Es6Promise from 'es6-promise';
Es6Promise.polyfill();

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import install from './install';
import { Dialog } from 'vant';

// 引入vant全部样式
import 'vant/lib/index.less';

import './style/var.scss';
import './style/global.scss';
import Navigation from 'vue-navigation';
import VConsole from 'vconsole';
Vue.use(Navigation, { router });

Vue.config.productionTip = false;

Vue.prototype.$isWXwork = navigator.userAgent.toLowerCase().includes('wxwork');
new VConsole();

const packageInfo = require('../package.json');
import { getPackageJson } from '@/api/commApi';
getPackageJson().then(res => {
    console.log('服务器版本号：' + res.version, '当前版本号：' + packageInfo.version);
    if (res.version != packageInfo.version) {
        Dialog.confirm({
            message: '当前版本与服务器版本不一致，请刷新页面获取最新版本'
        }).then(() => {
            location.reload();
        });
    }
});

install(Vue);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
