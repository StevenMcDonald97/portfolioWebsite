// based on https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#18d5
// A middleware express function to check if a user has a valid token to access authorized pages


const jwt = require('jsonwebtoken');
const secret = 'asecretphrase';

const withAuth = function(req, res, next){
	const token = req.cookies.token;
	if(!token){
		res.status(401).send('Unauthorized: No token provided');
	} else {
		jwt.verify(token, secret, function(err, decoded){
	      if (err) {
	    	res.status(401).send('Unauthorized: Invalid token');
	      } else {
		      req.email = decoded.email;
		      next();
	      }
	   });
	}
}

module.exports = withAuth;