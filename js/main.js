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

		$(imgcont).children('img:not(.sli'+position+')').css({opacity: 0.5});
		$(imgcont).children('img.sli'+position).css({opacity: 1});
		$($(sl).find('.pager a').get(0)).attr('active', true);
		
		function slide (pos) {
			var l = 0 - (pos*940);
			if(pos == -1) 					{position = images.length-1;}
			else if(pos == images.length) 	{position = 0;}
			else 							{position = pos;}
			if ($(sl).children('.pager').length != 0) {
				$(sl).find('.pager a').removeAttr('active');
				$($(sl).find('.pager a').get(position)).attr('active', true);
			}
			$(imgcont).children('img:not(.sli'+position+')').transition({opacity: 0.5}, 500);
			$(imgcont).children('img.sli'+position).transition({opacity: 1}, 500);
			$(imgcont).transition({left: l+'px'}, 500, function() {
				if(pos == -1) {$(imgcont).css({left: '-'+((images.length-1)*940)+'px'});}
				else if(pos == images.length) {$(imgcont).css({left: '0px'});}
			});
		}
		$(this).find('a.sl.prev').click(function () {
			slide(position-1);
			return false;
		});
		$(this).find('a.sl.next').click(function () {
			slide(position+1);
			return false;
		});

});//$('.slider1').each
