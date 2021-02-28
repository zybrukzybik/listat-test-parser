const readResults = require('../utils/readResults')

async function results(ctx) {
    let fileData = await readResults();

    ctx.statusCode = 200
    ctx.body = {results: fileData}
}

module.exports = results