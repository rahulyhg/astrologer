import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import express from 'express';
import { Http } from 'meteor/http';

import { Sign, Profiles } from '../lib/collections.js';

const app = express();

Meteor.publish('signs', function(){
  return Sign.find();
});

Meteor.publish('chartdata', function(){
//  return ChartData.find();
});

Meteor.publish('users', function(){
  Meteor.user().find(this.userId);
});

Meteor.publish('profiles', function(){
  return Profiles.find();
});

Meteor.startup(() => {
  
});

Meteor.methods({
  getData: function(){
    var url='https://jsonplaceholder.typicode.com/users';
    var result = Meteor.http.get(url);
    if(result.statusCode ==200){
      var res = JSON.parse(result.content);
      return res;
    } else {
      var err = result.content;
      console.log('Error:', err);
      return err;
    }
  }
});

