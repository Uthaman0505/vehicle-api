const express = require('express');
const app = express();
const port = 9000;

app.get('/', (req, res) => {
    res.send('Node App Started!!!');
});

const STATUS = {
    PARKING: 'PARKING',
    MOVING: 'MOVING',
    IDLING: 'IDLING',
    TOWING: 'TOWING'
}

const vehicles = [
    { vehicleID: 132456, type: 'Scooter', lock_unlock: 'Lock', current_spped: '0 km/h', battery_level: '100%', status: STATUS.PARKING, location: '3.142,012', last_upadated: '2019-07-02 9.00AM' },
    { vehicleID: 987654, type: 'Scooter', lock_unlock: 'Unlock', current_spped: '5 km/h', battery_level: '75%', status: STATUS.MOVING, location: '2.125,114', last_upadated: '2019-07-02 10.00AM' },
    { vehicleID: 569825, type: 'Scooter', lock_unlock: 'Unlock', current_spped: '0 km/h', battery_level: '50%', status: STATUS.IDLING, location: '4.125,114', last_upadated: '2019-07-02 10.00AM' },
    { vehicleID: 125864, type: 'Scooter', lock_unlock: 'Lock', current_spped: '0 km/h', battery_level: '15%', status: STATUS.TOWING, location: '5.125,114', last_upadated: '2019-07-02 10.00AM' },
    { vehicleID: 125864, type: 'Scooter', lock_unlock: 'Lock', current_spped: '0 km/h', battery_level: '100%', status: STATUS.TOWING, location: '5.125,114', last_upadated: '2019-07-02 10.00AM' }
];

app.get('/api/vehicles', (req, res) => {
    res.json(vehicles);
});

app.get('/api/vehicle/:vehicleID', (req, res) => {
    const vehicle = vehicles.find(v => v.vehicleID == req.params.vehicleID);
    if (vehicle) {
        Object.assign(vehicle, req.body, { lastUpdated: new Date().toISOString() });
        res.json(vehicle);
    } else {
        res.status(404).json({ message: 'Vehicle not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});