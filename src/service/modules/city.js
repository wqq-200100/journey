import wqRequest from "../request";

export function getCityAll() {
    return wqRequest.get({
        url:'/city/all'
    })
}
