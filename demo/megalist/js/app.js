define([
    'backbone'
], function(Backbone) {
    console.log(Backbone);
    var layoutView = Backbone.View.extend({
        el: 'body',
        render: function() {
            console.log(this.el);
        }
    });
    new layoutView().render()
})
