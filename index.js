const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use('/api/auth', authRoutes); // Setting up the route

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
