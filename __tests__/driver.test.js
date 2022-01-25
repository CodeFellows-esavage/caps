'use strict';

const { driverPickedUp, driverDelivered } = require('../modules/driver');

const shipment = {
  store: 'Test Store',
  orderId: 'Test Order Number',
  customer: 'Test Customer',
  address: 'Test Address',
};

describe('Testing driver function calls', () => {
  xit('should log the pickup event', () => {

    driverPickedUp(shipment);
    const spy = jest.spyOn(console, 'log');
    expect(spy).toHaveBeenCalled();
  });

  xit('should log the driver delivered event', () => {

    driverDelivered(shipment);
    const spy = jest.spyOn(console, 'log');
    expect(spy).toHaveBeenCalled();
  });
});