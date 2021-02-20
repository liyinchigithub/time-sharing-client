import api from '../index'
// axios
import qs from 'qs'
import request from '@/utils/request'

// 【发布咨询单页】调用接口


/**
 * @method createFavorite
 * @description 创建咨询单接口
 * @param data 商家ID
 * @returns object 
 * */
export function createFavorite(data, headers) {
  return request({
    url: `/api/v1/consult/edit`, // 这边/api/路径，是nginx反向代理路径
    method: 'post',
    headers: headers,
    data: data
  })
}



