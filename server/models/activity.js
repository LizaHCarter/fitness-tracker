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
  Activity.collection.save(b, function(err, activity){
    require('./user').findById(activity.userId, function(err, user){
      user.cWeight -= (activity.calories/3500);
      user.calories -= activity.calories;
      require('./user').collection.update({_id:user._id}, {$set:{calories:user.calories, cWeight:user.cWeight}}, function(){
        cb(null, activity, user);
      });
    });
  });
};

Activity.all = function(user, cb){
  Activity.collection.find({userId:user._id}).toArray(cb);
};

module.exports = Activity;
