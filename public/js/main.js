require.config({
    baseUrl: '/js/',
    paths: {
        "jquery":'lib/jquery',
        "underscore": 'lib/underscore',
        "text": "lib/require.text",
        "backbone" : 'lib/backbone',
        "msgHandler": 'lib/msgHandler'
    },
    shim: {
        "backbone": {
            deps: ["jquery", "underscore"]
        }
    }

})

require(["app"]);