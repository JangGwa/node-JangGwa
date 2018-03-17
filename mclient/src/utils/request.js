import axios from 'axios'
import { formatToURLSearchParams, formToFormData } from '@/utils'

export const request = (
  requestParams, {
    /** @type {Boolean} application/x-www-form-urlencoded */
    useAppFormData = false,
    /** @type {Boolean} multipart/form-data */
    useMultiFormData = false,
    /** @type {Boolean} formast to URLSearchParams */
    useURLSearchParams = false,
    /** @type {Boolean} formast to FormDate */
    useFormData = false
  } = {}) => {
  let headers
  let data = requestParams.data

  if (useAppFormData) {
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  if (useMultiFormData) {
    headers = {
      'Content-Type': 'multipart/form-data'
    }
  }

  if (useURLSearchParams) {
    data = formatToURLSearchParams(data)
  }

  if (useFormData) {
    data = formToFormData(data)
  }

  requestParams = {
    ...requestParams,
    headers,
    data
  }

  return new Promise((resolve, reject) =>
    axios(requestParams).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  )
}
