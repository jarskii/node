define(
    [
        "jquery",
        "backbone",
        "underscore",
        "msgHandler",
        "text!templates/auth.html",
        "text!templates/registration.html",
        "views/user.view"
    ],
    function ($, Backbone, _, msgHandler, AuthTmplt, RegistrationView, UserView) {
        var authView = Backbone.View.extend({
                el: 'body',
                template: _.template(AuthTmplt, {}),
                events: {
                    'click .b-wrapper-caption_reg' : 'showRegPopup',
                    'click #submit': 'auth'
                },
                render: function() {
                    this.el.innerHTML = this.template;

                },
                auth: function() {
                    $.ajax({
                        type: "POST",
                        url: "/auth",
                        dataType: 'JSON',
                        data: {
                            "login": document.getElementById('login').value,
                            "pass": document.getElementById('pass').value
                        },
                        success: function(data) {
                            data.success ?
                                !function(){
                                    msgHandler.message('Авторизация прошла успешно!');
                                    window.location.href = '/'+data.user;
                                }()
                                :
                                msgHandler.error('Неверный логин или пароль!')
                        }
                    })
                },
                showRegPopup: function(e) {
                    new registrationView().render();
                }
            }),
            registrationView = Backbone.View.extend({
                template: _.template(RegistrationView, {}),
                events: {
                    'click #regSubmit': "registration"
                },
                render: function() {
                    this.el.innerHTML = this.template;

                    document.body.appendChild(this.el);
                },
                registration: function(e) {
                    var self = this;
                    $.ajax({
                        type: "POST",
                        url: "/register",
                        dataType: 'JSON',
                        data: {
                            "login": document.getElementById('regLogin').value,
                            "pass": document.getElementById('regConfirmPass').value,
                            "invait": document.getElementById('regEmail').value
                        },
                        success: function(data) {
                            msgHandler.message('Регистрация прошла успешно!');
                            self.el.remove();
                        },
                        error: function() {
                            msgHandler.error('Регистрация не удалась!');
                            self.el.remove();
                        }
                    })
                }
            })

        new authView().render();
    }
)