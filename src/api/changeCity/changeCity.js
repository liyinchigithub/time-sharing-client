import api from '../index'
// axios
import qs from 'qs'
import request from '@/utils/request'// axios

// 【切换城市页】调用接口

/**
 * @method getCityList
 * @description 获取城市列表
 * @param page 页码
 * @returns object 
 * */
export function getCityList(page) {
  return request({
    url: `/api/`, // 这边/api/路径，是nginx反向代理路径
    method: 'get',
  })
}

