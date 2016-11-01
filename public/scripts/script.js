    //обработаем событие клика по ссылке "создать аккаунт"
    $('.new-account').click(function (evt) {
        evt.preventDefault();
        $.ajax({
            type:'GET',
            url:'/signup',
            success: function (data) {
                $('.index-main')
                    .html(data)
            }
        })
    });

    $('#btn-index-app').click(function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/main-list',
            success: function (data) {
                $('.index-app').html(data);
            }
        });
    });


    $('#testbutton').click(function () {

        $.get('../downloads/data.txt',{}, function (data) {
            $('#results').append(data)
        });
    });

    $('#application-form').on('submit', function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/addapp',
            data: $(this).serialize(),
            success: function (data) {
                console.log(data)
            },
            error: function (error) {
                console.log(error)
            }
        });
    });
    
    $('#subnav-profile').click(function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/home/profile',
            success: function (data) {
                $('#home-content').html(data)
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $('#subnav-del').click(function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/test-del',
            success: function (data) {
                $('#home-content').html(data)
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $('#subnav-messages').click(function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/home/applications',
            success: function (data) {
                $('#home-content').html(data)
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $('#nav-seminars').click(function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'GET',
            url:'/seminars',
            success:function (data) {
                $('.index-main').html(data)

            }
        })
    });
    $('#nav-resources').click(function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'GET',
            url:'/resources',
            success:function (data) {
                $('.index-main').html(data)

            }
        })
    });
    $('#nav-about').click(function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'GET',
            url:'/about',
            success:function (data) {
                $('.index-main').html(data)

            }
        })
    });
    $('#link-test1').click(function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'GET',
            url:'/test1',
            success:function (data) {
                $('.index-main').html(data)
            }
        })
    });



   
    
    // $('#form-appl-del').submit(function (evt) {
    //      evt.preventDefault();
    //      $.ajax({
    //          type: 'POST',
    //          url: '/delete/:id',
    //          data: $(this).serialize(),
    //          success:function (data) {
    //              $('#home-content').update();
    //
    //          },
    //          error:function (err) {
    //              console.log(err);
    //          }
    //      });
    //  });



        $('.btn-edit').click(function () {
            var title = $('.title-edit').html();
            alert(title);
            $('.title-edit').remove();
        });   