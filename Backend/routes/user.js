const express = require('express');
const router = express.Router();
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const {authMiddleware} = require("../middleware")

const { User } = require('../db'); 
router.use(express.json());


function createAccessToken(user) {
 
  return jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: '1h' } 
  );
}

router.post('/signup', async (req, res) => {
  const requiredUser = z.object({
    firstname: z.string().min(3).max(20),
    lastname: z.string().min(3).max(20),
    email: z.string()
      .email('Invalid email format')
      .refine((val) => val.endsWith('@gmail.com'), { message: 'Only Gmail addresses are allowed' }),
    password: z.string().min(8).max(20),
    phoneno: z.string().min(10).max(10)
  });

  const parsedUser = requiredUser.safeParse(req.body);
  if (!parsedUser.success) {
    return res.status(400).json({ error: parsedUser.error.errors });
  }

  const { firstname, lastname, email, password, phoneno } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
   
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phoneno
    });

    
    const token = createAccessToken(newUser);


    
    return res.status(201).json({
      message: 'User signed up successfully',
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email
      },
      token
    });
  } catch (err) {
    console.error('Error creating user:', err);
 
    if (err.code === 11000) {
      
      const dupField = err.keyValue ? Object.keys(err.keyValue)[0] : 'field';
      return res.status(400).json({ error: `${dupField} already exists` });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = createAccessToken(user);

  
    return res.json({
      message: 'Signed in successfully',
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      },
      token
    });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user details

const updateBody = zod.object({
	password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})
// Get the other user details
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            id: user._id,
           firstname: user.firstname,
           lastname: user.lastname,
           email: user.email
        }))
    })
})

module.exports = router;
