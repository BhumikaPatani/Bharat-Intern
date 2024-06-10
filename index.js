const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Home Route
router.get('/', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.render('index', { transactions });
});

// Add Transaction Route
router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', async (req, res) => {
  const { type, amount, description } = req.body;
  const newTransaction = new Transaction({ type, amount, description });
  await newTransaction.save();
  res.redirect('/');
});

// Edit Transaction Route
router.get('/edit/:id', async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  res.render('edit', { transaction });
});

router.post('/edit/:id', async (req, res) => {
  const { type, amount, description } = req.body;
  await Transaction.findByIdAndUpdate(req.params.id, { type, amount, description });
  res.redirect('/');
});

// Delete Transaction Route
router.get('/delete/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
