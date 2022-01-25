'use strict';

const eventPool = require('../eventPool');

function driverPickedUp(payload) {
  setTimeout(() => {
    console.log(`DRIVER: picked up - ${payload.orderId}`);
    eventPool.emit('in-transit');
  }, 2000);
}

function driverDelivered(payload) {
  console.log(`DRIVER: delivered - ${payload.payload.orderId}`);
}

module.exports = {
  driverPickedUp,
  driverDelivered,
};