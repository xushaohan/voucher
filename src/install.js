import vant from 'vant';
import { Toast } from 'vant';

import $webViewUtil from './utils/webViewUtil';
import $bus from '@/utils/bus';
import $db from '@/utils/db';
import $utils from '@/utils';
import $formateTime from '@/utils/formateTime';
import $backChange from '@/utils/backChange';

// import imsCheckboxGroup from './components/imsCheckboxGroup';

import { isEmpty } from '@/utils/mUtils';

export default function (Vue) {
    const p = Vue.prototype;
    Vue.use(vant);

    p.$webViewUtil = $webViewUtil;
    p.$bus = $bus;
    p.$utils = $utils;
    p.$db = $db;
    p.$formateTime = $formateTime;
    p.$backChange = $backChange;
    p.isEmpty = isEmpty;
    Vue.prototype.$msgInfo = function (msg) {
        //成功提示
        Toast(msg);
    };
    Vue.prototype.$msgWarn = function (msg) {
        //警告
        Toast(msg);
    };
    Vue.prototype.$msgError = function (msg) {
        //异常
        Toast.fail(msg);
    };
    Vue.prototype.$showLoading = function (msg = '加载中...', forbidClick = true) {
        //loading框
        Toast.loading({
            message: msg,
            forbidClick: forbidClick, //禁止背景点击
            duration: 0 //默认不消失，手动调用$hideToast隐藏
        });
    };
    Vue.prototype.$hideLoading = function () {
        //隐藏toast
        Toast.clear();
    };
    Vue.prototype.$hideToast = function () {
        //隐藏toast
        Toast.clear();
    };
    Vue.prototype.$deepCopy = function (value) {
        //深度复制
        return JSON.parse(JSON.stringify(value));
    };
    var obj = {};
    Object.keys(obj).forEach(key => {
        Vue.component(key, obj[key]);
    });

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    //默认 yyyy-MM-dd hh:mm:ss
    Date.prototype.format = function (fmt) {
        var o = {
            'M+': this.getMonth() + 1, //月份
            'd+': this.getDate(), //日
            'H+': this.getHours(), //小时
            'm+': this.getMinutes(), //分
            's+': this.getSeconds(), //秒
            'q+': Math.floor((this.getMonth() + 3) / 3), //季度
            S: this.getMilliseconds() //毫秒
        };
        if (fmt == null || fmt == undefined) {
            fmt = 'yyyy-MM-dd hh:mm:ss';
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        return fmt;
    };
}
