var app = Sammy('#main', function() {

    this.get('#/', loadTurnList);
    this.get('#/turn-list', loadTurnList);
    this.get('#/dependence-list', loadDependenceList);
    this.get('#/service-list',loadServiceList);
    this.get('#/admin-normaluser', loadAdminUser);
    this.get('#/admin-adminuser', loadAdminSpecialUser);
	
    function loadTurnList(){
        $( "#main" ).load( "templates/turns/turn-list.html");
    }
    function loadDependenceList(){
        $( "#main" ).load( "templates/dependencies/dependence-list.html");
    }
    function loadServiceList(){
        $( "#main" ).load( "templates/services/service-list.html");
    }
    
    function loadAdminUser(){
        $( "#main" ).load( "templates/users/admin-user.html");
    }

    function loadAdminSpecialUser(){
        $( "#main" ).load( "templates/users/admin-user2.html");
    }
});

app.run('#/');