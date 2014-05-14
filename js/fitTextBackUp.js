(function($, undefined) {

    function fitItem(elt, inc, maxSize) {
      
        function fitTick() {
            if (setting && cont.width() > elt.width()) {
                i += inc;
                setFontSize();

                if (cont.width() > elt.width() && i < maxSize) {
                    fitTick();
                } else {
                    i -= inc;
                    setFontSize();
                    setting = false;
                }

            } else if (i > inc) {
                i -= inc;

                if (i === 0) {
                    i = inc;
                    setFontSize();
                    setting = false;

                } else {
                    setFontSize();

                    if (cont.width() > elt.width()) {
                        setting = false;
                    } else {
                        fitTick();
                    }

                }

            } else {
                setting = false;

            }

        }



        function setFontSize() {
            elt.css('font-size', i + 'em');
        }



        var cont = elt.parent(),

            inc = inc || 0.2,
            i = inc,
            maxSize = maxSize || 1e6,
            setting = true;



        if (usedElts.filter(elt).length === 0) {

            usedElts = usedElts.add(elt);

            elt
                .addClass('text-inlineblock')
                .css('font-size', inc + 'em');

            resizeFuncs.push({
                restartTick: function() {
                    setting = true;
                    fitTick();
                },
                needsResetting: function() {
                    return (!setting);
                }
            });

            fitTick();

        }
    }

    function restartTicks() {
        for (var i = 0; i < resizeFuncs.length; i += 1) {
            if ( resizeFuncs[i].needsResetting() ) {
                resizeFuncs[i].restartTick();
            }
        }
    }



    var resizeFuncs = [],
        usedElts = $([]);

    $.fn.fitText = function(inc,maxSize) {
        var inc = inc || 0.2;
        return this.each(function() {
            fitItem($(this), inc, maxSize);
        });
    };

    $(window).on('resize', restartTicks);

}(jQuery));

fitText = function(selector, settings){
    $(selector).fitText(settings.increment, settings.maxSize);
};


$(document).ready(function() {
    $(window).resize();
});