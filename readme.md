# Example MH-Z14 CO2 sensor reader and visualizer

* Read data from UART(serial)-connected MH-Z14 sensor using python,
* visualize received data using html and plotly.js library.

## Usage

### Connection

Sensor can be queried using 3.3v UART at 9600 bps. Sensor main feed voltage is 5v.

Can be connected to computer using almost any USB-UART converter if voltage matches.

### Querying

```
$ python CO2Reader.py /dev/ttyUSB0 10
Connected to /dev/ttyUSB0
2016-03-25 22:04:16     1134    69
...
```
3 fields separated by tab: timestamp, CO2 concentration (ppm), internal sensor temperature (celsius?)
 
Use stream redirection to save data series to file.

`$ python CO2Reader.py /dev/ttyUSB0 >example.log`

### Visualizing

* install npm dependencies `npm install`
* start server `python -m SimpleHTTPServer 8088`
* open browser at http://localhost:8088/plot.html
* select your log file in input field 

## Licence

MIT licence
