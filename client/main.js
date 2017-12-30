import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { Sign, ChartData, Profiles } from '../lib/collections.js';

import './main.html';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.data.onCreated(function () {
  const handler = Meteor.subscribe('signs');
});

Meteor.subscribe('signs');
Meteor.subscribe('chartdata');
Meteor.subscribe('profiles');

Template.show_data.helpers({
  signs2: function () {
    return Sign.find({});
  }
});

//update profile
Template.profile.events({
  'click #btn': function () {
    console.log('clicked');
    Meteor.call('getData', function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        for (i = 0; i < res.length; i++) {
          var bla = res[3].username;
          $('#test').html(bla);

        }
      }
    })
  }
});

Template.data.events({
  'submit .add-form2': function () {
    console.log('clicked');
    event.preventDefault();
    const sname = $('#sign-name').val();
    const sdesc = $('#sign-desc').val();
    console.log(sname, sdesc);
    Meteor.call('sign.insert', sname, sdesc);
    $('#sign-name').val('');
    $('#sign-desc').val('');
  }
});



Template.sidebar.events({
  'click .button-collapse': function () {
    $(".button-collapse").sideNav({closeOnClick:true});
  }
});

Template.charts.events({
  'submit .chart_inputs': function () {
    console.log('clicked');
    event.preventDefault();
    //return false;
    var userId = '601533';
    var apiKey = '077cf62fcf009f95acc6103fdce77faf';

    var day = $('#day').val();
    var month = $('#month').val();
    var year = $('#year').val();
    var hour = $('#hour').val();
    var min = $('#min').val();
    var lat = $('#lat').val();
    var lon = $('#lon').val();
    var tz = $('#tz').val();
    

    var data = {
      day: day,
      month: month,
      year: year,
      hour: hour,
      min: min,
      lat: lat,
      lon: lon,
      tzone: tz
    };
    var request = $.ajax({
      url: "https://json.astrologyapi.com/v1/" + "planets/tropical",
      method: "POST",
      dataType: 'json',
      headers: {
        "authorization": "Basic " + btoa(userId + ":" + apiKey),
        "Content-Type": 'application/json'
      },
      data: JSON.stringify(data),
      success: function (resp) {
        Meteor.call('chart.insert', data);
        console.log(resp);
        console.log(data);

        /*
        var zero = resp[0].name +" - "+ resp[0].sign +" - Casa: "+ resp[0].house;
        $('#0').html(zero);
        var one = resp[1].name +" - "+ resp[1].sign +" - Casa: "+ resp[1].house;
        $('#1').html(one);
        var two = resp[2].name +" - "+ resp[2].sign +" - Casa: "+ resp[2].house;
        $('#2').html(two);
        var three = resp[3].name +" - "+ resp[3].sign +" - Casa: "+ resp[3].house;
        $('#3').html(three);
        var four = resp[4].name +" - "+ resp[4].sign +" - Casa: "+ resp[4].house;
        $('#4').html(four);
        var five = resp[5].name +" - "+ resp[5].sign +" - Casa: "+ resp[5].house;
        $('#5').html(five);
        var six = resp[6].name +" - "+ resp[6].sign +" - Casa: "+ resp[6].house;
        $('#6').html(six);
        var seven = resp[7].name +" - "+ resp[7].sign +" - Casa: "+ resp[7].house;
        $('#7').html(seven);
        var eight = resp[8].name +" - "+ resp[8].sign +" - Casa: "+ resp[8].house;
        $('#8').html(eight);
        var nine = resp[9].name +" - "+ resp[9].sign +" - Casa: "+ resp[9].house;
        $('#9').html(nine);
        var ten = resp[10].name +" - "+ resp[10].sign +" - Casa: "+ resp[10].house;
        $('#10').html(ten);
        */
      }
    });
  }
});

Template.profile.events({
  'click .test_api': function () {
    console.log('clicked');

    var userId = '601533';
    var apiKey = '077cf62fcf009f95acc6103fdce77faf';

    var data = {
      day: 17,
      month: 11,
      year: 1972,
      hour: 4,
      min: 45,
      lat: -23,
      lon: -46,
      tzone: -4
    };
    var request = $.ajax({
      url: "https://json.astrologyapi.com/v1/" + "planets/tropical",
      method: "POST",
      dataType: 'json',
      headers: {
        "authorization": "Basic " + btoa(userId + ":" + apiKey),
        "Content-Type": 'application/json'
      },
      data: JSON.stringify(data),
      success: function (resp) {
        console.log(resp);
        for(i=0; i<resp.length;i++){
          console.log("after:", resp[i].name);
          var test = resp[i];
          var test2 = resp[0].name;
        }
        //console.log(data);
        //console.log(resp[0].name, resp[0].sign, resp[0].house);
      }
    });
  }
});

Template.signup.events({
  'submit .signupform': function(event){
    event.preventDefault();
    var username = $('#s-username').val();
    var email = $('#s-email').val();
    var password = $('#s-password').val();
    var nome = $('#s-nome').val();
    var sobrenome = $('#s-sobrenome').val();
    Meteor.call('profiles.insert', nome, sobrenome);
    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: {
        firstName: nome,
        lastName: sobrenome
      }
    }, function(){
      FlowRouter.go('/home');
      console.log(nome, sobrenome);
    });

  }
});

Template.login.events({
  'submit .loginform': function(event){
    event.preventDefault();
    var usernemail = $('#usernemail').val();
    var password = $('#password').val();
    Meteor.loginWithPassword(usernemail, password, function(){
      FlowRouter.go('/home');
    });
  }
});

Template.logout.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout(function(){
      FlowRouter.go('/login');
    });
  }
});

Template.profile.helpers({
  userData: function(){
    return Meteor.user();
  }
});

Template.profile.helpers({
  userEmail: function(){
    return Meteor.user().emails[0].address;
  },
  userData2(){
    return Profiles.find();
  }
});






