<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList">
      <van-index-anchor index="热门"/>
      <div class="list">
        <template v-for="(city,index) in groupData.hotCities">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <template v-for="(group,index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group"/>
        <template v-for="(city,indexy) in group.cities" :key="indexy">
          <van-cell :title="city.cityName" @click="cityClick(city)"/>
        </template>
      </template>
    </van-index-bar>

    <!--    <template v-for="(group,index) in groupData.cities" :key="index">
            <h1 class="title">标题：{{ group.group }}</h1>
            <div class="list">
              <template v-for="(city,indexy) in group.cities" :key="indexy">
                <div class="city">{{ city.cityName }}</div>
              </template>
            </div>
        </template>-->
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useRouter} from "vue-router";
import useCityStore from "@/pinia/modules/city";

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 动态映射索引字符列表
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
   list.unshift('*')
  return list
})

// 监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = city => {
  // 选择当前城市（将数据共享出去）
  cityStore.currentCity = city

  // 返回上一级
  router.back()
}
</script>

<style scoped lang='less'>
.list {
  display: flex;
  justify-content: space-around;
  padding: 10px 25px 10px 25px;
  flex-wrap: wrap;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 5px 0;
  }
}
</style>
