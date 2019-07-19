const PacketParser = require('./lib/parser');
const PacketBuilder = require('./lib/serializer');
const hexString = require('./lib/hexstring');


module.exports = {
  parse: PacketParser.parse,
  parseLE: PacketParser.parseLE,
  parseBE: PacketParser.parseBE,
  serialize: PacketBuilder.serialize,
  hexString: hexString,
};
