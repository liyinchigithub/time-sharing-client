import api from '../../index';
// axios
import qs from 'qs'
import request from '@/utils/request';// axios

//【我的消息页】调用接口

/**
 * @method getMessageItemList POST
 * @deprecated  我的消息列表
 * @param  data  int pageNum 1
 * @param  data  int pageSize 1000
 */ 
export function getMessageItemList(data,headers) {
  return request({
    url: `/api/v1/message/list`,
    method: 'post',
    headers: headers,
    data: data
  })
}

/**
 * @method getMessageDetail POST
 * @deprecated  消息详情
 * @param data 消息ID
 * @returns object
 */ 
export function getMessageDetail(data,headers) {
  return request({
    url: '/api/v1/message/detail',
    method: 'post',
    headers: headers,
    data: data

  })
}



