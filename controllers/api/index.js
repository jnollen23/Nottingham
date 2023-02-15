const router = require('express').Router();

const userRoutes = require('./user-routes');
const search = require('./user-routes');

router.use('/users', userRoutes);
router.use('/search'. search)

module.exports = router;
