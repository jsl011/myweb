import Request from './request'
// import previewImageById from '@mobile/common/previewImageById'

/**
 * 通用文件上传
 * @param file
 * @param category 必须有值
 * @returns {Promise<{url: string, fileId: *}>}
 */
export const postUploadFile = async (file, category) => {
    const meta = {
        category: 1
    }
    return commonUploadFile(file, meta)
}

/**
 *  删除文件
 * @param fileId
 * @returns {Promise<void>}
 */
export const deleteFile = async (fileId) => {
    await Request({
        url: '/system/file/' + fileId,
        method: 'delete',
        noToast: true
    })
}

/**
 * 基本文件上传，不建议直接使用
 * @param url
 * @param file 文件
 * @param meta 文件业务信息对象（category必须有值）
 * @returns {Promise<{url: string, fileId: *}>}
 */
export const baseUploadFile = async (url, file, meta) => {
    const _data = new FormData()
    _data.append('file', file)
    _data.append('meta', new Blob([JSON.stringify(meta)], {type: "application/json"}))
    let res = await Request({
        url: url,
        method: 'post',
        data: _data,
        noToast: true
    })
    if (res.code === 200) {
        console.log("seccess")
        // return {url: previewImageById(res.data), fileId: res.data, file: file}
    } else {
        return Promise.reject();
    }
}

/**
 * 通用文件上传
 * @param file 文件
 * @param meta 文件业务信息对象（category必须有值）
 * @returns {Promise<{url: string, fileId: *}>}
 */
export const commonUploadFile = async (file, meta) => {
    return baseUploadFile("/system/file/commonUpload", file, meta);
}

/**
 * 上传职工头像
 * @param file
 * @returns {Promise<{url: string, fileId: *}>}
 */
export const uploadStaffAvatarFile = async (file) => {
    const meta = {
        category: '11'
    }
    return commonUploadFile(file, meta)
}


/**
 * 上传管理办法文件
 * @param file
 * @returns {Promise<{url: string, fileId: *}>}
 */
export const uploadRulesFile = async (file) => {
    const meta = {
        category: '6'
    }
    return commonUploadFile(file, meta)
}

/**
 * 上传项目图片
 * @param file
 * @returns {Promise<{url: string, fileId: *}>}
 */
export const uploadProjectImageFile = async (file) => {
    const meta = {
        category: '9'
    }
    return commonUploadFile(file, meta)
}

/**
 * 上传房间图片
 * @param file
 * @returns {Promise<{url: string, fileId: *}>}
 */
export const uploadHouseImageFile = async (file) => {
    const meta = {
        category: '10'
    }
    return commonUploadFile(file, meta)
}

/**
 * 上传公租房住前管理公示文件
 *
 * @param file 文件
 * @param category 公示文件分类
 * @returns {Promise<{url: string, fileId: *}>}
 */
export const uploadPublicPreLivingNoticeFile = (file, category) => {
    return baseUploadFile("/system/file/upload/publicPreLivingNotice", file, {category});
}

/**
 * 获取文件（PDF预览用）
 * @param fileId 文件id
 * @returns 文件路径
 */
export const getFile = (fileId) => {
    // return `${IMAGE_BASE}/system/file/getFile/${fileId}`
    return `http://localhost:8090/system/file/getFile/${fileId}`
}
