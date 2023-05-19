<template>
  <div class="home">
    <HomeNavBar/>
    <ContentBox/>
    <Categories/>
    <div class="search-bar" v-if="isShowSearchBar">
      <SearchBar :startDateStr="'09-12'" :endDateStr="'09-20'"/>
    </div>
    <Content/>
  </div>
</template>

<script setup>
import HomeNavBar from "./cpns/home-nav-bar.vue";
import ContentBox from "./cpns/home-content-box.vue";
import Categories from "./cpns/home-categories.vue";
import Content from "./cpns/home-content.vue";
import SearchBar from "@/components/search-bar/search-bar.vue";

import useHomeStore from "@/pinia/modules/home";
import useScroll from "@/hooks/useScroll";
import {computed, ref, watch} from "vue";

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHoneHotSuggests()
homeStore.fetchCategories()
homeStore.fetchContent()

// 加载更多 方法一：传入一个回调函数
/*useScroll(() => {
  homeStore.fetchContent()
})*/
// 方法二：监听值的变化
const {isReachBottom, scrollTop} = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {  // 值为true则加载更多
    homeStore.fetchContent().then(() => {
      isReachBottom.value = false // 有了结果再改
    })
  }
})

// 搜索框显示的控制  方式一：
/*const isShowSearchBar = ref(false)
watch(scrollTop, (newTop) => {
  isShowSearchBar.value = newTop > 100
})*/
// 方式二：定义可响应式数据，依赖另外一个可响应式数据，就可以使用计算属性
const isShowSearchBar = computed(() => {
  return scrollTop.value > 650
})

</script>

<style scoped lang='less'>
.home {
  overflow-y: auto;
  padding-bottom: 60px;

  .search-bar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
    z-index: 999;
  }
}
</style>
