<template>
  <div class="detail top-page" ref="detailRef">
    <TabControl :titles="names"
                v-if="showControl"
                class="tabs"
                @tabItemClick="tabClick"
    />
    <van-nav-bar
        title="房屋详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />


    <!--  v-memo="[mainPart]" 只有哪个属性变化了页面才会刷新  -->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <!--  轮播图  -->
      <DetailSwiper :swiperData="mainPart.topModule.housePicture.housePics"/>
      <!--  房屋详情  -->
      <DetailInfos name="描述" :ref="getSectionRef" :topInfos="mainPart.topModule"/>
      <!--  房屋设施  -->
      <DetailFacility name="设施" :ref="getSectionRef"
                      :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <!--  房东介绍   -->
      <DetailLandlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
      <!--  热门评论   -->
      <DetailComment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <!--  预定需知   -->
      <DetailNotice name="须知" :ref="getSectionRef" :orderRules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <!--  位置周边   -->
      <DetailMap name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
      <!--  价格说明   -->
      <DetailIntor :priceIntro="mainPart.introductionModule"/>
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getDetailInfo} from "@/service";
import TabControl from "@/components/tab-control/tab-control.vue";
import DetailSwiper from "./cpns/detail_01-swiper.vue";
import DetailInfos from "./cpns/detail_02-infos.vue";
import DetailFacility from "./cpns/detail_03-facility.vue";
import DetailLandlord from "./cpns/detail_04-landlord.vue";
import DetailComment from "./cpns/detail_05-comment.vue";
import DetailNotice from "./cpns/detail_06-notice.vue";
import DetailMap from "./cpns/detail_07-map.vue";
import DetailIntor from "./cpns/detail_08-intro.vue";
import useScroll from "@/hooks/useScroll";


const route = useRoute()
const router = useRouter()

const onClickLeft = () => {
  router.back()
}

// 发送网络请求
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
const houseId = route.params.id
getDetailInfo(houseId).then(res => {
  detailInfos.value = res.data
})


// tabControl相关的操作
const detailRef = ref()
const {scrollTop} = useScroll(detailRef)
const showControl = computed(() => {
  return scrollTop.value >= 300
})

const sectionEls = ref({}) // 所有的el  结构：{'标题'：el,...}
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = value => {
  const name = value.$el.getAttribute('name') // 拿到某个元素的属性
  sectionEls.value[name] = value.$el
}
const tabClick = index => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop // 距离顶部距离
  if (index !== 0) {
    instance -= 44
  }
  detailRef.value.scrollTo({
    top: instance, // 滚动到对应的位置
    behavior: "smooth" // 平滑滚动
  })
}
</script>

<style scoped lang='less'>
.tabs {
  position: fixed;
  z-index: 99999;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
