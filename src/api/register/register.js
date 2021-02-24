import api from '../index';
// axios
import qs from 'qs'
import request from '@/utils/request'; // axios

// 【注册页】调用接口

/**
export function getVerifyCode(data) {
 * @method 
 * @description 获取验证码接口
 * @param object data {"mobile":"15959950529"}
 * @returns object 
 * {
	"code": 0,
	"msg": "操作成功"
}
 * */


export function getVerifyCode(params) {
	return request({
		url: `/api/common/sendsmsvc`, // 这边/api/路径，是nginx反向代理路径
		method: 'post',
		data: qs.stringify(params),
		hideloading: true // 隐藏 loading 组件
	})
}


/**
 * @method bindPhone
 * @description 绑定手机号码接口
 * @param object data { "mobile":"15959950529", "code":"验证码"}
 * @returns object 
 * {
	"msg": "操作成功",
	"code": 0
	}
 * */

export function bindPhone(data, headers) {
	return request({
		url: `/api/v1/customer/bind`, // 这边/api/路径，是nginx反向代理路径
		headers: headers,
		method: 'post',
		data:data
	});
}
/**
 * @method 
 * @description 修改租客信息
 * @param object data 
 * @returns object 
 * {
	"msg": "操作成功",
	"code": 0
	}
 * */

export function modifyCustomerInformation(data,headers) {
	return request({
		url: `/api/v1/customer/update`, // 这边/api/路径，是nginx反向代理路径
		method: 'post',
		headers:headers,
		data:data
	});
}

