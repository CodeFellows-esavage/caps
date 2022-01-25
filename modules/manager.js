'use strict';

const eventPool = require('../eventPool');

//can i create a function that checks 

class EVENT {
  constructor(event, time, payload) {
    this.event = event;
    this.time = time;
    this.payload = payload;
  }
}

function logVendPU(payload) {
  let event = new EVENT('pickup', new Date, payload);
  console.log(event);
}

function logTrans(payload) {
  let event = new EVENT('in-transit', new Date, payload);
  console.log(event);
}

function logDel(payload) {
  let event = new EVENT('delivered', new Date, payload);
  console.log(event);
}



// EVENT { 
//   "event": "pickup",
//   "time": "2020-03-06T18:27:17.732Z",
//   "payload": { 
//     "store": "1-206-flowers",
//     "orderID": "e3669048-7313-427b-b6cc-74010ca1f8f0",
//     "customer": "Jamal Braun",
//     "address": "Schmittfort, LA"
//   }
// }

module.exports = {
  logVendPU,
  logTrans,
  logDel,
};