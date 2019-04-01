var UserModule = {
            getAllusers : function(){
                return $.ajax({
                    method : 'get',
                    url : constants.URL_API+ '/users/all-index'
                })
            },    
            getOptions: function(data) {
                var objects = [];
                console.log("USER LIST"+data);
                data.forEach(function(user) {
                    user.options = '<a class="edit-option edit-user" user-id="' + user.id + '"user-document="' + user.document+
                     '"user-name="' + user.name+ '"user-lastname="' + user.lastname+ '"user-email="' + user.email+ '"user-phone="' +
                      user.phone+ '"user-state="' +user.user_state+ '"><i class="fa fa-pencil" aria-hidden="true"></i><a>'+
                                    '<a class="delete-option delete-user" user-id="' + user.id + '"><i class="fa fa-trash-o" aria-hidden="true"></i><a>';
                    objects.push(user);
                });
                return objects;
            },
            getUsers: function() {
                return $.ajax({
                    method : 'get',
                    url : constants.URL_API + '/users',
                    data: {
                        
                    }
                });
            },
            // find for users 
            showFindUsers: function(id) {
                return $.ajax({
                    method : 'get',
                    url : constants.URL_API + '/users/findUsers/'+id,
                    data: {
                        id: id
                    }
                });
            },
            // all users for state user = 1 and role =3 para email autocompletable
            showUsersCommon: function(id) {
                return $.ajax({
                    method : 'get',
                    url : constants.URL_API + '/users/common/'+id,
                    data: {
                        id: id
                    }
                });
            },
            //find user for email
            findUserForEmail: function(email) {
                return $.ajax({
                    method : 'get',
                    url : constants.URL_API + '/users/email/'+email,
                    data: {
                        email: email
                    }
                });
            },
            deleteUser: function(id){
                return $.ajax({
                    method : 'delete',
                    url : constants.URL_API + '/users/'+id,
                    data : {
                        id : id
                    }
                })
            },
            createUser:function(document,name,lastname,email,phone,password,id_user_state){
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
                        id_user_state: id_user_state
                    }
                })
            },
            updateUser: function(id,document,name,lastname,mail,phone){
                return $.ajax({
                    method : 'patch',
                    url : constants.URL_API + '/users/'+id,
                    data : {
                        id : id,
                        document : document,
                        name: name,
                        lastname: lastname,
                        mail : mail,
                        phone : phone
                    }
                })
            }
    
        }