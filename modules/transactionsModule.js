const mongoose = require("mongoose");
const Transaction = require("./dbSchema");
const { faker } = require("@faker-js/faker");
const dateTime = new Date();
const db = mongoose.connection;
const crypto = require("crypto");
const gasUsed = Math.round(Math.random() * 10000);
const amount = Math.round(Math.random() * 100000);
const receiptHash = crypto.randomBytes(32).toString("hex");

// var source = [];
// var destination = [];
// const addr = faker.finance.ethereumAddress();
// console.log(addr);

// for (let i=0; i<5; i++)
// {
//     source.push(faker.finance.ethereumAddress())
// }

function connectDB() {
  // Connect to MongoDB
  mongoose.connect("mongodb://localhost:27017/myappdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("ConnectDB()");

  //   const db = mongoose.connection;
  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });
}
connectDB();

// Creating a model to retrieve data
const transactions = mongoose.model("transactions", {
  source: String,
  destination: String,
  amount: String,
  status: String,
  gasUsed: String,
  receiptHash: String,
  createdAt: Date,
  updatedAt: Date,
});

const getTransactionHistory = async () => {
  //   connectDB();

  // Retrieve all data from the database
  try {
    const data = await transactions.find({});
    console.log("get--", data.length);
    if (data.length == 0) {
      // source = faker.finance.ethereumAddress();
      // destination = faker.finance.ethereumAddress();
      for (let i = 0; i < 5; i++) {
        addData();
      }

      console.log("addData executed");
    }
    return data;
  } catch (err) {
    console.error("error", err);
    return null; // or handle error as needed
  } finally {
    //     await mongoose.connection.close();
    // await mongoose.disconnect();
    // mongoose.connection.close(function() {
    //     console.log('Connection closed');
    //   });
    // console.log("DISCONNECTED!!!")
  }
};

const sendTransfer = (source, destination, amount) => {
  // connectDB();
  console.log("SENDTRANSFER");

  //   db.once("open", async () => {
  console.log("\t\t\t\t\t\t***Connected to MongoDB***");

  try {
    // Create a new Transaction instance
    const newTransaction = new Transaction({
      source: source,
      destination: destination,
      amount: amount,
      status: "Success",
      gasUsed: gasUsed,
      receiptHash: receiptHash,
      createdAt: dateTime,
      updatedAt: dateTime,
    });

    //   await newTransaction.save();
    newTransaction.save();

    console.log("Transaction saved successfully");
  } catch (error) {
    console.error("\t\t\t\t\tError saving Transaction:", error);
  } finally {
    //   await mongoose.connection.close();
    // await mongoose.disconnect();
    //   console.log("SEND TRANSFER___connection closed");
  }
  //   });
};

async function addData() {
  //   connectDB();
  console.log("addData inside");
  //   db.once("open", async () => {
  console.log("\t\t\t\t\t\t***Connected to MongoDB***");

  try {
    // Create a new Transaction instance
    const newTransaction = new Transaction({
      source: faker.finance.ethereumAddress(),
      destination: faker.finance.ethereumAddress(),
      amount: Math.round(Math.random() * 100000),
      status: "Success",
      gasUsed: Math.round(Math.random() * 10000),
      receiptHash: crypto.randomBytes(32).toString("hex"),
      createdAt: dateTime,
      updatedAt: dateTime,
    });

    await newTransaction.save();
    //   newTransaction.save();

    console.log("Transaction saved successfully");
  } catch (error) {
    console.error("\t\t\t\t\tError saving Transaction:", error);
  }
  // finally {
  //   await mongoose.connection.close();
  // }
  //   });
}

module.exports = {
  getTransactionHistory,
  sendTransfer,
  addData,
};
