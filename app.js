const express = require("express");
const blocksModule = require("./modules/blocksModule");

const app = express();

var cors = require("cors");
app.use(cors())

app.get("/blocks/block", (req, res) => {
  const block = blocksModule.getBlock();
  res.json(block);
});

app.get("/blocks/addresses", (req, res) => {
  const blockAddresses = blocksModule.getAddresses();
  res.json(blockAddresses);
});

app.get("/blocks/details/:addressid", (req, res) => {
  const addressid = req.params.addressid;
  const blockDetail = blocksModule.getDetail(addressid);

  if (blockDetail) {
    res.json(blockDetail);
  } else {
    res.status(404).json({ message: "Block not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
