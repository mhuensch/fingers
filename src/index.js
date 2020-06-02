const IoExpander = require('./components/IoExpander')

const NixieTube = require('./components/NixieTube')
const nixieTube = new NixieTube(
  { bus: 1
  , address: 0x21
  , pin1: 4
  , pin2: 5
  , pin3: 6
  , pin4: 7
  }
)

// const Servo = require('./components/Servo')
// const servo = new Servo(14)



const Relay = require('./components/Relay')
let relay = new Relay({ bus: 1, address: 0x20, pin: 7 })



// let buzz = function() {
//   ioExpander2.setPinDirection(15, 0)
//   ioExpander2.writePin(15, 0)
//   setTimeout(() => ioExpander2.writePin(15, 1), 500)
//   setTimeout(() => ioExpander2.writePin(15, 0), 1000)
//   setTimeout(() => ioExpander2.writePin(15, 1), 1500)
// }


const RotarySwitch = require('./components/RotarySwitch')
const rotarySwitch = new RotarySwitch({ bus: 1, address: 0x21, interrupt: 13, pins: [0, 1, 2, 3] })

rotarySwitch.on('0-ON', _ => {
  console.log('Rotary Switch Pin 0 is ON')
  nixieTube.display(3)
  relay.on()
})

rotarySwitch.on('1-ON', _ => {
  console.log('Rotary Switch Pin 1 is ON')
  nixieTube.display(2)
  relay.on()
})

rotarySwitch.on('2-ON', _ => {
  console.log('Rotary Switch Pin 2 is ON')
  nixieTube.display(1)
  relay.on()
})

rotarySwitch.on('3-ON', _ => {
  console.log('Rotary Switch Pin 3 is ON')
  nixieTube.display(0)
  relay.off()
})





// let ioExpander2 = new IoExpander(1, 0x21)
// ioExpander2.setPinDirection(1, 1)
// ioExpander2.setPinPullup(1, 1)
// ioExpander2.setInterruptOnPin(1, 1)

// const Gpio = require('pigpio').Gpio
// const interrupt = new Gpio(23, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, alert: true })
// interrupt.on('alert', (active, tick) => {
//   if (!active) return
//   let pin = ioExpander2.readInterruptStatus(0).toString(2).length - 1
//   if (pin !== 1) return

//   let capture = ioExpander2.readPin(1)
//   console.log('INTERUPTED', capture === 1 ? 'ON' : 'OFF', pin, capture)
// })




// const OnOffOnToggle = require('./components/OnOffOnToggle')
// const toggle = new OnOffOnToggle(17, 4)
// toggle.on('up', () => {
//   console.log('Toggle UP')
//   relay.on()
//   // buzz()
//   nixieTube.display(9)
// })

// toggle.on('down', () => {
//   console.log('Toggle DOWN')
//   relay.on()
//   // buzz()
//   nixieTube.display(0)
// })

// toggle.on('off', () => {
//   console.log('Toggle OFF')
//   relay.off()
//   // buzz()
// })



// const AnalogConverter = require('./components/AnalogConverter')
// const converter = new AnalogConverter(7, 0.99)
// converter.on('changed', value => console.log(value))




// const knock = new AnalogConverter(1)
// knock.on('changed', value => {
//   if (value < 0.1) return
//   console.log('knock', value)
// })



const connect = require("./components/TouchSensor").connect;
const Gpio = require('pigpio').Gpio
let interrupt = new Gpio(23, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_DOWN, alert: true })


// Connect to the CAP1188 breakout.
// When it's ready, the Promise resolves
// with the CAP1188 instance
connect().then(cap1188 => {
  const touches1 = cap1188.readTouches();
  console.log(touches1);

  interrupt.on('alert', isActive => {
    // touches is an array of booleans
    // true means it's touched, false if not
    const touches = cap1188.readTouches();
    console.log(touches);
  })
});
