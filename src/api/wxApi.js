import { post, get } from '@/utils/axios';

/**
 * 获取js-sdk初始化所需参数
 * @param {} data
 * @returns
 */
export function getInitParams(data) {
    return post('/ims-receive-service/weixin/jsSdk', data);
}

export function getAddressInfo(longitude, latitude) {
    return get('https://api.map.baidu.com/reverse_geocoding/v3/?ak=VnApZZc0QC6RvCN06i4fCyLXb157V2Io&output=json&coordtype=wgs84ll&location=' + latitude + ',' + longitude);
}
