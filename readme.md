# Example MH-Z14 / MH-Z19 CO2 sensor reader and visualizer

* Read data from UART(serial)-connected MH-Z14 or MH-Z19 sensor using python,
* visualize received data using html and plotly.js library.

## Screenshot of example data
![example](https://cloud.githubusercontent.com/assets/670789/14087148/39050c52-f531-11e5-91cd-ddc8fef7f94a.png)

(peak at 6:50 AM is when my cat walked over my desktop and probably sniffed the sensor)

## Usage

### Connection

Sensor can be queried using 3.3v UART at 9600 bps. Sensor main feed voltage is 5v.

Can be connected to computer using almost any USB-UART converter if voltage matches.

### Querying

```
$ python2 CO2Reader.py /dev/ttyUSB0 10
Connected to /dev/ttyUSB0
2016-03-25 22:04:16     1134    69
...
```
3 fields separated by tab: timestamp, CO2 concentration (ppm), internal sensor temperature (celsius?)
 
Use stream redirection to save data series to file.

`$ python CO2Reader.py /dev/ttyUSB0 >example.log`

### Visualizing

* install npm dependencies `npm install`
* start server `python2 -m SimpleHTTPServer 8088`
* open browser at http://localhost:8088/plot.html
* select your log file in input field

## Technical Specifications MH-Z19


|          Attribute          |            Value            |
|-----------------------------|-----------------------------|
| Target gas                  | Carbon Dioxide CO2          |
| Operating Voltage           | 3.6 to 5.5 Vdc              |
| Operating current           | < 18mA average              |
| Interface levels            | 3.3 Vdc                     |
| Output signal format        | UART or PWM                 |
| Preheat time                | 3 min                       |
| Response time               | <60 s                       |
| Accuracy                    | ± (50 ppm+5% reading value) |
| Measuring range             | 0 to 5000 ppm               |
| Operating temperature range | 0 to + 50°C                 |
| Dimensions                  | 33mm×20mm×9mm(L×W×H)        |


## Wiring

| Function | UART / Signal | MH-Z19 pin |
|----------|---------------|------------|
| Vcc +5V  | +5V           | 6 Vin      |
| GND      | GND           | 7 GND      |
| UART     | TXD0          | 2 RXD      |
| UART     | RXD0          | 3 TXD      |

## Photos

![mhz-19](https://user-images.githubusercontent.com/862951/52826018-38e23800-3113-11e9-92f3-18c99c902ae5.jpg)

## Credits

Forked from https://github.com/alpacagh/MHZ14-CO2-Logger

## Licence

MIT licence
