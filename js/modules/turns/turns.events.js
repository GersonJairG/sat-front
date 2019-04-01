
dependenciesModule.showDependencies(profileModule.getDependenceUserInfo())
    .then(response => {
        console.log(response);
        $('#title-state-turn').html('Estado de turnos de ' + response.name);
    })


function createTurnFirebase(turnType, idTurnState, idUser, idServiceType, idSemester, idDependence, nameUser, lastnameUser, documentUser, email, nameServiceType, idAdminAssigned) {
    turnsModule.createTurnFirebase(turnType, idTurnState, idUser, idServiceType, idSemester, idDependence, nameUser, lastnameUser, documentUser, email, nameServiceType, idAdminAssigned)
        .then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
}


function createUser(document, name, lastname, email, phone, password, id_user_state) {
    UserModule.createUser(document, name, lastname, email, phone, password, id_user_state)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}
function updateTurnFirebase(idTurnFirebase, idTurnState, detail, idAdminAssigned) {
    turnsModule.changeStateTurn(idTurnFirebase, idTurnState, detail, idAdminAssigned)
        .then(response => {
            // console.log(response);
        }).catch(error => {
            console.log(error);
        })
}

function sendMail(email, name, idFirebase) {
    mailsModule.sendMail(email, name, idFirebase)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
}

$("#email").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: constants.URL_API + '/users/common/' + 1,//los usuairos con user_state:1
            dataType: "json",
            data: {
                searchText: request.term
            },
            success: function (data) {
                response($.map(data, function (item) {
                    if (item.email.startsWith(request.term)) {
                        return {
                            label: item.email,
                            value: item.email
                        }
                    }
                }));
            }
        })
    }
});

$('#new-turn').on('click', function () {
    $('#select-services').empty();
    $('#select-services').append($('<option>', {
        value: 0,
        text: "Tipo de servicio.."
    }));

    servicesModule.showServiceTypesForDependence(profileModule.getDependenceUserInfo())
        .then(response => {
            response.forEach(function (element) {
                console.log(element);
                $('#select-services').append($('<option>', {
                    value: element.id,
                    text: element.name
                }));
            });
        })
        .catch(error => {
            console.log(error);
        })
})


function checkUnknown(check) {
    if (check.checked) {
        $('#email').attr('disabled', 'disabled');
        $('#email').val('');
    }
    else {
        $('#email').attr('disabled', null);
    }

}


function loadTurnsFirebase() {
    // console.log(profileModule.getDependenceUserInfo());
    var result = turnsModule.getTurnsFirebase();
    result.on('value', function (snapshot) {
        var response = snapshot.val();
        $('#container-waiting-turn').empty();
        document.getElementById('container-waiting-turn').insertAdjacentHTML('beforeend', '<span id="waiting-turn"></span>');
        for (var content in response) {
            console.log(content);
            var turnoFirebase = response[content];
            if (turnoFirebase.id_dependence == profileModule.getDependenceUserInfo()) {
                if (turnoFirebase.id_turn_state == 1) {
                    document.getElementById('waiting-turn').insertAdjacentHTML('beforeend', '<div class="turn gray"><h3 class="turn--name">' + turnoFirebase.name_user + ' ' + turnoFirebase.lastname_user + '</h3><h4 class="turn--code">' + turnoFirebase.document_user + '</h4><h4 class="turn--service">' + turnoFirebase.name_service_type + '</h4><div class="turn-waiting__buttons"><button class="btn btn-success btn-md att-turn" id=' + content + 'attended' + ' id-firebase=' + content + ' title="Atender turno">Atender turno</button><button class="btn btn-danger btn-md turn-deleted" id=' + content + 'deleted' + ' style="width:50px;" id-firebase=' + content + ' data-toggle="tooltip" data-placement="bottom" title="Eliminar turno"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div>');

                    $('#' + content + 'attended').on('click', function () {
                        // console.log('editando....');
                        var idFirebase = $(this).attr('id-firebase');
                        updateTurnFirebase(idFirebase, 2, null, profileModule.getIdUserInfo());
                        // se actualiza el estado a 2 : en proceso, y el detalle, paso el id del administrador actual por que lo requiere el metodo, pero no es necesario

                    })

                    $('#' + content + 'deleted').on('click', function () {
                        // console.log('editando....');
                        swal({
                            title: "¿Estas seguro de esto?",
                            text: "Si aceptas no podras recuperar el turno",
                            icon: "warning",
                            buttons: ["No,cancelar", "Si,eliminar!"]
                        }).then((value => {
                            if (value) {
                                var idFirebase = $(this).attr('id-firebase');
                                updateTurnFirebase(idFirebase, 4, null, profileModule.getIdUserInfo());
                                // se actualiza el estado a 4 : cancelado, y el detalle, paso el id del administrador actual por que lo requiere el metodo, pero no es necesario
                                swal({
                                    title: 'Cancelado!',
                                    text: 'el turno ha sido cancelado correctamente.',
                                    icon: 'success'
                                })
                            }
                        }))

                    })
                }
            }
        }

    });
}

