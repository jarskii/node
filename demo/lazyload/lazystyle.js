!function() {
    var collection = document.querySelectorAll('.lazy'),
        items = [],
        addEventListener = function(evt, fn){
            window.addEventListener
                ? this.addEventListener(evt, fn, false) : (window.attachEvent)
                ? this.attachEvent('on' + evt, fn) : this['on' + evt] = fn;
        },
        itemsInZone = function(item) {
            var offset = item.getBoundingClientRect();

            return (
                offset.top >= 0 && offset.top <= (window.innerHeight || document.documentElement.clientHeight)
                )
        },
        loadImages = function (item) {
            var src = item.getAttribute('data-src'),
                dummy = new Image();

            dummy.src = src;

            dummy.onload = function() {
                if (item.src === undefined) {
                    item.style.background = 'url(' + src + ')';
                } else {
                    item.src = src;
                }

                item.className += ' lazy-show';
            }
        },
        observerScroll = function() {
            for (var i=0; i<items.length; i++) {
                if (itemsInZone(items[i])) {
                    loadImages(items[i]);
                    items.splice(i, 1);
                    i--;
                }
            };
        };

    for (var i=0; i < collection.length; i++) {
        items.push(collection[i]);
    };

    observerScroll();
    addEventListener('scroll', observerScroll);
}()