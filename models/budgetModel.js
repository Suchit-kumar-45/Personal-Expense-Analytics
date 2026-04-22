const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  month: Number,
  year: Number,
});

module.exports =
  mongoose.models.budgets ||
  mongoose.model("budgets", budgetSchema);