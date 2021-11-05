var router = require('express').Router();

router.use('/user/', require('./api/user'));
router.use('/ranking/', require('./api/rank'));

module.exports = router;