import api from '../../index';
import request from '@/utils/request';// axios

// 【我的订单页】调用接口
/**
 * @method getOrderList
 * @description 获取商家所有订单的列表接口（不同订单状态）
 * @param page 页数
 * @returns object 
 * */ 
export function getOrderList(page) {
  return request({
    url: `/api/mock7?page=${page}`, // 这边/api/路径，是nginx反向代理路径
    method: 'get',
  })
}


/**
 * @method  getOrderDetail
 * @description 订单详情页的信息接口 GET
 * @param ID 订单ID
 * @returns object 
 * */ 
export function getOrderDetail(ID) {
  return request({
    url: `/api/`, // 这边/api/路径，是nginx反向代理路径
    method: 'get',
  })
}


