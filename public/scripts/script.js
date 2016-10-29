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
});