const mcpadc = require('mcp-spi-adc')
const { EventEmitter } = require('events')

class AnalogConverter extends EventEmitter {
  constructor (channel, sensitivity, speedHz) {
    super()

    speedHz = speedHz || 1350000
    let range = 1 - (sensitivity || 1)

    this.sensor = mcpadc.open(channel, { speedHz }, err => {
      if (err) return this.emit('error', err)
      this.read(range)
    })
  }

  read (range) {
    this.sensor.read((err, reading) => {
      if (err) return this.emit('error', err)

      let low = reading.value - range
      let high = reading.value + range

      if (this.value >= low && this.value <= high) {
        this.read(range)
        return
      }
      
      this.value = reading.value
      this.emit('changed', this.value)
      this.read(range)
    })
  }

}

module.exports = AnalogConverter