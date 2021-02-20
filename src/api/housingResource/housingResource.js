import api from './index'
// axios
import qs from 'qs'
import request from '@/utils/request'// axios
 
// 【发布房源页】调用接口

/**
 * @method getSpaceList
 * @description 获取商家所有空间接口（在mySpace.js中）
 * @param 
 * @returns object 
 * */ 

/**
 * @method 
 * @description 获取商家某个空间下所有房间接口（在mySpace.js中）
 * @param 
 * @returns object 
 * */ 

/**
 * @method getHousingResourceTags
 * @description 获取房源关键标签接口
 * @param 
 * @returns object 
 * */ 
export function getHousingResourceTags(page) {
  return request({
    url: `/api/`, // 这边/api/路径，是nginx反向代理路径
    method: 'get',
  })
}

/**
 * @method 
 * @description 创建房源单接口
 * @param 
 * @returns object 
 * */ 
export function createHousingResource(data) {
  return request({
    url: `/api/`, // 这边/api/路径，是nginx反向代理路径
    method: 'post',
    data:data,
  })
}