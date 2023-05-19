<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <HouseItemV9
            v-if="item.discoveryContentType===3"
            :itemData="item.data"
            @click="itemClick(item.data)"
        />
        <HouseItemV3
            v-else
            :itemData="item.data"
            @click="itemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import HouseItemV9 from "@/components/home-item/houseitem-v9.vue";
import HouseItemV3 from "@/components/home-item/houseitem-v3.vue";

import useHomeStore from "@/pinia/modules/home";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const homeStore = useHomeStore()
const {houseList} = storeToRefs(homeStore)

const router = useRouter()
const itemClick = (item) => {
  // 跳转到detail页面
  router.push('/detail/' + item.houseId)
}

</script>

<style scoped lang='less'>
.content {

  .title {
    padding: 0 15px;
    font-size: 22px;
  }

  .list {
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
