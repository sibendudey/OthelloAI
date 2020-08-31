const HOST_ADDRESS = '34.201.10.173';
const PORT = '8443';
const HTTP_PROTOCOL = 'http://';
const HTTPS_PROTOCOL = 'https://';
export const BASE_URL = HTTPS_PROTOCOL + HOST_ADDRESS + ':' + PORT;

const SOCKET_PORT = '9090';
const SOCKET_PROTOCOL = 'ws://';
export const SOCKET_URL = HTTP_PROTOCOL + HOST_ADDRESS + ':' + SOCKET_PORT;
