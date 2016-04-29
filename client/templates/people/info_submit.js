Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var info = {
      viName: $(e.target).find('[name=viName]').val(),
      enName: $(e.target).find('[name=enName]').val()
    };

    Meteor.call('infoInsert', info, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
      if (result.infoExists)
        alert('This link has already been posted');


      Router.go('personPage', {_id: result._id});  
    });
  }
});