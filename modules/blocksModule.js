const { faker } = require("@faker-js/faker");

const ethereumAddresses = [];

for (let i = 0; i < 5; i++) {
  ethereumAddresses.push(faker.finance.ethereumAddress());
}

const ethereumBlocks = [];

for (let i = 0; i < 5; i++) {
  ethereumBlocks.push({
    address: ethereumAddresses[i],
    balance: faker.finance.amount({ min: 100, max: 1000, dec: 0 }),
    gasUsed: faker.finance.amount({ min: 100, max: 1000, dec: 0 }),
    transactionCount: faker.finance.amount({ min: 10000, max: 100000, dec: 0 }),
  });
}
console.log("ethBlock -----", ethereumBlocks);

const getAddresses = () => {
  return ethereumAddresses;
};

const getBlock = () => {
  return ethereumBlocks;
};

const getDetail = (address) => {
  return ethereumBlocks.find((block) => block.address === address);
};

// const address = ethereumAddresses[4];
// console.log(address);
// console.log("bal",(ethereumBlocks.find((block) => block.address === address)).balance)
// console.log("getDetail", getDetail("0xlll"));
// console.log("getAddress", getAddresses());

module.exports = {
  getAddresses,
  getDetail,
  getBlock,
};
