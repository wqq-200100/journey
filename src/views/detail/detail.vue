<template>
  <div class="detail top-page">
    <van-nav-bar
        title="房屋详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </div>
</template>

<script setup>
const onClickLeft = () => history.back()
</script>

<style scoped lang='less'>

</style>
