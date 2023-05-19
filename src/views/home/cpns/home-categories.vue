<template>
  <!-- 滚动导航栏 -->
  <div class="categories">
    <template v-for="item in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import useHomeStore from "@/pinia/modules/home";
import {storeToRefs} from "pinia";

const homeStore = useHomeStore()
const {categories} = storeToRefs(homeStore)

</script>

<style scoped lang='less'>
.categories {
  display: flex;
  overflow-x: auto;
  height: 80px;
  padding: 0 5px;
  margin-top: 8px;

  &::-webkit-scrollbar { /*隐藏滚动条*/
    display: none;
  }

  .item {
    width: 70px;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    img {
      width: 32px;
      height: 32px;
    }

    .text {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>
