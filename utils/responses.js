const readResults = require('./readResults')

function responseInvalid(error, ctx) {
    console.log(error)

    ctx.status = 400
    ctx.body = 'invalid'
}

async function responseOk(ctx) {
    const results = await readResults()

    ctx.status = 200
    ctx.body = {results: results}
}

module.exports = {
    responseOk,
    responseInvalid
}