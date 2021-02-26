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
 * @method getMyFavoriteList
 * @description 我的收藏列表
 * @param data type   int  收藏类型：1空间；2房间，默认1
 * @returns object 
 * */
export function getMyFavoriteList(data, headers) {
  return request({
    url: `/api/v1/favorite/my`, // 这边/api/路径，是nginx反向代理路径
    method: 'post',
    headers: headers,
    data: data
  })
}

/**
 * @method favoriteAddSpace
 * @description 收藏空间
 * @param data sid int 空间ID
 * @returns object 
 * */
export function favoriteAddSpace(data, headers) {
  return request({
    url: `/api/v1/favorite/addspace`, // 这边/api/路径，是nginx反向代理路径
    method: 'post',
    headers: headers,
    data: data
  })
}

/**
 * @method favoriteAddRoom
 * @description 收藏房间
 * @param data rid int 房间ID
 * @returns object 
 * */
export function favoriteAddRoom(data, headers) {
  return request({
    url: `/api/v1/favorite/addroom`, // 这边/api/路径，是nginx反向代理路径
    method: 'post',
    headers: headers,
    data: data
  })
}

/**
 * @method favoriteDelete
 * @description 删除收藏
 * @param data id int 收藏ID
 * @returns object 
 * */
export function favoriteDelete(data, headers) {
  return request({
    url: `/api/v1/favorite/delete`, // 这边/api/路径，是nginx反向代理路径
    method: 'post',
    headers: headers,
    data: data
  })
}



