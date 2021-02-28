function isArr(arr) {
    return (Array.isArray(arr))
}

function isEmptyArr(arr) {
    return (arr.length === 0)
}

function isObj(obj) {
    return ((obj === null) || (Array.isArray(obj)) || typeof obj == 'function') ? false : (typeof obj == 'object')
}

function isEmptyObj(obj) {
    return (Object.keys(obj).length === 0)
}

function isArrWithOneEmptyEl(arr) {
    const elem = arr[0].replace(/ /g, '')
    return (arr.length === 1 && elem === '')
}

module.exports = {
    isArr,
    isEmptyArr,
    isObj,
    isEmptyObj,
    isArrWithOneEmptyEl
}