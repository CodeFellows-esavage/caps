'use strict';

const { vendorGenPickUp, vendorRecieved } = require('../modules/vendor');

const shipment = {
  store: 'Test Store',
  orderId: 'Test Order Number',
  customer: 'Test Customer',
  address: 'Test Address',
};

describe('Testing vendor function calls', () => {
  xit('should generate a pickup event', () => {

    vendorGenPickUp();
    const spy = jest.spyOn(console, 'log');
    expect(spy).toHaveBeenCalled();
  });

  xit('should log the vendor recieved event', () => {

    vendorRecieved(shipment);
    const spy = jest.spyOn(console, 'log');
    expect(spy).toHaveBeenCalled();
  });
});