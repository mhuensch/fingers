const IoExpander = require('./components/IoExpander')
const NixieDriver = require('./components/NixieDriver')

let ioExpander = new IoExpander(1, 0x20)
function display (number) {
  let entry = NixieDriver.toBinary(number)
  ioExpander.setPinDirection(4, 0)
  ioExpander.writePin(4, entry.c)
  ioExpander.setPinDirection(5, 0)
  ioExpander.writePin(5, entry.b)
  ioExpander.setPinDirection(6, 0)
  ioExpander.writePin(6, entry.d)
  ioExpander.setPinDirection(7, 0)
  ioExpander.writePin(7, entry.a)
}

const OnOffOnToggle = require('./components/OnOffOnToggle')
const toggle = new OnOffOnToggle(17, 4)

const Servo = require('./components/Servo')
const servo = new Servo(14)

let ioExpander2 = new IoExpander(1, 0x21)

let relay = function(value) {
  ioExpander2.setPinDirection(0, 0)
  ioExpander2.writePin(0, value)
}


toggle.on('up', () => {
  console.log('UP')
  relay(1)
  display(9)
  servo.high()
})

toggle.on('down', () => {
  console.log('DOWN')
  relay(1)
  display(0)
  servo.low()
})

toggle.on('off', () => {
  console.log('OFF')
  relay(0)
  servo.mid()
})



