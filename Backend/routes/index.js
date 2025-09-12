const express = require('express');
const app = express();
const router = express.Router();
const userRouter = require('./user');
const cors = require('cors');
const accountRouter = require('./account');
app.use(cors());
app.use(express.json());
router.use('/user',userRouter);
router.use("/account", accountRouter);

module.exports = router;