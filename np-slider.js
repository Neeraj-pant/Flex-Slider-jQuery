(function($){
	'use strict';
	$.fn.npSlider = function( options ){
		var defaults = {
			autoplay: true,
			play_duration: 3000,
			single: false,
			slide_space: 0,
			slide_time: 300,
			next_slide_space: 0,
			slider_height: null,
			full_width: true,
			parent_width: true,
			grid_space: 10,
			slider_type: 1,
			slingle_slide_on_phone: true
		};

		var setting = $.extend({}, defaults, options);


		// set Slides apperance
		if(setting.slingle_slide_on_phone){
			if($(window).innerWidth() < 768){
				st_slides_apperance(this);
			}
		}


		// Add Active class to first slide and last-slide to last slide
		this.find("li:first-child").addClass("active");
		this.find("li:last-child").addClass("last-slide");


		// Initialize slider and functionality
		init_slider(this);
		
		var instance = this;
		$(window).resize(function(){
			//init_slider(instance);

			// Equal size of all images in slides
			var all_image = instance.find (".bigger").find ("img");
			all_image.height ('auto');
		});

		// Equal size of all images in slides
		if (setting.slider_type >= 5) {
			var grid_image = this.find ("li:first-child").find (".bigger img").innerHeight () / 2;
			this.find (".sm-img").height (grid_image - setting.grid_space );
			this.find (".sm-img").parent().height (grid_image - setting.grid_space / 2);
		}
		if(!setting.single){
			if($(window).width() <= 768 && setting.slider_type < 5){
				var max_ul_height = get_min_hiehgt_image(this);
				this.css('height', max_ul_height);
			}else{
				var grid_image = this.find ("li:first-child").find (".bigger img").innerHeight ();
				this.find (".bigger").find ("img").height (grid_image);
			}
		}




		function init_slider($this) {
			// Assigning var with first all slides and window width

			var device_width = $(window).innerWidth();

			if(setting.parent_width){
				device_width = $this.closest("#np-slider-wrapper").parent().width();
			}

			if(setting.slider_type != 5){
				setting.slide_space = 0;
			}

			var slides = $this.children('li');
			var element_width = 0;
			var element_height = 0;
			var single_width = 0;
			var slide_width = device_width - setting.next_slide_space - setting.slide_space;
			var small_images = $this.find(".sm-img");

			// init height to slides
			$this.parent ().width (device_width);
			// Take action while single slider is set
			if (setting.single) {
				$this.height ($this.find ("li.active").find ("img").height ());
			}
			else {
				$this.height ($this.find ("li.active").find (".bigger").find ("img").height ());
			}
			if (setting.slider_height != null) {
				$this.height (setting.slider_height);
			}



			var i = 0;
			var j       = 1;
			var padding = 0;



			// Set padding or Space while in grid
			if(setting.slider_type == 2){
				small_images.each (function () {
					$(this).closest(".bigger").css('padding', 0);
					if( j % 2 == 0){
						padding = '0 0 0 ' + setting.grid_space / 2 + 'px';
						$ (this).css ('padding', padding);
					}else{
						padding = '0 ' + setting.grid_space / 2 + 'px 0 0';
						$ (this).css ('padding', padding);
					}
					j++;
				});
			}
			else if(setting.slider_type == 3){
				small_images.each (function () {
					$(this).closest(".bigger").css('padding', 0);
					if( j % 3 == 0){
						padding = 0;
						$ (this).css ('padding', padding);
					}else{
						padding = '0 ' + setting.grid_space / 2 + 'px 0 0';
						$ (this).css ('padding', padding);
					}
					j++;
				});
			}
			else if(setting.slider_type == 4){
				small_images.each (function () {
					$(this).closest(".bigger").css('padding', 0);
					if( j % 4 == 0){
						padding = 0;
						$ (this).css ('padding', padding);
					}else{
						padding = '0 ' + setting.grid_space / 2 + 'px 0 0';
						$ (this).css ('padding', padding);
					}
					j++;
				});
			}

			if (setting.slider_type >= 5) {
				$(".np-slide").find("div[class^=np-grid-]").css('padding', 0);
				small_images.each (function () {
					switch (j) {
						case 1:
							padding = '0 ' + setting.grid_space / 2 + 'px ' + setting.grid_space / 2 + 'px ' + setting.grid_space + 'px';
							if(setting.slider_type == 6){
								padding = '0 ' + setting.grid_space / 2 + 'px ' + setting.grid_space / 2 + 'px 0';
							}
							if(setting.slider_type == 7){
								padding = '0 ' + setting.grid_space + 'px ' + setting.grid_space / 2 + 'px 0';
							}
							$ (this).css ('padding', padding);
							break;
						case 2:
							padding = '0 ' + setting.grid_space / 2 + 'px ' + setting.grid_space / 2 + 'px ' + setting.grid_space / 2 + 'px';
							if(setting.slider_type == 6){
								padding = '0 ' + setting.grid_space + 'px ' + setting.grid_space / 2 + 'px ' + setting.grid_space / 2 + 'px';
							}
							if(setting.slider_type == 7){
								padding = setting.grid_space / 2 + 'px ' + setting.grid_space + 'px 0 0';
							}
							$ (this).css ('padding', padding);
							break;
						case 3:
							padding = setting.grid_space / 2 + 'px ' + setting.grid_space / 2 + 'px ' + '0 ' + setting.grid_space + 'px';
							if(setting.slider_type == 6){
								padding = setting.grid_space / 2 + 'px ' + setting.grid_space / 2 + 'px ' + '0 ' + setting.grid_space / 2 + 'px';
							}
							if(setting.slider_type == 7){
								padding = '0 0 ' + setting.grid_space / 2 + 'px ' + setting.grid_space + 'px';
							}
							$ (this).css ('padding', padding);
							break;
						case 4:
							padding = setting.grid_space / 2 + 'px ' + ' 0 0 ' + setting.grid_space / 2 + 'px ';
							if(setting.slider_type == 6){
								padding = setting.grid_space / 2 + 'px ' + setting.grid_space + 'px ' + ' 0 ' + setting.grid_space / 2 + 'px ';
							}
							if(setting.slider_type == 7){
								padding = setting.grid_space / 2 + 'px 0 0 ' + setting.grid_space + 'px ';
							}	
							$ (this).css ('padding', padding);
							j = 0;
							break;
					}
					j++;
				});
			}


			// Align Slides in one row
			slides.each (function (index) {
				if (!setting.single) {
					small_images.innerHeight (grid_image);
				}

				if(setting.slider_height){
					slides.height (setting.slider_height);
				}
				slides.width (slide_width);

				element_width += slide_width;
				single_width = element_width - slides.width ();
				if (index == 0) {
					$ (this).css ('left', 0);
					$ (this).attr ('data-left', 0);
				}
				else {
					single_width += (setting.slide_space * i);
					$ (this).css ('left', single_width);
					$ (this).attr ('data-left', single_width);
				}
				i++;
			});



			// Make responsive single slide mode
			var active_img_height = $this.find ("li.active").find ("img").height ();
			if (setting.single && $this.height () >= active_img_height) {
				$this.height (active_img_height);
			}


			// Position slide Arrow
			if (setting.slider_height != null) {
				$this.height (setting.slider_height);
				element_height = setting.slider_height;
			}
			else {
				element_height = $this.height();
			}

			var arrow_top = element_height / 2;
			$ (".np-controlls").css ('top', arrow_top);

		}


		var slider_interval = applySliderInterval();

		// Slider Arrow Click Event
		$(".np-right").click(function(e){
			$(this).prop('disabled', 'true');
			clearInterval(slider_interval);
			moveNpSlideRight(setting.slide_space , setting.slide_time);
			slider_interval = applySliderInterval();
		});

		$(".np-left").click(function(e){
			$(this).prop('disabled', 'true');
			clearInterval(slider_interval);
			moveNpSlideLeft(setting.slide_space, setting.slide_time);
			slider_interval = applySliderInterval();
		});


		function applySliderInterval() {
			if (setting.autoplay) {
				return setInterval(function () {
					moveNpSlideRight(setting.slide_space, setting.slide_time);
				}, setting.play_duration);
			}
		}



		// Slide Moving Functions
		function moveNpSlideRight(slide_space, slide_time){
			var element_left = $(".np-slide").width() + slide_space;

			$( ".np-slide" ).each(function( index ) {
				var current_left = $(this).attr('data-left');
				current_left = parseInt(current_left);
				element_left = parseInt(element_left);
				var left = current_left - element_left;

				$(this).attr('data-left', left);
				$(this).animate({
					'left': left
				}, slide_time, function(){

					if(index == $( ".np-slide" ).length - 1){

						// Assign values to Slides elements
						var last = $(".last-slide").attr('data-left');
						last = parseInt(last);
						var last_left = last + element_left;

						$(".active").css('left', last_left);
						last_left = parseInt(last_left);
						if(isNaN(last_left)){
							last_left = 0;
						}
						$(".active").attr('data-left', last_left);
						var next_active = $(".active").next('.np-slide');
						$(".last-slide").removeClass('last-slide');
						$(".active").addClass('last-slide');
						$(".active").removeClass('active');

						if( next_active.length ){
							next_active.addClass('active');
						}
						else{
							$('.np-slide:first-child').addClass('active');
						}

						$(".np-right").prop('disabled', false);
					}
				});
			});
		}


		function moveNpSlideLeft(slide_space, slide_time){
			var element_left = $(".np-slide").width();
			var max_width = element_left * ( $(".np-slide").length - 1);
			var max_width_neg = '-'+max_width;

			if($(".np-slide:first-child").hasClass('active')){
				$(".last-slide").attr('data-left', - slide_space - element_left);
				$(".last-slide").css('left', - slide_space - element_left);
			}

			if($(".active").next(".np-slide").length){
				var next_slide = parseInt('-' + $(".active").next(".np-slide").attr('data-left'));
			}
			else{
				var next_slide = parseInt('-' + $(".np-slide:first-child").attr('data-left'));
			}
			// next_slide += next_slide;
			$(".active").prev('.np-slide').attr('data-left', next_slide);
			$(".active").prev('.np-slide').css('left', next_slide);

			$( ".np-slide" ).each(function( index ) {
				var current_left = $(this).attr('data-left');
				current_left = parseInt(current_left);
				element_left = parseInt(element_left);
				var left = current_left + element_left;
				$(this).animate({
					'left': left + slide_space,
				}, slide_time, function(){
					if(index == $( ".np-slide" ).length - 1){
						$(".active").removeClass("active")
						if( $(".last-slide").prev(".np-slide").length ){
							var last = $(".last-slide").prev(".np-slide");
						}
						else{
							var last = $( ".np-slide:last-child" );
						}
						$(".last-slide").addClass("active");
						$(".last-slide").removeClass("last-slide");
						last.addClass("last-slide");

						$(".np-left").prop('disabled', false);

					}
				});
				var slide_total_left = left + slide_space;
				if(isNaN(slide_total_left)){
					slide_total_left = 0;
				}
				$(this).attr('data-left', slide_total_left);
			});
		}


		function st_slides_apperance($this)
		{
			var i, slide, parent_li, new_slide;
			var grid_class = "np-grid-3";

			if(setting.slider_type == 2){
				grid_class = 'np-grid-6';
			}
			else if(setting.slider_type == 3){
				grid_class = 'np-grid-4';
			}

			if(!setting.single){
				$this.find("li").each(function(){
					i = 0;
					parent_li = $(this);
					if(setting.slider_type >= 5){
						var slide_images = $(this).find("img");
						$(slide_images.get().reverse()).each(function(){
							var li = document.createElement('li');
							li.className  = 'np-slide';
							new_slide = "<div class='np-row'><div class='"+grid_class+" bigger'>";
							new_slide +=  $(this).parent().html();
							new_slide += "</div></div>";
							li.insertAdjacentHTML( 'beforeend', new_slide);
							parent_li.after(li);
						});
						parent_li.remove();
					}
					$(this).find(".np-row .bigger").each(function(){
						i++;
						if(i != 1){
							var li = document.createElement('li');
							li.className  = 'np-slide';
							new_slide = "<div class='np-row'><div class='"+grid_class+" bigger'>";
							new_slide +=  $(this).html();
							new_slide += "</div></div>";
							li.insertAdjacentHTML( 'beforeend', new_slide);
							parent_li.after(li);
							$(this).remove();
						}
					});
				});
				$("div[class^=np-grid-]").css('width', "100%");
				$("div[class^=np-grid-] img").css('height', "auto");
			}
		}



		function get_min_hiehgt_image($this){
			var img_height = 0;
			var max_height = 0;
			$this.each(function(){
				$(this).find(".np-row .bigger").each(function(){
					img_height = $(this).find('img').height();
					if(img_height <= max_height || max_height == 0){
						max_height = img_height;
					}
				});
			});
			return max_height;
		}

	};

}(jQuery));
