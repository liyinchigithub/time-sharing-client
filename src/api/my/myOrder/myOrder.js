import api from '../../index';
import request from '@/utils/request';// axios

// 【我的订单页】调用接口
/**
 * @method getOrderList
 * @description 我的订单列表
 * @param data  status int	状态，1待付款，11待使用，21已完成，31已取消，41已过期，不传则全部
 * @param data  pageNum int	页码，默认1				非必传
 * @param data  pageSize int	每页条数，默认10	非必传
 * @returns object 
 * */ 
export function getOrderList(data,headers) {
  return request({
    url: `/api/v1/order/my`, // 这边/api/路径，是nginx反向代理路径
    headers: headers,
    data: data,
  })
}


/**
 * @method  customerOrderDetail
 * @description 订单详情
 * @param data id 订单ID必传
 * @returns object 
 * */ 
export function customerOrderDetail(data,headers) {
  return request({
    url: `/api/v1/order/get`, // 这边/api/路径，是nginx反向代理路径
    method: 'post',
    headers: headers,
    data: data,
  })
}
/**
 * @method  customerOrderAdd
 * @description 租客预定（租客下单）
 * @param data
 * @returns object 
 * */ 
export function customerOrderAdd(data,headers) {
  return request({
    url: `/api/v1/order/add`, // 这边/api/路径，是nginx反向代理路径
    method: 'post',
    headers: headers,
    data: data,
  })
}


