'use strict';

const uuid = require('uuid').v4;
const socketio = require('socket.io');

const PORT = process.env.PORT || 3000;
const server = socketio(PORT);
const caps = server.of('/caps');

const queue = {
  logs: {},
  shipments: {},
  addLog: function (log) {
    //function to add a log
    let id = uuid();
    this.logs[id] = log;
    return {
      id,
      payload: log,
    };
  },
  removeLog: function (id) {
    //function to remove a log
    delete queue.logs[id];
  },
  addShipment: function (shipment) {
    //function to add a shipment to the shipmnents log
    let id = uuid();
    this.shipments[id] = shipment;
    return {
      id,
      payload: shipment,
    };
  },
  removeShipment: function (id) {
    //function to remove a shipment
    delete queue.shipments[id];
  },
};

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