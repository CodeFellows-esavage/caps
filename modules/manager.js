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

function logTrans() {
  //payload doesn't transfer...
  shipment.event = 'in-transit';
  shipment.time = new Date;

  setTimeout(() => {
    console.log(shipment);
  }, 2000);


  setTimeout(() => {
    eventPool.emit('delivered', shipment);
  }, 4000);
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