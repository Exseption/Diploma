jQuery(function($) {

    $('#testbutton').click(function () {

        $.get('../downloads/data.txt',{}, function (data) {
            $('#results').append(data)
        });
    });

    $('#indexform').on('submit', function (evt) {
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
                $('#profile').html(data)
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
            url: '/home/messages',
            success: function (data) {
                $('#profile').html(data)
            },
            error: function (err) {
                console.log(err);
            }

        })
    })

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


});