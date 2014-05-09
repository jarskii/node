!function(window) {
    var unusedStyles = function(params) {
        this.params =  params || {};
        this.CONST = {};

        this.start()
    };

    unusedStyles.prototype.start = function() {
        this.CONST.typeTest = this.params.type ? 'manyPage' : 'singlePage';

        if (!localStorage.getItem('unusedCSS')) {
            this.newTest(this.CONST.typeTest);
        } else {
            this.continueTest();
        }
    }

    unusedStyles.prototype.newTest = function(type) {
        if (type=='singlePage') {
            this.createData();
        } else {
            var storageItem  = {
                urls: this.params.urls
            }
        }

    }

    unusedStyles.prototype.continueTest = function(type) {
        if (type=='singlePage') {
            this.createData();
        } else {
            var storageItem  = {
                urls: this.params.urls
            }
        }

    }

    unusedStyles.prototype.createData = function() {
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

            for (var j=0; j<rulesLenght; j++) {
                report[stylesheet.href?stylesheet.href.split(host)[1]:'inline'].push(rules[j]);
            }
        }
        this.report = report;
        this.testing();
    };

    unusedStyles.prototype.testing = function() {
        var report = '';

        for (page in this.report) {
            console.group(page);
            var cssList = this.report[page],
                listLength = cssList.length,
                pageReport = '';

            for (var i=0; i<listLength; i++) {
                if (cssList[i].selectorText) {
                    var selectors = cssList[i].selectorText.split(' '),
                        lastSelector = selectors.splice(selectors.length-1, 1),
                        probationer = document.querySelectorAll(lastSelector),
                        result;

//                    console.log(selectors, lastSelector);
                    if (!probationer.length) {
//                        console.log(lastSelector + ' not used!');
                    } else {
//                        console.log(lastSelector, probationer);
                        findParents(probationer, selectors);
                    }
                }
            }
            console.groupEnd();
//            console.log(page, this.report[page]);
        }


        function findParents(elements, list) {
            if (list.length) {


                for (var i=0; i<elements.length; i++) {
                    var node = elements[i];

                    for (var j=1; j<list.length+1; j++) {
                        if (!/,/.test(list[list.length-1])) {
//                            console.log(list[list.length-1])
                            console.log(node.parentNode.);
                        }
                    }

//                    console.log(elements[i].parentNode);

                }
            }
//            console.log(selectors.length, element ,element.parentNode);
//            for (i=0; i<selectors.length; i++) {
//
//            }

        }
//        console.log('* Unused styles *')
        console.log(report);
    }


    function bindReady(handler){

        var called = false

        function ready() { // (1)
            if (called) return
            called = true
            new handler()
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

    if(document.getElementsByClassName) {

        getElementsByClass = function(classList, node) {
            return (node || document).getElementsByClassName(classList)
        }

    } else {

        getElementsByClass = function(classList, node) {
            var node = node || document,
                list = node.getElementsByTagName('*'),
                length = list.length,
                classArray = classList.split(/\s+/),
                classes = classArray.length,
                result = [], i,j
            for(i = 0; i < length; i++) {
                for(j = 0; j < classes; j++)  {
                    if(list[i].className.search('\\b' + classArray[j] + '\\b') != -1) {
                        result.push(list[i])
                        break
                    }
                }
            }

            return result
        }
    }


    bindReady(unusedStyles);

}(window)