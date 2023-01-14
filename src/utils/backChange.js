const backChange = {
  back(backChange) {
    // 判断是否支持History API
    if (window.history && window.history.pushState) {
      // 往历史记录里面添加一条新的当前页面的url
      history.pushState(null, null, document.URL)
      // 给 popstate 绑定一个方法 监听页面刷新
      window.addEventListener('popstate', backChange, false) //false阻止默认事件
    }
  },
  remove(backChange) {
    window.removeEventListener('popstate', backChange, false)
  }
}
export default backChange
