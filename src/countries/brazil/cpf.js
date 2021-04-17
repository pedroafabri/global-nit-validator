const { InvalidEntryError } = require('../../errors')
const { generateBody, generateDigit } = require('./common')

// Validation is made right-to-left instead of left-to-right. (Thus the reversed vector.)
const validationVector = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const Mask = new RegExp(/([0-9]{3,})\.([0-9]{3,})\.([0-9]{3,})-([0-9]{2,})/g)

const format = (cpf) => {
  isValid(cpf) // Throws error if CPF is invalid.
  if(Mask.test(cpf)) return cpf
  return `${cpf.substr(0,3)}.${cpf.substr(3,3)}.${cpf.substr(6,3)}-${cpf.substr(9,2)}`
}

// Generates random document
const generate = ({formatted = false} = {}) => {
  let cpf = generateBody(9)
  cpf += generateDigit(cpf, validationVector) // first digit
  cpf += generateDigit(cpf, validationVector) // second digit
  return formatted ? format(cpf) : cpf
}

// Validates document
const isValid = (cpf = '') => {
  cpf = cpf.replace(/[\.-\s]/g, '')
  if(cpf.length !== 11 || cpf.split('').some(isNaN)) throw new InvalidEntryError('Invalid CPF')

  // Generate correct digits
  let body = cpf.substr(0,9)  
  body += generateDigit(body, validationVector)
  body += generateDigit(body, validationVector)

  return cpf.substr(9,2) === body.substr(9,2)
}

// Exports functions
module.exports = {
  isValid,
  generate,
  format
}
