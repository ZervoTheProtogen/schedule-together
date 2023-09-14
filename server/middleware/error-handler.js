// TODO: Rewrite to TypeScript

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({ message: 'Unauthorized' });
        case err.name === 'ForbiddenError':
            return res.status(403).json({ message: 'Forbidden'})
        default:
            return res.status(500).json({ message: err.message });
    }
}