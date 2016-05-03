Template.infoEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPersonId = this._id;

    var personProperties = {
      viName: $(e.target).find('[name=viName]').val(),
      enName: $(e.target).find('[name=enName]').val()
    }

    Infos.update(currentPersonId, {$set: personProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('personPage', {_id: currentPersonId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPersonId = this._id;
      Infos.remove(currentPersonId);
      Router.go('peopleList');
    }
  }
});
