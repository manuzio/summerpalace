$('.slider1').each(function (i, sl) {

		var imgcont = $(this).children('.imgcont').get(0);
		$(imgcont).children('img').each(function(j, img) {
			$(img).addClass('sli'+j);
			if ($(sl).children('.pager').length != 0) {
				var p = $('<a href="#" />');
				p.click(function() {
					slide(j);
					return false;
				});
				$(sl).children('.pager').append(p);
			};
		});
		$('.imgcont').css('left', '0%');
		var images = $(imgcont).children('img');
		$(images.get(-1)).clone().prependTo(imgcont).css({
			position: 'absolute',
			left: '-940px'
		});
		$(images.get(-2)).clone().prependTo(imgcont).css({
			position: 'absolute',
			left: '-1880px'
		});
		$(images.get(0)).clone().appendTo(imgcont);
		$(images.get(1)).clone().appendTo(imgcont);

		var position = 0;
		$(this).css({position: 'relative'});
		
		function slide (pos) {
			var l = 0 - (pos*940);
			if(pos == -1) 					{position = images.length-1;}
			else if(pos == images.length) 	{position = 0;}
			else 							{position = pos;}
			if ($(sl).children('.pager').length != 0) {
				$(sl).find('.pager a').removeAttr('active');
				$($(sl).find('.pager a').get(position)).attr('active', true);
			}

			if($(sl).children('.caption').length == 0) {
				var caption = $('<div class="caption" />');
				caption.css({opacity: 0});
				$(sl).append(caption);
			}
			else {
				var caption = $(sl).children('.caption');
				caption.transition({opacity: 0}, 300, function() {

				});
			}

			if($(imgcont).siblings('.captioncont').children('div[data-img='+position+']').length != 0) {
				caption.transition({opacity: 0}, 100, function() {
					caption.html($(imgcont).siblings('.captioncont').children('div[data-img='+position+']').html());
					caption.transition({opacity: 1}, 300);
				});
			}

			$(imgcont).children('img:not(.sli'+position+')').transition({opacity: 0.4}, 500);
			$(imgcont).children('img.sli'+position).transition({opacity: 1}, 500);
			$(imgcont).transition({left: l+'px'}, 500, function() {
				if(pos == -1) {$(imgcont).css({left: '-'+((images.length-1)*940)+'px'});}
				else if(pos == images.length) {$(imgcont).css({left: '0px'});}
			});

			$(imgcont).children('img').unbind('click').css('cursor', 'default').removeAttr('title');
			$(imgcont).children('img.sli'+position).next().click(function() {slide(position+1)}).css('cursor', 'pointer').attr('title', 'Следующее изображение');
			$(imgcont).children('img.sli'+position).prev().click(function() {slide(position-1)}).css('cursor', 'pointer').attr('title', 'Предыдущее изображение');
		}
		$(this).find('a.sl.prev').click(function () {
			slide(position-1);
			return false;
		});
		$(this).find('a.sl.next').click(function () {
			slide(position+1);
			return false;
		});

		slide(0);

		//touch events

		$(sl).swipe({
			swipe:function(event, direction, distance, duration, fingerCount) {
				if(distance > 300) {
					if(direction == 'left') slide(position+1);
					else slide(position-1);
				}
				else slide(position);
			},
			swipeStatus:function(event, phase, direction, distance, duration, fingerCount)
			{
				var delta = 0;
				var left = 0 - (940*position);
				if(direction == 'left') delta = 0 - distance;
				else delta = distance;
				$(imgcont).css({left: (left+delta)+'px'});
			}
		});

		//stuff

		if($(sl).next('article').children('.stuff').length != 0) {
			$(sl).addClass('stuff-sl');
			$(sl).next('article').children('.stuff').find('a[data-tab]').click(function() {
				slide($(this).index());
			});
		}

});//$('.slider1').each


$('.indexswitcher').ready(function() {
	var isw = $('.indexswitcher');
	$('.indexswitcher-buttons button').click(function() {
		var b = $(this);
		b.siblings().removeAttr('active');
		b.attr('active', true);
		$('.indexswitcher').children(':first-child').transition({marginTop: '-'+(740*b.index())+'px'}, 500);
		return false;
	});
}); //indexswitcher

$('.map1').ready(function() {
	$('.map1 .marks>a').click(function() {
		if(!$(this).attr('active')) {
			$(this).siblings().removeAttr('active');
			$(this).attr('active', true);
		}
		else {
			$('.map1 .marks>a').removeAttr('active');
		}
		return false;
	});

	$('.map1 .marks>.shadow').click(function() {
		$(this).siblings().removeAttr('active');
	}); 
}); //map1



