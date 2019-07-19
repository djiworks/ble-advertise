const isHexString = str => {
  return /^[a-fA-F0-9]+$/.test(str);
}

const hexStringToArray = str => {
  if (!isHexString(str)) throw new Error('invalid hex string input: ' + str);
  const array = [];
  for (let i = 0; i < str.length; i += 2) {
    // tslint:disable-next-line:ban Needed to parse hexadecimal.
    array.push(parseInt(str.substr(i, 2), 16));
  }
  return array;
}

const arrayToHexString = array => {
  return Array
      .from(
          array,
          (byte) => {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
          })
      .join('');
}

const arrayToString = array => {
  return array.map(val => String.fromCharCode(val)).join('');
}

module.exports = {
  isHexString: isHexString,
  hexStringToArray: hexStringToArray,
  arrayToHexString: arrayToHexString,
  arrayToString: arrayToString,
};
