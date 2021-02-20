import api from '../index';
// axios
import qs from 'qs'
import request from '@/utils/request';// axios

//【完善商家信息页】调用接口

/**
 * @method imageUpload
 * @deprecated 图片上传接口
 * @param data
 * @returns object  
 */
export function imageUpload(data) {
  return request({
    url: '/api/',
    method: 'post',
    data:data
  })
}



/**
 * @method updateUserinfo
 * @deprecated 修改商家信息接口（商家名称、手机号码、头像）注册时也用本接口
 * @param data
 * @returns object  
 */
export function updateUserinfo(data) {
  return request({
    url: '/api/v1/business/update',
    method: 'post',
    data:data
  })
}
