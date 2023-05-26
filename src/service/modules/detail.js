import wqRequest from "../request";

export function getDetailInfo(houseId) {
    return wqRequest.get({
        url: '/detail/infos',
        params: {houseId}
    })
}
