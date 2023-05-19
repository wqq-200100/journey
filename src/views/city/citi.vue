<template>
  <div class="city">
    <div class="search">
      <form action="/public">
        <van-search
            v-model="message"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
      </form>
    </div>

    <div class="tab">
      <van-tabs v-model:active="tabActive" color="orange" line-height="3">
        <template v-for="(value,key,index) in allCities" :key="key">
          <van-tab :title='value.title' :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      <template v-for="(value,key,index) in allCities">
        <!--<h2 v-show="tabActive === key">{{ value.title }}</h2> --> <!--平凡切换数据会加载的有点慢-->
        <CityItem v-show="tabActive === key" :groupData="value"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import useCityStore from "@/pinia/modules/city";
import {storeToRefs} from "pinia";
import {showToast} from "vant";
import {useRouter} from "vue-router";
import CityItem from "./cpns/city-item.vue";

const tabActive = ref()

const message = ref('')
const onSearch = val => showToast(val);
const router = useRouter()
const onCancel = () => router.push('/home');

// 网络请求：请求城市的数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const {allCities} = storeToRefs(cityStore) //让数据变成响应式

// 获取选取标签后的数据
const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style scoped lang='less'>
.city {

  .tab {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;


  }

}

</style>
