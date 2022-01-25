'use strict';

const { driverPickedUp, driverDelivered } = require('../modules/driver');

const shipment = {
  store: 'Test Store',
  orderId: 'Test Order Number',
  customer: 'Test Customer',
  address: 'Test Address',
};

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

describe('Testing driver function calls', () => {
  it('should log the pickup event', async () => {

    const spy = jest.spyOn(console, 'log');
    await driverPickedUp(shipment);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('DRIVER: picked up - Test Order Number');
    // expect(logVal).toEqual('DRIVER: picked up - Test Order Number');
  });

  it('should log the driver delivered event', () => {

    const spy = jest.spyOn(console, 'log');
    driverDelivered(eventShipment);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('DRIVER: delivered - Test Order Number');
  });
});

// logVendPU(shipment);

// expect(spy).toHaveBeenCalled();
// expect(logVal.event).toEqual('pickup');