$('.live-widget').ready(function() {
	var w = $('.live-widget');
	var pos = 0; 
	var c = w.find('a.item').length;
	w.children('button.next, button.prev').click(function() {
		if($(this).is(':disabled')) return false;
		if($(this).is('.next') && pos < (c-2)) {
			$(w.find('a.item').get(pos)).attr('disabled', true);
			pos++;
		}
		if($(this).is('.prev') && pos > 0) {
			w.find('a.item[disabled]').last().removeAttr('disabled');
			pos--;
		}
		if(pos==0) w.find('button.prev').attr('disabled', true);
		else w.find('button.prev').removeAttr('disabled');

		if(pos >= (c-2)) w.find('button.next').attr('disabled', true);
		else w.find('button.next').removeAttr('disabled');
		return false;
	});
}); //live-widget


$('a.callmeback').click(function() {
 	$('div.overlay#feedbackform').attr('active', true);
 	$('html').addClass('noscroll');
 	$('div.overlay#feedbackform').unbind('mousewheel DOMMouseScroll').bind('mousewheel DOMMouseScroll', function(event){
		return false;
	});

	return false;
});//$('a.callmeback').click

$('.message a.close').click(function() {
	$('html').removeClass('noscroll');
 	$(this).transition({rotate: '405deg'}, 500, 'ease', function() {
 		$(this).css({rotate: '45deg'});
 		$('div.overlay#feedbackform').removeAttr('active');	
 	});
	return false;
});//$('.message a.close').click

$('.tabs-sw[data-tabs-id] a[data-tab]').click(function() {
	var tabsId = $(this).parents('.tabs-sw[data-tabs-id]').attr('data-tabs-id');
	$('body').find('[data-tabs-id='+tabsId+']:not(.tabs-sw)').removeAttr('active');
	$('body').find('[data-tabs-id='+tabsId+'][data-tab='+$(this).attr('data-tab')+']').attr('active', true);
	$(this).parents('.tabs-sw[data-tabs-id]').find('a[data-tab]').removeAttr('active');
	$(this).attr('active', true);
	return false;
});//tabs-sw


// $('.gallery1 .controls button').click(function() {
// 	var p = $(this).parents('.gallery1').find('.imgcont');
// 	if($(this).is('.next') && (0 - parseInt(p.css('left'))/319) < p.children('a').length - 3) p.css({left: "-=319px"});
// 	if($(this).is('.prev') && parseInt(p.css('left')) < 0) p.css({left: "+=319px"});
// 	p.children('a').removeAttr('active');
// 	p.children('a').slice((0 - parseInt(p.css('left'))/319), (0 - parseInt(p.css('left'))/319)+3).attr('active', true);
// 	return false;
// });

