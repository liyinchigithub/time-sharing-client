import api from '../index';
// axios
import qs from 'qs';
import request from '@/utils/request'; // axios

// 通用接口

/**
 * @method getCategoryList
 * @description 获取导航tab标签列表接口
 * @returns object  {
    "code": 0,
    "data": [
        "网红",
        "约拍",
        "下午茶",
        "打卡圣地",
        "安静文艺",
        "美食"
    ],
    "msg": "操作成功"
}
 * */
export function getCategoryList() {
	return request({
		url: `/api/common/category/list`,
		method: 'get'
	});
}

/**
 * @method getAddressList
 * @description 地址数据接口
 * @returns object
 * */
export function getAddressList() {
	return request({
		url: `/api/common/address/list`,
		method: 'get'
	});
}

/**
 * @method ossupload
 * @description 上传图片
 * @param object data  {"file":"文件本地路径"}
 * @returns object
 * {
    "code": 0,
    "data": "https://shihu-trip.oss-cn-beijing.aliyuncs.com/upload/2021-01/25TL8E3HJ4GP8AR.jpg",
    "msg": "操作成功"
   }
 * */
export function ossupload(data) {
	return request({
		url: `/common/ossupload`,
		method: 'post',
		headers: { 'Content-Type': 'multipart/form-data' },
		data: data
	});
}

/**
 * @method geocoder
 * @description 经纬度转地址
 * @param object data  {"lng":"经度","lat":"纬度"}
 * @returns object
 * {
    "code": 0,
    "data": {
        "c": "厦门市",
        "d": "思明区",
        "p": "福建省"
    },
    "msg": "操作成功"
}
 * */
export function geocoder(params) {
	return request({
		url: `/common/geocoder`,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'post',
		data: qs.stringify(params)
	});
}
