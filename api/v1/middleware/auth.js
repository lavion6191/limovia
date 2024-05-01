/*
    Auth Middleware

    This middleware verifies the provided Access Token (ACT) to determine the user's authentication status. It first attempts
    to verify the ACT with the current access secret key. If successful, the user is granted access. If the verification fails,
    it then tries to verify the ACT with the previous access secret key as a fallback.

    If both verifications fail, indicating an expired or invalid ACT, the middleware invokes the "newACT" function to generate
    a new ACT token using the provided Refresh Token (REFT). The newly generated ACT is then sent back in the response.

    Usage:
    - Import this middleware into route handler or endpoint that requires user authentication.
    - Apply it as a middleware to the relevant route(s) using app.use(authMW, route).

    NOTE: Middleware first and then the Route.
*/


const jwt = require('jsonwebtoken');
const { accessSecretKey } = require('config/key');

const authMW = async (req, res, next) => {
    const ACT = req.body.ACT || req.query.ACT;
    console.log("QUERY: ", req.query)
    console.log("BODY: ", req.body)
    console.log("M-Auth - ACT: ", ACT);

    try {
        // Attempt to verify ACT with current key
        jwt.verify(ACT, accessSecretKey.current);

        // ACT is verified with the current key
        console.log("ACT has been verified with the current key");
        return next();
    } catch (currentKeyError) {
        try {
            // Attempt to verify ACT with previous key
            jwt.verify(ACT, accessSecretKey.previous);

            // ACT is verified with the previous key
            console.log("ACT has been verified with the previous key");
            return next();
        } catch (previousKeyError) {
            // Both ACT keys failed.
            res.json({xACT: 'Invalid ACT'})
        }
    }
};

module.exports = authMW;