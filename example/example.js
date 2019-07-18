// const parser = require('ble-advertise');
const parser = require('../index');
const serializer = require('../index');

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
const packats = parser.parse(payload);
console.log(packats);

// console.log(Buffer.from(hexStringToArray('010b020026ac4da393')).toString('utf-8'));


const packats2 = {
	flags : [0x02, 0x04],
	incompleteUUID16 : ['2A00','2A01'],
	completeName : 'My Device'
};
console.log(parser.serialize(packats2));
