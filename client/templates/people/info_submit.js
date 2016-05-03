Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var info = {
      viName: $(e.target).find('[name=viName]').val(),
      enName: $(e.target).find('[name=enName]').val(),
      email: $(e.target).find('[name=email]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      website: $(e.target).find('[name=website]').val()
    };

    Meteor.call('infoInsert', info, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
      if (result.infoExists)
        throwError('This link has already been posted');

      Router.go('personPage', {_id: result._id});  
    });
  }
});