var main = function (flickrResponse) {
	"use strict";
	var tag;
	$('.search-btn').on('click',function(){
		tag = $('.input-tag').val();
		if (tag != '') {
			$('.input-tag').val("");
			show(tag);
		}
	});
};

var show = function(tag){
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
	"tags="+tag+"&format=json&jsoncallback=?";

	$.getJSON(url, function (flickrResponse) {
		var displayImage = function (imageIndex) {
			if (imageIndex == flickrResponse.items.length)
				imageIndex = 0;
			// создаем новый элемент jQuery для хранения изображений, но пока скрываем его
			var $img = $("<img>").hide();
			// устанавливаем атрибут для URL, находящегося в ответе
			$img.attr("src", flickrResponse.items[imageIndex].media.m);	
			$(".photos").empty();
			// прикрепляем тег к функции main элемента photos, а затем отображаем его
			$("main .photos").append($img);
			$img.fadeIn();
			setTimeout(function () {
				imageIndex = imageIndex + 1;
				displayImage(imageIndex);
			}, 1000);	
		}
		displayImage(0);
	});
}
$(document).ready(main);