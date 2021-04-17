exports.generateBody = (size) => {
  let body = ''
  for(let i = 0; i < size; i++) body += Math.floor(Math.random() * 10)
  return body
}

exports.generateDigit = (body, validationVector) => {
  const number = body
    .split('')
    .reverse() // right-to-left validation
    .reduce((acc, curr, index) => acc += Number(curr) * validationVector[index], 0) % 11

  return number < 2 ? 0 : 11 - number
}