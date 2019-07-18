const PacketParser = require('./lib/parser');
const PacketBuilder = require('./lib/serializer');


module.exports = {
  parse: PacketParser.parse,
  parseLE: PacketParser.parseLE,
  parseBE: PacketParser.parseBE,
  serialize: PacketBuilder.serialize,
};
