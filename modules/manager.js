'use strict';

const eventPool = require('../eventPool');


let shipment;

class EVENT {
  constructor(event, time, payload) {
    this.event = event;
    this.time = time;
    this.payload = payload;
  }
}


function logVendPU(payload) {
  let event = new EVENT('pickup', new Date, payload);
  shipment = event;
  console.log(shipment);
}

async function logTrans() {
  //payload doesn't transfer...
  shipment.event = 'in-transit';
  shipment.time = new Date;

  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(shipment);

  await new Promise(resolve => setTimeout(resolve, 2000));
  eventPool.emit('delivered', shipment);
}

function logDel(payload) {
  shipment.event = 'delivered';
  shipment.time = new Date;
  setTimeout(() => {
    console.log(shipment);
  }, 4000);
}


module.exports = {
  logVendPU,
  logTrans,
  logDel,
};