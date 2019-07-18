# ble-advertise

forked from <https://github.com/tessel/bleadvertise>

## Description

This package can parse BLE slave advertisement packets into human readable/manipulatable objects and build advertisement packets from JSON objects. Based off of the BLE specification [data types](https://www.bluetooth.com/specifications/assigned-numbers/generic-access-profile).

## Install

```
npm i @danke77/ble-advertise
```

## Usage

### Packet Parsing

```.js
const parser = require('ble-advertise');

// Payload from your BLE device (make it into a buffer, if not already)

const payload = '0201060303BEFE0AFF010B020026AC4DA393020A080E094C452D72657365727665645F43';
// const payload = Buffer.from([
//   2,   1,   6,   3,   3,
// 190, 254,  10, 255,   1,
//  11,   2,   0,  38, 172,
//  77, 163, 147,   2,  10,
//   8,  14,   9,  76,  69,
//  45, 114, 101, 115, 101,
// 114, 118, 101, 100,  95,
//  67
// ]);

// Parse (big-endian by default)
const packets = parser.parse(payload);

console.log(packats);
console.log(packets.length); // 5
console.log(packets[0].type); // Flags
console.log(packets[0].data); // [ 'LE General Discoverable Mode', 'BR/EDR Not Supported' ]
console.log(packets[1].type); // 'Complete List of 16-bit Service Class UUIDs'
console.log(packets[1].data); // [ 'febe' ]
```

### Packet Structure

The returned packets in the packet array have the following structure:

*packet*._type -> The type flag parsed from packet

*packet*._byteOrder -> The byte order in parsing

*packet*.raw -> The raw buffer that was parsed

*packet*.type -> A string describing type of data (eg. "Flags", "Complete List of 16-bit UUIDs", etc.)

*packet*.data -> The data parsed into appropriate data type (eg. String, Array of Octet Strings, unsigned int, etc.)

### Endianness

You can specify the endianess that you want the buffers parsed with by using these functions:

```.js
parser.parseLE(payload);
parser.parseBE(payload);
```

### Building Packets

```.js
const serializer = require('ble-advertise');

// Create your advertisement packet
const packet = {
	flags : [0x02, 0x04],
	incompleteUUID16 : ['2A00','2A01'],
	completeName : 'My Device'
};

// Serialize it into a Buffer
const payload = serializer.serialize(packet);

console.log(payload); // <Buffer 02 01 06 05 02 00 2a 01 2a 0a 09 4d 79 20 44 65 76 69 63 65>
```

You can create an advertisement packet buffer from an object with the following keys and their corresponding data types:

*flags* - An array of integers

*incompleteUUID16* - An array of 16 bit UUID hex strings

*completeUUID16* - An array of 16 bit UUID hex strings

*incompleteUUID32* - An array of 32 bit UUID hex strings

*completeUUID32* - An array of 32 bit UUID hex strings

*incompleteUUID128* - An array of 128 bit UUID hex strings

*completeUUID128* - An array of 128 bit UUID hex strings

*shortName* - A string

*completeName* - A string

*txPower* - An integer value

*deviceClass* - A hex string

*pairingHashC* - A hex string

*pairingRandomizerR* - A hex string

*deviceId* - A hex string

*smOOBFlags* - A hex string

*intervalRange* - An array of hex strings

*solicitationUUID16* - An array of 16 bit UUID hex strings

*solicitationUUID32* - An array of 16 bit UUID hex strings

*solicitationUUID128* - An array of 16 bit UUID hex strings

*serviceData* - An array of hex strings

*publicAddress* - An array of hex strings

*randomAddress* - An array of hex strings

*appearance* - An array of bytes

*interval* - An array of hex strings

*deviceAddress* - An array of hex strings

*role* - An array of bytes or Buffer

*pairingHashC256* - An array of hex strings

*pairingRandomizerR256* - An array of hex strings

*serviceUUID32* - An array of 32 bit UUID hex strings

*serviceUUID128* - An array of 128 bit UUID hex strings

*_3dInfo* - An array of bytes or Buffer

*mfrData* - An array of bytes of Buffer

## License

MIT
