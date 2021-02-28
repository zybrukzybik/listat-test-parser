const fs = require('fs')

function writeResults(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile('results.txt', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

module.exports = writeResults