<template>
  <!--  轮播图  -->
  <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
    <template v-for="(item,index) in swiperData" :key="index">
      <van-swipe-item class="swiper-item">
        <img :src="item.url" alt="">
      </van-swipe-item>
    </template>

    <!--  自定义指示器  -->
    <template #indicator="{ active, total }">
      <!--  <div class="indicator">{{ active }} - {{ total }}</div>  -->
      <div class="indicator">
        <template v-for="(value,key,index) in swiperGroup" :key="key">
          <span class="item" :class="{active: swiperData[active]?.enumPictureCategory == key}">
            <span class="text">
              {{ getName(value[0].title) }}
            </span>
            <span class="count" v-if=" swiperData[active]?.enumPictureCategory == key">
              {{ getCategoryIndex(swiperData[active]) }} / {{ value.length }}
            </span>
          </span>
        </template>
      </div>
    </template>
  </van-swipe>
</template>

<script setup>
const props = defineProps({
  swiperData: {
    type: Array,
    default: () => []
  }
})

// 处理数据
const swiperGroup = {}
// 思路一：两次循环
/*for (const item of props.swiperData) {
  swiperGroup[item.enumPictureCategory] = []
}
for (const item of props.swiperData) {
  const valueArray = swiperGroup[item.enumPictureCategory]
  valueArray.push(item)
}*/

// 思路二：一次循环
for (const item of props.swiperData) {
  let valueArray = swiperGroup[item.enumPictureCategory]
  if (!valueArray) {
    valueArray = []
    swiperGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}

// 定义转换数据的方法
const nameReg = /【(.*?)】/i
const getName = name => {
  // return name.replace('：', '').replace('【','').replace('】','')
  return nameReg.exec(name)[1]
}

// 类别当中的索引
const getCategoryIndex = item => {
  const valueArray = swiperGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}


</script>

<style scoped lang='less'>
img {
  width: 100%;
}

.indicator {
  position: absolute;
  right: 5px;
  bottom: 7px;
  display: flex;
  padding: 2px 5px;
  font-size: 12px;
  color: #fff;
  background: rgba(23, 1, 1, 0.2);


  .item {
    margin: 0 5px;

    &.active {
      padding: 0 3px;
      border-radius: 3px;
      background-color: #fff;
      color: #333;
    }
  }
}
</style>
