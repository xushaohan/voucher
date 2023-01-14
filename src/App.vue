<template>
  <div id="app">
    <router-view />
    <div class="dev-tip" v-if="NODE_ENV != 'production'">
      {{ VUE_APP_ENV_NAME }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      NODE_ENV: process.env.NODE_ENV,
      VUE_APP_ENV_NAME: process.env.VUE_APP_ENV_NAME
    }
  }
}
</script>
<style lang="scss" scoped>
.dev-tip {
  position: fixed;
  right: 0;
  bottom: 50px;
  padding: 5px;
  background: yellow;
  z-index: 1;
  border-radius: 5px 0 0 5px;
}
</style>
