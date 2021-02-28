const assert = require('assert')

const {isArr, isEmptyArr, isObj, isEmptyObj, isArrWithOneEmptyEl} = require('../utils/validation')
const writeResults = require('../utils/writeResults')
const {responseOk} = require('../utils/responses')
const parser = require('../utils/parser')

async function data(ctx) {
    const body = ctx.request.body

    assert(isObj(body) || !isEmptyObj(body), 'invalid')   //  check obj || empty obj

    const expr = body.expressions

    assert(isArr(expr) && !isEmptyArr(expr) && !isArrWithOneEmptyEl(expr), 'invalid')     //  check arr

    const results = parser(expr)

    await writeResults(results.join('\n'))
    await responseOk()
}

module.exports = data