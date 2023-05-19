<template>
  <div class="app">
    <router-view/>
    <TabBar v-if="!route.meta.showTabBer"/>
    <Loading/>
  </div>
</template>

<script setup>
import TabBar from "@/components/tab-bar/tab-bar.vue";
import Loading from "@/components/loading/loading.vue";
import {useRoute} from "vue-router";

const route = useRoute()

</script>

<style scoped>

</style>


