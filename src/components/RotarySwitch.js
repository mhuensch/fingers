const IoExpander = require('./IoExpander')
const { EventEmitter } = require('events')

const Gpio = require('pigpio').Gpio

class RotarySwitch extends EventEmitter {
  constructor (options) {
    super()

    options = Object.assign(
      { bus: 1
      , address: 0x20
      , pins: [0]
      , interrupt: 13
      }
    , options || {})

    this.expander = new IoExpander(options.bus, options.address)
    this.pins = options.pins

    let interrupt = new Gpio(options.interrupt, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, alert: true })

    interrupt.on('alert', isActive => {
      if (isActive === 0) return

      let status = this.expander.readInterruptStatus(0)
      let pin = status.toString(2).length - 1
      if (this.pins.includes(pin) === false) return
    
      let value = this.expander.readPin(pin)
      this.emit(`${pin}-${value === 1 ? 'OFF' : 'ON'}`)
    })

    this.pins.forEach(pin => {
      this.expander.setPinDirection(pin, 1)
      this.expander.setPinPullup(pin, 1)
      this.expander.setInterruptOnPin(pin, 1)
    })
  }
}


module.exports = RotarySwitch




