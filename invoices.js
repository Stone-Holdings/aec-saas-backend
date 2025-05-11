const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const invoices = await prisma.invoice.findMany({ include: { project: true } });
  res.json(invoices);
});

router.post('/', async (req, res) => {
  const { projectId, amount, status, dueDate, issuedDate } = req.body;
  const invoice = await prisma.invoice.create({
    data: { projectId, amount, status, dueDate: new Date(dueDate), issuedDate: new Date(issuedDate) }
  });
  res.json(invoice);
});

module.exports = router;