Template.peopleInfo.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  }
});