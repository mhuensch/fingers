# fingers
A Finger In Every Pi: Breadboard component examples built using Node.js and the Raspberry Pi Zero.

### Quick Start
* [Download the Latest Pi Image](https://www.google.com)
* Burn the Image onto a Micro SD card ([Etcher](https://www.balena.io/etcher/) recommended)
* Insert the Micro SD card and Connect to your Pi
* Clone the github [fingers](https://github.com/mhuensch/fingers.git) repository
* Build out the project [breadboard](readme/breadboard.md)
* Run the example [create an anchor](#anchors-in-markdown)

### Components
* [Raspberry Pi Zero W](https://www.amazon.com/gp/product/B0748MPQT4/ref=ox_sc_saved_title_3?smid=AHALS71WJO58T&psc=1)
* [Micro SD Card](https://www.amazon.com/gp/product/B0834R8CBQ/ref=ppx_yo_dt_b_asin_title_o03_s00?ie=UTF8&th=1)

### Workflow
On Mac: Go > Connect to Server ... > afp://[your ip address]
// Use pi as user and same password as above



* Update the codebase to match the node version in .nvmrc
* git clone the latest code: git clone https://github.com/mhuensch/radio.git
* install the latest packages


* To see pins in terminal for ref run pinout in terminal.  
* Run gpio readall to see current values

I2C Testing:
* lsmod | grep i2c_
* i2cdetect -y 1


*To speed up boot consider:http://himeshp.blogspot.com/2018/08/fast-boot-with-raspberry-pi.html

* To learn pi/node programming: https://www.w3schools.com/nodejs/nodejs_raspberrypi_gpio_intro.asp
* https://www.w3schools.com/nodejs/nodejs_raspberrypi_led_pushbutton.asp

### Wiring Setups
To drop 5V to 3.3V 

5vPower > 2.2K resistor > output wire (will be 3.3V) > 3.3K resistor > ground
See voltage divider in readme/Voltage_Divider.svg

### Libraries
In the past I used onoff for node.  However onoff doesn't support more advanced functions like pwm etc.  So I switched to pigpio which is more specific to the pi.  However, this means that when using to restart any application you must release the lock on registered io's by calling:

const pigpio = require('pigpio')
process.on('SIGUSR2', () => {
  pigpio.terminate()
})

NOTE: terminate() will fail on a normal computer (Mac, PC, etc.) and will need to be wrapped in a try/catch when developing new applications there.  SEE: playbook/playbook.js for a good example.

dotenv has been implemented for process.env settings.  To override these settings create a .env 
file at the root of this project with the following variables:
INTERACTIVE=true
ALLOW_VIRTUAL=true


PI Pinout: you can get the following information by 
running 'pinout' on the Pi in a terminal:

01  3V3**    (1)   (2)   5V***
02  GPIO2**  (3)   (4)   5V***
03  GPIO3**  (5)   (6)   GND
04  GPIO4*   (7)   (8)   GPIO14
05  GND      (9)   (10)  GPIO15
06  GPIO17   (11)  (12)  GPIO18
07  GPIO27   (13)  (14)  GND
08  GPIO22   (15)  (16)  GPIO23
09  3V3**    (17)  (18)  GPIO24
10  GPIO10   (19)  (20)  GND
11  GPIO9    (21)  (22)  GPIO25
12  GPIO11   (23)  (24)  GPIO8*
13  GND      (25)  (26)  GPIO7*
14  GPIO0*   (27)  (28)  GPIO1*
15  GPIO5    (29)  (30)  GND
16  GPIO6    (31)  (32)  GPIO12
17  GPIO13   (33)  (34)  GND
18  GPIO19   (35)  (36)  GPIO16
19  GPIO26   (37)  (38)  GPIO20
20  GND      (39)  (40)  GPIO21

The pins marked with *'s are powered - by default -
when the Pi is powered and no application is connected.

  *   - low power (under 3v)
  **  - 3V of power
  *** - 5V of power

For this reason, you shouldn't connect indicators to these pins
as the indicators will be in powered state until connected
with this node.js application.


TODO: Improve menu and logging
TODO: Improve reloading
TODO: separate indicators and controls.  Indicators do not need to be Emitters
TODO: build the menu from controls that implement change and pass in a value with the selection
  i.e. power 0 -- or  --- power 1 to turn off and on the power
  Not sure how we would handle shave and a haircut in this case but it probably should be an 
  override in the menu options for the chapter - not part of the control.
TODO: move GPOID registration into control and indicator but find some way to check unique assignment at playbook start

## Building the Raspberry Pi Image from Scratch
These are the instructions for building the Pi Image above.  If you use that image, there is no need to do these steps, however, I recognize you may need rebuild this image at some point or that you might want to know how the image was created.

#### Install Raspbian
1. Format at least an 8GB [Micro SD Card](https://www.amazon.com/gp/product/B0834R8CBQ/ref=ppx_yo_dt_b_asin_title_o03_s00?ie=UTF8&th=1) card as FAT/MSDOS (I recommend the 32GB card)
1. [Download](https://downloads.raspberrypi.org/NOOBS_lite_latest) NOOBS Lite
1. Unzip and copy folder contents to the root of the SD card
1. Plug-in Micro SD, HDMI cable, and Keyboard (with mouse attached to KB) to Pi
1. Attach power to the Pi from any 5v source (micro USB recommended)
1. Automatically BOOT into installer and connect to WIFI
1. Select desired OS (recommended Raspbian Lite)
1. Wait for install to finish and wait for auto restart
1. Default user: pi, password: raspberry
1. Find the IP by executing: sudo hostname -I
1. Open the Configuration Tool: sudo raspi-config
1. Change the password
1. Boot: Wait for Network > NO
1. Enable SSH: Interfacing Options > SSH > YES
1. Enable IC2: Interfacing Options > I2C > YES
1. Rename Host:  Network Options > Hostname > [project]
1. Save: FINISH
1. Reboot: sudo reboot
1. (Optional) Disconnect HDMI, Keyboard & Mouse

#### Install Software
1. Switch to main computer to continue ...
1. Connect to PI by starting SSH in Mac terminal: ssh pi@[ipaddress]
1. Enter your password
1. Update: sudo apt update
1. Upgrade: sudo apt upgrade
1. Install Git: sudo apt install git
1. Install IC2 Tools: sudo apt-get install -y python-smbus i2c-tools
1. Install PIGPIO: sudo apt-get install pigpio
1. Install Node.js: wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v.lts.sh | bash
1. Install Apple Filing Protocol: sudo apt install netatalk
1. Edit Apple Filing Protocal Config:
  * sudo nano /etc/netatalk/afp.conf
  * Uncomment and modify lines: [Homes] basedir regex = /home
1. Reboot: sudo reboot

#### Create Image
1. Power down Raspberry Pi
1. Connect Micro SD card to computer
1. Create image from SD card (Mac use Disk Utility > Right Click > Image)
1. Rename the file extension to .iso

#### Use Image
1. Download [Etcher](https://www.balena.io/etcher/)
1. Open etcher
1. Flash from file to target Micro SD card

-- You now have an image and a test Micro SD card!!

## Reasoning
My goal with this project is to document explanations, wiring diagrams, code, and examples for all the most common components (i.e. fingers) I use in my projects.

I chose Node.js for my projects because it allows me to develop large codebases on a Mac (without a micro-controller) and then port that code to an external device.  Yes other languages would have supported this workflow as well, but javascript is available at all levels of the development stack - from web client to micro-controller - so it just made sense.

I chose the Raspberry Pi Zero based on it's form factor, flexibility, and price.  It's easy to setup, configure, deploy, and debug projects built on the Pi in a way that just wasn't possible using other alternatives (Arduino's and their clones etc.).  Even micro-controllers that supported javascript natively (Espruino and Neonious One), don't support a full feature set and come at a much higher price tag.  I've seen people make the argument that using the Rasberry Pi in this way is "overkill", but as a hobbyist, I think this argument is invalidated by the intersection of price and time to finish a project.  No other alternative even comes close.

As a software developer, I am accustom to starting from a project template and modifying/adapting/adding my own components to build out that project.  Think of Ember/Vue/Angular CLI tools, Bootstrap for CSS, etc.  In contrast, examples in the circuit/micro-controller space seem to fall into two categories - really simple blinking LEDs or specific and complicated full blown projects.  There aren't any equivalent "TODO List" projects that you can start from and build out from there.  This repository is my answer to that problem.