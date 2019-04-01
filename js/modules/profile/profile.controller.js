var profileModule = {

    getDependenceUserInfo : function(){
        var usuario = store.get('user');
        return usuario.dependence;
    },

    getIdUserInfo : function(){
        var usuario = store.get('user');
        return usuario.id;
    },
    setUserInfo: function () {
        var userInfo = store.get('user');
        $('#username').html( 'Hola, ' + userInfo.name);
    },
    getNavbar: function () {

        var navbar = '';
        var moduloTurnos = helper.getPermission(39);
        var moduloDependencias = helper.getPermission(1);
        var moduloReportes = helper.getPermission(1);
        var role = helper.getRole();
		if(moduloTurnos){
             navbar += getTurnsModule(role); 
        }
		if(moduloDependencias){ 
            navbar += getDependenciesModule(role); 
        }
        navbar += getUserModule(role);

		$('#nabvar').html(navbar);
    }
}

function getUserModule (role) {
    var menu = '';
    menu += '<li class="green with-sub">';
    menu += '<span>';
    menu += '<i class="font-icon font-icon-zigzag"></i>';
    menu += '<span class="lbl">Usuarios</span>';
    menu += '</span>';

    if(role == 1){
        menu += '<ul>';
        menu += '<li>';
        menu += '<a href="#/admin-normaluser">';
        menu += '<span class="lbl">Listado de usuarios</span>';
        menu += '</a>';
        menu += '</li>';
        menu += '</ul>';

        menu += '<ul>';
        menu += '<li>';
        menu += '<a href="#/admin-adminuser">';
        menu += '<span class="lbl">Listado de Administradores</span>';
        menu += '</a>';
        menu += '</li>';
        menu += '</ul>';
    }

    if(role == 2){
        menu += '<ul>';
        menu += '<li>';
        menu += '<a href="#/admin-normaluser">';
        menu += '<span class="lbl">Listado de usuarios</span>';
        menu += '</a>';
        menu += '</li>';
        menu += '</ul>';
    }

    menu += '</li>';
    return menu;
}

function getTurnsModule (role){

	var menu = '';
    // menu += '<li class="pink-red with-sub">';
    // menu += '<span>';
    // menu += '<i class="font-icon font-icon-zigzag"></i>';
    // menu += '<span class="lbl">Turnos</span>';
    // menu += '</span>';

	var consultarTurnos = helper.getPermission(33);

    if(consultarTurnos && role == 2){

        menu += '<li class="pink-red with-sub">';
        menu += '<span>';
        menu += '<i class="font-icon font-icon-zigzag"></i>';
        menu += '<span class="lbl">Turnos</span>';
        menu += '</span>';

        
        menu += '<ul>';
        menu += '<li>';
        menu += '<a href="#/turn-list">';
        menu += '<span class="lbl">Listado de turnos</span>';
        menu += '</a>';
        menu += '</li>';
        menu += '</ul>';
    }
    menu += '</li>';
    return menu;

}

function getDependenciesModule (role) {

	var menu = '<li class="purple with-sub">';
	// menu += '<span>';
	// menu += '<i class="font-icon font-icon-zigzag"></i>';
	// menu += '<span class="lbl">Dependencias</span>';
	// menu += '</span>';

	var consultarDependencias = helper.getPermission(4);
	var actualizarDependencia = helper.getPermission(3);
	var consultarServicios = helper.getPermission(9);
	// var registrarTiposCola = helper.getPermission(40);

	if(consultarDependencias && role == 1){
        menu += '<span>';
        menu += '<i class="font-icon font-icon-zigzag"></i>';
        menu += '<span class="lbl">Dependencias</span>';
        menu += '</span>';

        menu += '<ul>';
        menu += '<li>';
        menu += '<a href="#/dependence-list">';
        menu += '<span class="lbl">Dependencias registradas</span>';
        menu += '</a>';
        menu += '</li>';
        menu += '</ul>';
    }
    
    if(role == 2){
        menu += '<span>';
        menu += '<i class="font-icon font-icon-zigzag"></i>';
        menu += '<span class="lbl">Dependencia Actual</span>';
        menu += '</span>';
    }

	// if(actualizarDependencia && role == 2){
	// 	menu += '<ul>';
    //     menu += '<li>';
    //     menu += '<a href="#/dependence-information">';
    //     menu += '<span class="lbl">Información</span>';
    //     menu += '</a>';
    //     menu += '</li>';
    //     menu += '</ul>';
	// }

	if(consultarServicios){
		menu += '<ul>';
        menu += '<li>';
        menu += '<a href="#/service-list">';
        menu += '<span class="lbl">Servicios</span>';
        menu += '</a>';
        menu += '</li>';
        menu += '</ul>';
	}

	// if(registrarTiposCola){
	// 	menu += '<ul>';
    //     menu += '<li>';
    //     menu += '<a href="#/queue-types">';
    //     menu += '<span class="lbl">Tipos de colas</span>';
    //     menu += '</a>';
    //     menu += '</li>';
    //     menu += '</ul>';
	// }

	menu += '</li>';
    return menu;
}

