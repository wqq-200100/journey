<template>
  <div class="loading"
       @click="loadingClick"
       v-show="mainStore.showLoading">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="">
    </div>
  </div>
</template>

<script setup>
import useMainStore from "@/pinia/modules/main";

const mainStore = useMainStore()

const loadingClick = () => {
  mainStore.showLoading = false
}
</script>

<style scoped lang='less'>
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.1);

  .bg{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 104px;
    height: 104px;
    background: url("@/assets/img/home/loading-bg.png") 0 0 / 100% 100%;

    img{
      width: 70px;
      height: 70px;
      margin-bottom: 11px;
    }
  }
}
</style>
