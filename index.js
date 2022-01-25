'use strict';

const eventPool = require('./eventPool');
const { vendorGenPickUp, vendorRecieved } = require('./modules/vendor');
const { driverPickedUp, driverDelivered } = require('./modules/driver');
const { logVendPU, logTrans, logDel } = require('./modules/manager');

//listeners
eventPool.on('pickup', logVendPU);
eventPool.on('pickup', driverPickedUp);

eventPool.on('in-transit', logTrans);

eventPool.on('delivered', driverDelivered);
eventPool.on('delivered', vendorRecieved);
eventPool.on('delivered', logDel);

//generate an order
vendorGenPickUp();