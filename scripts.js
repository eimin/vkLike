

function getLikesURL(){
    var params = {
        access_token : '1f5abb90d44b370455b7ed0416d0e8ee6d721bebe742f09aff34ef4c26e6d4f15a2dd6b6751c8ceace53f',
        item_id : '196616',
        owner_id : '-23626127',
        count : '1000',
        type : 'post',
        extended: '1'
    }
    return 'https://api.vk.com/method/likes.getList?' + $.param(params) + '&v=5.52'
}

function getUsersURL(user_ids){
    var params = {
         access_token : '1f5abb90d44b370455b7ed0416d0e8ee6d721bebe742f09aff34ef4c26e6d4f15a2dd6b6751c8ceace53f',
         fields: 'sex,city,country,photo_200',
    }
    params.user_ids = user_ids
    return 'https://api.vk.com/method/users.get?' + $.param(params) + '&v=5.52'
}

function getLikes(){
    
    $.ajax({
        url: getLikesURL(),
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
            var user_ids = ''
            for(var i = 0; i < 300; i++){
                if(i == likes.length-1) user_ids += likes[i]["id"]
                else user_ids += likes[i]["id"] + ','       
            }
            getUsers(user_ids)
        }
    })
    
}


function getUsers(user_ids){
    $.ajax({
        url: getUsersURL(user_ids),
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
            showLikes(data["responseJSON"]["response"])
        }
    })
}

function showLikes(likes){
    console.log("showLikes")
    console.log(likes.length)
    var html = ''
    var user_ids = ''
   for(i = 0; i < likes.length; i++){
       var user = likes[i]
       html += 
       '<li>' 
       +'<a target=_blank href=https://vk.com/id' + user.id + '>' 
       +'<img src=' + user.photo_200 + '></img>'
            +'<div>'
                +'<h4>' + user.first_name + ' ' + user.last_name + '<h4>'
            +'</div>'
       + '</a>'
       +'</li>'
    
   }
   $('ul').html(html);
   console.log('li count: ' + $('li').length)
}