var mailsModule = {

    sendMail : function(email,name,idFirebase){
        return $.ajax({
            method: 'post',
            url :  constants.URL_API + '/send-mail',
            data :{
                email : email,
                name : name,
                idFirebase : idFirebase
            } 
        })
    }
}