import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Profiles = new Mongo.Collection('profiles');
export const Sign = new Mongo.Collection('signs');
export const ChartData = new Mongo.Collection('chartdata');

Meteor.methods({
    'profiles.insert'(nome, sobrenome){
        check(nome, String);
        check(sobrenome, String);
        if(nome === '' || sobrenome === ''){
            throw new Error('Please fill in all fields');
        }

        Profiles.insert({
            nome,
            sobrenome,
            createdAt: new Date(),
            userId: Meteor.userId(),
           // username: Meteor.user().username,
          //  email: Meteor.user().email
        });
        
    },

    'sign.insert'(signName, signDescription){
        check(signName, String);
        check(signDescription, String);
        if(signName === '' || signDescription === ''){
            throw new Error('Fields cannot be empty!');
        }

        Sign.insert({
            signName,
            signDescription
        });
    },

    'chart.insert'(data){
        check(data, Object);
        /*
        check(day, Number);
        check(month, Number);
        check(year, Number);
        check(hour, Number);
        check(min, Number);
        check(lat, Number);
        check(long, Number);
        check(tzone, Number);

        if(day == '' || month === '' || year === '' || hour === '' || min === '' || lat === '' || lon === '' | tzone === ''){
         */
        if(data === '' || !data){  
            throw new Error('No fields can be empty!');
        }
        ChartData.insert({
            day, 
            month, 
            year, 
            hour, 
            min, 
            lat, 
            lon, 
            tz,
            name: 'test name',
            date: Date.now()
        });
    },
    'profiles.update'(nome, sobrenome){
        check(nome, String);
        check(sobrenome, String);
        if(nome === '' || sobrenome === ''){
            throw new Error('Please fill in all fields');
        }

        Profiles.update({
            nome,
            sobrenome
        });
    },   

});

