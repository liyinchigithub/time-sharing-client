import api from '../index'
// axios
import qs from 'qs'
import request from '@/utils/request'

// 【首页】调用接口




/**
 * @description 获取租客需求单列表接口（根据标签类型拉取列表数据）
 * @param  type 标签类型
 * @param page 页码
 * @returns object 
 * */
export function getRequirementList(type,page) {
  return request({
    url: `/api/`,
    method: 'get',
  })
}


/**
 * @method getRequirementDetail
 * @description 获取租客需求单详情接口
 * @param  data
 * @returns object 
 * */
export function getRequirementDetail(data) {
  return request({
    url: `/api/`,
    method: 'get',
  })
}

/**
 * @method recommend
 * @description 推荐他接口（公众号消息推送）
 * @param  data 租客ID
 * @returns object 
 * */
export function recommend(data) {
  return request({
    url: `/api/`,
    method: 'get',
  })
}



// 以下接口，用于本地调试









