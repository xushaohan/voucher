import JSEncrypt from 'jsencrypt'
const encryptor = new JSEncrypt()
const KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCF1gt5vl1WhXQ6yzcQcx/Pg9fmJdwpYvETcwxFwuHh/ATAVax4ntJfc93KkU4BT6ys5bywPq+elojK+ZOL50QxcCx7ZPvfLyHhuG13wOMbofPucPJGWhWBe32MJKM7vd1tomt1Ei8Qi9KStfwFaVCvyCCagN12mZEKsPYwbRCeCwIDAQAB'
encryptor.setPublicKey(
  `-----BEGIN PUBLIC KEY-----${KEY}-----END PUBLIC KEY-----`
)

export default function rsa(data) {
  const str = JSON.stringify(data) || ''
  const arr = str.match(/.{100}/g) || []
  const len = str.length - str.length.toString().substr(-2)
  arr.push(str.substr(len))
  return {
    ims_rsa: arr.map(s => encryptor.encrypt(s)).join()
  }
}
