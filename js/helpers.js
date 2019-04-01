var helper = {
    checkEmail: function (email) {
        var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        return email.search(patron) == 0;
    },
    getPermission: function(id) {
        var permissions = store.get('permissions');
        return _.find(permissions, function(p) { return p.id == id; });
    },
    getRole: function (){
        var user = store.get('user');
        return user.role;
    },
    checkOnlyNumbers: function(numero){
        return (!/^([0-9])*$/.test(numero)) == 0;        
    }
}