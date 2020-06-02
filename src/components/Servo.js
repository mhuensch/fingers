// Assumes center poll of switch is wired to 3.3v and left and right polls are wired to
// Gpio pins used below.

const Gpio = require('pigpio').Gpio

class Servo {
  constructor (pin) {
    this.motor = new Gpio(pin, {mode: Gpio.OUTPUT, pullUpDown: Gpio.PUD_DOWN})
  }

  high () {
    this.motor.servoWrite(2000)
  }

  mid () {
    this.motor.servoWrite(1500)
  }

  low () {
    this.motor.servoWrite(1000)
  }

  off () {
    this.motor.servoWrite(0)
  }
}

module.exports = Servo