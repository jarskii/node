define(function() {
    var msgHandler = function() {
        this.countMsg = 0;
    };

    msgHandler.prototype.error = function(text) {
        this.createMessage(text, 'error');
    };

    msgHandler.prototype.message = function(text) {
        this.createMessage(text, 'message');
    };

    msgHandler.prototype.createMessage = function(text, type) {
        var msgEl = document.createElement('div'),
            style = {};

        this.countMsg++;


        switch (type) {
            case 'error':
                style.color = '#ef8383'
                break;
            case 'message':
                style.color = '#9bef9b'
                break;
            default :
                style.color = '#ccc'
                break;
        };

        msgEl.className = 'error-msg'
        msgEl.id = 'errorMsg-'+this.countMsg;


        msgEl.innerHTML = text;

        msgEl.style.background = style.color
        document.body.appendChild(msgEl);

        console.log(msgEl);

        setTimeout(function() {
            var element = document.getElementById(msgEl.id);

            element.parentNode.removeChild(element);
        }, 3000)

    };
    return new msgHandler;
})
