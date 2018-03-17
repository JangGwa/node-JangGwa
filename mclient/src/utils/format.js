import 'url-search-params-polyfill'

/** 格式化为 URLSearchParams */
export const formatToURLSearchParams = obj => {
  const urlSearchParams = new URLSearchParams() // eslint-disable-line

  for (const key in obj) {
    urlSearchParams.append(key, obj[key])
  }

  return urlSearchParams
}

/** 格式化为 URLSearchParams */
export const formToFormData = obj => {
  const formDate = new FormData() // eslint-disable-line

  for (const key in obj) {
    formDate.append(key, obj[key])
  }

  return formDate
}

/**
 * 格式化数字
 * @param  {Number} n 传入的数字类型
 * @return {String}   小于10补0的格式
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 格式化时间
 * @param {*} date 时间
 * @return {String} 月/日 时:分
 */
export const formatTime = date => {
  const formatDate = new Date(date)
  // const year = formatDate.getFullYear()
  const month = formatDate.getMonth() + 1
  const day = formatDate.getDate()
  const hour = formatDate.getHours()
  const minute = formatDate.getMinutes()
  // const second = formatDate.getSeconds()

  return `${[month, day].map(formatNumber).join('-')} ${[hour, minute].map(formatNumber).join(':')}`
}

/**
 * 格式化时间
 * @param {*} date 时间
 * @return {String} 年/月/日
 */
export const formatDay = date => {
  const formatDate = new Date(date)
  const year = formatDate.getFullYear()
  const month = formatDate.getMonth() + 1
  const day = formatDate.getDate()
  // const hour = formatDate.getHours()
  // const minute = formatDate.getMinutes()
  // const second = formatDate.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')}`
}

