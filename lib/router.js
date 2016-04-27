Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('infos'); }
});

Router.route('/', {name: 'peopleList'});