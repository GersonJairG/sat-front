
var adminModule = {
    //Services
    getOptions: function(data) {
        var objects = [];
        data.forEach(function(user) {
            user.options = '<a class="edit-option edit-user" user-id="' + user.id + '"user-document="' + user.document+
            '"user-name="' + user.name+ '"user-lastname="' + user.lastname+ '"user-email="' + user.email+ '"user-phone="' +
             user.phone+ '"user-id_dependence="' + user.id_dependence+ '"user-state="' +user.user_state+'"><i class="fa fa-pencil" aria-hidden="true"></i><a>'+
                           '<a class="delete-option delete-user" user-id="' + user.id + '"><i class="fa fa-trash-o" aria-hidden="true"></i><a>';
           objects.push(user);
        });
        return objects;
    },
    //Users
    getAdmins: function() {
        return $.ajax({
            method : 'get',
            url : constants.URL_API + '/users/'+2,
            data: {
               
            }
        });
    },
    //Services
    createAdmin: function(document,name,lastname,email,phone,password,id_dependence,id_role) {
        return $.ajax({
            method : 'POST',
            url : constants.URL_API + '/users/new',
            data : {
                document : document,
                name : name,
                lastname : lastname,
                email : email,
                phone : phone,
                password : password,
                id_dependence : id_dependence,
                id_role : id_role
            }
        })
    },
    //Users
    deleteAdmin: function(id){
        return $.ajax({
            method : 'delete',
            url : constants.URL_API + '/users/'+id,
            data : {
                id : id
            }
        })
    },
    //Users
    updateAdmin: function(id,document,name,lastname,email,phone,id_dependence){
        return $.ajax({
            method : 'patch',
            url : constants.URL_API + '/users/'+id,
            data : {
                id: id,
                document : document,
                name : name,
                lastname : lastname,
                mail : email,
                phone : phone,
                id_dependence : id_dependence
            }
        })
    },
    

}