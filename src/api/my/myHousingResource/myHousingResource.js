import api from '../../index'
// axios
import qs from 'qs'
import request from '@/utils/request'// axios


/**
 * @method myCustomerHousingResourceList
 * @deprecated 我的房源列表
 * @param  data id int 房间ID必传
 * @returns object 
 * */
export function myCustomerHousingResourceList(data, headers) {
  return request({
    url: '/api/v1/house/my',
    method: 'post',
    headers: headers,
    data: data,
  })
}

/**
 * @method myCustomerHousingResourceDetail
 * @deprecated 房源详情
 * @param  data id int 房间ID必传
 * @returns object 
 * */
export function myCustomerHousingResourceDetail(data, headers) {
  return request({
    url: '/api/v1/house/detail',
    method: 'post',
    headers: headers,
    data: data,
  })
}