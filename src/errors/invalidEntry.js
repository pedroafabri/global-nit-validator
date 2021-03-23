class InvalidEntryError extends Error {
  constructor(...params){
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidEntryError)
    }

    this.name = 'InvalidEntryError'
    this.date = new Date()
  }
}

module.exports = InvalidEntryError