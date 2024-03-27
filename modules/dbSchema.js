const mongoose = require("mongoose");   

const transactionSchema = new mongoose.Schema({
  source: String,
  destination: String,
  amount: String,
  status: String,
  gasUsed: String,
  receiptHash: String,
  createdAt: Date,
  updatedAt: Date,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;