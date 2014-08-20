$(document).ready(function() {

	var navItems = {
		"#home-page": 0,
		"#about-page": 1,
		"#work-page": 2,
		"#education-page": 3,
		"#projects-page": 4,
		"#photography-page": 5
	};

	var navIds = [
		"#home-page",
		"#about-page",
		"#work-page",
		"#education-page",
		"#projects-page",
		"#photography-page"
	];

	var activePage = "#home-page";

	$('img.gallery-image').lazyload();

	// setTimeout(function() {
	// 	$('.splash').fadeOut(700, function() {
	// 		$('#app').fadeIn(700);
	// 	});
	// }, 2000);

	// $("#app").load(function() {
	// 	$('.splash').fadeOut('slow', function() {
	// 		$('#app').fadeIn(1000);
	// 	});
	// });

	$(window).scroll(function() {
		var offset = $(this).height() - 20;
		var duration = 1000;
		if ($(this).scrollTop() > offset) {
			$("#jump-top-wrapper").fadeIn(duration);
		} else {
			$("#jump-top-wrapper").fadeOut(duration);
		}
		if ($(this).scrollTop() > 0) {
			$(".scroll-prompt").fadeOut(duration);
		} else {
			$(".scroll-prompt").fadeIn(duration);
		}
	});

	function navigate(thishref) {
		$('html, body').animate({
			scrollTop: $(thishref).offset().top
		}, 650, 'easeInOutExpo', function() {
			// Workaround for when clicking up the page, waypoints aren't
			//registered, this indicating incorrect pnav item

			//If you're clicking up the page
			if (navItems[thishref] < navItems[activePage]) {
				$('nav a').removeClass("selected");
				console.log("removing selected from all nav");
				console.log("Adding selected to " + thishref)
				$("nav a[href=" + thishref + "]").addClass("selected");
			}
		});

		activePage = thishref;
		console.log("activePage is " + activePage);

		return false;
	}

	$('.nav-link').click(function() {
		var thishref = $(this).attr('href');
		return navigate(thishref);
	});

	$("[id*=-page]").waypoint(function(direction) {
		console.log("hit waypoint for " + $(this).attr('id'));
		$('nav a').removeClass("selected");
		activePage = "#" + $(this).attr('id');
		console.log("activePage is " + activePage);
		$("nav a[href=#" + $(this).attr('id') + "]").addClass("selected");
		return true;
	});

	// $("#contact").waypoint(function(event, direction) {
	// 	$('nav a').removeClass("selected");
	// 	activePage = "#contact";
	// 	$("nav a[href=#contact]").addClass("selected");
	// }, { offset: $(window).height() - parseInt($('#contact footer').css('height')) });

	function resizeBackground() {
		$("[id*=-page] .background-wrapper").css("min-height", $(window).height());
		$("#home-page, .splash").css("min-height", $(window).height());
	}

	resizeBackground();

	$(window).resize(resizeBackground);

	$('.home-title').click(function() {
		location.reload();
	});

	function makeTitleView(that, coverimg, baseid, callback) {
		//change the image to title view
		$(coverimg).attr('src', "./img/" + baseid + "title.png");
		$(coverimg).addClass("title-view");

		$(that).html('<img class="collapse-button" src="./img/collapse.png" alt="">');

		callback();
	}

	function makeGalleryView(that, coverimg, baseid, callback) {
		//change the image to cover view
		$(coverimg).attr('src', "./img/" + baseid + "cover.jpg");
		$(coverimg).removeClass("title-view");

		$(that).html('<img class="expand-button" src="./img/expand.png" alt="">');

		callback();
	}

	$('.button-overlay').click(function() {
		//get the data from the element
		var baseid = $(this).attr('id').substring(7);
		var galleryid = "#" + baseid + "-gallery";
		var coverimg = $("." + baseid + "-cover img");

		if ($(this).hasClass('collapsed')) {

			makeTitleView(this, coverimg, baseid, function() {
				//show the gallery
				$(galleryid).slideDown(800, function() {

					$('html, body').animate({
						scrollTop: $(galleryid).offset().top - 200
					});

					$(galleryid + " .collapse-button").show();
				});
			});

			$(this).addClass('expanded');
			$(this).removeClass('collapsed');

		} else {

			makeGalleryView(this, coverimg, baseid, function() {
				$(galleryid).slideUp();
			});

			$(this).addClass('collapsed');
			$(this).removeClass('expanded');

			navigate("#photography-page");
		}

	});

});