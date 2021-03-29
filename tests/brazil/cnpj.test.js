const { InvalidEntryError } = require('../../src/errors')

const NIT = require('../../src')

describe('Brazillian CNPJ tests', () => {

  describe('validate function', () => {
    // Validate
    it('Should throw error with no CNPJ provided', () => {
      const validate = () => NIT.Brazil.CNPJ.isValid()
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should throw error with empty CNPJ provide', () => {
      const validate = () => NIT.Brazil.CNPJ.isValid('')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should throw error when providing CNPJ with less than 14 digits', () => {
      const validate = () => NIT.Brazil.CNPJ.isValid('123456789')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should throw error when providing CNPJ with more than 14 digits', () => {
      const validate = () => NIT.Brazil.CNPJ.isValid('123456789101112131415')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should throw error when providing CNPJ with letters', () => {
      const validate = () => NIT.Brazil.CNPJ.isValid('4274A656847478')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should return false on invalid non-formatted CNPJ', () => {
      const validate = NIT.Brazil.CNPJ.isValid('11144477786856')
      expect(validate).toBe(false)
    })

    it('Should return false on invalid formatted CNPJ', () => {
      const validate = NIT.Brazil.CNPJ.isValid('11.144.477/7868-56')
      expect(validate).toBe(false)
    })

    it('Should return true on valid non-formatted CNPJ', () => {
      const validate = NIT.Brazil.CNPJ.isValid('11444777000161')
      expect(validate).toBe(true)
    })

    it('Should return true on valid formatted CNPJ', () => {
      const validate = NIT.Brazil.CNPJ.isValid('11.444.777/0001-61')
      expect(validate).toBe(true)
    })

    it('Should return true on valid non-formatted CNPJ with spaces', () => {
      const validate = NIT.Brazil.CNPJ.isValid('11 444 777 0001 61')
      expect(validate).toBe(true)
    })
  })

  describe('generate function', () => {
    it('Should generate valid non-formatted CNPJ', () => {
      const CNPJ = NIT.Brazil.CNPJ.generate()
      const validate = NIT.Brazil.CNPJ.isValid(CNPJ)
      expect(CNPJ).not.toBeNull()
      expect(validate).toBe(true)
    })

    it('Should generate valid formatted CNPJ', () => {
      const CNPJMask = new RegExp(/([0-9]{2,})\.([0-9]{3,})\.([0-9]{3,})\/([0-9]{4,})-([0-9]{2,})/g)
      const CNPJ = NIT.Brazil.CNPJ.generate({ formatted: true })
      const validate = NIT.Brazil.CNPJ.isValid(CNPJ)

      expect(CNPJ).not.toBeNull()
      expect(validate).toBe(true)
      expect(CNPJMask.test(CNPJ)).toBe(true)
    })
  })

  describe('format function', () => {
    it('Should throw error when providing CNPJ with less than 14 digits', () => {
      const validate = () => NIT.Brazil.CNPJ.format('123456789')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should throw error when providing CNPJ with more than 14 digits', () => {
      const validate = () => NIT.Brazil.CNPJ.format('123456789101112131415')
      expect(validate).toThrow(InvalidEntryError)
    })

    it('Should format already formatted CNPJ', () => {
      const CNPJMask = new RegExp(/([0-9]{2,})\.([0-9]{3,})\.([0-9]{3,})\/([0-9]{4,})-([0-9]{2,})/g)
      const formatted = NIT.Brazil.CNPJ.format('11.444.777/0001-61')
      expect(CNPJMask.test(formatted)).toBe(true)
    })

    it('Should format a CNPJ', () => {
      const CNPJMask = new RegExp(/([0-9]{2,})\.([0-9]{3,})\.([0-9]{3,})\/([0-9]{4,})-([0-9]{2,})/g)
      const formatted = NIT.Brazil.CNPJ.format('11444777000161')
      expect(CNPJMask.test(formatted)).toBe(true)
    })
  })

})