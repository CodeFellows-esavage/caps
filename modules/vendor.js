'use strict';

const eventPool = require('../eventPool');

// eventPool.on('delivered',)


function vendorGenPickUp() {
  //this function will be called to generate a pickup
  const shipment = {
    store: '<store-name>',
    orderId: '<unique-order-id>',
    customer: '<customer-name>',
    address: '<city-state>',
  };

  eventPool.emit('pickup', shipment);
}

function vendorRecieved(payload) {
  console.log(`VENDOR: Thanks for delivering - ${payload.orderId}`);
}

module.exports = {
  vendorGenPickUp,
  vendorRecieved,
};