function getURLForLikes(){
    var params = {
        access_token : '1f5abb90d44b370455b7ed0416d0e8ee6d721bebe742f09aff34ef4c26e6d4f15a2dd6b6751c8ceace53f',
        item_id : '390932',
        owner_id : '-25240087',
        count : '1000',
        type : 'post',
        extended: '1'
    }
    return 'https://api.vk.com/method/likes.getList?' + $.param(params) + '&v=5.52'
}

function getURLForUsersInfo(user_ids){
    var params = {
         access_token : '1f5abb90d44b370455b7ed0416d0e8ee6d721bebe742f09aff34ef4c26e6d4f15a2dd6b6751c8ceace53f',
         fields: 'sex,city,country,photo_200',
    }
    params.user_ids = user_ids
    // console.log('getURLUserInfo ')
    // console.log(params)
    // console.log('https://api.vk.com/method/users.get?' + $.param(params) + '&v=5.52')
    return 'https://api.vk.com/method/users.get?' + $.param(params) + '&v=5.52'
}

getLikes = function (){
    $.ajax({
        url: getURLForLikes(),
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
            var user_ids = ''
            var likes = data["responseJSON"]["response"]["items"]
            for(var i = 0; i < 300; i++){
                //чтобы не пришпилить лишнюю запятую к последнему айдишнику
                if(i == likes.length-1) 
                    user_ids += likes[i]["id"]
                else 
                    user_ids += likes[i]["id"] + ','       
            }
            getUserInfo(user_ids)
        }
    })
    
}()


function getUserInfo(user_ids){
    $.ajax({
        url: getURLForUsersInfo(user_ids),
        method: 'GET',
        dataType: 'JSONP',
        success: function(data){
            console.log('getUserInfo: success: ')
            console.log(data)
        },

        error: function(jqXHR,textStatus,errorThrown) {
            console.log('getUserInfo: error' + textStatus)
        },

        complete: function(data){            
            console.log('getUserInfo: complete')
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