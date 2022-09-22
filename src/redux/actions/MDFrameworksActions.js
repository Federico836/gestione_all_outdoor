const setMDFrameworks = lista => {
    return {type: 'SET_MD_FRAMEWORKS', payload: lista}
}

const getMDFrameworks = lista => {
    return {type: 'GET_MD_FRAMEWORKS', payload: null}
}

const setMDFrameworkUploadStatus = (id,status) => {

    return {type: 'SET_MD_FRAMEWORK_UPLOAD_STATUS', payload: {id,status}}
}

export {
    setMDFrameworks,
    getMDFrameworks,
    setMDFrameworkUploadStatus
}