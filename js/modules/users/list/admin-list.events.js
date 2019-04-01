function createAdmin(document, name, lastname, email, phone, password, id_dependence, id_role) {
    adminModule.createAdmin(document, name, lastname, email, phone, password, id_dependence, id_role)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function deleteAdmin(id) {
    adminModule.deleteAdmin(id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function editAdmin(id, document, name, lastname, email, phone, id_dependence) {
    adminModule.updateAdmin(id, document, name, lastname, email, phone, id_dependence)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}


//se le pasa el id del elemento y true si se mostrara, y false si se ocultara.
function hidOrShow(id, option) {
    if (option) {
        $('#' + id).removeClass('hid');
        $('#' + id).addClass('show-service');
    } else {
        $('#' + id).removeClass('show-service');
        $('#' + id).addClass('hid');
    }
}

//funcion de mostrar los servicios
function loadAdmin() {
    adminModule.getAdmins()
        .then(function (response) {
            var options = adminModule.getOptions(response);

            $('#adminList').DataTable({
                'retrieve': true,//permite volver a cargar la tabla con mas valores o los mismos
                'data': options,
                'columns': [
                    { title: "#", data: 'id' },
                    { title: "Documento", data: 'document' },
                    { title: "Nombre", data: 'name' },
                    { title: "Apellido", data: 'lastname' },
                    { title: "Correo", data: 'email' },
                    { title: "Telefono", data: 'phone' },
                    { title: "Dependencia", data: 'id_dependence' },
                    { title: "Estado", data: 'user_state' },
                    { title: "Opciones", data: 'options' }
                ],
                'bLengthChange': false,
            });

            $('.delete-option').on("click", function () {
                var id = $(this).attr('user-id');
                console.log(id);
                swal({
                    title: "¿Estas seguro de esto?",
                    text: "Si aceptas no podrás recuperar el usuario!",
                    icon: "warning",
                    buttons: ["No, cancelar", "Si, eliminar!"]
                }).then((value => {
                    if (value) {
                        deleteAdmin(id);
                        swal({
                            title: 'Eliminada!',
                            text: 'El usuario ha sido borrado correctamente.',
                            icon: 'success'
                        }).then((value) => {
                            if (value) {
                                refreshAdmin();
                            }
                        })
                    }
                })

                    )
            });

            $('.edit-option').on('click', function () {
                $('#select-dependencies-edit').empty();
                $('#select-dependencies-edit').append($('<option>', {
                    value: 0,
                    text: "Seleccione la dependencia.."
                }));

                var id = $(this).attr('user-id');
                var document = $(this).attr('user-document');
                var name = $(this).attr('user-name');
                var lastname = $(this).attr('user-lastname');
                var correo = $(this).attr('user-email');
                var phone = $(this).attr('user-phone');
                var id_dependence = $(this).attr('user-id_dependence');

                dependenciesModule.getDependencies()
                    .then(function (response) {
                        response.forEach(function (element) {
                            console.log(element.id);
                            if (element.id == id_dependence) {
                                $('#select-dependencies-edit').append($('<option>', {
                                    value: element.id,
                                    text: element.name,
                                    selected: true
                                }));
                            } else {
                                $('#select-dependencies-edit').append($('<option>', {
                                    value: element.id,
                                    text: element.name
                                }));
                            }

                        });
                    }).catch(function (error) {
                        console.log("error:" + error);
                    })

                $('#id-edit-user').val(id);
                $('#name-edit-document').val(document);
                $('#name-edit-name').val(name);
                $('#name-edit-lastname').val(lastname);
                $('#name-edit-mail').val(correo);
                $('#name-edit-phone').val(phone);
                $("#modalEditAdmin").modal();
            })

        })
        .catch(function (error) {
            console.log(error);
            // TODO: Manejar mensaje de error
        });
}
loadAdmin();

//funcion que limpia los campos de el modal de nuevo admin, y lo cierra
function optionClearNewUser() {
    $('#name-new-admin').val("");
    $('#lastname-new-admin').val("");
    $('#document-new-admin').val("");
    $('#email-new-admin').val("");
    $('#phone-new-admin').val("");
    $('#dependence-new-admin').val("");
    $('#password-new-admin').val("");
    $('#repassword-new-admin').val("");
    $('#myModalAdmin').modal('hide');
}
//funcion que limpia los campos de el modal de editar servicio, y lo cierra
function optionClearEditAdmin() {
    $('#name-edit-name').val("");
    $('#name-edit-lastname').val("");
    $('#name-edit-document').val("");
    $('#name-edit-mail').val("");
    $('#name-edit-phone').val("");
    $('#select-dependencies-edit').val("");
    $('#modalEditAdmin').modal('hide');
}

//Boton que abre el modal de crear un nuevo administrador
$('#new-admin-user').on('click', function () {
    //llenara el select de las dependencias respecto a las dependencias que hay registradas:
    $('#select-dependencies').empty();
    $('#select-dependencies').append($('<option>', {
        value: 0,
        text: "Seleccione la dependencia.."
    }));
    dependenciesModule.getDependencies()
        .then(function (response) {
            response.forEach(function (element) {
                $('#select-dependencies').append($('<option>', {
                    value: element.id,
                    text: element.name
                }));
            });
        }).catch(function (error) {
            console.log("error:" + error);
        })

    $("#myModalAdmin").modal();
})

$('#cancel-modal').on('click',function(){
    limpiarCamposNewAdmin();
})
$('#close-modal-create').on('click',function(){
    limpiarCamposNewAdmin();
})
//Captura clic de boton Terminar para crear el administrador
$('#new-radmin-user').on('click', function () {

    var name = $('#name-new-admin').val();
    var lastname = $('#lastname-new-admin').val();
    var document = $('#document-new-admin').val();
    var email = $('#email-new-admin').val();
    var phone = $('#phone-new-admin').val();
    var id_dependence = $("#select-dependencies").val();
    var password = $('#password-new-admin').val();
    var repassword = $('#repassword-new-admin').val();
    var id_role = 2;
    if (!(name == '' || lastname == '' || document == '' || email == '' || phone == '' || password == '' || repassword == '' || id_dependence == 0)) {
        if (!helper.checkOnlyNumbers(document)) {
            swal({
                title: 'Error!',
                text: 'El campo documento solo acepta caracteres numericos.',
                icon: 'error'
            })
            $('#new-radmin-user').attr('data-dismiss', '');
        }else if (!helper.checkOnlyNumbers(phone)) {
            $('#new-radmin-user').attr('data-dismiss', '');
            swal({
                title: 'Error!',
                text: 'El campo telefono solo acepta caracteres numericos.',
                icon: 'error'
            })
        }else if (helper.checkEmail(email)) {

            var goodEmail = true;
            var goodDocument = true;
            UserModule.getAllusers()
                .then(response => {
                    response.forEach(usuario => {
                        if(usuario.email==email){
                            goodEmail=false;
                        }if(usuario.document==document){
                            goodDocument = false;
                        }
                    });
                    if(goodEmail){                        
                        if(goodDocument){                            
                            if (password == repassword) {
                                $('#new-radmin-user').attr('data-dismiss', 'modal');
                                createAdmin(document, name, lastname, email, phone, password, id_dependence, id_role);
                                swal({
                                    title: 'Nuevo Usuario :' + name + ' !',
                                    text: 'El usuario ha sido creado correctamente.',
                                    icon: 'success'
                                }).then((value) => {
                                    if (value) {
                                        refreshAdmin();
                                    }
                                })
                
                            } else {
                                $('#new-radmin-user').attr('data-dismiss', '');
                                swal({
                                    title: 'Error!',
                                    text: 'El usuario no ha podido ser creado, las contraeñas no coinciden.',
                                    icon: 'error'
                                })
                            }
                        }else{
                            $('#new-radmin-user').attr('data-dismiss', '');
                            swal({
                                title: 'Error!',
                                text: 'El documento ingresado ya existe en la base de datos.',
                                icon: 'error'
                            })
                        }
                    }else{
                        $('#new-radmin-user').attr('data-dismiss', '');
                        swal({
                            title: 'Error!',
                            text: 'El correo ingresado ya existe en la base de datos.',
                            icon: 'error'
                        })
                    }    
                })
        } else {
            $('#new-radmin-user').attr('data-dismiss', '');
            swal({
                title: 'Error!',
                text: 'El usuario no ha podido ser creado, ingrese un correo valido.',
                icon: 'error'
            })
        }

    } else {
        $('#new-radmin-user').attr('data-dismiss', '');
        swal({
            title: 'Datos incompletos!',
            text: 'El usuario no ha podido ser creado, complete todos los datos.',
            icon: 'error'
        })
    }
})

//cuando se le de editar en el modal
$('#edit-admin').on('click', function () {
    var id = $('#id-edit-user').val();
    var name = $('#name-edit-name').val();
    var lastname = $('#name-edit-lastname').val();
    var document = $('#name-edit-document').val();
    var email = $('#name-edit-mail').val();
    var phone = $('#name-edit-phone').val();
    var id_dependence = $("#select-dependencies-edit").val();

    editAdmin(id, document, name, lastname, email, phone, id_dependence);
    swal({
        title: 'Usuario editado:' + name + ' !',
        text: 'El usuario ha sido editado correctamente.',
        icon: 'success'
    }).then((value) => {
        if (value) {
            refreshAdmin();
        }
    })


})

function sweetAlertsError(text) {
    swal({
        title: 'Datos incorrectos',
        text: text,
        icon: 'error'
    })
}

$('#close-modal-create').on('click', function () {
    optionClearNewUser();
})

$('#close-modal-edit').on('click', function () {
    optionClearEditAdmin();
})

function refreshAdmin() {
    $('#adminList').dataTable().fnDestroy();
    loadAdmin();
}

function limpiarCamposNewAdmin(){
    $('#document-new-admin').val("");
    $('#name-new-admin').val("");
    $('#lastname-new-admin').val("");
    $('#email-new-admin').val("");
    $('#phone-new-admin').val("");
    $('#password-new-admin').val("");
    $('#repassword-new-admin').val("");

}