function loadTurnsProgressFirebase() {

    var result = turnsModule.getTurnsFirebase();
    result.on('value', function (snapshot) {
        var response = snapshot.val();
        $('#container-progress-turn').empty();
        document.getElementById('container-progress-turn').insertAdjacentHTML('beforeend', '<span id="progress-turn"></span>');
        for (var content in response) {
            var turnoFirebase = response[content];
            if (turnoFirebase.id_dependence == profileModule.getDependenceUserInfo() && turnoFirebase.id_turn_state == 2 && turnoFirebase.id_admin_assigned == profileModule.getIdUserInfo()) {

                document.getElementById('progress-turn').insertAdjacentHTML('beforeend', '<div class="turn pink turn-color"><h3 class="turn--name">' + turnoFirebase.name_user + '</h3><h4 class="turn--code">' + turnoFirebase.document_user + '</h4><h4 class="turn--service">' + turnoFirebase.name_service_type + '</h4><div><button class="btn btn-danger btn-md" id=' + content + 'finish' + ' id-firebase=' + content + '>Finalizar turno</button></div></div>');

                $('#' + content + 'finish').on('click', function () {
                    var modal = $("#myModalFinishTurn").modal();
                    modal.find('.modal-footer #finish-turn').attr('idFirebase', $(this).attr('id-firebase'));
                })

            }
        }

    });
}

$('#finish-turn').on('click', function () {
    var idFirebase = $(this).attr('idFirebase');
    var detail = $('#detail').val();
    // alert(idFirebase);
    updateTurnFirebase(idFirebase, 3, detail, profileModule.getIdUserInfo());
    //enviar correos:
    var turnos = turnsModule.getTurnsFirebase();
    turnos.on('value', function (snapshot) {
        var response = snapshot.val();
        for (var content in response) {
            if (content == idFirebase) {
                sendMail(response[content].email_user,response[content].name_user,idFirebase);//nube
                // sendMail('jairguerrerosilvera@gmail.com', 'Gerson Jair', idFirebase);//local
                swal({
                    title: "Finalizado!",
                    text: "Se ha enviado un correo al usuario para la calificacion",
                    icon: "success",
                })
            }
        }

    });
})


$('#new-user-for-admin').on('click', function () {
    $("#myModalUser").modal();
})

//captura el click para limpiar los campos
$('#cancel-modal').on('click', function () {
    $('#name-new-user').val("");
    $('#lastname-new-user').val("");
    $('#document-new-user').val("");
    $('#email-new-user').val("");
    $('#phone-new-user').val("");
    $('#password-new-user').val("");
    $('#repassword-new-user').val("");
})

//captura el click para limpiar los campos con la x
$('#close-modal-create').on('click', function () {
    $('#name-new-user').val("");
    $('#lastname-new-user').val("");
    $('#document-new-user').val("");
    $('#email-new-user').val("");
    $('#phone-new-user').val("");
    $('#password-new-user').val("");
    $('#repassword-new-user').val("");
})


//Captura clic de boton Terminar para crear el usuario normal cuando lo hace un Administrador
$('#save-user-for-admin').on('click', function () {

    var name = $('#name-new-user').val();
    var lastname = $('#lastname-new-user').val();
    var document = $('#document-new-user').val();
    var email = $('#email-new-user').val();
    var phone = $('#phone-new-user').val();
    var password = $('#password-new-user').val();
    var repassword = $('#repassword-new-user').val();
    var id_user_state = 1;//activo

    if (!(name == '' || lastname == '' || document == '' || email == '' || phone == '' || password == '' || repassword == '')) {
        if (!helper.checkOnlyNumbers(document)) {
            swal({
                title: 'Error!',
                text: 'El campo documento solo acepta caracteres numericos.',
                icon: 'error'
            })
            $('#save-user-for-admin').attr('data-dismiss', '');
        } else if (!helper.checkOnlyNumbers(phone)) {
            $('#save-user-for-admin').attr('data-dismiss', '');
            swal({
                title: 'Error!',
                text: 'El campo telefono solo acepta caracteres numericos.',
                icon: 'error'
            })
        } else if (helper.checkEmail(email)) {
            var goodEmail = true;
            var goodDocument = true;
            UserModule.getAllusers()
                .then(response => {
                    response.forEach(usuario => {
                        if (usuario.email == email) {
                            goodEmail = false;
                        } if (usuario.document == document) {
                            goodDocument = false;
                        }
                    });
                    if (goodEmail) {
                        if (goodDocument) {
                            if (password == repassword) {
                                $('#save-user-for-admin').attr('data-dismiss', 'modal');
                                createUser(document, name, lastname, email, phone, password, id_user_state);
                                swal({
                                    title: 'Nuevo Usuario :' + name + ' !',
                                    text: 'El usuario ha sido creado correctamente.',
                                    icon: 'success'
                                })
                            } else {
                                $('#save-user-for-admin').attr('data-dismiss', '');
                                swal({
                                    title: 'Error!',
                                    text: 'El usuario no ha podido ser creado, las contraeñas no coinciden.',
                                    icon: 'error'
                                })
                            }
                        } else {
                            $('#save-user-for-admin').attr('data-dismiss', '');
                            swal({
                                title: 'Error!',
                                text: 'El documento ingresado ya existe en la base de datos.',
                                icon: 'error'
                            })
                        }
                    } else {
                        $('#save-user-for-admin').attr('data-dismiss', '');
                        swal({
                            title: 'Error!',
                            text: 'El correo ingresado ya existe en la base de datos.',
                            icon: 'error'
                        })
                    }
                })
        } else {
            $('#save-user-for-admin').attr('data-dismiss', '');
            swal({
                title: 'Error!',
                text: 'El usuario no ha podido ser creado, ingrese un correo valido.',
                icon: 'error'
            })
        }

    } else {
        $('#save-user-for-admin').attr('data-dismiss', '');
        swal({
            title: 'Datos incompletos!',
            text: 'El usuario no ha podido ser creado, complete todos los datos.',
            icon: 'error'
        })
    }
})




loadTurnsFirebase();
loadTurnsProgressFirebase();
