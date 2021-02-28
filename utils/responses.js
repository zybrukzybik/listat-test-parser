const readResults = require('./readResults')

function responseInvalid(error, context) {
    console.log(error)

    context.status = 400
    context.body = 'invalid'
}

async function responseOk(context) {
    const results = await readResults()

    context.status = 200
    context.body = {ok: results}
}

module.exports = {
    responseOk,
    responseInvalid
}