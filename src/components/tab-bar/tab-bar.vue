<template>
  <div class="tab-bar">
    <template v-for="(item,index) in TabBerData">
      <div class="tab-bar-item"
           :class="{active :currentIndex === index}"
           @click=itemClick(index,item)
      >
        <img v-if="currentIndex !== index" :src='getAssetURL(item.imag)' alt="">
        <img v-else :src='getAssetURL(item.activeImag)' alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import TabBerData from "@/assets/data/tabber";
import {getAssetURL} from "@/utils/get_assets";
import {ref} from "vue";
import {useRouter} from "vue-router";

const currentIndex = ref(0)
const router = useRouter()
const itemClick = (index,item) => {
  currentIndex.value = index
  router.push(item.path)
}
</script>

<style scoped lang='less'>
.tab-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 50px;
  display: flex;
  border-top: 1px solid #f3f3f3;
  background-color: #fff;

  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.active {
      color: var(--primary-color);
    }
    .text {
      font-size: 12px;
    }

    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
