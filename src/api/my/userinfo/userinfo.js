import api from '../../index';
// axios
import qs from 'qs'
import request from '@/utils/request';// axios

/**
 * @method getUserInfo POST
 * @deprecated 获取用户个人信息接口
 * @param {*} data 
 */ 
export function getUserInfo(headers) {
  return request({
    url: '/api/v1/business/myinfo',
    headers:headers,
    method: 'post',
  })
}

