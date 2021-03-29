class InvalidEntryError extends Error {
  constructor(...params){
    super(...params)
    this.name = 'InvalidEntryError'
    this.date = new Date()
  }
}

module.exports = InvalidEntryError