const { InvalidEntryError } = require('../../src/errors')

const NIT = require('../../src')

describe('Brazillian CPF tests', () => {

  describe('validate function', () => {
    // Validate
    it('Should throw error with no CPF provided', () => {
      const validate = () => NIT.Brazil.CPF.isValid()
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should throw error with empty CPF provide', () => {
      const validate = () => NIT.Brazil.CPF.isValid('')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should throw error when providing CPF with less than 11 digits', () => {
      const validate = () => NIT.Brazil.CPF.isValid('123456789')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should throw error when providing CPF with more than 11 digits', () => {
      const validate = () => NIT.Brazil.CPF.isValid('123456789101112')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should throw error when providing CPF with letters', () => {
      const validate = () => NIT.Brazil.CPF.isValid('4274A656847')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should return false on invalid non-formatted CPF', () => {
      const validate = NIT.Brazil.CPF.isValid('11144477786')
      expect(validate).toBe(false)
    })

    it('Should return false on invalid formatted CPF', () => {
      const validate = NIT.Brazil.CPF.isValid('111.444.777-86')
      expect(validate).toBe(false)
    })

    it('Should return true on valid non-formatted CPF', () => {
      const validate = NIT.Brazil.CPF.isValid('55197591030')
      expect(validate).toBe(true)
    })

    it('Should return true on valid formatted CPF', () => {
      const validate = NIT.Brazil.CPF.isValid('551.975.910-30')
      expect(validate).toBe(true)
    })

    it('Should return true on valid non-formatted CPF with spaces', () => {
      const validate = NIT.Brazil.CPF.isValid('551 975 910 30')
      expect(validate).toBe(true)
    })
  })

  describe('generate function', () => {
    it('Should generate valid non-formatted CPF', () => {
      const cpf = NIT.Brazil.CPF.generate()
      const validate = NIT.Brazil.CPF.isValid(cpf)
      expect(cpf).not.toBeNull()
      expect(validate).toBe(true)
    })

    it('Should generate valid formatted CPF', () => {
      const CPFMask = new RegExp(/([0-9]{3,})\.([0-9]{3,})\.([0-9]{3,})-([0-9]{2,})/g)
      const cpf = NIT.Brazil.CPF.generate({ formatted: true })
      const validate = NIT.Brazil.CPF.isValid(cpf)

      expect(cpf).not.toBeNull()
      expect(validate).toBe(true)
      expect(CPFMask.test(cpf)).toBe(true)
    })
  })

  describe('format function', () => {
    it('Should throw error when providing CPF with less than 11 digits', () => {
      const validate = () => NIT.Brazil.CPF.format('123456789')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should throw error when providing CPF with more than 11 digits', () => {
      const validate = () => NIT.Brazil.CPF.format('123456789101112')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should format already formatted CPF', () => {
      const CPFMask = new RegExp(/([0-9]{3,})\.([0-9]{3,})\.([0-9]{3,})-([0-9]{2,})/g)
      const formatted = NIT.Brazil.CPF.format('551.975.910-30')
      expect(CPFMask.test(formatted)).toBe(true)
    })

    it('Should format a CPF', () => {
      const CPFMask = new RegExp(/([0-9]{3,})\.([0-9]{3,})\.([0-9]{3,})-([0-9]{2,})/g)
      const formatted = NIT.Brazil.CPF.format('55197591030')
      expect(CPFMask.test(formatted)).toBe(true)
    })
  })

})