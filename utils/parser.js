const assert = require('assert')

//  CLEANERS
const cleanSpaces = (arr) => arr.map(str => str.replace(/ /g, ''))

//  RegEX-s
const correctSymbolsRe = /[+\-*/()]|\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|1000)\b/g
const correctStartSymbolsRe = /^-\d|^\(|^\d/
const leftParsRe = /\(/g
const rightParsRe = /\)/g
const parsRe = /\(([0-9+\-*/]+)\)/
const invalidOpRe = /(\*){2,}|(\/){2,}|(\+){2,}|(-){2,}/
const invalidOrderOpRe = /\+[-*/]|-[+*/]|\*[+-/]|\/[+\-*]|\d\(|\)\d|\(\)/

//  MATCHERS
const numOpNum = (operator) => new RegExp(`(?<=\\D|)-?\\d+[${operator}]-?\\d+`)
const elAhead = (str, operator) => str.match(new RegExp(`(?<=\\D|)-?\\d+(?=[${operator}])`))
const elBehind = (str, operator) => str.match(new RegExp(`(?<=\\d+[${operator}])-?\\d+`))

//  ASSERTS
const assertSymbols = (str) => {
    const filtered = str.match(correctSymbolsRe)

    assert(filtered, 'invalid symbols')
    assert(str === filtered.join(''), 'invalid symbols')
}

const assertCorrectStartSymbol = (str) => {
    assert(str.match(correctStartSymbolsRe), 'invalid start symbol')
}

const assertInvalidParentheses = (str) => {
    const leftPars = str.match(leftParsRe);
    const rightPars = str.match(rightParsRe)

    if (leftPars && rightPars) {
        assert(leftPars.length === rightPars.length, 'invalid parentheses')
    }
}

const assertInvalidOp = (str) => assert(!str.match(invalidOpRe), 'invalid double operators')

const assertInvalidOrdersOp = (str) => assert(!str.match(invalidOrderOpRe), 'invalid order of operators')

const assertions = (arr, ...assertions) => arr.forEach(str => assertions.forEach(fn => fn(str)))

//  CALCULATIONS
const OPERATORS = ['*', '/', '+', '-']

const ops = {
    '*': (a, b) => Number(a) * Number(b),
    '/': (a, b) => Number(a) / Number(b),
    '+': (a, b) => Number(a) + Number(b),
    '-': (a, b) => Number(a) - Number(b)
}

const operation = (a, b, op) => ops[op](a, b)

const calculator = (str) => {
    const index = (str, operator) => str.indexOf(operator, 1)

    const calc = (str, operator) => {
        const idx = index(str, operator)

        if (idx === -1) return str

        const ahead = elAhead(str, operator)[0]
        const behind = elBehind(str, operator)[0]

        str = str.replace(numOpNum(operator), operation(ahead, behind, operator).toString())
        return calc(str, operator)
    }

    OPERATORS.forEach(operator => str = calc(str, operator))

    return str
}

const calcParentheses = (arr) => {
    const data = (match, p1) => calculator(p1)

    const replacer = (str) => {
        if (str.match(parsRe)) {
            str = str.replace(parsRe, data)
            return replacer(str)
        } else {
            return str
        }
    }

    return arr.map(replacer)
}

const calcNumbers = (arr) => arr.map(calculator)

const parser = (arr) => {
    arr = cleanSpaces(arr)

    assertions(arr,
        assertSymbols,
        assertCorrectStartSymbol,
        assertInvalidParentheses,
        assertInvalidOp,
        assertInvalidOrdersOp
    )

    arr = calcParentheses(arr)

    return calcNumbers(arr)
}

module.exports = parser