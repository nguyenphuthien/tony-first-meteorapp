Router.configure({
    layoutTemplate: 'layout',
    waitOn: function() { return Meteor.subscribe('infos'); }
});

Router.route('/', {name: 'peopleList'});