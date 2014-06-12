// populate the elements with the classes in the translation object
function populateTranslations(translations){

	$.each(translations, function(key, value){

		elements = $('.' + key );
		for (var i = 0; i <= elements.length; i++) {
			if(elements[i] != undefined){
				// console.log("Elements: " + elements[i].innerHTML);
				// console.log("Property: " + property);
				// console.log("Value: " + translations[property])
				elements[i].innerHTML = value;
			}
		};

	});

}

//Get the language of the document
function getLanguage(){
	var language = $('body > div').attr('data-lang');;
	return language;
}

//Get the translation object that corresponds to the document's language
function getTranslationObject(data, language){
	console.log(data[language]);
	return data[language];
}

// window.onload = function(){
// 	populateTranslations(getTranslationObject(lang, getLanguage()));
// };

// "https://promotions.betfair.com/media/english_uk/files/translations/slider.js"

$.ajax({
    type: "GET",
    url: "js/global_translations.json",
    dataType: "json"
}).done(function(data) {
    console.log('done');
    // getTranslationObject(data, getLanguage());

    populateTranslations(getTranslationObject(data, getLanguage()));

}).fail(function(){
    console.log('fail');
});

