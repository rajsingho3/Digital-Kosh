const express = require('express');
const app = express();
const router = express.Router();
const userRouter = require('./user');
const cors = require('cors');
app.use(cors());
app.use(express.json());
router.use('/user',userRouter);

module.exports = router;