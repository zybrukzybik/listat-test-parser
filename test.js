const assert = require('assert')
const {describe, it} = require('mocha')

const parser = require('./utils/parser')

const validData = [
    "1*100/10+40-25",   //  25
    "(10*20)/2",        //  100
    "(50-20)+10",       //  40
    "(5+5)*(40-20)/(1000-900)+(20/10)-(2*5-8)",   //  2
    "(-10*10/(-10)+10)*(-100/(-10))",   //  200
]

const validDataExpected = ['25', '100', '40', '2', '200']

const validDataOnePositiveDigit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

const validDataOneNegativeDigit = ['-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-0']

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

const startWithWrongSymbols = [
    '+100+100'
]

const oneWrongOperator = [
    '*'
]

const oneCorrectOperator = [
    '-'
]

const operatorsOnly = [
    '-+-*/'
]

describe('All', () => {
    describe('Valid symbols', () => {
        it('should calculate whole array', () => {
            assert.deepStrictEqual(parser(validData), validDataExpected)
        })

        it('should calculate if have only one positive digit', () => {
            assert.deepStrictEqual(parser(validDataOnePositiveDigit), validDataOnePositiveDigit)
        });

        it('should calculate if have only one negative digit', () => {
            assert.deepStrictEqual(parser(validDataOneNegativeDigit), validDataOneNegativeDigit)
        });
    })

    describe('Invalid symbols', () => {
        it('should rejects if symbols are not in: "0-9, *, /, +, -, (, )"', () => {
            return assert.throws(() => parser(notValidSymbols), /invalid/)
        })

        it('should rejects if have wrong count of parentheses', () => {
            return assert.throws(() => parser(wrongParentheses), /invalid/)
        })

        it('should rejects if have 2+ same operators together', () => {
            return assert.throws(() => parser(twoMoreSameOp), /invalid/)
        });

        it('should rejects if have 2+ different operators together', () => {
            return assert.throws(() => parser(twoMoreDiffOp), /invalid/)
        });

        it('should rejects if not start with digit or "-"', () => {
            return assert.throws(() => parser(startWithWrongSymbols), /invalid/)
        });

        it('should rejects if have operators only', () => {
            return assert.throws(() => parser(operatorsOnly), /invalid/)
        });

        it('should rejects if have one wrong operator', () => {
            return assert.throws(() => parser(oneWrongOperator), /invalid/)
        });

        it('should rejects if have one correct operator', () => {
            return assert.throws(() => parser(oneCorrectOperator), /invalid/)
        });
    })
})

