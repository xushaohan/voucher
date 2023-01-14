<template>
    <div class="voucher">
        <div :class="['left', data.type]"></div>
        <div>
            <p>编号：</p>
            <p>{{ data.number }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'test',
    components: {},
    mixins: [],
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            types: {
                coupon: '代金卷',
                full: '满减卷',
                discount: '折扣卷',
                convert: '兑换卷'
            }
        };
    },
    created() {},
    mounted() {},
    computed: {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.voucher {
    margin: 10px;
    display: flex;
    border: 1px solid #eee;
    .left.coupon {
        background-color: orange;
    }
    .left.full {
        background-color: red;
    }
    .left.discount {
        background-color: lightblue;
    }
    .left.convert {
        background-color: cornflowerblue;
    }
}
</style>
