const dataTypes = require('./types');
const Buffer = require('buffer/').Buffer;


class Packet {
  constructor(type, data, byteOrder) {
    this._type = type;
    this._byteOrder = byteOrder;
    this.raw = data;

    // If data isn't a buffer, get mad
    if (data && !Buffer.isBuffer(data)) {
      throw new Error('Data must be a buffer');
    }
    // Grab type from data structure
    const dataType = dataTypes.lookup(type);
    // If it exists
    if (dataType) {
      // Set name
      this.type = dataType.name;
      // Set data based on the best way to parse the data (ie toString, to hex array)
      this.data = dataType.parse ? dataType.parse(data, type, byteOrder) : data;
    }
    else {
      // Set defaults if type not known
      this.type = 'Unknown: 0x' + type.toString(16);
      this.data = data;
    }
  }
}

module.exports.Packet = Packet;
