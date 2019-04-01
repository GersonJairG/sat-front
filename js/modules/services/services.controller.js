var servicesModule = {
    //Services
    getOptions: function(data) {
        var objects = [];
        data.forEach(function(service) {
            service.options = '<a class="edit-option edit-service" service-id="' + service.id + '" service-name="'+service.name+'" service-dependence="'+service.id_dependence+'"><i class="fa fa-pencil" aria-hidden="true"></i><a>'+
                              '<a class="delete-option delete-service" service-id="' + service.id + '"><i class="fa fa-trash-o" aria-hidden="true"></i><a>';
            objects.push(service);
            console.log(service);
        });
        return objects;
    },
    //Services
    getServices: function(id,name) {
        return $.ajax({
            method : 'get',
            url : constants.URL_API + '/services',
            data: {
                id: id,
                name: name
            }
        });
    },
    //Services
    createService: function(name,idDependence) {
        return $.ajax({
            method : 'POST',
            url : constants.URL_API + '/services/new',
            data : {
                name : name,
                idDependence : idDependence
            }
        })
    },
    //Services
    deleteService: function(id){
        return $.ajax({
            method : 'delete',
            url : constants.URL_API + '/services/'+id,
            data : {
                id : id
            }
        })
    },
    //Services
    updateService: function(id,name,idDependence){
        return $.ajax({
            method : 'patch',
            url : constants.URL_API + '/services/'+id,
            data : {
                id : id,
                name: name,
                idDependence :idDependence
            }
        })
    },
    //ServiceTypes
    getOptionsServiceTypes: function(data) {
        console.log(data);
        var objects = [];
        data.forEach(function(serviceType) {
            serviceType.options = '<a class="delete-option delete-service-type" service-type-id="' + serviceType.id + '"><i class="fa fa-trash-o" aria-hidden="true"></i><a>';
            objects.push(serviceType);
            console.log(serviceType);
        });
        return objects;
    },
    //ServiceTypes
    getServiceTypes: function() {
        return $.ajax({
            method : 'get',
            url : constants.URL_API + '/service-types',
            data: {
            }
        });
    },
    //ServiceTypes por servicios
    showServiceTypes: function(id) {
        return $.ajax({
            method : 'get',
            url : constants.URL_API + '/service-types/'+id,
            data: {
                id: id
            }
        });
    },
    //ServiceTypes por dependencia
    showServiceTypesForDependence: function(idDependence) {
        return $.ajax({
            method : 'get',
            url : constants.URL_API + '/service-types/forDependence/'+idDependence,
            data: {
                idDependence: idDependence
            }
        });
    },
    //ServiceTypes
    createServiceType: function(idService,name,description,averageTime) {
        return $.ajax({
            method : 'POST',
            url : constants.URL_API + '/service-types/new',
            data : {
                idService : idService,
                name : name,
                description : description,
                averageTime : averageTime

            }
        })
    },
    //ServiceType
    deleteServiceType: function(id){
        return $.ajax({
            method : 'delete',
            url : constants.URL_API + '/service-types/'+id,
            data : {
                id : id
            }
        })
    },

    //find serviceType for Id
    findTypeService : function(id) {
        return $.ajax({
            method : 'get',
            url : constants.URL_API + '/service-types/findServiceType/'+id,
            data: {
                id: id
            }
        });
    }

}