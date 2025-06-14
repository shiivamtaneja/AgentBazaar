const express = require('express');
const cors = require('cors');
const votingRoutes = require('./routes/voting');
const agentRoutes = require('./routes/agents');
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/status', (req, res) => {
  res.send('OK');
});

app.use('/api/v1/agents', agentRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/voting', votingRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});

