const HOST_ADDRESS = '35.153.31.251';
const PORT = '8092';
const HTTP_PROTOCOL = 'http://';
export const BASE_URL = HTTP_PROTOCOL + HOST_ADDRESS + ':' + PORT;

const SOCKET_PORT = '9090';
const SOCKET_PROTOCOL = 'ws://';
export const SOCKET_URL = HTTP_PROTOCOL + HOST_ADDRESS + ':' + SOCKET_PORT;
