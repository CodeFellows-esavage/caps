'use strict';

const { Queue, server } = require('../server/index');

const queue = new Queue;
let shipmentId;
let deliveryId;

beforeAll(done => {
  done();
});

afterAll(done => {
  server.close();
  done();
});

describe('Testing the Queue', () => {
  it('should add a Shipment message to the queue', () => {

    const shipment = {
      store: 'store',
      orderId: Date.now(),
      customer: 'customer',
      address: 'address',
    };

    let result = queue.addShipment(shipment);
    shipmentId = result.id;

    expect(result.id).toBeTruthy();
    expect(queue.shipments[shipmentId]).toBeTruthy();

  });
  it('should add a Delivery message to the queue', () => {

    const shipment = {
      store: 'store',
      orderId: Date.now(),
      customer: 'customer',
      address: 'address',
    };

    let result = queue.addDelivery(shipment);
    deliveryId = result.id;

    expect(result.id).toBeTruthy();
    expect(queue.deliveries[deliveryId]).toBeTruthy();
  });
  it('should delete a shipment message from the queue', () => {
    console.log(shipmentId);
    queue.removeShipment(shipmentId);

    expect(queue.shipments).toEqual({});
  });
  it('should delete a delivery message from the queue', () => {
    console.log(deliveryId);

    queue.removeDelivery(deliveryId);
    expect(queue.deliveries).toEqual({});
  });
});