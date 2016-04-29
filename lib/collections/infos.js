Infos = new Mongo.Collection('infos');

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