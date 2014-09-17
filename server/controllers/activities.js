'use strict';

var Activity = require('../models/activity');

exports.create = function(req, res){
  Activity.create(req.body, req.user, function(err, activity, user){
    res.send({activity:activity, user:user});
  });
};

exports.index = function(req, res){
  Activity.all(req.user, function(err, activities){
    res.send({activities:activities});
  });
};
