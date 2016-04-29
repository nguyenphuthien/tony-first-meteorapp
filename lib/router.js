Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return Meteor.subscribe('infos'); }
});

Router.route('/', {name: 'peopleList'});
Router.route('/people/:_id', {
    name: 'personPage',
    data: function() {return Infos.findOne(this.params._id);}
});
    
Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'personPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
