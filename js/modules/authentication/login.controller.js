var loginModule = {
    login: function(email, password) {
        return $.ajax({
            method : 'post',
            url : constants.URL_API + '/login',
            data: {
                email: email,
                password: password
            }
        });
    },
    resetPassword: function() {
    },
    sessionClear: function () {
        store.clearAll();
    },
    sessionCreate: function (userInfo) {
        store.set('user', { id: userInfo.id, name: userInfo.name, dependence: userInfo.dependence, email: userInfo.email, role: userInfo.role });
        store.set('permissions', userInfo.permissions);
    }
}
