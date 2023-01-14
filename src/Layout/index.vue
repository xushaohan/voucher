<template>
    <!-- <imsBaseLayout class="layout" :showTitle="!$isWXwork" :title="title" @click-right="test">
        <navigation>
            <router-view :class="['content', $isWXwork ? '' : 'showTitle']" :key="$route.name"></router-view>
        </navigation>
    </imsBaseLayout> -->
    <div class="layout">
        <van-nav-bar class="nav-bar" v-show="!$isWXwork" :title="title" left-text="返回" left-arrow @click-left="$router.back()" @click-right="test" />
        <navigation>
            <router-view :class="['content', $isWXwork ? '' : 'showTitle']" :key="$route.name"></router-view>
        </navigation>
    </div>
</template>

<script>
export default {
    name: 'Layout',
    data() {
        return {
            logoClickInfo: [0, 0, 0, 0, 0],
            hideTitleBar: false
        };
    },
    methods: {
        test() {
            let list = this.logoClickInfo;
            const now = +new Date();
            list.push(now);
            list.shift();
            if (list[4] - list[0] < 1000) {
                this.logoClickInfo = [0, 0, 0, 0, 0];
                const consoleEl = document.getElementById('__vconsole');
                if (localStorage.getItem('imsVConsole') == 1) {
                    localStorage.setItem('imsVConsole', 0);
                    consoleEl.style.display = 'none';
                } else {
                    localStorage.setItem('imsVConsole', 1);
                    if (consoleEl) {
                        consoleEl.style.display = 'block';
                    } else {
                        new VConsole();
                    }
                }
                this.log();
            }
        },
        log() {
            console.log(`访问地址:${window.location.href}`);
            console.log(`web版本:${this.version}`);
        }
    },
    computed: {
        title() {
            const { title, barTitle } = this.$route.meta;
            return barTitle || title;
        },
        keepAlive() {
            return this.$store.getters.keepAlive;
        }
    }
};
</script>

<style lang="scss" scoped>
.layout {
    height: 100vh;
    .content {
        position: relative;
        height: 100vh;
        overflow: auto;
    }
    .content.showTitle {
        height: calc(100vh - 46px);
    }
}
</style>
