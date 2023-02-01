import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/Layout';
import NotFind from '@/views/404';
import list from './routes/moduleRouter';
const { rootPath } = require('@/settings.js');
Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
    mode: 'history', //去除路径中的#号
    base: rootPath, //默认为mes模块
    routes: [
        {
            path: '/',
            redirect: '/myVoucher',
            component: Layout,
            children: [
                {
                    path: '/receiveVoucher',
                    name: 'receiveVoucher',
                    meta: {
                        title: '优惠劵领取'
                    },
                    component: () => import('@/views/receiveVoucher')
                },
                {
                    path: '/myVoucher',
                    name: 'myVoucher',
                    meta: {
                        title: '我的优惠劵'
                    },
                    component: () => import('@/views/myVoucher')
                },
                {
                    path: '/voucherDetail',
                    name: 'voucherDetail',
                    meta: {
                        title: '优惠劵详情'
                    },
                    component: () => import('@/views/myVoucher/detail')
                },
                ...list
            ]
        },
        {
            path: '*',
            redirect: '/myVoucher',
            name: 'notfind',
            component: NotFind
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    }
});

//去登录页，本地调试时使用项目内的登录页，否则跳转到index模块的登录页
export const toLogin = () => {
    if (process.env.RUN_TYPE === 'serve') {
        router.replace('login');
    } else {
        location.href = '/login?from=me';
    }
};

export default router;
