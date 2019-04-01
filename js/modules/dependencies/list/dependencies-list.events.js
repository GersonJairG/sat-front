
function deleteDependence(id) {
    dependenciesModule.deleteDependence(id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function createDependence(name, week) {
    dependenciesModule.createDependence(name, week)
        .then(function (response) {
            //Firebase
            // dependenciesModule.createDependenceFirebase(response.id,response.name);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function editDependence(name, id, week) {
    dependenciesModule.updateDependence(name, id, week)
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
        $('#' + id).addClass('show');
    } else {
        $('#' + id).removeClass('show');
        $('#' + id).addClass('hid');
    }
}


function loadDependencies() {
    dependenciesModule.getDependencies()
    
        .then(function (response) {
            console.log(response);
            var options = dependenciesModule.getOptions(response);
            // console.log(options);
            
             $('#dependenciesList').DataTable({
                'retrieve': true,//permite volver a cargar la tabla con mas valores o los mismos
                'data': options,
                'columns': [
                    { title: "#", data: 'id' },
                    { title: "Nombre", data: 'name' },
                    { title: "Opciones", data: 'options' }
                ],
                'bLengthChange': false
            });

            $('.delete-dependence').on("click", function () {
                var id = $(this).attr('dependence-id');
                console.log(id);
                swal({
                    title: "¿Estas seguro de esto?",
                    text: "Si aceptas no podras recuperar la dependencia!",
                    icon: "warning",
                    buttons: ["No,cancelar", "Si,eliminar!"]
                }).then((value => {
                    if (value) {
                        deleteDependence(id);
                        swal({
                            title: 'Eliminada!',
                            text: 'Tu dependencia ha sido borrada correctamente.',
                            icon: 'success'
                        }).then((value) => {
                            if (value) {
                                optionClear();
                                refreshDependencies();
                            }
                        })
                    }
                })

                    )
            });

            //Desacoplar
            $('.edit-dependence').on('click', function () {
                var id = $(this).attr('dependence-id');
                var name = $(this).attr('dependence-name');
                var semana;
                options.forEach(function(element) {
                    if(element.id==id){
                        semana=element.week;
                    }
                });
                pintar(semana); 
                $('#id-edit-dependence').val(id);
                $('#name-dependence').val(name);
                hidOrShow('title-edit',true);
                hidOrShow('title-new',false);
                hidOrShow('p-name-edit', true);
                hidOrShow('p-name-new', false);
                hidOrShow('p-hours-edit', true);
                hidOrShow('p-hours-new', false);
                hidOrShow('edit-dependence', true);
                hidOrShow('new-dependence', false);
                comprobarTodosLosDias();
                $("#myModal").modal();
            })

        })
        .catch(function (error) {
            // TODO: Manejar mensaje de error
        });
}
loadDependencies();

function pintarPorDia(dia,nombreDia){
    var ArrayDay = document.getElementsByName(nombreDia);
    if(dia.length>0){
        dia.forEach(function(element) {
            ArrayDay.forEach(function(check) {
                if(check.value==element){
                    check.checked= true;
                }
            });
        });
    }
}

function pintar(jsonString){
    var json = JSON.parse(jsonString);
    pintarPorDia(json['Lunes'],'lunes');
    pintarPorDia(json['Martes'],'martes');
    pintarPorDia(json['Miercoles'],'miercoles');
    pintarPorDia(json['Jueves'],'jueves');
    pintarPorDia(json['Viernes'],'viernes');
}

//genera el modal al darle en el boton Nueva dependencia
$('#new-dependence-modal').on('click', function () {
    hidOrShow('title-new',true);
    hidOrShow('title-edit',false);
    hidOrShow('p-name-new', true);
    hidOrShow('p-name-edit', false);
    hidOrShow('p-hours-new', true);
    hidOrShow('p-hours-edit', false);
    hidOrShow('new-dependence', true);
    hidOrShow('edit-dependence', false);
    $("#myModal").modal();
})

//al cerrar el modal de crear se limpia el campo name
$('.close-modal').on('click', function () {
    optionClear();
})

function optionClear(){
    $('#name-dependence').val("");
    checkedAll(false);
    $('#myModal').modal('hide');
}


//Captura clic de boton Guardar dentro del modal para crear la dependencia
$('#new-dependence').on('click', function () {
    var weekJSON = checked();
    var name = $('#name-dependence').val();
    console.log(name);
    var week = JSON.stringify(weekJSON);
    console.log(week);
    if (name != "") {
        if (week != 'null') {
            $(this).attr('data-dismiss','modal');
            createDependence(name, week);
            swal({
                title: 'Dependencia ' +name + ' creada',
                text: 'La dependencia ha sido creada correctamente.',
                icon: 'success'
            }).then((value) => {
                if (value) {
                    optionClear();
                    refreshDependencies();
                }
            })
        } else {
            $(this).attr('data-dismiss','');
           sweetAlertsError('Debe ingresar las horas laborales de la nueva dependencia');
            
        }
    } else {
        $(this).attr('data-dismiss','');
        sweetAlertsError('Debe digilenciar el nombre de la nueva dependencia');
    }

})

function sweetAlertsError(text){
    swal({
        title: 'Datos incorrectos',
        text: text,
        icon: 'error'
    })
}

//Captura clic de boton Editar para editar la dependencia
$('#edit-dependence').on('click', function () {
    var id = $('#id-edit-dependence').val();
    var name = $('#name-dependence').val();
    var weekJSON = checked();
    var week = JSON.stringify(weekJSON);
    console.log(week);
    if (name != "") {
        if (week != 'null') {
            $(this).attr('data-dismiss','modal');
            editDependence(name, id , week);
            swal({
                title: 'Dependencia ' + name + ' editada',
                text: 'La dependencia ha sido editada correctamente.',
                icon: 'success'
            }).then((value) => {
                if (value) {
                    optionClear();
                    refreshDependencies();
                }
            })
        } else {
            $(this).attr('data-dismiss','');
            sweetAlertsError('La dependencia debe tener horas laborales');
            //aca
        }
    } else {
        $(this).attr('data-dismiss','');
        sweetAlertsError('No se puede dejar la dependencia sin nombre');
    }

})

//--------------------Inicio parte checked--------------------

function checked() {
    var arrayLunes = document.getElementsByName("lunes");
    var arrayMartes = document.getElementsByName("martes");
    var arrayMiercoles = document.getElementsByName("miercoles");
    var arrayJueves = document.getElementsByName("jueves");
    var arrayViernes = document.getElementsByName("viernes");
    var arrayCheckedLunes = [];
    var arrayCheckedMartes = [];
    var arrayCheckedMiercoles = [];
    var arrayCheckedJueves = [];
    var arrayCheckedViernes = [];
    arrayLunes.forEach(function (selected) {
        if (selected.checked && selected.value != 'all') {
            arrayCheckedLunes.push(selected.value);
        }
    })
    arrayMartes.forEach(function (selected) {
        if (selected.checked && selected.value != 'all') {
            arrayCheckedMartes.push(selected.value);
        }
    })
    arrayMiercoles.forEach(function (selected) {
        if (selected.checked && selected.value != 'all') {
            arrayCheckedMiercoles.push(selected.value);
        }
    })
    arrayJueves.forEach(function (selected) {
        if (selected.checked && selected.value != 'all') {
            arrayCheckedJueves.push(selected.value);
        }
    })
    arrayViernes.forEach(function (selected) {
        if (selected.checked && selected.value != 'all') {
            arrayCheckedViernes.push(selected.value);
        }
    })

    if (arrayCheckedLunes.length > 0 || arrayCheckedMartes.length > 0 ||
        arrayCheckedMiercoles.length > 0 || arrayCheckedJueves.length > 0
        || arrayCheckedViernes.length > 0) {
        var arrayWeekSelected = {
            "Lunes": arrayCheckedLunes,
            "Martes": arrayCheckedMartes,
            "Miercoles": arrayCheckedMiercoles,
            "Jueves": arrayCheckedJueves,
            "Viernes": arrayCheckedViernes
        }
        return arrayWeekSelected;

    } else {
        return null;
    }


}

function checkedAll(option) {
    var checkboxes = document.getElementsByTagName('input'); //obtenemos todos los controles del tipo Input
    for (i = 0; i < checkboxes.length; i++) //recoremos todos los controles
    {
        if (checkboxes[i].type == "checkbox") { //solo si es un checkbox entramos
            checkboxes[i].checked = option.checked; //si es un checkbox le damos el valor del checkbox que lo llamó (Marcar/Desmarcar Todos)
        }
    }
}

//function para seleccionar o deseleccionar un dia en especifico.
function checkedAllDay(nameDay, option) {
    var ArrayDay = document.getElementsByName(nameDay);
    ArrayDay.forEach(function (hour) {
        hour.checked = option;
    })
}

function comprobarTodosLosDias(){
    comprobarDia('lunes');
    comprobarDia('martes');
    comprobarDia('miercoles');
    comprobarDia('jueves');
    comprobarDia('viernes');
}

//cuenta las horas seleccionadas de un dia en especifico y si estan todas, selecciona el checkbox all,si no lo deja deseleccionado.
function comprobarDia(dia){
    var ArrayDay = document.getElementsByName(dia);
    var contador = 0;
    ArrayDay.forEach(function(element) {
        if(element.value!='all' && element.checked){
            contador++;
        }
    });   
    if(contador==12){
        document.getElementById(dia+'All').checked = true;    
    }else{
        document.getElementById(dia+'All').checked = false;
    }
}

//Seleccionar o deseleccionar todos los checkbox del lunes
$('#lunesAll').click(function () {
    if (this.checked) {
        checkedAllDay('lunes', true);
    } else {
        checkedAllDay('lunes', false);
    }
})
//al seleccionar cualquiera de los inputs del lunes, se deseleccionara el "all"
$("input[name=lunes]").on('click', function () {
    comprobarDia('lunes');
})

//Seleccionar o deseleccionar todos los checkbox del martes
$('#martesAll').click(function () {
    if (this.checked) {
        checkedAllDay('martes', true);
    } else {
        checkedAllDay('martes', false);
    }
})
//al seleccionar cualquiera de los inputs del martes, se deseleccionara el "all"
$("input[name=martes]").on('click', function () {
    comprobarDia('martes');
})

//Seleccionar o deseleccionar todos los checkbox del miercoles
$('#miercolesAll').click(function () {
    if (this.checked) {
        checkedAllDay('miercoles', true);
    } else {
        checkedAllDay('miercoles', false);
    }
})
//al seleccionar cualquiera de los inputs del miercoles, se deseleccionara el "all"
$("input[name=miercoles]").on('click', function () {
    comprobarDia('miercoles');
})

//Seleccionar o deseleccionar todos los checkbox del jueves
$('#juevesAll').click(function () {
    if (this.checked) {
        checkedAllDay('jueves', true);
    } else {
        checkedAllDay('jueves', false);
    }
})
//al seleccionar cualquiera de los inputs del jueves, se deseleccionara el "all"
$("input[name=jueves]").on('click', function () {
    comprobarDia('jueves');
})

//Seleccionar o deseleccionar todos los checkbox del viernes
$('#viernesAll').click(function () {
    if (this.checked) {
        checkedAllDay('viernes', true);
    } else {
        checkedAllDay('viernes', false);
    }
})
//al seleccionar cualquiera de los inputs del viernes, se deseleccionara el "all"
$("input[name=viernes]").on('click', function () {
    comprobarDia('viernes');
})

//--------------------Fin parte Checked--------------------

function refreshDependencies() {
    $('#dependenciesList').dataTable().fnDestroy();
        loadDependencies();
}



