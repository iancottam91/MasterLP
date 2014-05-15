(function ( $ ) {
 
    $.fn.modalise = function( options ) {
        "use strict";

        // Add the overlay background 
        $('body').append('<div class="overlay hide"></div>');

        // Get DOM elements
        var overlay = $(".overlay"),
            overlayMessage = $('.overlay-message'),
            closeButtons = $(".modal-close"); // The overlay background and any custom close buttons

        // Activate close buttons
        closeButtons.on('click',function(){
            hideOverlay();
        });

    	// Options for the plugin
    	var settings = $.extend({
            closeButton: true
    	}, options );
        
        return this.each(function(index){
            // Get specific DOM elements
        	var openButton = $(this),
                targetSelector = '#' + openButton.attr('data-target');

            // Add and initiate close button if required
            if(settings.closeButton){
                $(targetSelector).prepend('<a href="#" class="modal-close btn">X</a>').find('.modal-close').on('click',function(){
                    hideOverlay();
                });
            }

            // Show the relevant modal window on clicking the open button
        	openButton.on('click',function(){
                var targetSelector = '#' + $(this).attr('data-target');
                $(targetSelector + ', .overlay').toggleClass("hide");
            });

        });
        
        // Hide overlay and message
        function hideOverlay(){
            overlay.addClass("hide");
            overlayMessage.addClass("hide"); 
        }

    };
 
}( jQuery ));



