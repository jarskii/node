!function(window) {
    function unusedStyles() {
        window.endTimeTest = new Date();

        console.log('DomReady: ', window.endTimeTest - window.startTimeTest);

        var stylesheets = document.styleSheets,
            report = {},
            host = location.host;

        for (var i=0; i<stylesheets.length; i++) {
            var stylesheet = stylesheets[i];

            report[stylesheet.href?stylesheet.href.split(host)[1]:'inline'] = [];

            var rules = stylesheet.cssRules,
                rulesLenght = rules.length;

            for (var i=0; i<rulesLenght; i++) {
                report[stylesheet.href?stylesheet.href.split(host)[1]:'inline'].push(rules[i]);
            }
        }
        console.log(report);
    }



    function bindReady(handler){

        var called = false

        function ready() { // (1)
            if (called) return
            called = true
            handler()
        }

        if ( document.addEventListener ) { // (2)
            document.addEventListener( "DOMContentLoaded", function(){
                ready()
            }, false )
        } else if ( document.attachEvent ) {  // (3)

            if ( document.documentElement.doScroll && window == window.top ) {
                function tryScroll(){
                    if (called) return
                    if (!document.body) return
                    try {
                        document.documentElement.doScroll("left")
                        ready()
                    } catch(e) {
                        setTimeout(tryScroll, 0)
                    }
                }
                tryScroll()
            }

            document.attachEvent("onreadystatechange", function(){

                if ( document.readyState === "complete" ) {
                    ready()
                }
            })
        }

        if (window.addEventListener)
            window.addEventListener('load', ready, false)
        else if (window.attachEvent)
            window.attachEvent('onload', ready)
    };

    bindReady(unusedStyles);

}(window)