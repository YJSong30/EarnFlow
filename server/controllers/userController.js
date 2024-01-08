const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '1h' });

}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({email});

      if (!user || !await bcrypt.compare(password, user.password)){
        throw new Error('Invalid credentials');
      }

      const token = createToken(user._id);
      res.json({token, email, userId: user._id});
    }
    catch (error){
      res.status(400).json({ error: error.message });
    }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { signupUser, loginUser };