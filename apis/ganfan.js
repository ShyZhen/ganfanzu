import request from '../utils/request';

function getCoupons() {
    return new Promise((resolve, reject) => {
        request.request('GET', '/V1/coupons').then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}
function getCouponsNew() {
    return new Promise((resolve, reject) => {
        request.request('GET', '/V1/coupons-new').then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

/**
 * 默认固定产品列表
 * @param data {platform,page}
 * @returns {Promise<unknown>}
 */
function getProductList(data) {
    return new Promise((resolve, reject) => {
        request.request('POST', '/V1/duomai/list/'+ data.platform, data).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

/**
 * 搜索产品列表
 * @param data {platform,page,query}
 * @returns {Promise<unknown>}
 */
function getQueryList(data) {
    return new Promise((resolve, reject) => {
        request.request('POST', '/V1/duomai/search/'+ data.platform, data).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

/**
 * 获取某个产品的推广链接
 * @param itemUrl {itemUrl}
 * @returns {Promise<unknown>}
 */
function getDetailLink(itemUrl) {
    return new Promise((resolve, reject) => {
        request.request('POST', '/V1/duomai/link/', itemUrl).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

function getCustomProduct() {
    return new Promise((resolve, reject) => {
        request.request('POST', '/V1/duomai/custom').then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

/**
 * 获取产品详情（与list中的一样）
 * @param data {platform,item_id}
 * @returns {Promise<unknown>}
 */
function getProductDetail(data) {
    return new Promise((resolve, reject) => {
        request.request('POST', '/V1/duomai/detail/'+ data.platform, data).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

/**
 * 获取产品 图文 详情
 * @param data {platform,item_id}
 * @returns {Promise<unknown>}
 */
function getProductHtml(data) {
    return new Promise((resolve, reject) => {
        request.request('POST', '/V1/duomai/html/'+ data.platform, data).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

export {
    getProductList, getDetailLink, getCustomProduct, getQueryList, getProductDetail, getProductHtml, getCoupons, getCouponsNew
}
