<template>
    <div class="body">
        <van-overlay :show="showDialog">
            <div class="wrapper">
                <div class="content">
                    <van-coupon :coupon="coupon" />
                    <button class="receiveBtn" @click="onReceiveClick">领</button>
                </div>
                <van-icon style="margin: 10px" name="close" size="30" color="gray" @click="onDialogCloseClick" />
            </div>
        </van-overlay>
    </div>
</template>

<script>
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
    name: 'receiveVoucher',
    data() {
        return {
            showDialog: true,
            coupon: coupon
        };
    },

    methods: {
        onReceiveClick() {
            this.$router.push('myVoucher');
        },
        onDialogCloseClick() {
            this.showDialog = false;
            this.$router.push('myVoucher');
        }
    }
};
</script>

<style lang="scss" scoped>
.body {
    // background: url('~@/assets/bg.jpg');
    .van-overlay ::v-deep {
        .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            .content {
                text-align: center;
                width: 80%;
                padding: 10px;
                border-radius: 10px;
                background-color: rgb(243, 57, 57);
                .receiveBtn {
                    width: 50px;
                    height: 50px;
                    border-radius: 99px;
                    font-size: 20px;
                    background-color: orange;
                }
            }
        }
    }
    .van-coupon ::v-deep {
        .van-coupon__corner {
            display: none;
        }
    }
}
</style>
