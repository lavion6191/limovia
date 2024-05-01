const jwt = require('jsonwebtoken');
const { secretKey }   = require('../../config/key');
const color           = require('../../config/ansi');
const { logTime }     = require('../../config/time');

const TokenValidationMiddleware = (req, res, next) => {

  const REFT = req.body.REFT;
  console.log("REFT: ", REFT)

  if (!REFT) {
    console.log(`\n${logTime} ${color.yellowColor}Verify${color.resetColor} - ${color.redColor}No Refresh Token provided${color.resetColor}`)
    return res.status(401).json({ message: 'Verify - No REFT provided' });
  }

  try {
    jwt.verify(REFT, secretKey);
    console.log(`\n${logTime} ${color.yellowColor}Verify${color.resetColor} - ${color.greenColor}Access Granted${color.resetColor}`)
    next();
  } catch (REFTError) {
    console.log(`\n${logTime} ${color.yellowColor}Verify${color.resetColor} - ${color.redColor}Invalid Refresh Token${color.resetColor}`)
    return res.status(401).json({ message: 'Invalid REFT' });
  }
};

module.exports = TokenValidationMiddleware;