/* vite加载动态图片资源 */
export const getAssetURL = image => {
    // 参数一：相对路径  参数二：当前文件的路径
    return new URL(`../assets/img/icon/${image}`, import.meta.url).href
}
