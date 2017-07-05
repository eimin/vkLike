var Controller = {
    getLikesURL: function(exParams){
        var params = {
            access_token : 'd7ee08ae231684ad22e4f3f7b490372aa6dcc793934786877e70f862c52f42e7240266249a6feb86ce9ea',
            item_id : '196616',
            owner_id : '-23626127',
            count : '1000',
            type : 'post',
            extended: '1'
        }
        
        console.log('getLikesURL: exParams: ' + exParams)
        params.item_id = exParams["item_id"]
        params.owner_id = exParams.owner_id
        params.type = exParams.type

        console.log('getLikesURL exParams: ' 
        + "owner: " + exParams.owner_id 
        + " item_id: " + exParams.item_id 
        + " type: " + exParams.type)

        console.log('getLikesURL params: ' 
        + "owner: " + params.owner_id 
        + " item_id: " + params.item_id 
        + " type: " + params.type)

        return 'https://api.vk.com/method/likes.getList?' + $.param(params) + $.param(exParams) + '&v=5.52'
    },

    getUsersURL: function(user_ids){
        var params = {
            access_token : 'd7ee08ae231684ad22e4f3f7b490372aa6dcc793934786877e70f862c52f42e7240266249a6feb86ce9ea',
            fields: 'sex,city,country,photo_200',
        }
        params.user_ids = user_ids
        return 'https://api.vk.com/method/users.get?' + $.param(params) + '&v=5.52'
    },
    
    loadLikes: function(){
        //запрашиваем getLikes пока 
        var commonCountLike
    },

    getLikes: function(exParams){
        var self = this
        $.ajax({
            url: this.getLikesURL(exParams),
            method: 'GET',
            dataType: 'JSONP',

            succes: function(data){
                console.log('getLikes: success: ')
                console.log(data)
            },

            error: function(jqXHR,textStatus,errorThrown){
                console.log('getLikes: Error:  ' + textStatus)
            
            },

            complete: function(data){
                console.log('getLikes: complete ')
                console.log(data)

                
                
                var likes = data["responseJSON"]["response"]["items"]
                //суммируем лайки в поле класса
                //суммируем юзеров в поле класса ?
                var user_ids = ''
                for(var i = 0; i < 300; i++){
                    if(i == likes.length-1) user_ids += likes[i]["id"]
                    else user_ids += likes[i]["id"] + ','       
                }
                self.getUsers(user_ids)
            }
        })   
    },

    getUsers: function(user_ids){
        $.ajax({
            url: this.getUsersURL(user_ids),
            method: 'GET',
            dataType: 'JSONP',

            success: function(data){
                console.log('getUsers: success: ')
                console.log(data)
            },

            error: function(jqXHR, textStatus, errorThrown) {
                console.log('getUsers: error' + textStatus)
            },

            complete: function(data){            
                console.log('getUsers: complete')
                console.log(data)
                View.showLikes(data["responseJSON"]["response"])
            }
        })
    }
}
 




