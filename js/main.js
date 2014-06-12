var MasterLP = (function(){
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
			    $($el).height('auto');

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
			var ctaWrapper = $('.cta-box .cta-wrapper');

			ctaWrapper.each( function(index, element){

				var	ctaButtonHeight = $(this).find('.cta-button').height(),
					ctaBoxHeight = $(this).parent().outerHeight();

				if(ctaBoxHeight <= 400){
					$(this).css({"top" : "50%", "margin-top" : -ctaButtonHeight/2 })
				} else {
					$(this).css({"top" : ctaBoxHeight/10 })
				}

			});
				
		},

		positionBannerText: function(){
			var headlineText = $('.text-container'),
				banner = $('.banner'),
				tenthOfBannerHeight = banner.height()/10;

			headlineText.css({"bottom" : tenthOfBannerHeight, "left" : tenthOfBannerHeight})				
		},

		addBrandLink: function(){
			var brand = $('body > div').attr('class');
			var brandA = $('.brand-img');
			var homepageLink = $('.homepage-link a');
			switch(brand){
				case "arcade":
					brandA.attr('href', 'https://arcade.betfair.com');
					homepageLink.attr('href', 'https://arcade.betfair.com');
					break;
				case "bingo":
					brandA.attr('href', 'https://bingo.betfair.com');
					homepageLink.attr('href', 'https://bingo.betfair.com');
					break;
				case "casino":
					brandA.attr('href', 'https://casino.betfair.com');
					homepageLink.attr('href', 'https://casino.betfair.com');
					break;
				case "poker":
					brandA.attr('href', 'https://poker.betfair.com');
					homepageLink.attr('href', 'https://poker.betfair.com');
					break;
			
			} 
		}

	}

})();

var pods = '.pod, .instruction-box.cta-box';
var fullWidthBoxes = '.text-box, .full-width-container .cta-box';

$(window).resize(function(){
	MasterLP.equaliseColumnHeights(fullWidthBoxes);
	MasterLP.equaliseColumnHeights(pods);
});

$(window).load(function(){

	// Call fit text on the banner headline
	fitText(".third .headline", {'increment': 1, 'maxSize': 75, 'lhratio': 0.81});
	fitText(".fourth .headline", {'increment': 1, 'maxSize': 70, 'lhratio': 0.81});

});
$('document').ready(function(){
	var bodyBg = $('.brand').css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
 	$.backstretch(bodyBg);
 	$('.brand').css('background', 'transparent');

MasterLP.equaliseColumnHeights(fullWidthBoxes);
	MasterLP.addBrandLink();
	MasterLP.equaliseColumnHeights(pods);
	MasterLP.positionCta();
	MasterLP.positionBannerText();
	
	// Call owl carousel
	$("#carousel").owlCarousel({

	    autoPlay: 3000, //Set AutoPlay to 3 seconds 
	    items : 6,
	    itemsDesktop : [976,6],
	    itemsDesktopSmall : [975,4],
	    itemsMobile:	[479,2]

	});

	// Call Modal Plugin
	$('.modal-open').modalise({closeButton: false});
	

	// Interface - Checkboxes
	$('.interface input[type=checkbox]').each(function () {
		$(this).click(function(){
			var brandid = $(this).data("element");
			$('*[data-brandid="'+brandid+'"]').toggle();

		})
	});
	// Interface - Brand selector
	$('.interface select.brand').each(function () {
		$(this).change(function(){
			jQuery('.brand').attr('class', 'brand '+$(this).val());

			//var bodyBg = $('.brand').css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
			//console.log('bodyBg');

		})
	});		



});


