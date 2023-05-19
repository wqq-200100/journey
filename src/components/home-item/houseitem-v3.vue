<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="">
      </div>

      <div class="infos">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="price">
          <van-rate v-model="score" size="15" color="orange"/>
          <div class="new">￥{{ itemData.finalPrice }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

const score = ref(1)
</script>

<style scoped lang='less'>
.house-item{
  width: 50%;

  .item-inner{
    background-color: #fff;
    border-radius:8px;
    margin: 5px;
    overflow: hidden;
    position: relative;

    .cover{
      img{
        width: 100%;
      }
    }

    .infos{
      position: absolute;
      bottom: 0;
      font-size: 12px;
      color: #fff;
      padding: 12px 8px;

      .name{
        margin-top: 5px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 4px;
        font-size: 14px;
      }
    }
  }
}
</style>
