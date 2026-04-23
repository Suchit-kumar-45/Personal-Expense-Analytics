const express = require("express");
const router = express.Router();
const Budget = require("../models/budgetModel");
const Transaction = require("../models/transactionModel");

// ➤ Set Budget
router.post("/", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const numAmount = parseFloat(amount);

    console.log("Setting Budget - userId:", userId, "amount:", numAmount);

    const now = new Date();

    let budget = await Budget.findOne({
      userId,
      month: now.getMonth(),
      year: now.getFullYear(),
    });

    if (budget) {
      budget.amount = numAmount;
    } else {
      budget = new Budget({
        userId,
        amount: numAmount,
        month: now.getMonth(),
        year: now.getFullYear(),
      });
    }

    await budget.save();
    console.log("Budget saved:", budget);
    res.json(budget);
  } catch (err) {
    console.error("Budget POST Error:", err);
    res.status(500).json(err);
  }
});

// ➤ Get Budget Status
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const now = new Date();

    const budget = await Budget.findOne({
      userId,
      month: now.getMonth(),
      year: now.getFullYear(),
    });

    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    console.log("Budget Query - userId:", userId, "month:", now.getMonth(), "year:", now.getFullYear());
    console.log("Budget found:", budget);

    const expenses = await Transaction.aggregate([
      {
        $match: {
          userid: userId,
          type: "expense",
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    console.log("Expenses found:", expenses);

    const spent = expenses[0]?.total || 0;

    let status = "safe";
    if (budget && spent >= budget.amount) status = "exceeded";
    else if (budget && spent >= 0.8 * budget.amount) status = "warning";

    res.json({
      budget: budget?.amount || 0,
      spent,
      status,
    });
  } catch (err) {
    console.error("Budget GET Error:", err);
    res.status(500).json(err);
  }
});

module.exports = router;