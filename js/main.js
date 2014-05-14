var LP = (function(){
		// make all boxes equal height

	return{

		equaliseColumnHeights: function(container){

			var currentTallest = 0,
			    currentRowStart = 0,
			    rowDivs = new Array(),
			    $el,
			    topPosition = 0;

			$(container).each(function() {
			    $el = $(this);
			    $($el).height('auto')
			    topPosition = $el.position().top;
			    if (currentRowStart != topPosition) {
			    	for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			    	rowDivs[currentDiv].height(currentTallest);
			    }
			    rowDivs.length = 0; // empty the array
			    currentRowStart = topPosition;
			    currentTallest = $el.height();
			    rowDivs.push($el);
			    } else {
			    	rowDivs.push($el);
			    	currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
				}
			    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			    	rowDivs[currentDiv].height(currentTallest);
				}
			});

		},

		positionCta: function(){
			var ctaWrapper = $('.cta-wrapper');

			ctaWrapper.each( function(index, element){

				var	ctaButtonHeight = $(this).find('.cta-button').height(),
					ctaBoxHeight = $(this).parent().outerHeight();

				if(ctaBoxHeight <= 150){
					$(this).css({"top" : "50%", "margin-top" : -ctaButtonHeight/2 })
				} else {
					$(this).css({"bottom" : ctaBoxHeight/10 })
				}

			});
				
		},

		positionBannerText: function(){
			var headlineText = $('.text-container'),
				banner = $('.banner'),
				tenthOfBannerHeight = banner.height()/10;

			headlineText.css({"bottom" : tenthOfBannerHeight, "left" : tenthOfBannerHeight})				
		}

	}

})();


var instructionBoxes = '.pod1, .pod2, .pod3 , .instruction-box.cta-box';
var fullWidthBoxes = '.text-box, .full-width-container .cta-box';

$(window).resize(function(){
	LP.equaliseColumnHeights(instructionBoxes);
	LP.equaliseColumnHeights(fullWidthBoxes);
});

LP.equaliseColumnHeights(instructionBoxes);
LP.equaliseColumnHeights(fullWidthBoxes);
LP.positionCta();
LP.positionBannerText();

// Call fit text on the banner headline
fitText(".headline", {'increment': 1, 'maxSize': 75, 'lhratio': 0.81});

// Call owl carousel

$("#carousel").owlCarousel({

    autoPlay: 3000, //Set AutoPlay to 3 seconds
		 
    items : 6,
    itemsDesktop : [976,6],
    itemsDesktopSmall : [975,4],
    itemsMobile:	[479,2]

});

