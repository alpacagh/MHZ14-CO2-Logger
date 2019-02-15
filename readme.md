# Example MH-Z14 / MH-Z19 CO2 sensor reader and visualizer

* Read data from UART(serial)-connected MH-Z14 sensor using python,
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


## Credits

Forked from https://github.com/alpacagh/MHZ14-CO2-Logger

## Licence

MIT licence
