
FlowRouter.route('/login', {
    name: 'login',
    action(){
        if(!Meteor.userId()){
            BlazeLayout.render('auth',{
                mainauth:'login',
            });     
        }    
    }
});

FlowRouter.route('/signup', {
    name: 'signup',
    action(){
        if(!Meteor.userId()){
            BlazeLayout.render('auth',{
                mainauth:'signup',
                //footer:'footer'
            });  
        }    
    }
});

FlowRouter.route('/home', {
    name: 'home',
    action(){
        if(Meteor.userId()){
            BlazeLayout.render('appLayout',{
                main:'home',
            });
        } else {
           FlowRouter.go('/login'); 
        }
        
    }
});

FlowRouter.route('/charts', {
    name: 'charts',
    action(){
        if(Meteor.userId()){
            BlazeLayout.render('appLayout', {
                main: 'charts',
              //  footer: 'footer'
            });
        } else {
            FlowRouter.go('/login');
        }
       
    }
});

FlowRouter.route('/profile', {
    name: 'profile',
    action(){
        if(Meteor.userId()){
            BlazeLayout.render('appLayout', {
                main: 'profile',
               // footer: 'footer'
            });
        } else {
            FlowRouter.go('/login');
        } 
    }
});

FlowRouter.route('/settings', {
    name: 'settings',
    action(){
        if(Meteor.userId()){
            BlazeLayout.render('appLayout', {
                main: 'settings',
              // footer: 'footer'
            });
        } else {
            FlowRouter.go('/login');
        }
    }
});

FlowRouter.route('/sidebar', {
    name: 'sidebar',
    action(){
        if(Meteor.userId()){
            BlazeLayout.render('sidebar');
        } else {
            FlowRouter.go('/login');
        }
        
    }
});

FlowRouter.route('/data', {
    name: 'data',
    action(){
        BlazeLayout.render('data');
    }
});