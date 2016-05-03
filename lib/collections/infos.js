Infos = new Mongo.Collection('infos');

Infos.allow({
  update: function(userId, info) { return ownsDocument(userId, info); },
  remove: function(userId, info) { return ownsDocument(userId, info); },
});

Infos.deny({
  update: function(userId, info, fieldNames, modifier) {
    var errors = validateInfo(modifier.$set);
    return errors.enName || errors.viName;
  }
});

Meteor.methods({
  infoInsert: function(infoAttributes) {
    check(this.userId, String);
    check(infoAttributes, {
      enName: String,
      viName: String,
      email: String,
      phone: String,
      website: String
    });

    var errors = validateInfo(infoAttributes);
    if (errors.viName || errors.enName)
      throw new Meteor.Error('invalid-Info', "You must set a title and URL for your info");


    var infoWithSameLink = Infos.findOne({viName: infoAttributes.viName});
    if (infoWithSameLink) {
      return {
        infoExists: true,
        _id: infoWithSameLink._id
      }
    }

    var user = Meteor.user();
    var info = _.extend(infoAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });

    var infoId = Infos.insert(info);

    return {
      _id: infoId
    };
  }
});

validateInfo = function (info) {
  var errors = {};

  if (!info.enName)
    errors.enName = "Please fill in a enName";

  if (!info.viName)
    errors.viName =  "Please fill in a viName";

  return errors;
}