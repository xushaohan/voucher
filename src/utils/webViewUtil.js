const { WebViewJavascriptBridge: Android } = window
const setBridge = obj => (bridge = obj)
let bridge = {
  callHandler() {
    console.error('未成功加载控件')
  }
}

window.WVJBCallbacks = [setBridge]
switch (true) {
  case !!Android:
    setBridge(Android)
    break
  default:
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      () => setBridge(WebViewJavascriptBridge),
      false
    )
    break
}
const WVJBIframe = document.createElement('iframe')
WVJBIframe.style.display = 'none'
WVJBIframe.src = 'https://__bridge_loaded__'
document.documentElement.appendChild(WVJBIframe)
setTimeout(() => document.documentElement.removeChild(WVJBIframe), 0)

function emit(handlerName, info, cb) {
  bridge.callHandler(handlerName, info, cb)
}

const webViewUtil = {
  emit,
  scanBarcode(cb) {
    emit(
      'webViewOnClick',
      {
        module: 'camera',
        value: 'scan'
      },
      cb
    )
  },
  //value: -1=报错，0、1=不同的提示音
  playSound(value, cb) {
    emit(
      'webViewOnClick',
      {
        module: 'playSound',
        value: value
      },
      cb
    )
  },
  printFBInfo(value, cb) {
    emit(
      'webViewOnClick',
      {
        module: 'bluetooth',
        value: 'printFBInfo',
        data: value
      },
      cb
    )
  },
  printAllFBInfo(value, cb) {
    emit(
      'webViewOnClick',
      {
        module: 'bluetooth',
        value: 'printAllFBInfo',
        data: value
      },
      cb
    )
  }
}

export default webViewUtil
