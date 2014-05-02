define(
    [
        "lib/jquery"
    ],
    function () {
         $('.b-wrapper-caption_reg').click(function(){
             $('.b-registration').toggleClass('is-show');
         });

        $('#regSubmit').click(function() {
            var container = $(this).parent();

            container.toggleClass('is-show');

            $.ajax({
                type: "POST",
                url: "/register",
                dataType: 'JSON',
                data: {
                    "login": container.children('#regLogin').val(),
                    "pass": container.children('#regConfirmPass').val(),
                    "invait": container.children('#regEmail').val()
                },
                success: function(data) {
                    console.log(data);
                }
            })
        });

        $('#submit').click(function() {
            $.ajax({
                type: "POST",
                url: "/auth",
                dataType: 'JSON',
                data: {
                    "login": $('#login').val(),
                    "pass": $('#pass').val()
                },
                success: function(data) {
                    console.log(data);
                }
            })
        })

//        $.ajax({
//            type: "POST",
//            url: "/json",
//            dataType: 'JSON',
//            data: {
//                "action": "raz raz"
//            },
//            success: function(data) {
//                console.log(data);
//            }
//        })
    }
)