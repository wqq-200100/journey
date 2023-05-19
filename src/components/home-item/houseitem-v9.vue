<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="">
      </div>

      <div class="infos">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="">
          <span>{{ itemData.location }}</span>
        </div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="price">
          <div class="new">￥{{ itemData.finalPrice }}</div>
          <div class="old">￥{{ itemData.productPrice }}</div>
          <div class="tip">{{ itemData?.priceTipBadge?.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style scoped lang='less'>
.house-item {
  width: 50%;

  .item-inner {
    background-color: #fff;
    border-radius: 8px;
    margin: 5px;
    overflow: hidden;

    .cover {
      img {
        width: 100%;
      }
    }

    .infos {
      font-size: 12px;
      color: #888;
      padding: 5px 0;

      .location{
        img{
          width: 15px;
          height: 15px;
        }
      }

      .name {
        margin-top: 6px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #000;
      }

      .summary{
        margin-top: 6px;
      }

      .price {
        display: flex;
        align-items: center;
        margin-top: 6px;
        font-size: 14px;

        .new{
          color: orange;
        }
        .old{
          font-size: 12px;
          text-decoration: line-through;
          margin: 0 5px;
        }
        .tip{
          background-image: linear-gradient(270deg,#f66,#ff9f9f);
          color: #fff;
          padding: 0 6px;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
