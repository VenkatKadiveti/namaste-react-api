var express = require('express');
var router = express.Router();
var utils = require('../utils/axios');


router.get('/v1/userInfo', function(req, res, next) {
  utils.fetchUserProfile().then(userData => {
    res.status(200).send(userData.data);
  }).catch(error => {
    res.status(500).send({error: true, message: error.message})
  })
});

module.exports = router;
