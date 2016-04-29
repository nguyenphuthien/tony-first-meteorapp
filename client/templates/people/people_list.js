Template.peopleList.helpers({
    people: function() {
    return Infos.find({}, {sort: {submitted: -1}});
  }
});