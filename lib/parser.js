const Packet = require('./packet').Packet;
const hexstring = require('./hexstring');

const split = buffer => {
  const splits = [];
  let i = 0;

  while (i < buffer.length) {
    // Grab the length of the entire packet
    let length = buffer[i++]; // package[0]
    if (length <= 0) {
      break; // empty bytes
    }
    // Grab the kind of packet
    const type = buffer[i++]; // package[1]
    // The length of the data is the whole thing minus the type byte
    // Create a new buffer for the data
    const data = Buffer.alloc(--length);
    // Copy over fromt the whole buffer
    buffer.copy(data, 0, i, i + length); // package[2, (package[0] - 1)]
    // Add it to our array
    splits.push({type, data});
    // Increment our indexer
    i += length;
  }

  return splits;
}

const parse = (payload, byteOrder, callback) => {

  // If a byte order wasn't passed it, make it big endian by default
  byteOrder = byteOrder ? byteOrder : 'BE';

  // Confirm that it's one of the two options
  if (byteOrder != 'BE' && byteOrder != 'LE') {
    callback && callback(new Error('Invalid Byte Order. Must be "BE" or "LE"'));
    return;
  }

  // If the data isn't in a buffer or hex string, get mad
  if (!Buffer.isBuffer(payload) && !hexstring.isHexString(payload)) {
    callback && callback(new Error('Data must be a buffer or hex string'));
    return;
  }

  if (hexstring.isHexString(payload)) {
    const array = hexstring.hexStringToArray(payload);
    payload = Buffer.from(array);
  }

  // Split up the payload into packet chunks
  const splits = split(payload);

  const packets = [];

  // For each chunks, make a payload object and put in return array
  splits.forEach(split => {
    packets.push(new Packet(split.type, split.data, byteOrder));
  });

  // Call callback, if any
  callback && callback(null, packets);

  return packets;
}

const parseLE = payload => {
  return parse(payload, 'LE');
}

const parseBE = payload => {
  return parse(payload, 'BE');
}


module.exports = {
  _split: split,
  parse: parse,
  parseLE: parseLE,
  parseBE: parseBE
}
