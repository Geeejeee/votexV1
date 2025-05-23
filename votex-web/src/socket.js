import { io } from 'socket.io-client';

const socket = io('http://127.0.0.1:5000'); // replace with your IP in development or production

export default socket;
