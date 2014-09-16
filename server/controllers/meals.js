'use strict';

var Meal = require('../models/meal');

exports.create = function(req, res){
  Meal.create(req.body, req.user, function(err, meal){
    res.send({meal:meal});
  });
};

exports.index = function(req, res){
  Meal.all(req.user, function(err, meals){
    res.send({meals:meals});
  });
};
