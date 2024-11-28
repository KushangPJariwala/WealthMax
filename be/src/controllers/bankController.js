const Bank = require("../models/bank");

const addBank = async (req, res) => {
  // const { bank } = req.body.bank;
  const logoBuffer = req.file.buffer; // This gets the file as a buffer
  // console.log("logoBuffer", logoBuffer);
  // console.log("req.body", req.body);
  try {
    // if (!name || !symbol || !logoBuffer) {
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "All fields are required" });
    // }

    // Create the bank with the logo as a buffer
    // const bank =  Bank({ name, symbol, logo: logoBuffer });
    const bank = await Bank.updateOne(
      { _id: req.body.id },
      { $set: { logo: logoBuffer } }
    );
    // console.log("bank", bank);

    // bank.logo = logoBuffer;
    // await bank.save();

    res.status(200).send({ success: true, message: "Bank added successfully" });
  } catch (err) {
    console.log("Error in bank add:", err);
    res.status(500).send({ success: false, message: "Error adding bank" });
  }
};

const getBankbyId = async (req, res) => {
  try {
    // Create the bank with the logo as a buffer
    console.log("req.query", req.query);
    const bank = await Bank.findOne({ _id: req.query.id }, { branches: 0 });
    // console.log("banks", banks);

    res.status(200).send({ success: true, bank });
  } catch (err) {
    console.log("Error in bank add:", err);
    res.status(500).send({ success: false, message: "Error fetching bank" });
  }
};
const getBanks = async (req, res) => {
  try {
    // Create the bank with the logo as a buffer
    const banks = await Bank.find({}, { bankName: 1 });
    // console.log("banks", banks);

    res.status(200).send({ success: true, banks });
  } catch (err) {
    console.log("Error in bank add:", err);
    res.status(500).send({ success: false, message: "Error fetching bank" });
  }
};
const getBranchDetails = async (req, res) => {
  try {
    const { id, query } = req.query;

    // Find the bank by ID and filter branches that match the query
    const bank = await Bank.findOne(
      { _id: id },
      { _id: 0, branches: 1 } // Only fetch the branches field
    );

    if (!bank) {
      return res
        .status(404)
        .send({ success: false, message: "Bank not found" });
    }

    // Filter branches based on the query (branchName or IFSC)
    const filteredBranches = bank.branches.filter(
      (branch) =>
        branch.branchName.toLowerCase().includes(query.toLowerCase()) ||
        branch.city.toLowerCase().includes(query.toLowerCase()) ||
        branch.ifsc.toLowerCase().includes(query.toLowerCase())
    );

    res.status(200).send({
      success: true,

      branches: filteredBranches,
    });
  } catch (err) {
    console.log("Error in fetching branches:", err);
    res
      .status(500)
      .send({ success: false, message: "Error fetching branches" });
  }
};

module.exports = { addBank, getBanks, getBranchDetails, getBankbyId };
