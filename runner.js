
const blocksModule = require('./modules/blocks');

// call exported methods

blocksModule.initialize();

const address = blocksModule.getAddresses();

const firstAddress = address[0];
console.log(`first address ${firstAddress}`)

const detail = blocksModule.getDetail(firstAddress);