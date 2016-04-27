Meteor.publish('infos', function() {
    return Infos.find()
});