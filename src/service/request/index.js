import axios from "axios";
import {BASE_URL, TIMEOUT} from "./config";
import useMainStore from "@/pinia/modules/main";

const mainStore = useMainStore()

class WQRequest {
    constructor(baseURL, timeout = 3000) {
        this.instance = axios.create({
            baseURL,
            timeout
        })
        // 请求拦截
        this.instance.interceptors.request.use(config => {
            mainStore.showLoading = true
            return config
        }, error => {
            return error
        })
        // 响应拦截
        this.instance.interceptors.response.use(res => {
                mainStore.showLoading = false
                return res
            }, error => {
                mainStore.showLoading = false
                return error
            }
        )
    }

    request(config) {
        // mainStore.showLoading = true
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                resolve(res.data)
                // mainStore.showLoading = false
            }).catch(err => {
                reject(err)
                // mainStore.showLoading = false
            })
        })
    }

    get(config) {
        return this.request({...config, method: 'get'})
    }

    post(config) {
        return this.request({...config, method: 'post'})
    }
}

export default new WQRequest(BASE_URL, TIMEOUT)


