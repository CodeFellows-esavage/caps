'use strict';

const eventPool = require('../eventPool');

async function driverPickedUp(payload) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(`DRIVER: picked up - ${payload.orderId}`);
  eventPool.emit('in-transit');
  // setTimeout(() => {
  //   console.log(`DRIVER: picked up - ${payload.orderId}`);
  //   eventPool.emit('in-transit');
  // }, 2000);
}

function driverDelivered(payload) {
  console.log(`DRIVER: delivered - ${payload.payload.orderId}`);
}

module.exports = {
  driverPickedUp,
  driverDelivered,
};