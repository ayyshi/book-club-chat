'use strict';

const express     = require('express');
const router      = express.Router();
const user        = require('../controllers/user');
const expressJwt  = require('express-jwt');
// const secret      = "";
const secret = "ihdfioahdfoihasd";

router.route('/user/auth')
  .post(user.auth);

router.route('/user/signup')
  .post(user.create);

router.route('/user')
  .all(expressJwt({
    secret: secret,
    userProperty: 'auth'
  }))
  .delete(user.destroy);

router.route('/user/:username')
  .all(expressJwt({
    secret: secret,
    userProperty: 'auth'
  }))
  // get single user
  .get(user.retrieve)
  // user update
  .put(user.update);

module.exports = router;
