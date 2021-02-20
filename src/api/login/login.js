import api from '../index'
// axios
import qs from 'qs'
import request from '@/utils/request'// axios

// 【登录页】调用接口

/**
 * @method wxGetWXCode
 * @description 微信网页授权(获取code)
 * @param String code
 * @returns callback String code
 * */ 
export function wxGetWXCode(code) {
  return request({
    url: `/api/weixin/oauth2?code=${code}&state=STATE` ,
    method: 'get',
  })
}


/**
 * @method wxGetSignature
 * @description 后端接口（签名）
 * @param url 被签名的url地址（当前页面地址，除了#之后部分）
 * @returns callback object signature
 * */ 
export function wxGetSignature(data) {
  return request({
    url: `/api/weixin/sign?url=${data.url}`, // 这边/api/路径，是nginx反向代理路径
    method: 'post',
  })
}







