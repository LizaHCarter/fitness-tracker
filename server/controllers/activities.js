'use strict';

var Activity = require('../models/activity');

exports.create = function(req, res){
  Activity.create(req.body, req.user, function(err, activity){
    res.send({activity:activity});
  });
};

exports.index = function(req, res){
  Activity.all(req.user, function(err, activities){
    res.send({activities:activities});
  });
};
