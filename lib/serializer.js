const dataTypes = require('./types');
const Buffer = require('buffer/').Buffer;

const serialize = advertisement => {
  const buffs = [];
  Object.keys(advertisement).forEach(key => {
    const dataType = dataTypes.lookup(key);
    if (!dataType) {
      console.log('Unknown AD. type:', key);
    } else if (!dataType.serialize) {
      console.log('Unsupported AD. type:', key);
    } else {
      type = dataType.value;
      data = dataType.serialize(advertisement[key]);
      buffs.push(Buffer.from([data.length + 1, type]));
      buffs.push(data);
    }
  });

  const ret = Buffer.concat(buffs);
  if (ret.length > 31){
    throw(new Error('Packet exceeds maximum length of 31 bytes'));    
  }

  return ret;
}


module.exports.serialize = serialize;
