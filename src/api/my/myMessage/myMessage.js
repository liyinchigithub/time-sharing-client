import api from '../../index';
// axios
import qs from 'qs'
import request from '@/utils/request';// axios

//【我的消息页】调用接口

/**
 * @method getMessageList POST
 * @deprecated 获取三种消息类型列表接口
 * @param object data 
 */ 
export function getMessageList(page) {
  return request({
    url: `/api/mock5?page=${page}`,
    method: 'get',
  })
}

/**
 * @method getMessageDetail POST
 * @deprecated 获取消息详情信息接口
 * @param 商家ID
 * @returns object data 
 */ 
export function getMessageDetail(ID) {
  return request({
    url: '/api/',
    method: 'get',

  })
}



