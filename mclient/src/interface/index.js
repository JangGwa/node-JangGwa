import { request } from '@/utils'

export const register = params =>
  request({
    method: 'post',
    url: 'localhost: 3000/register',
    params: {
      ...params
    }
  })
