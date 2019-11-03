const express = require('express');
const router = express.Router();
const Todos = require('../models/todo');

router.get('/', function(req, res, next) {
    Todos.find({})
        .then(todos => res.send(todos))
        .catch(err => next(err));
});

router.post('/', function(req, res, next) {
    Todos.create(req.body)
        .then(todo => res.status(201).send(todo))
        .catch(err => next(err));
});

router.delete('/:id', function(req, res, next) {
    Todos.findByIdAndRemove(req.params.id)
        .then(todo => res.send(todo))
        .catch(err => next(err));
});

module.exports = router;