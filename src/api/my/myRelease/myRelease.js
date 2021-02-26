import api from '../../index'
// axios
import qs from 'qs'
import request from '@/utils/request'// axios


/**
 * @method myRequirementList
 * @deprecated 我的需求列表
 * @param  data pageNum int 页码，默认1非必传
 * @param  data pageSize int 每页条数，默认10 非必传
 * @returns object 
 * */
export function myRequirementList(data, headers) {
  return request({
    url: '/api/v1/requirement/my',
    method: 'post',
    headers: headers,
    data: data,
  })
}

/**
 * @method releaseRequirement
 * @deprecated 发布需求
 * @param  data 多个参数
 * @returns object 
 * */
export function releaseRequirement(data, headers) {
  return request({
    url: '/api/v1/requirement/add',
    method: 'post',
    headers: headers,
    data: data,
  })
}

/**
 * @method deleteRequirement
 * @deprecated 删除需求
 * @param  data int    需求ID
 * @returns object 
 * */
export function deleteRequirement(data, headers) {
  return request({
    url: '/api/v1/requirement/delete',
    method: 'post',
    headers: headers,
    data: data,
  })
}