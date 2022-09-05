const setMDFrameworks = lista => {
    return {type: 'SET_MD_FRAMEWORKS', payload: lista}
}

const getMDFrameworks = lista => {
    return {type: 'GET_MD_FRAMEWORKS', payload: null}
}

export {
    setMDFrameworks,
    getMDFrameworks
}