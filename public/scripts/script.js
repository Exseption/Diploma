//$('.form-inc-purse').on('submit',function(event){
//    $.ajax({
//        type: 'POST',
//        url: '/purse-inc',
//        data: $(this).serialize(),
//        success:function(data){
//            console.log(data);
//        }
//    });
//    event.preventDefault();
//});
//    //обработаем событие клика по ссылке "создать аккаунт"
//    $('.new-account').click(function (evt) {
//        evt.preventDefault();
//        $.ajax({
//            type:'GET',
//            url:'/signup',
//            success: function (data) {
//                $('.index-main')
//                    .html(data)
//            }
//        })
//    });
//    $('#btn-index-app').click(function (evt) {
//        evt.preventDefault();
//        $.ajax({
//            type: 'GET',
//            url: '/main-list',
//            success: function (data) {
//                $('.index-app').html(data);
//            }
//        });
//    });
//    $('#testbutton').click(function () {
//
//        $.get('../downloads/data.txt',{}, function (data) {
//            $('#results').append(data)
//        });
//    });
//    //отпарвка формы заявки
//    $('#application-form').on('submit', function (event) {
//        $.ajax({
//            type: 'POST',
//            url: '/addapp',
//            data: $(this).serialize(),
//            success: function (data) {
//                console.log(data)
//            },
//            error: function (error) {
//                console.log(error)
//            }
//        });
//        event.preventDefault();
//    });
//    $('#subnav-del').click(function (evt) {
//        evt.preventDefault();
//        $.ajax({
//            type: 'GET',
//            url: '/test-del',
//            success: function (data) {
//                $('#home-content').html(data)
//            },
//            error: function (err) {
//                console.log(err);
//            }
//        })
//    });
//    $('#subnav-messages').click(function (evt) {
//        evt.preventDefault();
//        $.ajax({
//            type: 'POST',
//            url: '/home/applications',
//            success: function (data) {
//                $('#home-content').html(data)
//            },
//            error: function (err) {
//                console.log(err);
//            }
//        })
//    });
