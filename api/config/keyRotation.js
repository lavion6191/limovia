/*
* Key Rotation Script Documentation
  ---------------------------------

* Overview:
  ---------
  This documentation provides an overview of a Node.js script designed for key rotation 
  in a secure environment. The script rotates keys for access, refresh, and secret purposes 
  at defined intervals, ensuring enhanced security by regularly updating cryptographic keys.

* Features:
  ---------
  - Automated Key Rotation: The script automatically rotates keys for access, refresh, and 
    secret purposes at predefined intervals.
  - Error Handling: Comprehensive error handling ensures smooth execution and provides 
    meaningful error messages in case of failures.
  - File Write Operation: After key rotation, the script updates the key.js file with the 
    new keys.
  - Cron Job Integration: The script can be integrated with cron jobs to run key rotation 
    at specified intervals.

* Requirements:
  --------------
  - Node.js installed on the system
  - Dependencies: crypto, node-cron, moment

* Installation:
  -------------
  1. Clone or download the script to your local system.
  2. Install the required dependencies using npm:
     npm install crypto node-cron moment
  3. Ensure that the key.js file exists in the same directory as the script and has 
     appropriate permissions for write operations.

* Usage:
  ------
  Running the Script:
  Execute the script using Node.js:
  node keyRotation.js

* Integrating with Cron Job:
  To automate key rotation at specific intervals, integrate the script with a cron job. 
  For example, to run the script every hour, add the following cron job:
  0 * * * * node /path/to/keyRotation.js
  Replace /path/to/keyRotation.js with the absolute path to the script file.

* Configuration:
  ---------------
  Key Rotation Intervals:
  The script defines key rotation intervals for access, refresh, and secret keys in 
  milliseconds. You can adjust these intervals according to your security requirements 
  by modifying the following constants:
  - refreshRotationInterval: Interval for refresh key rotation
  - accessRotationInterval: Interval for access key rotation
  - secretRotationInterval: Interval for secret key rotation

* Error Handling:
  Comprehensive error handling is implemented throughout the script to handle various 
  scenarios such as file access errors, key generation errors, etc. Error messages are 
  logged to the console for troubleshooting purposes.

* File Path Configuration:
  Ensure that the key.js file path is correctly configured in the script. By default, it 
  assumes that the key.js file is located in the same directory as the script. If the 
  file is located elsewhere, update the file path using the path module.

*/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cron = require('node-cron');
const moment = require('moment');
const keyModule = require('./key');

// Key rotation intervals (in milliseconds)
const days = 24 * 60 * 60 * 1000;

const refreshRotationInterval = 48 * days;
const accessRotationInterval = 16 * days;
const secretRotationInterval = 32 * days;

// Generate a new key
function generateNewKey() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString('hex'));
      }
    });
  });
}

// Simulate key rotation with deletion of previous key
async function kRotation() {
  const now = moment();
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log('Current date:', now.format('YYYY-MM-DD HH:mm:ss'));

  const rotateKey = async (keyObject, interval, keyName) => {
    try {
      const { current, previous, lastRotation } = keyObject;
      if (!lastRotation || now.diff(moment(lastRotation), 'milliseconds') >= interval) {
        if (previous) {
          delete keyObject.previous;
        }
        const newKey = await generateNewKey();
        console.log(`${keyName} rotated.`);
        const diffDays = now.diff(moment(lastRotation), 'days');
        const diffHours = now.diff(moment(lastRotation), 'hours') % 24;
        const diffMinutes = now.diff(moment(lastRotation), 'minutes') % 60;
        console.log(`${diffDays} days ${diffHours} hours ${diffMinutes} minutes remaining`);
        console.log('Old', keyName, 'key:', previous);
        console.log('New', keyName, 'key:', newKey);
        keyObject.previous = current;
        keyObject.current = newKey;
        keyObject.lastRotation = now.toISOString();
      } else {
        const remainingTime = interval - now.diff(moment(lastRotation), 'milliseconds');
        const remainingDays = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
        const remainingHours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        console.log(`No ${keyName} rotation needed.`);
        console.log(`${remainingDays} days ${remainingHours} hours ${remainingMinutes} minutes remaining`);
      }
    } catch (error) {
      console.error(`Error during ${keyName} rotation:`, error);
    }
  };

  console.log('================ Access Key Rotation ================');
  await rotateKey(keyModule.accessSecretKey, accessRotationInterval, 'AccessSecretKey');;

  console.log(' ');
  console.log("================ Refresh Key Rotation ================");
  await rotateKey(keyModule.refreshSecretKey, refreshRotationInterval, 'RefreshSecretKey');

  console.log(' ');
  console.log('================= Secret Key Rotation ================');
  await rotateKey(keyModule.secretKey, secretRotationInterval, 'SecretKey');
  console.log('======================================================');

  // Write updated keys back to key.js after rotation
  const updatedKeyModule = `module.exports = ${JSON.stringify(keyModule, null, 2)}`;
  const filePath = path.join(__dirname, 'key.js'); // Adjust the file path

  try {
    // Check if the file exists and is writable
    fs.accessSync(filePath, fs.constants.F_OK | fs.constants.W_OK);

    // Write to the file
    fs.writeFileSync(filePath, updatedKeyModule);
    console.log('Updated key.js with new keys.');
  } catch (error) {
    console.error('Error writing to key.js:', error);
  }
}

// Error handling for reading/writing key.js
try {
  // Run the key rotation logic
  kRotation();
} catch (error) {
  console.error('Error during key rotation:', error);
}

// Cron job to run key rotation every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running key rotation...');
  try {
    await kRotation();
  } catch (error) {
    console.error('Error during key rotation:', error);
  }
});
