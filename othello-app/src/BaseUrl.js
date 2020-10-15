let HOST_ADDRESS, PORT, HTTPS_PROTOCOL = 'https://', SOCKET_PORT = '9090', SOCKET_PROTOCOL = 'ws://';
if (process.env.REACT_APP_STAGE === 'production') {
  HOST_ADDRESS = '3.236.155.83';
  PORT = '8443';
}
else  {
  HTTPS_PROTOCOL = 'http://';
  HOST_ADDRESS = 'localhost';
  PORT = '8092';
}

const BASE_URL = HTTPS_PROTOCOL + HOST_ADDRESS + ':' + PORT;
const SOCKET_URL = SOCKET_PROTOCOL + HOST_ADDRESS + ':' + SOCKET_PORT;

export { SOCKET_URL, BASE_URL };