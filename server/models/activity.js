'use strict';

function Activity(o, user){
  this.name       = o.name;
  this.calories   = o.calories;
  this.day        = o.day;
  this.details    = o.details;
  this.userId     = user._id;
}

Object.defineProperty(Activity, 'collection', {
  get: function(){return global.mongodb.collection('activities');}
});

Activity.create = function(o, user, cb){
  var b = new Activity(o, user);
  Activity.collection.save(b, cb);
};

Activity.all = function(user, cb){
  Activity.collection.find({userId:user._id}).toArray(cb);
};

module.exports = Activity;
