<template>
    <div class="body">
        <van-cell title="优惠券名称" value="测试" />
        <van-cell title="面值" value="￥100" />
        <van-cell title="劵码" value="ascsa4t34" />
        <van-cell title="有效期" value="2022-12-30 至 2023-12-30" />
        <van-cell title="兑换商家" value="测试" />
        <van-cell title="兑换地址" value="去使用" is-link>
            <template #title>
                <span>兑换地址</span>
                <van-icon name="location" color="red" style="margin-left: 10px" />
                <span>广东深深圳市龙华区</span>
            </template>
            <template>
                <span style="color: var(--color-primary)">去使用</span>
            </template>
        </van-cell>
        <van-cell title="使用规则" is-link />
        <div class="qrcode">
            <div id="qrcode"></div>
        </div>
    </div>
</template>

<script>
var QRCode = require('@/utils/qrcode.min.js');
const packageInfo = require('../../../../package.json');
import { getPackageJson } from '@/api/commApi';
export default {
    name: 'voucherDetail',
    data() {
        return {
            qrCode: {},
            version: packageInfo.version
        };
    },
    mounted() {
        this.qrCode = new QRCode(document.getElementById('qrcode'), {
            width: 150,
            height: 150
        });
        this.qrCode.makeCode('ascsa4t34');

        getPackageJson().then(res => {
            console.log('版本号：' + res.version);
            if (res.version != this.version) {
                this.$toast('当前版本与服务器版本不一致，请刷新页面获取最新版本');
            }
        });
    }
};
</script>

<style lang="scss" scoped>
.van-cell ::v-deep {
    .van-cell__value {
        flex: none;
    }
}

.qrcode {
    margin: 15px;
    display: flex;
    justify-content: center;
}
</style>
