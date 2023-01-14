<template>
    <div class="body">
        <!-- <van-tabs v-model="curTab">
            <van-tab title="未使用" name="1" />
            <van-tab title="已使用" name="2" />
            <van-tab title="已过期" name="3" />
        </van-tabs> -->
        <van-coupon-list :coupons="coupons" :show-exchange-bar="false" :show-close-button="false" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" @change="onChange" />
    </div>
</template>

<script>
import voucher from '@/components/voucher.vue';
import wxSDK from '@/utils/wxSDK';
const coupon = {
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    reason: '',
    value: 150,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '1.5',
    unitDesc: '元'
};

export default {
    name: 'myVoucher',
    components: {
        voucher
    },
    data() {
        return {
            curTab: '1',
            chosenCoupon: -1,
            disabledCoupons: [coupon],
            coupons: [coupon]
        };
    },

    mounted() {
        this.$showLoading();
        wxSDK
            .getLocation()
            .then(res => {
                this.$hideLoading();
                this.$toast('定位成功: ' + JSON.stringify(res));
            })
            .catch(err => this.$hideLoading());
    },

    methods: {
        onChange(index) {
            console.log('onChange', index);
            this.$router.push('voucherDetail').catch(err => {});
        }
    }
};
</script>

<style lang="scss" scoped>
.body {
    .van-coupon-list ::v-deep {
        .van-coupon__corner {
            display: none;
        }
    }
}
</style>
