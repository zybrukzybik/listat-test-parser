const assert = require('assert')
const {describe, it} = require('mocha')

const final = require('./utils/parser')

const validData = [
    "1*100/10+40-25",   //  25
    "(10*20)/2",        //  100
    "(50-20)+10",       //  40
    "(5+5)*(40-20)/(1000-900)+(20/10)-(2*5-8)",   //  2
    "(-10*10/(-10)+10)*(-100/(-10))",   //  200
]

const validDataExpected = [
    25,
    100,
    40,
    2,
    200
]

const notValidSymbols = [
    'a,.\\|&^%$#@!`"\''
]

const wrongParentheses = [
    '-2+3-(1+2))'
]

const twoMoreSameOp = [
    '100+200++100'
]

const twoMoreDiffOp = [
    '100*10-+9'
]

describe('All', () => {
    describe('Valid symbols', () => {
        it('should calculate', () => {
            assert.deepStrictEqual(final(validData), validDataExpected)
        })
    })

    describe('Invalid symbols', () => {
        it('should rejects if symbols are not in: "0-9, *, /, +, -, (, )"', () => {
            return assert.throws(() => final(notValidSymbols), /invalid/)
        })

        it('should rejects if have wrong count of parentheses', () => {
            return assert.throws(() => final(wrongParentheses), /invalid/)
        })

        it('should rejects if have 2+ same operators together', () => {
            return assert.throws(() => final(twoMoreSameOp), /invalid/)
        });

        it('should rejects if have 2+ different operators together', () => {
            return assert.throws(() => final(twoMoreDiffOp), /invalid/)
        });
    })
})

