'use strict';

const socketClient = require('socket.io-client');
const caps = socketClient.connect('http://localhost:3000/caps');

// caps.on('connect', (socket) => {
//   socket.emit('getAll');
// });

// caps.on('getAll')
caps.on('connect', () => {
  console.log(caps.id);
  const request = {
    clientId: 'driver',
    event: 'pickup',
  };
  caps.emit('getAll', request);
});

caps.on('pickup', async (payload) => {
  console.log(`DRIVER: picked up ORDER: ${payload.payload.payload.orderId}`);

  await new Promise(resolve => setTimeout(resolve, 1500));
  caps.emit('in-transit', payload);

  // driverDelivered(payload);
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log(`DRIVER: delivered ORDER: ${payload.payload.payload.orderId}`);
  caps.emit('delivered', payload);
});