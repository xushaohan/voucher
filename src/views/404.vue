<template>
  <van-empty description="当前页面不存在">
    <van-button
      type="info"
      class="bottom-button"
      @click="$router.push({ path: '/' })"
      >回到首页</van-button
    >
  </van-empty>
</template>

<script>
export default {
  name: 'Notfind'
}
</script>
