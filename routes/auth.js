import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../supabase.js';

const router = express.Router();

// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'User registered successfully', data });
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) return res.status(400).json({ error: 'Invalid email or password' });

  const passwordMatch = await bcrypt.compare(password, data.password);
  if (!passwordMatch) return res.status(401).json({ error: 'Incorrect password' });

  const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});

module.exports = router;
