$(document).ready(function() {

	$.stellar();

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
				$("nav a[href=" + thishref + "]").addClass("selected");
			}
		});

		activePage = thishref;

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
			$(this).html('<img src="./img/collapse.png" alt="">');
			$(coverimg).attr('src', "./img/" + baseid + "title.png");
			$(coverimg).addClass("title-view");
			//show the gallery
			$(galleryid).slideDown(800, function() {
				$('html, body').animate({
					scrollTop: $(galleryid).offset().top - 200
				 });
			});

			$(this).addClass('expanded');
			$(this).removeClass('collapsed');
		} else {
			//hide the gallery
			$(this).html('<img src="./img/expand.png" alt="">');
			$(galleryid).slideUp();
			$(this).addClass('collapsed');
			$(this).removeClass('expanded');
			//return to cover view
			$(coverimg).attr('src', "./img/" + baseid + "cover.jpg");
			$(coverimg).removeClass("title-view");
			navigate("#photography-page");
		}

	});

});