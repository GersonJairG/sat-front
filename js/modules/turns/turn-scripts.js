$(document).ready(function () {


	animateCircles();

	var nuevosUsuarios = [];

	var $nombre = "", $codigo = "", $servicioElegido = "", numeroTurno = 0, id = 0;
	$('.opciones').on('click', 'li', function (event) {

		event.preventDefault();

		$nombre = $(".value-nombre").val();
		$codigo = $(".value-codigo").val();

		if ($(this).attr('class') == 'rep-notas') {

			$servicioElegido = $(".value-notas").text();
		}

		if ($(this).attr('class') == 'rep-materias') {

			$servicioElegido = $(".value-materias").text();
		}

		if ($(this).attr('class') == 'consulta') {

			$servicioElegido = $(".value-consulta").text();
		}

		console.log("nombre: " + $nombre + " codigo: " + $codigo + " servicio: " + $servicioElegido);

	});



	$("#create-turn").click(function () {
		var email = $('#email').val();
		var idServiceType = $("#select-services option:selected").val();
		var nameServiceType = $("#select-services option:selected").text();
		var turnState = 1;//activo
		var turnType = 'Normal';
		var idUserUnkown = 1;//usuario unkown
		var nameUserUnkown = 'Anonimo';
		var documentUserUnkown = '0000000000';
		var idAdminAssigned = 0;
		if ($('#container-check-urgent').hasClass('active')) {
			turnType = 'Urgente';
		}

		if ($('#container-check-user').hasClass('active')) {
			if (idServiceType != 0) {
				$(this).attr('data-dismiss', 'modal');				
				createTurnFirebase(turnType, turnState, idUserUnkown, idServiceType, 2, profileModule.getDependenceUserInfo(),nameUserUnkown,'',documentUserUnkown,nameServiceType,idAdminAssigned);
				swal({
					title: 'Nuevo turno creado',
					text: 'El turno pertenece a un usuario sin registro',
					icon: 'success'
				}).then((value) => {
					if (value) {
						optionClearNewTurn();
						// loadTurnsFirebase();
					}
				})
			} else {
				$(this).attr('data-dismiss', '');
				sweetAlertsError('Debe indicar el tipo de servicio');
			}
		} else {
			if (email != "") {
				if (idServiceType != 0) {
					$(this).attr('data-dismiss', 'modal');
					UserModule.findUserForEmail(email)
						.then(response => {
							console.log(idServiceType);
							console.log(nameServiceType);
							createTurnFirebase(turnType, turnState, response.id, idServiceType, 2, profileModule.getDependenceUserInfo(),response.name,response.lastname,response.document,email,nameServiceType,idAdminAssigned);
							swal({
								title: 'Nuevo turno creado',
								text: 'El turno pertenece a ' + response.name,
								icon: 'success'
							}).then((value) => {
								if (value) {
									optionClearNewTurn();
									// loadTurnsFirebase
								}
							})
						}).catch(error => {
							console.log(error);
						})


				} else {
					$(this).attr('data-dismiss', '');
					sweetAlertsError('Debe indicar el tipo de servicio');
				}
			} else {
				$(this).attr('data-dismiss', '');
				sweetAlertsError('Debe digilenciar el email del usuario');

			}

		}

	});

	$(".insert-turn").click(function () {

		$nombre = $(".value-nombre").val("");
		$codigo = $(".value-codigo").val("");
	});

	$(function () { $('[data-toggle="tooltip"]').tooltip(); });


	function animateCircles() {

		$('.circle-one').fadeOut(1000, function () {
			$('.circle-two').fadeOut(1000, function () {
				$('.circle-three').fadeOut(1000, function () {
					$('.circle-three').fadeIn(1000);
					animateCircles();
				});
				$('.circle-two').fadeIn(1000);
			});
			$('.circle-one').fadeIn(1000);

		});

	}

	function insertNewTurn() {
		var newTurn = document.getElementById('waiting-turn');
		newTurn.insertAdjacentHTML('beforeend', '<div class="turn"><h3 class="turn--name">' + $nombre + '</h3><h4 class="turn--code">' + $codigo + '</h4><h4 class="turn--service">' + $servicioElegido + '</h4><div class="turn-waiting__buttons"><button class="btn btn-success btn-md att-turn" number-turn=' + numeroTurno + '>Atender turno</button><a href="#" class="btn btn-success btn-md" style="width:50px;" data-toggle="tooltip" data-placement="bottom" title="Editar Turno"><i class="fa fa-pencil" aria-hidden="true"></i></a></div></div>');
	}


	function attendTurn() {
		var turnToAttend = nuevosUsuarios.shift();
		insertAttendTurn(turnToAttend.nombre, turnToAttend.codigo, turnToAttend.servicio);
	}


	function addEvents() {
		$("[number-turn=" + numeroTurno + "]").on('click', function () {
			attendTurn();
			$(this).parent().parent().fadeOut(1000);
		});
	}

	function addNewUser() {

		nuevosUsuarios.push({ idTurn: id, nombre: $nombre, codigo: $codigo, servicio: $servicioElegido, atendido: false });
		console.log(nuevosUsuarios);
		numeroTurno++;
		id++;

	}

	function optionClearNewTurn() {
		$('#check-user').checked = false;
		$('#email').val("");
		$('#email').attr('disabled', null);
		$('#check-urgent').checked = false;
		$('#myModal').modal('hide');
	}

	function sweetAlertsError(text) {
		swal({
			title: 'Datos incorrectos',
			text: text,
			icon: 'error'
		})
	}
});