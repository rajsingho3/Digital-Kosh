const express = require('express');
const app = express();
const mainRouter = require('./routes/index');
const cors = require('cors');

// Apply CORS middleware at the application level
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Vite's default port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/api/v1', mainRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(500).json({
    error: 'An unexpected error occurred',
    details: process.env.NODE_ENV !== 'production' ? err.message : undefined
  });
});


app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
  console.log("API base URL: http://localhost:3000/api/v1");
});