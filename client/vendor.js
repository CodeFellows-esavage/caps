'use strict';

const socketClient = require('socket.io-client');
const caps = socketClient.connect('http://localhost:3000/caps');


const stores = ['Amazon', 'Target', 'Khols', 'Zappos', 'Wayfair'];
const addresses = ['Seattle, WA', 'Minneapolis, MN', 'Menomonee Falls, WI', 'Las Vegas, NV', 'Boston, MA'];
const names = ['Leopoldo Cyrille', 'Iacobus Cyprien', 'Faithe Krisztina', 'Mira Dip', 'Grímhildr Johannes'];



// function vendorGenPickUp() {
let storeIndex = Math.trunc(Math.random() * 5);
let nameIndex = Math.trunc(Math.random() * 5);

//this function will be called to generate a pickup
const shipment = {
  store: stores[storeIndex],
  orderId: Date.now(),
  customer: names[nameIndex],
  address: addresses[storeIndex],
};

caps.on('connect', () => {
  console.log(caps.id);
  const request = {
    clientId: 'vendor',
    event: 'delivered',
  };
  caps.emit('getAll', request);
  caps.emit('pickup', shipment);
});

caps.on('delivered', (payload) => {
  console.log(`VENDOR: Thank you for delivering ORDER: ${payload.payload.payload.orderId}`);
  caps.emit('recieved', payload);
});


