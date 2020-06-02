const IoExpander = require('./IoExpander')

class NixieTube {
  constructor (options) {
    options = Object.assign(
      { bus: 1
      , address: 0x20
      , pin1: 0
      , pin2: 1
      , pin3: 2
      , pin4: 3
      }
    , options || {})

    this.expander = new IoExpander(options.bus, options.address)
    this.pin1 = options.pin1
    this.pin2 = options.pin2
    this.pin3 = options.pin3
    this.pin4 = options.pin4

    this.expander.setPinDirection(this.pin1, 0)
    this.expander.setPinDirection(this.pin2, 0)
    this.expander.setPinDirection(this.pin3, 0)
    this.expander.setPinDirection(this.pin4, 0)
  }

  display (number) {
    let entry = toBinary(number)
    this.expander.writePin(this.pin1, entry.c)
    this.expander.writePin(this.pin2, entry.b)
    this.expander.writePin(this.pin3, entry.d)
    this.expander.writePin(this.pin4, entry.a)
  }
}

function toBinary (value) {
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

module.exports = NixieTube
