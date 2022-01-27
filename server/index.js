'use strict';

const uuid = require('uuid').v4;
const socketio = require('socket.io');

const PORT = process.env.PORT || 3000;
const server = socketio(PORT);
const caps = server.of('/caps');

const queue = {
  deliveries: {},
  shipments: {},
  addDelivery: function (payload) {
    //function to add a log
    let id = uuid();
    this.deliveries[id] = payload;
    return {
      id,
      payload: payload,
    };
  },
  removeDelivery: function (id) {
    //function to remove a log
    delete queue.deliveries[id];
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
    // console.log(shipment);
    shipment = queue.addShipment(shipment);
    console.log(queue.shipments);
    caps.emit('pickup', shipment);
  });

  socket.on('in-transit', async (payload) => {
    payload.payload.event = 'in-transit';
    payload.payload.time = new Date;
    console.log(payload);
    caps.to(payload.payload.payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    payload.payload.event = 'delivered';
    payload.payload.time = new Date;
    console.log(payload);
    queue.addDelivery(payload);
    // console.log(queue.logs);
    caps.to(payload.payload.payload.store).emit('delivered', payload);
    queue.removeShipment(payload.id);
  });

  socket.on('recieved', (delivery) => {
    //payload should include the client id, event name, and message id
    queue.removeDelivery(delivery.id);
  });

  socket.on('getAll', (payload) => {
    //payload should include the client id and event name.
    if (payload.clientId === 'driver') {
      Object.keys(queue.shipments).forEach(id => {
        socket.emit('pickup', { id, payload: queue.shipments[id] });
      });
    } else if (payload.clientId === 'vendor') {
      Object.keys(queue.deliveries).forEach(id => {
        socket.emit('delivered', { id, payload: queue.deliveries[id] });
      });
    }
  });
});