const { InvalidEntryError } = require('../../errors')

// Validation is made right-to-left instead of left-to-right. (Thus the reversed vector.)
const validationVector = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const Mask = new RegExp(/([0-9]{3,})\.([0-9]{3,})\.([0-9]{3,})-([0-9]{2,})/g)

const _generateBody = (size = 9) => {
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

const format = (cpf) => {
  isValid(cpf) // Throws error if CPF is invalid.
  if(Mask.test(cpf)) return cpf
  return `${cpf.substr(0,3)}.${cpf.substr(3,3)}.${cpf.substr(6,3)}-${cpf.substr(9,2)}`
}

// Generates random document
const generate = ({formatted = false} = {}) => {
  let cpf = _generateBody()
  cpf += _generateDigit(cpf) // first digit
  cpf += _generateDigit(cpf) // second digit
  return formatted ? format(cpf) : cpf
}

// Validates document
const isValid = (cpf = '') => {
  cpf = cpf.replace(/[\.-\s]/g, '')
  if(cpf.length !== 11 || cpf.split('').some(isNaN)) throw new InvalidEntryError('Invalid CPF')

  // Generate correct digits
  let body = cpf.substr(0,9)  
  body += _generateDigit(body)
  body += _generateDigit(body)

  return cpf.substr(9,2) === body.substr(9,2)
}

// Exports functions
module.exports = {
  isValid,
  generate,
  format
}
