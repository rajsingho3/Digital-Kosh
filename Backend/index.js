const express = require('express');
const app = express();
const mainRouter = require('./routes/index');

app.use('/api/v1', mainRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});