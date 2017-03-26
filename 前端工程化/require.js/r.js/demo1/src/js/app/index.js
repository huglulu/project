define(['jquery','com/gotop', 'com/event', 'com/carousel', 'com/exposure'], function($, GoTop, EventCenter, Carousel, Exposure) {

	new GoTop();
	Carousel.init($('.carousel'));
	var i = 0,
		len = $('.intro p').length;
	EventCenter.on('carousel_show_pre', function() {
		if (i<=0) {
			$('.intro p').hide().eq(3).fadeIn();
			i+=3;
		}else{
			$('.intro p').hide().eq(i-1).fadeIn();
			i--;
			i = i % len;			
		}
	});
	EventCenter.on('carousel_show_next', function() {
		if (i>=3) {
			$('.intro p').hide().eq(0).fadeIn();
			i-=2;
			i = i % len;
		}else{
			$('.intro p').hide().eq(i+1).fadeIn();
			i++;
			i = i % len;
		}
	});

	Exposure.one($('.img-cells img'), function(){

		var $this = $(this);
		$this.attr('src', $this.attr('data-src'));
	});


});