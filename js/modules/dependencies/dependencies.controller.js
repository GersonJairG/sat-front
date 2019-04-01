var dependenciesModule = {

        getOptions: function(data) {
            var objects = [];
            data.forEach(function(dependence) {
                dependence.options = '<a class="edit-option edit-dependence" dependence-id="' + dependence.id + '" dependence-name="'+dependence.name+'"><i class="fa fa-pencil" aria-hidden="true"></i><a>'+
                                  '<a class="delete-option delete-dependence" dependence-id="' + dependence.id + '"><i class="fa fa-trash-o" aria-hidden="true"></i><a>';
                objects.push(dependence);
                // console.log(dependence);
            });
            return objects;
        },
        getDependencies: function(id,name) {
            return $.ajax({
                method : 'get',
                url : constants.URL_API + '/dependences',
                data: {
                    id: id,
                    name: name
                }
            });
        },

        showDependencies : function(id){
            return $.ajax({
                method : 'get',
                url : constants.URL_API + '/dependences/'+id,
                data: {
                    id: id
                }
            });
        },
        deleteDependence: function(id){
            return $.ajax({
                method : 'delete',
                url : constants.URL_API + '/dependences/'+id,
                data : {
                    id : id
                }
            })
        },
        createDependence:function(name,week){
            return $.ajax({
                method : 'POST',
                url : constants.URL_API + '/dependences/new',
                data : {
                    name : name,
                    week: week
                }
            })
        },
        // //Prueba Firebase
        // createDependenceFirebase(id,name) {
        //     firebase.database().ref('dependences/' + id).set({
        //       name: name
        //     });
        // },
        updateDependence: function(name,id,week){
            return $.ajax({
                method : 'patch',
                url : constants.URL_API + '/dependences/'+id,
                data : {
                    id : id,
                    name: name,
                    week : week
                }
            })
        }

    }