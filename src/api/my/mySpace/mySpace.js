import api from '../../index';
// axios
import qs from 'qs';
import request from '@/utils/request'; // axios

//【我的空间页】调用接口

/**
 * @method getSpaceList
 * @description 获取商家"我的空间列表"接口（其他页面引用：发布房源、发布咨询单、）
 * @param data form-data
 * @param headers 请求头
 * @returns object 
 * */
export function getSpaceList(data, headers) {
	return request({
		url: `/api/v1/space/my`, // 这边/api/路径，是nginx反向代理路径
		method: 'post',
		headers: headers,
		data: data
	});
}

/**
 * @method getCustomerSpaceRoomList
 * @description 获取商家某个空间下所有房间接口（其他页面引用：发布房源页、发布咨询单页、我的房源页、房间列表页）
 * @param  data 商家ID、空间ID
 * @returns object 
 * */
export function getCustomerSpaceRoomList(data) {
	return request({
		url: `/api/`, // 这边/api/路径，是nginx反向代理路径
		method: 'get'
	});
}

/**
 * @method getSpaceDetail
 * @description 空间详情
 * @param data form-data 空间ID
 * @param headers 请求头
 * @returns object 
 * */
export function getSpaceDetail(params, headers) {
	return request({
		url: `/api/v1/space/get`, // 这边/api/路径，是nginx反向代理路径
		method: 'post',
		headers: headers,
		data: params
	});
}

/**
 * @method createSpace
 * @deprecated 创建空间接口
 * @param data form-data
 * @param headers 请求头
 * @returns object
 */
export function createSpace(data, headers) {
	return request({
		url: '/api/v1/space/edit',
		method: 'post',
		headers: headers,
		data: data
	});
}

/**
 * @method updateSpace
 * @deprecated 编辑空间接口(带空间ID就是编辑，不带ID就是创建)
 * @param  data  空间ID
 * @returns object
 */
export function updateSpace(data) {
	return request({
		url: '/api/v1/space/add',
		method: 'post',
		data: data
	});
}

/**
 * @method deleteSpace
 * @deprecated 删除空间接口
 * @param  data  空间ID
 * @returns object
 */
export function deleteSpace(data, headers) {
	return request({
		url: '/api/v1/space/delete',
		method: 'post',
		headers: headers,
		data
	});
}
