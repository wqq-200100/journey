<template>
  <h2>开始时间：{{ $route.query.startDate }}</h2>
  <h2>结束时间：{{ $route.query.endDate }}</h2>
  <h2>当前城市：{{ $route.query.currentCity }}</h2>
  <button @click="goHome">返回首页</button>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

const goHome = () => {
  router.back()
}
</script>

<style scoped lang='less'>

</style>
