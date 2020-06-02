const IoExpander = require('./IoExpander')

class Relay {
  constructor (options) {
    options = Object.assign(
      { bus: 1
      , address: 0x20
      , pin: 0
      }
    , options || {})

    this.expander = new IoExpander(options.bus, options.address)
    this.pin = options.pin

    this.expander.setPinDirection(this.pin, 0)
    this.expander.setPinPullup(this.pin, 0)
  }

  on () {
    this.expander.writePin(this.pin, 0)
  }

  off () {
    this.expander.writePin(this.pin, 1)
  }
}


module.exports = Relay
