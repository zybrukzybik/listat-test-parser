const {responseOk} = require('../utils/responses')

async function results(ctx) {
    await responseOk(ctx)
}

module.exports = results