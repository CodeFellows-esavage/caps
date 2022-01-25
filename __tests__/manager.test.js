'use strict';

const { logVendPU, logTrans, logDel } = require('../modules/manager');

const shipment = {
  store: 'Test Store',
  orderId: 'Test Order Number',
  customer: 'Test Customer',
  address: 'Test Address',
};

describe('Testing logging function calls', () => {
  it('should log the pickup event', () => {

    const spy = jest.spyOn(console, 'log');
    logVendPU(shipment);
    let logVal = (spy.mock.calls[0][0]);

    expect(spy).toHaveBeenCalled();
    expect(logVal.event).toEqual('pickup');
    expect(logVal.time).toBeTruthy();
    expect(JSON.stringify(logVal.payload)).toEqual('{"store":"Test Store","orderId":"Test Order Number","customer":"Test Customer","address":"Test Address"}');
  });

  it('should log the in-transit event', async () => {

    const spy = jest.spyOn(console, 'log');
    await logTrans(shipment);
    let logVal = (spy.mock.calls[0][0]);

    expect(spy).toHaveBeenCalled();
    expect(logVal.event).toEqual('in-transit');
    expect(logVal.time).toBeTruthy();
    expect(JSON.stringify(logVal.payload)).toEqual('{"store":"Test Store","orderId":"Test Order Number","customer":"Test Customer","address":"Test Address"}');
  });

  it('should log the delivered event', async () => {

    const spy = jest.spyOn(console, 'log');
    await logDel(shipment);
    let logVal = (spy.mock.calls[0][0]);

    expect(spy).toHaveBeenCalled();
    expect(logVal.event).toEqual('delivered');
    expect(logVal.time).toBeTruthy();
    expect(JSON.stringify(logVal.payload)).toEqual('{"store":"Test Store","orderId":"Test Order Number","customer":"Test Customer","address":"Test Address"}');
  });
});