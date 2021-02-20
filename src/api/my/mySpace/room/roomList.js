import api from '../../../index';
// axios
import qs from 'qs';
import request from '@/utils/request';

// 【房间列表页】调用接口

/**
 * @method createRoom
 * @description 创建房间接口
 * @param data form-data
 * @param headers 请求头
 * @returns object 
 * */

export function createRoom(data, headers) {
	return request({
		url: `/api/v1/room/edit`, // 这边/api/路径，是nginx反向代理路径
		headers: headers,
		data: data,
		method: 'post'
	});
}
/**
 * @method deleteRoom
 * @description 删除房间接口
 * @param data 房间ID
 * @returns object 
 * */

export function deleteRoom(data, headers) {
	return request({
		url: `/api/v1/room/delete`, // 这边/api/路径，是nginx反向代理路径
		method: 'post',
		headers: headers,
		data: data
	});
}

/**
 * @method  getRoomDetail
 * @description 获取房间详情页的信息接口 POST
 * @param data 请求体 房间ID
 * @param headers 请求头 OpenID
 * @returns object 
 * */

export function getRoomDetail(data, headers) {
	return request({
		url: `/api/v1/room/get`, // 这边/api/路径，是nginx反向代理路径、
		method: 'post',
		headers: headers,
		data: data
	});
}

/**
 * @method  collectionRoom
 * @description 收藏房间接口 POST
 * @param data 商家ID、房间ID
 * @returns object 
 * */

export function collectionRoom(data) {
	return request({
		url: `/api/`, // 这边/api/路径，是nginx反向代理路径
		method: 'post',
		data: data
	});
}

// 以下接口，本地调试用
/**
 * @method getRoomList
 * @description 空间-列表接口
 * @param data 请求体
 * @param headers 请求头 OpenID
 * @returns object 
 * */

export function getRoomList(data, headers) {
	return request({
		url: `/api/v1/room/my`, // 这边/api/路径，是nginx反向代理路径
		method: 'post',
		headers: headers,
		data: data
	});
}
