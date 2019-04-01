
function deleteUser(id) {
    UserModule.deleteUser(id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
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

function editUser(id, document, name, lastname, mail, phone) {
    UserModule.updateUser(id, document, name, lastname, mail, phone)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function loadUsers() {
    UserModule.getUsers()
        .then(function (response) {
            var options = UserModule.getOptions(response);
            console.log("USER LIST"+options);
            $('#usersList').DataTable({
                'retrieve': true,//permite volver a cargar la tabla con mas valores o los mismos
                'data': options,
                'columns': [
                    { title: "#", data: 'id' },
                    { title: "Documento", data: 'document' },
                    { title: "Nombre", data: 'name' },
                    { title: "Apellido", data: 'lastname' },
                    { title: "Correo", data: 'email' },
                    { title: "Telefono", data: 'phone' },
                    { title: "Estado", data: 'user_state' },
                    { title: "Opciones", data: 'options' }
                ],
                'bLengthChange': false
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
                        deleteUser(id);
                        swal({
                            title: 'Eliminada!',
                            text: 'El usuario ha sido borrado correctamente.',
                            icon: 'success'
                        }).then((value) => {
                            if (value) {
                                refresh();
                            }
                        })
                    }
                })

                    )
            });

            $('.edit-option').on('click', function () {
                var id = $(this).attr('user-id');
                var document = $(this).attr('user-document');
                var name = $(this).attr('user-name');
                var lastname = $(this).attr('user-lastname');
                var correo = $(this).attr('user-email');
                var phone = $(this).attr('user-phone');

                $('#id-edit-user').val(id);
                $('#name-edit-document').val(document);
                $('#name-edit-name').val(name);
                $('#name-edit-lastname').val(lastname);
                $('#name-edit-mail').val(correo);
                $('#name-edit-phone').val(phone);
                $("#modalEditUser").modal();
            })

        })
        .catch(function (error) {
            // TODO: Manejar mensaje de error
        });
}
loadUsers();


//Captura de datos luego de dar click en el boton Registrar de un usuario cuando el se registra
// $('#new-user').on('click', function () {

//     var document = $('#document-user').val();
//     var name = $('#names-user').val();
//     var lastname = $('#last_names-user').val();
//     var email = $('#email-user').val();
//     var phone = $('#phone-user').val();
//     var password = $('#password-user').val();
//     var repassword = $('#repassword-user').val();
//     var id_user_state = 4;//Por confirmar

//     if (!(name == '' || lastname == '' || document == '' || email == '' || phone == '' || password == '' || repassword == '')) {
//         if (!helper.checkOnlyNumbers(document)) {
//             swal({
//                 title: 'Error!',
//                 text: 'El campo documento solo acepta caracteres numericos.',
//                 icon: 'error'
//             })
//             $(this).attr('data-dismiss', '');
//         } else if (!helper.checkOnlyNumbers(phone)) {
//             $(this).attr('data-dismiss', '');
//             swal({
//                 title: 'Error!',
//                 text: 'El campo telefono solo acepta caracteres numericos.',
//                 icon: 'error'
//             })
//         } else if (helper.checkEmail(email)) {

//                 if (password == repassword) {
//                     $(this).attr('data-dismiss', 'modal');
//                     createUser(document, name, lastname, email, phone, password, id_user_state);
//                     swal({
//                         title: 'Nuevo Usuario :' + name + ' !',
//                         text: 'El usuario ha sido creado correctamente.',
//                         icon: 'success'
//                     }).then((value) => {
//                         if (value) {
//                             limpiarcampos();
//                         }
//                     })

//                 } else {
//                     $(this).attr('data-dismiss', '');
//                     swal({
//                         title: 'Error!',
//                         text: 'El usuario no ha podido ser creado, las contraeñas no coinciden.',
//                         icon: 'error'
//                     })
//                 }

//         } else {
//             swal({
//                 title: 'Error!',
//                 text: 'El usuario no ha podido ser creado, ingrese un correo valido.',
//                 icon: 'error'
//             })
//         }
//     } else {
//         $(this).attr('data-dismiss', '');
//         swal({
//             title: 'Datos incompletos!',
//             text: 'El usuario no ha podido ser creado, complete todos los datos.',
//             icon: 'error'
//         })
//     }

