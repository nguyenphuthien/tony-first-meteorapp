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
Router.onBeforeAction('dataNotFound', {only: 'personPage'});