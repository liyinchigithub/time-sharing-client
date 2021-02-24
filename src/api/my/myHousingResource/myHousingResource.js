import api from '../../index'
// axios
import qs from 'qs'
import request from '@/utils/request'// axios


/**
 * @method getCustomerHousingResource
 * @deprecated 获取商家所有房源的列表接口
 * @param object data 
 */
export function getCustomerHousingResourceList(data, headers) {
  return request({
    url: '/api/v1/house/my',
    method: 'post',
    headers: headers,
    data: data,
  })
}

/**
 * @method getCustomerSpaceRoomList
 * @description 获取商家某个空间下所有房间接口（在mySpace.js中）
 * @param 空间ID
 * @returns object 
 * */



/**
 * @method createHousingResource
 * @description 创建房源接口
 * @param data
 * @param headers 商家OpenID
 * @returns object 
 * */
export function createHousingResource(data, headers) {
  return request({
    url: `/api/v1/house/edit/`, // 这边/api/路径，是nginx反向代理路径
    headers: headers,
    data: data,
    method: 'post',
  })
}
/**
 * @method deleteHousingResource
 * @description 删除房源接口
 * @param data 房源ID
 * @returns object 
 * */
export function deleteHousingResource(data, headers) {
  return request({
    url: `/api/v1/house/delete`, // 这边/api/路径，是nginx反向代理路径
    headers: headers,
    data: data,
    method: 'post',
  })
}

/**
 * @method  getHousingResourceDetail
 * @description 获取房源详情页的信息接口
 * @param data 房源ID
 * @param headers 商家OpenID
 * @returns object 
 * */
export function getHousingResourceDetail(data, headers) {
  return request({
    url: `/api/v1/house/get`, // 这边/api/路径，是nginx反向代理路径
    headers: headers,
    data: data,
    method: 'post',
  })
}