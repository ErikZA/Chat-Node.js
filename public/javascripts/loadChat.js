function loadChat(id){
        var nameChat = $('#h4User').text();
        var nameUser = id;        
        $.post('/getChat',
        {   nameChat: nameChat,
            nameUser: nameUser, },
        function (data, status) {
            //alert('Sucesso:\n'+JSON.stringify(data));
            $.get('/listChat', function(res,status){
                const personTemplete = Handlebars.compile(res);
                const html = personTemplete({ chat: data })
                //console.log(html);
                $("#chatLogin").html(html);
            });    
        });
        $('li').removeClass('listColor');
        document.getElementById(id).classList.add('listColor');        
}

function setChat(){
    var txt = $("#txtMsg").val();
    var nameChat = $("#h4User").text();
    var nameUser = $(".listColor").text().trim();
    if(txt === '' || txt ===" " || txt == undefined || txt == null)
    $("#txtMsg").css({'border': '1px solid red'});
    else{
        $.post('/conversation',
        {   nameChat: nameChat,
            nameUser: nameUser,
            txtMsg: txt, },
        function (data, status) {
            //alert('Sucesso:\n'+JSON.stringify(data));
            $.get('/listChat', function(res,status){
                const personTemplete = Handlebars.compile(res);
                const html = personTemplete({ chat: data })
                //console.log(html);
                $("#chatLogin").html(html);
            });    
        });
        $("#txtMsg").css({'border': '1px solid lightgray'});
        $("#txtMsg").val("");
    }
};

$(document).ready(function atualizaChat(){
    var nameChat = $("#h4User").text();
    var nameUser = $(".listColor").text().trim();
    if(nameUser === '' || nameUser === '  ' || nameUser == undefined || nameUser == null){
        setTimeout(
            function(){ atualizaChat() },11000);
    }else{
        //alert(nameUser, nameUser);
        $.post('/getChat',
        {   nameChat: nameChat,
            nameUser: nameUser},
        function (data, status) {
            //alert('Sucesso:\n'+JSON.stringify(data));
            $.get('/listChat', function(res,status){
                const personTemplete = Handlebars.compile(res);
                const html = personTemplete({ chat: data })
                //console.log(html);
                $("#chatLogin").html(html);
            });    
        });
        setTimeout( 
            function(){ atualizaChat()},6000);
    }   
});
