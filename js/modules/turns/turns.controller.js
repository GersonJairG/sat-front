var turnsModule = {
    getTurns: function (dependence) {
        return $.ajax({
            method: 'get',
            url: constants.URL_API + '/turns/' + dependence,
            data: {
                dependence: dependence
            }
        });
    },
    findTurn: function (idTurnFirebase) {
        return $.ajax({
            method: 'get',
            url: constants.URL_API + '/turns/find/' + idTurnFirebase,
            data: {
                idTurnFirebase: idTurnFirebase
            }
        });
    },
    updateTurn: function (idTurnFirebase, idTurnState,detail,idAdminAssigned) {
        return $.ajax({
            method: 'patch',
            url: constants.URL_API + '/turns/' + idTurnFirebase,
            data: {
                idTurnFirebase: idTurnFirebase,
                idTurnState : idTurnState,
                detail : detail,
                idAdminAssigned : idAdminAssigned

            }
        })
    },
    createTurnFirebase: function (turnType, idTurnState, idUser, idServiceType, idSemester, idDependence, nameUser,lastnameUser, documentUser,email, nameServiceType,idAdminAssigned) {
        var currentDate = moment().format('YYYY-MM-DD');
        let hours = moment().format('hh:mm:ss');
        var ref = firebase.database().ref('/turns');
        var child = ref.child('/' + currentDate);
        console.log(hours);
        console.log(currentDate);
        return child.push({
            date: currentDate,
            hour: hours,
            detail: '',
            turn_type: turnType,
            id_turn_state: idTurnState,
            id_user: idUser,
            id_service_type: idServiceType,
            id_semester: idSemester,
            id_dependence: idDependence,
            name_user: nameUser,
            lastname_user: lastnameUser,
            document_user: documentUser,
            email_user : email,
            name_service_type: nameServiceType,
            id_admin_assigned : idAdminAssigned
        }).then(function (child) {
            // console.log(child.key);
            turnsModule.createTurn(child.key, currentDate, hours,turnType, idTurnState, idUser, idServiceType, idSemester,idAdminAssigned)
                .then(response => {
                    console.log(response);
                })
        })
    },

    //para crear el turno en la bbd relacional 
    createTurn: function (idFirebase, date, hour, turnType, idTurnState, idUser, idServiceType, idSemester,idAdminAssigned) {
        return $.ajax({
            method: 'POST',
            url: constants.URL_API + '/turns/new',
            data: {
                idFirebase: idFirebase,
                date: date,
                hour: hour,
                detail : null,
                turnType: turnType,
                idTurnState: idTurnState,
                idUser: idUser,
                idServiceType: idServiceType,
                idSemester: idSemester,
                idAdminAssigned : idAdminAssigned
            }
        })

    },


    getTurnsFirebase: function () {
        var currentDate = moment().format('YYYY-MM-DD');
        var result = firebase.database().ref('/turns/' + currentDate);
        return result;
    },

    //editar datos firebase
    changeStateTurn: function (idFirebase, idTurnState,detail,idAdminAssigned) {
        var currentDate = moment().format('YYYY-MM-DD');
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/turns/' + currentDate + '/' + idFirebase + '/' + 'id_turn_state'] = idTurnState;

        updates['/turns/' + currentDate + '/' + idFirebase + '/' + 'detail'] = detail;

        updates['/turns/' + currentDate + '/' + idFirebase + '/' + 'id_admin_assigned'] = idAdminAssigned;

        
        return firebase.database().ref().update(updates)
            .then(
                turnsModule.updateTurn(idFirebase,idTurnState,detail,idAdminAssigned)
                .then(response => {
                    console.log(response);
                })
            );
    }

}