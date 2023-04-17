/* 
    User Routes / Auth
    host + /api/auth
*/
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { Router } = require('express');
const { validateFields } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Invalid password').isLength({ min: 6 }),
    validateFields
], createUser);

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Invalid password').isLength({ min: 6 }),
    validateFields
], loginUser);

router.get('/renew', validateJWT, renewToken);

module.exports = router;