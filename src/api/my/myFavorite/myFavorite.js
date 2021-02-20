import api from '../../index';
// axios
import qs from 'qs'
import request from '../../../utils/request';// axios

//【我的咨询单】调用接口


/**
 * @method  getFavoriteDetail
 * @description 咨询单详情页的信息接口 GET
 * @param ID 咨询单ID
 * @returns object 
 * */
export function getFavoriteDetail(data, headers) {
  return request({
    url: `/api/v1/consult/get`, // 这边/api/路径，是nginx反向代理路径
    headers: headers,
    data: data,
    method: 'post',
  })
}


/**
 * @method getFavoriteList
 * @description 获取商家咨询单列表接口
 * @param headers OpenID 商家openid
 * @returns object 
 * */
export function getFavoriteList(data, headers) {
  return request({
    url: `/api/v1/consult/my`, // 这边/api/路径，是nginx反向代理路径
    method: 'post',
    headers: headers,
    data:data
  })
}