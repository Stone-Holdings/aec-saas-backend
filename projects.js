const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const userId = req.userId;
  const projects = await prisma.project.findMany({ where: { userId } });
  res.json(projects);
});

router.post('/', async (req, res) => {
  const { name, client } = req.body;
  const userId = req.userId;
  const project = await prisma.project.create({ data: { name, client, userId } });
  res.json(project);
});

module.exports = router;