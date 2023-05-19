import {defineStore} from "pinia";
import {getCityAll} from "@/service";

export const useCityStore = defineStore('city', {
    state: () => ({
        allCities: {},
        currentCity: {cityName: '成都'}
    }),
    actions: {
        async fetchAllCitiesData() {
            const allCitiesData = await getCityAll()
            this.allCities = allCitiesData.data
        }
    }
})
export default useCityStore
