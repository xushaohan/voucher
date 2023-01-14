const formatTime = {
  formatData(value) {
    let curDate = new Date(value)
    let y = curDate.getFullYear()
    let m = curDate.getMonth() + 1 //本身就得+1才等于当前月份
    let d = curDate.getDate()
    let h = curDate.getHours()
    let minute = curDate.getMinutes()
    let month = m > 9 ? m : '0' + m
    let day = d > 9 ? d : '0' + d
    let hours = h > 9 ? h : '0' + h
    let minutes = minute > 9 ? minute : '0' + minute
    return (this.value =
      y + '/' + month + '/' + day + ' ' + hours + ':' + minutes)
  }
}

export default formatTime
