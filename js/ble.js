'use strict';

let ledCharacteristic = null;
let poweredOn = false;

function connect() {
    console.log('Requesting Bluetooth Device...');
    navigator.bluetooth.requestDevice(
        {
	        /*acceptAllDevices:true*/
            filters: [{ services: ['a59611ba-78b7-4fd2-96fb-9b0f66d2311e'] }]
        })
        .then(device => {
            console.log('> Found ' + device.name);
            console.log('Connecting to GATT Server...');
            //device.addEventListener('gattserverdisconnected', onDisconnected)
            return device.gatt.connect();
        })
        .then(server => {
            console.log('Getting Service a59611ba-78b7-4fd2-96fb-9b0f66d2311e - Egn/Ign control...');
            return server.getPrimaryService('a59611ba-78b7-4fd2-96fb-9b0f66d2311e');
        })
        .then(service => {
            console.log('Getting Characteristic 5eed665c-0390-11e5-8418-1697f925ec7b - Egn/Ign control...');
            return service.getCharacteristic('5eed665c-0390-11e5-8418-1697f925ec7b');
        })
        .then(characteristic => {
            console.log('All ready!');
            ledCharacteristic = characteristic;
             console.log(ledCharacteristic);
            //onConnected();
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
}
