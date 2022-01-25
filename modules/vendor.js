'use strict';

const eventPool = require('../eventPool');

// eventPool.on('delivered',)

let stores = ['Amazon', 'Target', 'Khols', 'Zappos', 'Wayfair'];
let addresses = ['Seattle, WA', 'Minneapolis, MN', 'Menomonee Falls, WI', 'Las Vegas, NV', 'Boston, MA'];
let names = ['Leopoldo Cyrille', 'Iacobus Cyprien', 'Faithe Krisztina', 'Mira Dip', 'Grímhildr Johannes'];



function vendorGenPickUp() {
  let storeIndex = Math.trunc(Math.random() * 5);
  let nameIndex = Math.trunc(Math.random() * 5);

  //this function will be called to generate a pickup
  const shipment = {
    store: stores[storeIndex],
    orderId: Date.now(),
    customer: names[nameIndex],
    address: addresses[storeIndex],
  };

  eventPool.emit('pickup', shipment);
}

async function vendorRecieved(payload) {

  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(`VENDOR: Thanks for delivering - ${payload.payload.orderId}`);
}

module.exports = {
  vendorGenPickUp,
  vendorRecieved,
};