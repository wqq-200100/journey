<template>
  <div class="infos">
    <div class="name">{{ topInfos.houseName }}</div>

    <!--  标签  -->
    <div class="tags">
      <template v-for="(item,index) in topInfos.houseTags" :key="index">
      <span class="item" v-if="item.tagText"
            :style="{color:item.tagText.color,background:item.tagText.background.color}">
        {{ item.tagText.text }}
      </span>
      </template>
    </div>

    <!--  评论  -->
    <div class="comment extra">
      <div class="left">
        <span class="score">{{ topInfos.commentBrief.overall }}</span>
        <span class="title">{{ topInfos.commentBrief.scoreTitle }}</span>
        <span class="brief">{{ topInfos.commentBrief.commentBrief }}</span>
      </div>
      <div class="right">
        <span class="count">
          {{ topInfos.commentBrief.totalCount }}条评论
          <van-icon name="arrow"/>
        </span>
      </div>
    </div>

    <!--  位置  -->
    <div class="location extra">
      <div class="left">{{ topInfos.nearByPosition.address }}</div>
      <div class="right">
        <span>地理-周边</span>
        <van-icon name="arrow"/>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  topInfos: {
    type: Object,
    default: () => {
    }
  }
})
</script>

<style scoped lang='less'>
.infos {
  padding: 10px;
  background-color: #fff;

  .name {
    font-size: 18px;
    font-weight: 700;
  }

  .tags {
    margin: 10px 0;

    .item {
      margin: 0 2px;
      font-size: 14px;
    }
  }

  .extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 8px 10px;
    margin: 12px 0;
    background: rgb(245, 247, 250);

    .right {
      color: orange;
      font-size: 14px;
    }
  }

  .comment {
    .left {
      .score {
        font-size: 19px;
        font-weight: 600;
      }

      .title {
        margin-left: 3px;
        font-weight: 600;
        font-size: 14px;
      }

      .brief {
        margin-left: 3px;
        font-size: 12px;
        color: #999999;
      }
    }
  }

  .location {
    .left {
      font-size: 14px;
      font-weight: 700;
    }
  }
}
</style>
