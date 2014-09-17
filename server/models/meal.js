'use strict';

function Meal(o, user){
  this.name       = o.name;
  this.calories   = o.calories;
  this.day        = o.day;
  this.details    = o.details;
  this.userId     = user._id;
}

Object.defineProperty(Meal, 'collection', {
  get: function(){return global.mongodb.collection('meals');}
});

Meal.create = function(o, user, cb){
  var b = new Meal(o, user);
  Meal.collection.save(b, function(err, meal){
    require('./user').findById(meal.userId, function(err, user){
      user.cWeight += (meal.calories/3500);
      user.calories += meal.calories;
      require('./user').collection.update({_id:user._id}, {$set:{calories:user.calories, cWeight:user.cWeight}}, function(){
        cb(null, meal, user);
      });
    });
  });
};

Meal.all = function(user, cb){
  Meal.collection.find({userId:user._id}).toArray(cb);
};

module.exports = Meal;
