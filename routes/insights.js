const express = require("express");
const router = express.Router();
const Transaction = require("../models/TransactionModel");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentData = await Transaction.aggregate([
      {
        $match: {
          userid: userId,
          type: "expense",
          date: {
            $gte: new Date(currentYear, currentMonth, 1),
            $lte: new Date(currentYear, currentMonth + 1, 0),
          },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const prevData = await Transaction.aggregate([
      {
        $match: {
          userid: userId,
          type: "expense",
          date: {
            $gte: new Date(prevYear, prevMonth, 1),
            $lte: new Date(prevYear, prevMonth + 1, 0),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const currentTotal = currentData.reduce((acc, cur) => acc + cur.total, 0);
    const prevTotal = prevData[0]?.total || 0;

    const change = prevTotal
      ? ((currentTotal - prevTotal) / prevTotal) * 100
      : 0;

    const topCategory = currentData.sort((a, b) => b.total - a.total)[0]?._id;

    res.json({
      currentTotal,
      prevTotal,
      change: change.toFixed(2),
      topCategory,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;