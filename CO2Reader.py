import serial

defaultPort = '/dev/ttyUSB0'


class MHZ14Reader:
    """
    Simple sensor communication class.
    No calibration method provided to avoid accidental sensor bricking (calibrating to wrong levels)
    """

    _requestSequence = [0xff, 0x01, 0x86, 0x00, 0x00, 0x00, 0x00, 0x00, 0x79]
    """
    https://www.google.com/#q=MH-Z14+datasheet+pdf
    """

    def __init__(self, port, open_connection=True):
        """
        :param string port: path to tty
        :param bool open_connection: should port be opened immediately
        """
        self.port = port
        """TTY name"""
        self.link = None
        """Connection with sensor"""
        if open_connection:
            self.connect()

    def connect(self):
        """
        Open tty connection to sensor
        """
        if self.link is not None:
            self.disconnect()
        self.link = serial.Serial(self.port, 9600, bytesize=serial.EIGHTBITS, parity=serial.PARITY_NONE,
                                  stopbits=serial.STOPBITS_ONE, dsrdtr=True, timeout=5, interCharTimeout=0.1)

    def disconnect(self):
        """
        Terminate sensor connection
        """
        if self.link:
            self.link.close()

    def _send_data_request(self):
        """
        Send data request control sequence
        """
        for byte in self._requestSequence:
            self.link.write(chr(byte))

    def get_status(self):
        """
        Read data from sensor
        :return {ppa, t}|None:
        """
        self._send_data_request()
        response = self.link.read(9)
        if len(response) == 9:
            return {"ppa": ord(response[2]) * 0xff + ord(response[3]), "t": ord(response[4])}
        return None


if __name__ == "__main__":
    import time
    import sys
    import argparse

    parser = argparse.ArgumentParser(description='Read data from MH-Z14 CO2 sensor.')
    parser.add_argument('tty', default=defaultPort, help='tty port to connect', type=str, nargs='?')
    parser.add_argument('timeout', default=10, help='timeout between requests', type=int, nargs='?')
    parser.add_argument('--single', action='store_true', help='single measure')
    parser.add_argument('--quit', '-q', action='store_true', help='be quit')
    args = parser.parse_args()
    port = args.tty
    timeout = args.timeout
    if args.single:
        timeout = 0

    conn = MHZ14Reader(port)
    if not args.quit:
        sys.stderr.write("Connected to %s\n" % conn.link.name)
    while True:
        status = conn.get_status()
        if status:
            print "%s\t%d\t%d" % (time.strftime("%Y-%m-%d %H:%M:%S"), status["ppa"], status["t"])
        else:
            print "No data received"
        sys.stdout.flush()
        if timeout != 0:
            time.sleep(timeout)
        else:
            break
    conn.disconnect()
