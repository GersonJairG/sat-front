function createService(name,idDependence) {
    servicesModule.createService(name,idDependence)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function deleteService(id) {
    servicesModule.deleteService(id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function editService(id,name,idDependenceEdit) {
    servicesModule.updateService(id,name,idDependenceEdit)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function createServiceType(idService,name,description,averageTime) {
    servicesModule.createServiceType(idService,name,description,averageTime)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function deleteServiceType(id){
    servicesModule.deleteServiceType(id)
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

var serviceListTypesCreate = false;
function loadServiceTypes(idService) {
    servicesModule.showServiceTypes(idService)
        .then(function (response) {
            var options = servicesModule.getOptionsServiceTypes(response);
            // console.log(options);
            // $('#serviceTypesList tbody tr th').remove();
            $('#serviceTypesList').DataTable({
                'retrieve': true,//permite volver a cargar la tabla con mas valores o los mismos
                'data': options,
                // 'default' : true ,
                'columns': [
                    { title: "#", data: 'id' },
                    { title: "Nombre", data: 'name' },
                    { title: "Descripcion", data : 'description'},
                    { title: "Tiempo promedio", data: 'average_time' },
                    { title: "Opciones", data: 'options' }
                ],
                'bLengthChange': false,
                'paging': false,
                'searching': false
            });
            serviceListTypesCreate=true;
            $('.delete-service-type').on("click", function () {
                var idDelete = $(this).attr('service-type-id');
                console.log(idDelete);
                swal({
                    title: "¿Estas seguro de esto?",
                    text: "Si aceptas no podras recuperar el tipo de servicio!",
                    icon: "warning",
                    buttons: ["No,cancelar", "Si,eliminar!"]
                }).then((value => {
                    if (value) {
                        deleteServiceType(idDelete);
                        swal({
                            title: 'Eliminado!',
                            text: 'El tipo de servicio ha sido borrado correctamente.',
                            icon: 'success'
                        }).then((value) => {
                            if (value) {                            
                                refreshServiceTypes(idService);
                            }
                        })
                    }
                }))
            });
            
        })
        .catch(function (error) {
            console.log(error);
        });
}



//funcion de mostrar los servicios
function loadServices() {
    servicesModule.getServices()
        .then(function (response) {
            var options = servicesModule.getOptions(response);
            // console.log(options);
             $('#servicesList').DataTable({
                'retrieve': true,//permite volver a cargar la tabla con mas valores o los mismos
                'data': options,
                'columns': [
                    { title: "#", data: 'id' },
                    { title: "Nombre", data: 'name' },
                    { title: "Dependencia", data : 'dependence'},
                    { title: "Opciones", data: 'options' }
                ],
                'bLengthChange': false,
            });
            console.log('ya imprimio los servicios');

            $('.delete-service').on("click", function () {
                var id = $(this).attr('service-id');
                console.log(id);
                swal({
                    title: "¿Estas seguro de esto?",
                    text: "Si aceptas no podras recuperar el servicio!",
                    icon: "warning",
                    buttons: ["No,cancelar", "Si,eliminar!"]
                }).then((value => {
                    if (value) {
                        deleteService(id);
                        swal({
                            title: 'Eliminado!',
                            text: 'Tu servicio ha sido borrado correctamente.',
                            icon: 'success'
                        }).then((value) => {
                            if (value) {                            
                                refreshServices();
                            }
                        })
                    }
                }))
            });
            
            $('.edit-service').on('click', function () {
                $('#select-dependencies-edit').empty();
                $('#select-dependencies-edit').append($('<option>', {
                    value: 0,
                    text: "Seleccione la dependencia.."
                }));
                //extraigo los datos que traigo en el boton                
                var id = $(this).attr('service-id');
                var name = $(this).attr('service-name');
                var idDependence = $(this).attr('service-dependence');
                //                
                dependenciesModule.getDependencies()
                .then(function(response){
                    response.forEach(function(element) {
                        if(element.id == idDependence){
                            $('#select-dependencies-edit').append($('<option>', {
                                value: element.id,
                                text: element.name,
                                selected : true
                            }));
                        }else{
                            $('#select-dependencies-edit').append($('<option>', {
                                value: element.id,
                                text: element.name
                            }));
                        }
                        
                    });
                }).catch(function(error){
                    console.log("error:" + error );
                })
                //CONTINUAR (sacar el id de la dependencia a la cual pertenece este servicio)
                console.log('id:'+id+',name:'+name+',idDep:'+idDependence);
                $('#id-edit-service').val(id);
                $('#name-edit-service').val(name);
                console.log(id);
                if(serviceListTypesCreate){
                    refreshServiceTypes(id);
                }else{
                    loadServiceTypes(id);
                }
                $("#myEditModal").modal();
            })

        })
        .catch(function (error) {
            // TODO: Manejar mensaje de error
        });
}
loadServices();

//cuando se le de editar en el modal
$('#edit-service').on('click',function(){
    var idService = $('#id-edit-service').val();
    var name = $('#name-edit-service').val();
    var idDependenceEdit = $("#select-dependencies-edit option:selected").val();

    if(idDependenceEdit!=0){
        if(name!=''){
            $(this).attr('data-dismiss','modal');
            editService(idService,name,idDependenceEdit);
            swal({
                title: 'Servicio ' + name + ' editado',
                text: 'El servicio ha sido editado correctamente.',
                icon: 'success'
            }).then((value) => {
                if (value) {
                    optionClearEditService();
                    refreshServices();
                }
            })  
        }else{
            $(this).attr('data-dismiss','');
            sweetAlertsError('No se puede dejar el servicio sin nombre');
        } 
    }else{
        $(this).attr('data-dismiss','');
        sweetAlertsError('Debe seleccionar la dependencia del servicio');
    }
    
})

//funcion que limpia los campos de el modal de nuevo servicio, y lo cierra
function optionClearNewService(){
    $('#name-service').val("");
    $('#description-service').val("");
    $('#myModal').modal('hide');
}
//funcion que limpia los campos de el modal de editar servicio, y lo cierra
function optionClearEditService(){
    $('#name-edit-service').val("");
    $('#myEditModal').modal('hide');
}

//Boton que abre el modal de crear un nuevo servicio 
$('#new-service-modal').on('click', function () {
    //llenara el select de las dependencias respecto a las dependencias que hay registradas:
    $('#select-dependencies').empty();
    $('#select-dependencies').append($('<option>', {
        value: 0,
        text: "Seleccione la dependencia.."
    }));
    dependenciesModule.getDependencies()
    .then(function(response){
        response.forEach(function(element) {
            $('#select-dependencies').append($('<option>', {
                value: element.id,
                text: element.name
            }));
        });
    }).catch(function(error){
        console.log("error:" + error );
    })

    $("#myModal").modal();
})

$('#new-service').on('click',function(){
    var name = $('#name-service').val();
    var idDependence = $("#select-dependencies option:selected").val();
    if(idDependence!=0){
        if(name!=""){
            $(this).attr('data-dismiss','modal');
            createService(name,idDependence);
            swal({
                title: 'Servicio ' + name + ' creado',
                text: 'El servicio ha sido creado correctamente.',
                icon: 'success'
            }).then((value) => {
                if (value) {
                    optionClearNewService();
                    refreshServices();
                }
            })
        }else{
            $(this).attr('data-dismiss','');
            sweetAlertsError('Debe digilenciar el nombre del nuevo servicio');    
        }
    }else{
        $(this).attr('data-dismiss','');
        sweetAlertsError('Debe seleccionar la dependencia del servicio');
        
    }
    
})

$('#save-service-type').on('click',function(){
    var idService = $('#id-edit-service').val();
    var name = $('#name-service-type').val();
    var description = $('#description-service-type').val();
    var averageTime = $('#time-service-type').val();
    createServiceType(idService,name,description,averageTime);
    if(name!=''){
        if(averageTime!=''){
            if(description!=''){
                swal({
                    title: 'Tipo de servicio ' + name + ' creado',
                    text: 'El tipo de servicio ha sido creado correctamente.',
                    icon: 'success'
                }).then((value) => {
                    if (value) {
                        eventsCloseServiceType();
                        refreshServiceTypes(idService);
                    }
                })
            }else{
                sweetAlertsError('El tipo de servicio debe tener una breve descripcion');
            }
        }else{
            sweetAlertsError('Debe digilenciar el tiempo promedio del tipo de servicio');
        }
    }else{
        sweetAlertsError('Debe digilenciar el nombre del tipo de servicio');
    }

    // createServiceType(idService,name,description,averageTime);
    // eventsCloseServiceType();
    // refreshServiceTypes(idService);

})

function sweetAlertsError(text){
    swal({
        title: 'Datos incorrectos',
        text: text,
        icon: 'error'
    })
}


function eventsNewServiceType(){
    hidOrShow('information-add-service-type',true);
    hidOrShow('new-service-type',false);
    hidOrShow('save-service-type',true);
    hidOrShow('close-save-service-type',true);
}

$('#new-service-type').on('click',function(){
    eventsNewServiceType();
})

function eventsCloseServiceType(){
    $('#name-service-type').val("");
    $('#time-service-type').val("");
    $('#description-service-type').val("");
    hidOrShow('information-add-service-type',false);
    hidOrShow('new-service-type',true);
    hidOrShow('save-service-type',false);
    hidOrShow('close-save-service-type',false);
}

$('#close-save-service-type').on('click',function(){
    eventsCloseServiceType();
})

$('.close-modal').on('click', function () {
    optionClearNewService();
})

$('.close-modal-edit').on('click', function () {
    optionClearEditService();
    eventsCloseServiceType();
})

function refreshServices(){
    $('#servicesList').dataTable().fnDestroy();
    loadServices();
}

function refreshServiceTypes(id){
    $('#serviceTypesList').dataTable().fnDestroy();
    loadServiceTypes(id);
}

