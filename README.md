# caps
A real-time service that allows for vendors, such as flower shops or restaurants, to alert a system of a package needing to be delivered, for drivers to instantly see what’s in their pickup queue, and then to alert the vendors as to the state of the deliveries (in transit, and then delivered).

- Developed By: Erik Savage

Deployment URL: NOT CURRENTLY DEPLOYED

![Data Flow](/UML.png)

## Installation
- to install run `git@github.com:eriksavage/caps.git`
- `cd` into caps
- run `npm install`

## Usage
- To start server run : `npm start`
- To test server run: `npm run test`

## Event Structure
```
EVENT {
  event: 'pickup',
  time: 2022-01-25T08:23:06.001Z,
  payload: {
    store: 'Zappos',
    orderId: 1643098986001,
    customer: 'Faithe Krisztina',
    address: 'Las Vegas, NV'
  }
}
```

Event types: pickup, in-transit, delivered

## Features
- Error Handling
  - sends 404 if route or method is unavailable

## Testing
Verifies the following:
- manager module function calls
- vendor module function calls
- driver module function calls

## Resources
- sequelize docs
- jest docs
- supertest docs
- http cats
- Code Fellows
  - Kellen Linse
  - Daniel Jackson
