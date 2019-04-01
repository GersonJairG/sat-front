var queueTypeModule = {

    getQueueTypes: function(id_dependence) {
        return $.ajax({
            method : 'get',
            url : constants.URL_API + '/queue-types/'+id_dependence,
            data: {
                dependence_id: id_dependence
            }
        });
    },
    createQueueType: function() {
        return $.ajax({
            method : 'POST',
            url : constants.URL_API + '/queue-types/new',
            data : {
               
            }
        })
    },
    deleteQueueType: function(id){
        return $.ajax({
            method : 'delete',
            url : constants.URL_API + '/queue-types/'+id,
            data : {
                id : id
            }
        })
    },
    updateQueueType: function(){
        return $.ajax({
            method : 'patch',
            url : constants.URL_API + '/queue-types/'+id,
            data : {
                
            }
        })
    }

}