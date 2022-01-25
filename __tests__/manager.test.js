'use strict';

const { logVendPU, logTrans, logDel } = require('../modules/manager');

const shipment = {
  store: 'Test Store',
  orderId: 'Test Order Number',
  customer: 'Test Customer',
  address: 'Test Address',
};

describe('Testing logging function calls', () => {
  xit('should log the pickup event', () => {

    logVendPU(shipment);
    const spy = jest.spyOn(console, 'log');
    expect(spy).toHaveBeenCalled();
  });

  xit('should log the in-transit event', () => {

    logTrans(shipment);
    const spy = jest.spyOn(console, 'log');
    expect(spy).toHaveBeenCalled();
  });

  xit('should log the delivered event', () => {

    logDel(shipment);
    const spy = jest.spyOn(console, 'log');
    expect(spy).toHaveBeenCalled();
  });
});