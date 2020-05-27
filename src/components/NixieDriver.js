class NixieDriver {
  static toBinary (value) {
    value = value != null ? value : 10
    let binaryValue = value.toString(2).padStart(4, '0')
    return (
      { a: parseInt(binaryValue[3])
      , b: parseInt(binaryValue[2])
      , c: parseInt(binaryValue[1])
      , d: parseInt(binaryValue[0])
      }
    )
  }
}

module.exports = NixieDriver