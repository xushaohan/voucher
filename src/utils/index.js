import $request from './axios'
import { isEmpty } from './mUtils'
export function throttle(cb, time = 250, wait = true) {
  // cb => 回调函数
  // time => 定时
  // wait => 是否等待

  const self = this // 保存this指向
  let disable = false // 节流标志
  return function (...data) {
    if (disable) return // 如果是禁止状态那么直接跳出
    disable = true // 如果不是禁止状态那么立即设置为禁止
    !wait && cb.call(self, ...data) // 如果不等待那么立即执行

    setTimeout(() => {
      wait && cb.call(self, ...data) // 如果要等待那么到时间后再执行
      disable = false // 关闭禁止状态
    }, time)
  }
}
export default {
  $request,
  isEmpty,
  throttle
}
