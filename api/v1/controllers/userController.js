const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const { randomInt } = require('crypto');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Op = Sequelize.Op;
const User = require('../models/user');
const color = require('../config/ansi');
const { logTime } = require('../config/time');
const { secretKey, refreshSecretKey, accessSecretKey } = require('../config/key');
const api = axios.create({ baseURL: 'https://api.invalsia.com' });

const OTP = {
  // Generate a one-time password
  generateOTP: () => {
      return randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
  }
};

const generateACT = (userID) => {
  console.log("ACT Payload: ", userID)
  const ACTPayload = {
    user: { ID: userID },
  };

  return jwt.sign(ACTPayload, accessSecretKey.current, {
    expiresIn: '15m',
  });
};

const generateREFT = (userID, expiration) => {
  const REFTPayload = {
    user: { 
      ID: userID,
      token:  OTP.generateOTP()
    },
  };

  return jwt.sign(REFTPayload, refreshSecretKey.current, {
    expiresIn: expiration
  });
};

const generateREFT1d = (userID) => {
  const REFTPayload = {
    user: { 
      ID: userID, 
      token:  OTP.generateOTP()
    
    },
  };

  return jwt.sign(REFTPayload, refreshSecretKey.current, {
    expiresIn: '1d',
  });
};

const generateREFT30d = (userID) => {
  const REFTPayload = {
    user: { 
      ID: userID,
      token:  OTP.generateOTP()
    },
  };

  return jwt.sign(REFTPayload, refreshSecretKey.current, {
    expiresIn: '30d',
  });
};

