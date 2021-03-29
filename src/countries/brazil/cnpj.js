const { InvalidEntryError } = require('../../errors')

// Validation is made right-to-left instead of left-to-right. (Thus the reversed vector.)
const validationVector = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6] 
const Mask = new RegExp(/([0-9]{2,})\.([0-9]{3,})\.([0-9]{3,})\/([0-9]{4,})-([0-9]{2,})/g)


const _generateBody = (size = 12) => {
  let body = ''
  for(let i = 0; i < size; i++) body += Math.floor(Math.random() * 10)
  return body
}

const _generateDigit = (body) => {
  const number = body
    .split('')
    .reverse() // right-to-left validation
    .reduce((acc, curr, index) => acc += Number(curr) * validationVector[index], 0) % 11

  return number < 2 ? 0 : 11 - number
}

const format = (cnpj) => {
  isValid(cnpj) // Throws error if cnpj is invalid.
  if(Mask.test(cnpj)) return cnpj
  return `${cnpj.substr(0,2)}.${cnpj.substr(2,3)}.${cnpj.substr(5,3)}/${cnpj.substr(8,4)}-${cnpj.substr(12,2)}`
}

// Generates random document
const generate = ({formatted = false} = {}) => {
  let cnpj = _generateBody()
  cnpj += _generateDigit(cnpj) // first digit
  cnpj += _generateDigit(cnpj) // second digit
  return formatted ? format(cnpj) : cnpj
}

// Validates document
const isValid = (cnpj = '') => {
  cnpj = cnpj.replace(/[\.-\s\/]/g, '')
  if(cnpj.length !== 14 || cnpj.split('').some(isNaN)) throw new InvalidEntryError('Invalid CNPJ.')

  // Generate correct digits
  let body = cnpj.substr(0,12)  
  body += _generateDigit(body)
  body += _generateDigit(body)

  return cnpj.substr(12,2) === body.substr(12,2)
}

// Exports functions
module.exports = {
  isValid,
  generate,
  format
}
