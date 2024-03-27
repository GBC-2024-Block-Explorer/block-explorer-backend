const express = require("express");
const blocksModule = require("./modules/blocksModule");
const transactionsModule = require("./modules/transactionsModule");

const app = express();

var cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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

app.get("/transactions/history", async (req, res) => {
  const transactionHistory = await transactionsModule.getTransactionHistory();
  // generateData();
  res.json(transactionHistory);
  // console.log("trHis", transactionHistory);
});

app.post("/transactions/send", (req, res) => {
  const { source, destination, amount } = req.body;
  console.log("SourceAPI", source, destination, amount);
  transactionsModule.sendTransfer(source, destination, amount);
  // transactionsModule.addData();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("transactionsModule", transactionsModule.getTransactionHistory());
// transactionsModule.addData();
// transactionsModule.sendTransfer("0x888","0x999","890")

// const data = transactionsModule.getTransactionHistory();
// console.log("data-----------",data);
// if (data.length === 0)
// {
//   console.log("EMPTY DB--------------", data.length, data);
// }
// else{
//   console.log("DB data not empty-------------", data.length, data)
// }
// function generateData() {
//   transactionsModule
//     .getTransactionHistory()
//     .then((data) => {
//       try {
//         const data = transactionsModule.getTransactionHistory();
//         console.log("data-----------", data);
//         if (data.length === 0) {
//           console.log("EMPTY DB--------------", data.length, data);
//         } else {
//           console.log("DB data not empty-------------", data.length, data);
//         }
//       } catch (error) {
//         console.error("Error fetching transaction history:", error);
//       }
//       console.log("data-----------", data);
//       if (data.length === 0) {
//         console.log("EMPTY DB--------------", data.length, data);
//         for (let i = 0; i < 5; i++) {
//           transactionsModule.addData();
//         }
//       } else {
//         console.log("DB data not empty-------------", data.length, data);
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching transaction history:", error);
//     });
// }
