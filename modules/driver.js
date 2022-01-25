'use strict';

const eventPool = require('../eventPool');

function driverPickedUp(payload) {
  console.log(`DRIVER: picked up - ${payload.orderId}`);
  eventPool.emit('in-transit');
}

function logDriveDel(payload) {
  console.log(`DRIVER: delivered - ${payload.orderId}`);
}

module.exports = {
  driverPickedUp,
};