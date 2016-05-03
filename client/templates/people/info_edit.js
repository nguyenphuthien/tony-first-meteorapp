Template.infoEdit.onCreated(function() {
  Session.set('infoEditErrors', {});
});

Template.infoEdit.helpers({
  errorMessage: function(field) {
    return Session.get('infoEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('infoEditErrors')[field] ? 'has-error' : '';
  }
});

Template.infoEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPersonId = this._id;

    var personProperties = {
      viName: $(e.target).find('[name=viName]').val(),
      enName: $(e.target).find('[name=enName]').val()
    }

    var errors = validateInfo(personProperties);
    if (errors.viName || errors.enName)
      return Session.set('infoEditErrors', errors);

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