// })

//al cerrar el modal de editar se limpia el campo name
$('#close-modal-edit').on('click', function () {
    $('#name-edit-document').val("");
    $('#name-edit-name').val("");
    $('#name-edit-lastname').val("");
    $('#name-edit-mail').val("");
    $('#name-edit-phone').val("");
})

//Captura clic de boton Editar para editar el usuario
$('#edit-user').on('click', function () {
    var id = $('#id-edit-user').val();
    var document = $('#name-edit-document').val();
    var name = $('#name-edit-name').val();
    var lastname = $('#name-edit-lastname').val();
    var mail = $('#name-edit-mail').val();
    var phone = $('#name-edit-phone').val();
    editUser(id, document, name, lastname, mail, phone);
    swal({
        title: 'Usuario editado:' + name + ' !',
        text: 'El usuario ha sido editado correctamente.',
        icon: 'success'
    }).then((value) => {
        if (value) {
            refresh();
        }
    })

})

//genera el modal al darle en el boton Nuevo Usuario
$('#new-user-modal').on('click', function () {
    $("#myModalUser").modal();
})

$('#cancel-modal').on('click',function(){
    limpiarCamposNewUser();
})
$('#close-modal-create').on('click',function(){
    limpiarCamposNewUser();
})


//Captura clic de boton Terminar para crear el usuario normal cuando lo hace un Administrador
$('#new-admin-user').on('click', function () {

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
            $('#new-admin-user').attr('data-dismiss', '');
        } else if (!helper.checkOnlyNumbers(phone)) {
            $('#new-admin-user').attr('data-dismiss', '');
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
                        if(usuario.email==email){
                            goodEmail=false;
                        }if(usuario.document==document){
                            goodDocument = false;
                        }
                    });
                    if(goodEmail){                        
                        if(goodDocument){                            
                            if (password == repassword) {
                                $('#new-admin-user').attr('data-dismiss', 'modal');
                                createUser(document, name, lastname, email, phone, password, id_user_state);
                                swal({
                                    title: 'Nuevo Usuario :' + name + ' !',
                                    text: 'El usuario ha sido creado correctamente.',
                                    icon: 'success'
                                }).then((value) => {
                                    if (value) {
                                        limpiarCamposNewUser();
                                        refresh();
                                    }
                                })
                            } else {
                                $('#new-admin-user').attr('data-dismiss', '');
                                swal({
                                    title: 'Error!',
                                    text: 'El usuario no ha podido ser creado, las contraeñas no coinciden.',
                                    icon: 'error'
                                })
                            }
                        }else{
                            $('#new-admin-user').attr('data-dismiss', '');
                            swal({
                                title: 'Error!',
                                text: 'El documento ingresado ya existe en la base de datos.',
                                icon: 'error'
                            })
                        }
                    }else{
                        $('#new-admin-user').attr('data-dismiss', '');
                        swal({
                            title: 'Error!',
                            text: 'El correo ingresado ya existe en la base de datos.',
                            icon: 'error'
                        })
                    }    
                })
        } else {
            swal({
                title: 'Error!',
                text: 'El usuario no ha podido ser creado, ingrese un correo valido.',
                icon: 'error'
            })
        }

    } else {
        $(this).attr('data-dismiss', '');
        swal({
            title: 'Datos incompletos!',
            text: 'El usuario no ha podido ser creado, complete todos los datos.',
            icon: 'error'
        })
    }
})

function refresh() {
    $('#usersList').dataTable().fnDestroy();
    loadUsers();
}

//metodo que limpia los campos de la intefaz de registro del usuario
function limpiarcampos() {
    $('#document-user').val("");
    $('#names-user').val("");
    $('#last_names-user').val("");
    $('#email-user').val("");
    $('#phone-user').val("");
    $('#password-user').val("");
    $('#repassword-user').val("");
}


function limpiarCamposNewUser(){
    $('#document-new-user').val("");
    $('#name-new-user').val("");
    $('#lastname-new-user').val("");
    $('#email-new-user').val("");
    $('#phone-new-user').val("");
    $('#password-new-user').val("");
    $('#repassword-new-user').val("");
}