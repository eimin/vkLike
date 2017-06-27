$('#loadLikes').on('click', showLikes)
var fullRequest = 'https://api.vk.com/method/likes.getList?type=photo&extended=1&count=100&item_id=456289131&owner_id=25240087&access_token=307b0a943e92dca6c3ed09f02bd201a6e8e73444b82bb5af8d71075e870537a23ece57aeb2e225eabfbae&v=5.52'

function createUrl(){
    var params = {
        access_token : '2eb36914bd1d4ba96fd425b9eca3880fdc338f75211f45e243eeaea58fe6c4517338df3365561019184fd',
        item_id : '390932',
        owner_id : '-25240087',
        count : '1000',
        type : 'post',
        extended: '1'
    }
    return 'https://api.vk.com/method/likes.getList?' + $.param(params) + '&v=5.52'
}

sendRequest = function (){
    $.ajax({
        url: createUrl(),
        method: 'GET',
        dataType: 'JSONP',
        succes: function(data){
            console.log('success function')
            console.log(JSON.parse(data))
        },
        error: function(jqXHR,textStatus,errorThrown){
            console.log('Error fucntion ' + textStatus)
        
        },
        complete: function(data){
            console.log('complete')
            console.log(data["responseJSON"]["response"])
            console.log(data["responseJSON"]["response"]["items"])
            showLikes(data["responseJSON"]["response"]["items"])
        }
    })
}()


function getUserInfo(user_ids){
    $.ajax({
        url: 'https://api.vk.com/method/users.get?' +
        'user_ids=' + user_ids +
        '&fields=sex,city,country,photo_100'
    })
}

function showLikes(likes){
    var html = ''
    console.log(likes.length)
    var user_ids = ''
    for(var i = 0; i < likes.length; i++){
        //чтобы не пришпилить лишнюю запятую к последнему айдишнику
        if(i == likes.length-1) 
            user_ids += likes[i]["id"]
        else 
            user_ids += likes[i]["id"] + ','
    }

    console.log(user_ids)
}