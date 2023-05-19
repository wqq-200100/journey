import {defineStore} from "pinia";
import {getCategories, getContent, getHoneHotSuggests} from "@/service";

const useHomeStore = defineStore('home', {
    state: () => ({
        hotSuggests: [],
        categories: [],
        houseList: [],
        page: 1
    }),
    actions: {
        // 热门建议
        async fetchHoneHotSuggests() {
            const hotSuggests = await getHoneHotSuggests()
            this.hotSuggests = hotSuggests.data
        },
        // 滚动导航栏
        async fetchCategories() {
            const categories = await getCategories()
            this.categories = categories.data
        },
        // 热门精选
        async fetchContent() {
            const res = await getContent(this.page)
            this.houseList.push(...res.data)
            this.page++
        }
    }
})

export default useHomeStore