$('.gallery1').each(function (i, gl) {
	var position = 0;
	var length = $(gl).find('.imgcont a').length;
	var images = $(gl).find('.imgcont a');

	gl.slide = function(p) {
		$(gl).find('.imgcont').transition({
			left: (0-(319*p))+'px'
		}, 200, function() {
			if(p < 3) {
				$(gl).find('.imgcont').css({
					left: (0-((length+p)*319))+'px'
				});
				p = length+p;
			}
			else if(p > length+2) {
				$(gl).find('.imgcont').css({
					left: (0-((p-length)*319))+'px'
				});
				p = p-length;
			}
			position = p;
			$(gl).find('.imgcont a').removeAttr('active');
			$(gl).find('.imgcont a').slice(p, p+3).attr('active', true);
		});
	};
	gl.slide(4);

	$($(gl).find('.imgcont a').get(-1)).clone().prependTo($(gl).find('.imgcont'));
	$($(gl).find('.imgcont a').get(-2)).clone().prependTo($(gl).find('.imgcont'));
	$($(gl).find('.imgcont a').get(-3)).clone().prependTo($(gl).find('.imgcont'));
	$($(gl).find('.imgcont a').get(-4)).clone().prependTo($(gl).find('.imgcont'));

	$($(gl).find('.imgcont a').get(4)).clone().appendTo($(gl).find('.imgcont'));
	$($(gl).find('.imgcont a').get(5)).clone().appendTo($(gl).find('.imgcont'));
	$($(gl).find('.imgcont a').get(6)).clone().appendTo($(gl).find('.imgcont'));
	$($(gl).find('.imgcont a').get(7)).clone().appendTo($(gl).find('.imgcont'));

	$(gl).find('.controls button').click(function() {
		if($(this).is('.next')) gl.slide(position+1);
		else if($(this).is('.prev')) gl.slide(position-1);
	});


	//lightbox
	var lightbox = $('<div class="lightbox overlay" />');
	lightbox.img = $('<div class="img"><img alt=""></div>');
	lightbox.preview =  $('<div class="preview" />');
	lightbox.controls =  $('<div class="controls"><a href="#" class="prev">&lt;</a><a href="#" class="close">+</a><a href="#" class="next">&gt;</a></div>');
	lightbox.loader = $('<div class="pending"><div class="sw"><div class="watch"></div><div class="sand"></div></div></div>');

	lightbox.position = 0;

	lightbox.img.append(lightbox.controls);
	lightbox.img.append(lightbox.loader);
	lightbox
		.append(lightbox.img)
		.append(lightbox.preview);


	images.each(function(i, a) {
		lightbox.preview.append('<a href="'+$(a).attr('href')+'"><img src="'+$(a).children('img').attr('src')+'" /></a>');
	}); 
	

	$(gl).find('.imgcont a').click(function() {
		$('body').append(lightbox);
		$('html').addClass('noscroll');
		lightbox.attr('active', true);
		lightbox.img.children('img').attr('src', $(this).attr('href'));
		lightbox.position = lightbox.preview.find('a[href="'+$(this).attr('href')+'"]').attr('active', true).siblings().removeAttr('active');
		lightbox.switch(lightbox.preview.find('a[active]').index());
		return false;
	});
	lightbox.click(function() {
		lightbox.removeAttr('active');
		$('html').removeClass('noscroll');
	});
	lightbox.switch = function(i) {
		if(i >= images.length) i = 0;
		else if(i < 0) i = images.length - 1;
		var a = images.get(i);
		lightbox.loader.css('opacity', 1);
		lightbox.img.children('img').attr('src', $(a).attr('href'));
			lightbox.img.children('img').one("load", function() {
	  			lightbox.loader.css('opacity', 0);
			}).each(function() {
				if(this.complete) $(this).load();
			});
		lightbox.preview.find('a[href="'+$(a).attr('href')+'"]').attr('active', true).siblings().removeAttr('active');
		gl.slide(i+4-1);
		lightbox.position = i;
	}
	lightbox.preview.children('a').unbind('click').click(function() {
		lightbox.switch($(this).index());
		return false;
	})
	lightbox.img.unbind('click').click(function() {
		lightbox.switch(lightbox.position+1);
		return false;
	});
	lightbox.controls.children('.prev').unbind('click').click(function() {
		lightbox.switch(lightbox.position-1);
		return false;
	});
	lightbox.controls.children('.close').unbind('click').click(function() {
		lightbox.removeAttr('active');
		$('html').removeClass('noscroll');
		return false;
	});
	lightbox.bind('mousewheel DOMMouseScroll', function(event){
		if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
			lightbox.switch(lightbox.position-1);
			return false;
		}
		else {
			lightbox.switch(lightbox.position+1);
			return false;
		}
	});

	//external lightbox shortcut
	if($(gl).is('[data-gal-id]')) {
		$('[data-gal-id="'+$(gl).attr('data-gal-id')+'"]').click(function() {
			$(gl).find('.imgcont a:eq(4)').trigger('click');
			return false
		});
	}
});

$('.scrolltop').click(function() {
	 $("html, body").animate({ scrollTop: 0 }, 500);
	return false;
});

if($('.bnqt-selection').length == 1) {
	var bsm = $('.bnqt-selection');
	var bsmShadow = $('.bnqt-selection').clone();
	bsmShadowCont = $('<div class="bsmShadowCont" />');
	bsmShadow.addClass('bsmShadow');
	$(bsmShadowCont).append(bsmShadow).appendTo('body');
	// bsmShadow.css({
	// 	position: 'fixed',
	// 	left: 0,
	// 	top: 0,

	// });
	$(window).scroll(function() {
		if(parseInt(bsm.offset().top) < $(window).scrollTop()) {
			bsmShadowCont.attr('active', true);
			var actHeader = null;
			bsmShadow.find('a[href^=#]').each(function(i, e) {
				if($( $(e).attr('href') ).offset().top <= $(window).scrollTop()+80) actHeader = $(e);
			});
			bsmShadow.find('a[href^=#]').removeAttr('active');
			if(actHeader != null) {
				actHeader.attr('active', true);
			}
		}
		else bsmShadowCont.removeAttr('active');
	});
}


