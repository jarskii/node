define([
    "backbone",
    "underscore",
    "text!templates/user.html"

], function(Backbone, _, UserTmplt) {

    var userView = Backbone.View.extend({
        template: _.template(UserTmplt, {
            "login": "Vasia",
            "resources": [{caption: 'hook'}]
        }),
        render: function() {
            this.el.innerHTML = this.template;

            console.log(this)
            document.body.innerHTML = '';
            document.body.appendChild(this.el);
        }
    });

    return userView;

})