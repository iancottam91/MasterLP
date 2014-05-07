var LP = (function(){
		// make all boxes equal height

	return{

		equalheight: function(container){

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
			// if... add class cta-wrapper-bottom
		}

	}

})();


var equalClass = '.pod1, .pod2, .pod3 , .cta-box';

$(window).resize(function(){
	LP.equalheight(equalClass);
});

LP.equalheight(equalClass);