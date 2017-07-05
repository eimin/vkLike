var View = {
    //добавить конструктор
    bind: function(){
        $("#load").on("click", function(){
            var exParams = {
                owner_id: $('#owner_id').val(),
                item_id: $('#item_id').val(),
                type: $('#type').val()
            }

            console.log('click button: ' 
            + "owner: " + exParams.owner_id 
            + " item_id: " + exParams.item_id 
            + " type: " + exParams.type)

            Controller.getLikes(exParams)  
        })
    },

    showLikes: function (likes){
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
    
}