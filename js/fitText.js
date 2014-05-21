(function($, undefined) {

    function fitItem(elt, inc, maxSize, lhratio) {
      
        function fitTick() {

            if (setting && cont.width() > elt.width()) {
                i += inc;
                setSizes(lhratio);

                if (cont.width() > elt.width() && i < maxSize) {
                    fitTick();
                } else {
                    i -= inc;
                    setSizes(lhratio);
                    setting = false;
                // normaliseToMinHeight();
                }

            } else if (i > inc) {
                i -= inc;

                if (i === 0) {
                    i = inc;
                    setSizes(lhratio);
                    setting = false;

                } else {
                    setSizes(lhratio);

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


        function setSizes(lhratio) {
            elt.css('font-size', i + 'px');
            elt.css('line-height', i*lhratio + 'px');
        }


        var cont = elt.parent(),

            inc = inc || 0.2,
            i = inc,
            maxSize = maxSize || 1e6,
            setting = true;



        if (usedElts.filter(elt).length === 0) {

            usedElts = usedElts.add(elt);

            elt
                .css('font-size', inc + 'px');

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

    $.fn.fitText = function(inc,maxSize,lhratio) {
        var inc = inc || 0.2;
        var lhratio = lhratio || 1;
        return this.each(function() {
            fitItem($(this), inc, maxSize, lhratio);
        });
    };

    $(window).on('resize', restartTicks);

}(jQuery));


fitText = function(selector, settings){
    $(selector).fitText(settings.increment, settings.maxSize, settings.lhratio);
};
