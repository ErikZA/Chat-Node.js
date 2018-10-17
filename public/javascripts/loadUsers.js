function loadUsers() {
    $.post('/list',
        { name: $('#searchUser').val() },
        function (data, status) {
            $.get('/listPeople', function(res,status){
                //alert("template" + res);
                const personTemplete = Handlebars.compile(res);
                const html = personTemplete({ people: data })
                console.log(html);
                $("#listPeople").html(html);
            });     
        });
};
