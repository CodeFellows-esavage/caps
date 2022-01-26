'use strict';

const socketio = require('socket.io');
const PORT = process.env.PORT || 3000;
const server = socketio(PORT);

const caps = server.of('/caps');

class EVENT {
  constructor(event, time, payload) {
    this.event = event;
    this.time = time;
    this.payload = payload;
  }
}

caps.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('pickup', (payload) => {
    socket.join(payload.store);
    let shipment = new EVENT('pickup', new Date, payload);
    console.log(shipment);
    caps.emit('pickup', shipment);
  });

  socket.on('in-transit', async (payload) => {
    payload.event = 'in-transit';
    payload.time = new Date;
    console.log(payload);
    caps.to(payload.payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    payload.event = 'delivered';
    payload.time = new Date;
    console.log(payload);
    caps.to(payload.payload.store).emit('delivered', payload);
  });
});