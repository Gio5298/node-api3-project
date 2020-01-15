const express = require('express');

const router = express.Router();

const userDb = require('./userDb');

const postDb = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  const userInfo = req.body;
  userDb.insert(userInfo)
  .then(info => {
    res.status(200).json(info);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: 'There was an error saving the user.'
    })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id;
  const postInfo = req.body;
  userDb.getById(id)
  .then(info => {
    res.status(200).json(info)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      errorMessage: 'There was an error saving the post.'
    })
  })
});

router.get('/', (req, res) => {
  userDb.get()
  .then(info => {
    res.status(200).json(info)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: 'error retrieving users.'
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  userDb.get()
  .then(info => {
    res.status(200).json(info)
  })
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  userDb.getById(id)
  .then(info => {
    if (!info) {
      res.status(404).json({
        errorMessage: 'invalid user id'
      })
    } else {
      next()
    }
  })
}

function validateUser(req, res, next) {
  const userData = req.body;
  if (!userData){
    res.status(400).json({
      message: 'missing user data'
    })
  } else if (!userData.name){
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const postData = req.body;
  if (!postData){
    res.status(400).json({
      message: 'missing post data'
    })
  } else if (!postData.text){
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    next()
  }
}

module.exports = router;
