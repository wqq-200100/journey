import {onMounted, onUnmounted, ref} from "vue";
import {throttle} from 'underscore'

/*export default function useScroll(reachBottomCallBack) {
    // 窗口滚动处理函数
    const scrollListenerHandler = () => {
        const clientHeight = document.documentElement.clientHeight // 屏幕高度
        const scrollTop = document.documentElement.scrollTop // 元素距离它容器顶部的可见高度
        const scrollHeight = document.documentElement.scrollHeight // 所有内容的高度
        if (clientHeight + scrollTop >= scrollHeight) {
            if(reachBottomCallBack) reachBottomCallBack() // 执行传入的回调函数
        }
    }
// 挂载的时候添加监听窗口滚动
    onMounted(() => {
        window.addEventListener('scroll', scrollListenerHandler)
    })

// 卸载的时候移除监听窗口滚动
    onUnmounted(() => {
        window.removeEventListener('scroll', scrollListenerHandler)
    })
}*/

export default function useScroll(elRef) {
    let el = window

    const isReachBottom = ref(false) // 是否达到底部
    const clientHeight = ref(0)  // 屏幕高度
    const scrollTop = ref(0) // 元素距离它容器顶部的可见高度
    const scrollHeight = ref(0) // 所有内容的高度

    // throttle:节流
    const scrollListenerHandler = throttle(() => {
        if(el === window) {
            clientHeight.value = document.documentElement.clientHeight
            scrollTop.value = document.documentElement.scrollTop
            scrollHeight.value = document.documentElement.scrollHeight
        }
        else {
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
        }

        if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
            console.log('滚动到最底部');
            isReachBottom.value = true
        }
    },100)
// 挂载的时候添加监听窗口滚动
    onMounted(() => {
        if(elRef) el = elRef.value
        el.addEventListener('scroll', scrollListenerHandler)
    })

// 卸载的时候移除监听窗口滚动
    onUnmounted(() => {
        el.removeEventListener('scroll', scrollListenerHandler)
    })
    return {isReachBottom, clientHeight, scrollTop, scrollHeight}
}