const userController = {
  signup: async (req, res) => {
    try {
      // Get user input
      const { username, email, password, rememberMe } = req.body;
      const response = {};
  
      /// Check if username is already in use
      const existingUsername = await User.findOne({ where: { username: username.toLowerCase() } });
      if (existingUsername) {
        console.log("Username in use.");
        response.username = 'Username in use.';
      }
  
       // Check if email is already in use
      const existingEmail = await User.findOne({ where: { email: email.toLowerCase() } });
      if (existingEmail) {
        console.log("Email in use.");
        response.email = 'Email in use.';
      }
    
      // Check password length
      if (password.length < 5) {
        console.log("Password is not at least 5 characters long");
        response.password = 'Password must be at least 5 characters long.';
      }

      // If there are any errors, return them
      if (Object.keys(response).length > 0) {
        return res.json(response);
      }
  
      // Encrypt password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create user
      const newUser = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
      });
  
      // Create access and refresh tokens
      const ACT = generateACT(newUser.user_id);
      const REFT = rememberMe ? generateREFT30d(newUser.user_id) : generateREFT1d(newUser.user_id);
  
      // Log registration to the terminal
      console.log(`${logTime} ${color.yellowColor}${newUser.username}${color.resetColor} ${color.greenColor}has registered${color.resetColor}`);
  
      // Send a JSON response
      res.json({ ID: newUser.user_id, ACT, REFT, message: 'Signup successful.' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
  },

  login: async (req, res) => {
    try {
      // Get user input
      const { identifier, password, rememberMe } = req.body;
  
      // Find the user by either username or email
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email: identifier.toLowerCase() },
            { username: identifier.toLowerCase() }
          ]
        }
      });

      // If the user was not found or password is invalid
      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.log(`${logTime} ${color.yellowColor}Controller${color.resetColor} - ${color.greenColor}Invalid credentials.${color.resetColor}` + "=".repeat(64) + "\n");
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      const username = user.username.toLowerCase();
      const ACT = generateACT(user.user_id);
      const REFT = rememberMe ? generateREFT30d(user.user_id) : generateREFT1d(user.user_id);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${ACT}`;
      
      console.log(`${logTime} ${color.yellowColor}Controller${color.resetColor} - ${color.magentaColor}${username}${color.greenColor} Login successful${color.resetColor}`);
      res.json({ ID: user.user_id, ACT, REFT, message: 'Login successful.' });
    } catch (error) {
      const loginError = `${logTime} - ${color.yellowColor}Login error: ${color.resetColor}\n ${color.redColor}${error}${color.resetColor}`;
      console.error(loginError);
      res.status(500).json({ error: 'An error occurred while logging in.' });
    }
  },
  
  getBios: async (req, res) => {
    try {
      // Get ID
      const ID = req.body.ID;

      // Find the user by their ID
      const user = await User.findOne({
        where: { user_id: ID },
        attributes: ['user_id', 'bios']
      });

      res.json({ ID, bios: user.bios });
    } catch (error) {
      console.error('Error fetching user bios:', error);
      res.status(500).json({ error: 'An error occurred while fetching bios.' });
    }
  },

  getAvatar: async (req, res) => {
    try {
      const ID = req.body.ID;
      console.log("GET Avatar ID: ", ID);
      
      // Find the user by their ID
      const user = await User.findOne({
        where: { user_id: ID },
        attributes: ['user_id', 'avatar']
      });

      res.json({ ID, avatar: user.avatar });
    } catch (error) {
      console.error('Error fetching user avatar:', error);
      res.status(500).json({ error: 'An error occurred while fetching avatar.' });
    }
  },
  

  getCover: async (req, res) => {
    try {
      const ID = req.body.ID;
      
      // Find the user by their ID
      const user = await User.findOne({
        where: { user_id: ID },
        attributes: ['user_id', 'cover']
      });

      res.json({ ID, avatar: user.cover });
    } catch (error) {
      console.error('Error fetching user avatar:', error);
      res.status(500).json({ error: 'An error occurred while fetching avatar.' });
    }
  },

  getUsername: async (req, res) => {
    try {
      const ID = req.body.ID;
      
      // Find the user by their ID
      const user = await User.findOne({
        where: { user_id: ID },
        attributes: ['user_id', 'username', 'display_name']
      });

      res.json({ ID, username: user.username, display_name: user.display_name });
    } catch (error) {
      console.error('Error fetching username:', error);
      res.status(500).json({ error: 'An error occurred while fetching username.' });
    }
  },

  getTheme: async (req, res) => {
    try {
      // Get REFT
      const REFT = req.body.REFT;
      const decodedREFT = jwt.decode(REFT, secretKey);
      const ID = decodedREFT.user.id;

      // Find the user by their ID
      const user = await User.findOne({
        where: { user_id: ID },
        attributes: ['user_id', 'theme']
      });

      res.json({ ID, theme: user.theme });
    } catch (error) {
      console.error('Error fetching user theme:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getRole: async (req, res) => {
    try {
      // Get REFT
      const REFT = req.body.REFT;
      const decodedREFT = jwt.decode(REFT, secretKey);
      const ID = decodedREFT.user.id;

      // Find the user by their ID
      const user = await User.findOne({
        where: { user_id: ID },
        attributes: ['user_id', 'role_id']
      });

      res.json({ ID, role: user.role_id });
    } catch (error) {
      console.error('Error fetching user role:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  verifyToken: async (req, res) => {
    const ACT = req.body.ACT;

    try {
      try {
        jwt.verify(ACT, accessSecretKey.current);
        return res.json({ valid: true });
      } catch {
        jwt.verify(ACT, accessSecretKey.previous);
        return res.json({ valid: true });
      }
    } catch (error) {
      return res.json({ valid: false });
    }
  },

  REFT: async (req, res) => {
    const REFT = req.body.REFT;

    if (!REFT) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      let decoded;
      try {
        decoded = jwt.decode(REFT, refreshSecretKey.current);
      } catch (error) {
        decoded = jwt.decode(REFT, refreshSecretKey.previous);
      }
      const ID = decoded.user.ID;
      const expiration = decoded.exp = Math.floor(decoded.exp / 1000);;
      const ACT = generateACT(ID);
      console.log("New ACT: ", ACT);

      res.json({ ID, ACT, expiration});
    } catch (error) {
      return res.json({ message: 'Invalid REFT:', REFT });
    }
  },

  profile: async (req, res) => {
    const identifier = req.body.identifier;
    console.log("Profile Identifier: ", identifier);

    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { user_id: identifier },
            { username: identifier.toLowerCase() },
          ],
        },
        attributes: [
          'user_id', 
          'username', 
          'display_name', 
          'avatar', 
          'cover', 
          'bios', 
          'role_id', 
          'registration_date',
        ]
      });

      if (user) {
        return res.json({ 
                    ID:   user.user_id, 
              username:   user.username, 
          display_name:   user.display_name, 
                avatar:   user.avatar,
                 cover:   user.cover,
                  bios:   user.bios,
                  role:   user.role,
               friends:   user.friends,
             followers:   user.followers,
     registration_date:   user.registration_date
        });
      } else {
        return res.json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = userController;