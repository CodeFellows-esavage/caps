'use strict';

const { vendorGenPickUp, vendorRecieved } = require('../modules/vendor');
const eventPool = require('../eventPool');

const eventShipment = {
  event: 'delivered',
  time: 'sometime',
  payload: {
    store: 'Test Store',
    orderId: 'Test Order Number',
    customer: 'Test Customer',
    address: 'Test Address',
  },
};

describe('Testing vendor function calls', () => {
  it('should generate a pickup event', () => {

    const spy = jest.spyOn(eventPool, 'emit');
    vendorGenPickUp();
    let response = spy.mock.calls;
    expect(spy).toHaveBeenCalled();
    expect(response[0][0]).toEqual('pickup');
    expect(response[0][1]).toBeTruthy();
  });

  it('should log the vendor recieved event', async () => {

    const spy = jest.spyOn(console, 'log');
    await vendorRecieved(eventShipment);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('VENDOR: Thanks for delivering - Test Order Number');
  });
});