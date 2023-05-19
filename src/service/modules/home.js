import wqRequest from "../request";

// 热门建议
export function getHoneHotSuggests() {
    return wqRequest.get({
        url: '/home/hotSuggests'
    })
}

// 滚动导航栏
export function getCategories() {
    return wqRequest.get({
        url: '/home/categories'
    })
}

// 热门精选
export function getContent(page) {
    return wqRequest.get({
        url: '/home/houselist',
        params: {
            page,
        }
    })
}
