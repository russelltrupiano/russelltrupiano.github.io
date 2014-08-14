$(document).ready(function() {

	var navItems = {
		"#home-page": 0,
		"#about-page": 1,
		"#work-page": 2,
		"#education-page": 3,
		"#projects-page": 4,
		"#photography-page": 5,
		// "#contact": 6
	};

	var activePage = "#home-page";

	$(window).scroll(function() {
		var offset = $(this).height() - 20;
		var duration = 1000;
		if ($(this).scrollTop() > offset) {
			$("#jump-top-wrapper").fadeIn(duration);
		} else {
			$("#jump-top-wrapper").fadeOut(duration/3);
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
				activePage = thishref;
				$("nav a[href=" + thishref + "]").addClass("selected");
			}
		});

		return false;
	}

	$('.nav-link').click(function() {
		var thishref = $(this).attr('href');
		return navigate(thishref);
	});

	$("[id*=-page]").waypoint(function(direction) {
		$('nav a').removeClass("selected");
		activePage = "#" + $(this).attr('id');
		$("nav a[href=#" + $(this).attr('id') + "]").addClass("selected");
	});

	// $("#contact").waypoint(function(event, direction) {
	// 	$('nav a').removeClass("selected");
	// 	activePage = "#contact";
	// 	$("nav a[href=#contact]").addClass("selected");
	// }, { offset: $(window).height() - parseInt($('#contact footer').css('height')) });

	function resizeBackground() {
		$("[id*=-page] .background-wrapper").css("min-height", $(window).height());
		$("#home-page").css("min-height", $(window).height());
	}

	resizeBackground();

	$(window).resize(resizeBackground);

	$('.home-title a').click(function() {
		location.reload();
	});

	$('.expand-overlay').click(function() {
		//get the data from the element
		var baseid = $(this).attr('id').substring(7);
		var galleryid = "#" + baseid + "-gallery";
		var coverimg = $("." + baseid + "-cover img");

		if ($(this).hasClass('collapsed')) {
			//change the image to title view
			$(coverimg).attr('src', "./img/" + baseid + "title.png");
			$(coverimg).addClass("title-view");
			//show the gallery
			$(galleryid).slideDown(function() {
				$('html, body').animate({
					scrollTop: $(galleryid).offset().top - 150
				 });
			});

			$(this).removeClass('collapsed');
			$(this).html('–');
		} else {
			//hide the gallery
			$(galleryid).slideUp();
			$(this).addClass('collapsed');
			//return to cover view
			$(coverimg).attr('src', "./img/" + baseid + "cover.jpg");
			$(coverimg).removeClass("title-view");
			$(this).html('+');
			navigate("#photography-page");
		}

	});

});