// TODO: Rewrite to TypeScript

const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('helpers/database');

// will replace with a better solution in the future, probably permission system
const adminActions = ['getAllUsers','getUserById','updateUserFull','deleteUserFull']

module.exports = authorize;

function authorize(action = '') {
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            
            // get user with id from token 'sub' (subject) property
            const user = await db.User.findByPk(req.user.sub);

            // check user still exists
            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });

            // prevent non-admins from performing admin actions
            if (user.role != 'admin' && adminActions.includes(action)) {
                console.log("ILLEGAL");
                return res.status(403).json({ message: 'No Permission' });
            }

            // authorization successful
            req.user = user.get();
            next();
        }
    ];
}