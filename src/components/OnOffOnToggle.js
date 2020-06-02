// Assumes center poll of switch is wired to 3.3v and left and right polls are wired to
// Gpio pins used below.

const Gpio = require('pigpio').Gpio
const { EventEmitter } = require('events')

class OnOffToggle extends EventEmitter {
  constructor (pinUp, pinDown) {
    super()
    const switchUp = new Gpio(pinUp, {mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, alert: true})
    const switchDown = new Gpio(pinDown, {mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, alert: true})
    switchUp.glitchFilter(10000)
    switchDown.glitchFilter(10000)

    switchUp.on('alert', (level, tick) => {
      if (level == 0) return this.emit('up')
      return this.emit('off')
    })
    
    switchDown.on('alert', (level, tick) => {
      if (level == 0) return this.emit('down')
      return this.emit('off')
    })

  }
}

module.exports = OnOffToggle