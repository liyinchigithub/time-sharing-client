import api from '../index'
// axios
import qs from 'qs'
import request from '@/utils/request'

// 【首页】调用接口


/**
 * @method getResidentMerchantsList
 * @description 常驻商家（空间列表）
 * @param  data
 * @returns object 
 * */
export function getResidentMerchantsList(data,headers) {
  return request({
    url: `/api/v1/space/list`,
    method: 'post',
    headers: headers,
    data: data
  })
}

/**
 * @method getResidentMerchantsListSpaceDetail
 * @description 空间详情
 * @param  data
 * @returns object 
 * */
export function getResidentMerchantsListSpaceDetail(data,headers) {
  return request({
    url: `/api/v1/space/detail`,
    method: 'post',
    headers: headers,
    data: data
  })
}

/**
 * @method getResidentMerchantsListRoomDetail
 * @description 房间详情
 * @param  data
 * @returns object 
 * */
export function getResidentMerchantsListRoomDetail(data,headers) {
  return request({
    url: `/api/v1/room/detail`,
    method: 'post',
    headers: headers,
    data: data
  })
}










