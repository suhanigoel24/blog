// middleware/currentRoute.js
const { isActiveRoute } = require('../helpers/routeHelpers');

const setCurrentRoute = (req, res, next) => {
    res.locals.currentRoute = req.path;
    res.locals.isActiveRoute = isActiveRoute;
    next();
};

module.exports = setCurrentRoute;
