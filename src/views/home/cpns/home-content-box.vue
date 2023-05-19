<template>
  <div class="homeContent">
    <!--  位置相关信息  -->
    <div class="section location">
      <div class="position" @click="toCity">{{ currentCity.cityName }}</div>
      <div class="myPosition" @click="positionClick">
        <span>我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!--  日期范围  -->
    <div class="dataBox">
      <div class="section checkTime" @click="showCalendar = true">
        <div class="start">
          <div class="have">入住</div>
          <div class="time">{{ startDateStr }}</div>
        </div>

        <div class="sunTime">
          <div>共 {{ stayCount }} 晚</div>
        </div>

        <div class="clear">
          <div class="have">离店</div>
          <div class="time">{{ endDateStr }}</div>
        </div>
      </div>
      <van-calendar v-model:show="showCalendar"
                    type="range"
                    color="orange"
                    :round="false"
                    :show-confirm="false"
                    @confirm="onConfirm"
      />
    </div>

    <!--  价格、人数选择  -->
    <div class="section limit">
      <div class="priceNum">价格不限</div>
      <div class="peopleNUm">人数不限</div>
    </div>

    <!--  关键字  -->
    <div class="section keyWords">关键字/位置/民宿名</div>

    <!--  热门建议  -->
    <div class="section hotSuggests">
      <template v-for="(item,index) in hotSuggests" :key="index">
        <div class="item" :style="{color:item.tagText.color,background:item.tagText.background.color}">
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!--  搜索按钮  -->
    <div class="section searchBtn">
      <div class="btn" @click="searchBtn">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import useCityStore from "@/pinia/modules/city";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {formatMonthDay, getDiffDays} from "@/utils/format_date";
import useHomeStore from "@/pinia/modules/home";
import useMainStore from "@/pinia/modules/main";

const router = useRouter()
const toCity = () => {
  router.push('/city')
}

// 获取选择的城市
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log("获取位置成功:", res)
  }, err => {
    console.log("获取位置失败:", err)
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}

const cityStore = useCityStore()
const {currentCity} = storeToRefs(cityStore)

// 日期范围的处理
const mainStore = useMainStore()
const {startDate, endDate} = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))

const stayCount = ref(getDiffDays(startDate.value, endDate.value)) // 天数：离开时间-目前时间

let showCalendar = ref(false) // 日历是否需要默认展示
const onConfirm = value => {
  // 1. 设置日期
  const selectStartDate = value[0] // 选择的开始日期
  const selectEndDate = value[1] // 选择的结束日期
  mainStore.startDate = selectStartDate
  mainStore.endDate = selectEndDate
  stayCount.value = getDiffDays(selectStartDate, selectEndDate) // 重新计算天数
  // 2.隐藏日历
  showCalendar.value = false
}

// 热门建议(从pinia中获取数据)
const homeStore = useHomeStore()
const {hotSuggests} = storeToRefs(homeStore)

// 开始搜索
const searchBtn = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName
    }
  })
}
</script>

<style scoped lang='less'>
.homeContent {
  .section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px;
    color: #999;
    height: 40px;
  }

  .location {
    justify-content: space-between;
    font-size: 18px;
    border-bottom: 1px solid #f1e9e9;
    color: #333;

    .myPosition {
      display: flex;
      flex-direction: row;
      align-items: center;

      img {
        width: 23px;
      }

      span {
        margin-right: 3px;
      }
    }
  }

  .checkTime {
    justify-content: space-between;
    border-bottom: 1px solid #f1e9e9;

    .have {
      font-size: 14px;
      margin: 2px 0;
      color: #888;
    }

    .time {
      color: #555;
      font-size: 17px;
    }

    .sunTime {
      color: #333;
    }
  }

  --van-calendar-popup-height: 100%;

  .limit {
    justify-content: space-between;
    border-bottom: 1px solid #f1e9e9;
    color: #333;
    font-size: 17px;
  }

  .keyWords {
    border-bottom: 1px solid #f1e9e9;
  }

  .hotSuggests {
    height: 100%;

    .item {
      padding: 4px 8px;
      border-radius: 14px;
      margin: 3px;
      font-size: 14px;
      line-height: 1.2;
    }
  }

  .searchBtn {
    justify-content: center;

    .btn {
      width: 80%;
      height: 45px;
      background-color: orange;
      color: #fff;
      border-radius: 20px;
      text-align: center;
      line-height: 45px;
    }
  }
}
</style>
