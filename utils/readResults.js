const fs = require('fs')

function readResults() {
    return new Promise((resolve, reject) => {
        fs.readFile('results.txt', 'utf8', (err, data) => {
            if (err) return reject(err);

            (data) ? data = [data.split('\n')] : data = []
            resolve(data)
        })
    })
}

module.exports = readResults