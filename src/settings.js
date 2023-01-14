const baseURL = process.env.VUE_APP_APIURL;
module.exports = {
    title: '代金券',
    subTitle: '代金券',
    tokenKey: 'imsToken',
    // ims系统统一使用的用户信息键名 本地缓存使用
    userInfoKey: 'imsUserInfo',
    rootPath: '/produceHelper',
    moduleKey: 'voucher',
    baseSize: 14,
    request: {
        // ims系统统一使用的请求头放置token的字段 请求模块使用
        TokenName: 'ACCESS_TOKEN',
        logintype: 'MOBILE',
        baseURL,
        tokenInvalidated: ['10011'],
        // spa 服务返回的成功状态是以 'EV_MESS' 标识
        successCode: [0, '0', 200, '200', 'S'],
        codeKey: ['code', 'EV_TYPE'],
        errorCode: []
    }
};
