$(document).ready(function() {

	var navItems = {
		"#home-page": 0,
		"#about-page": 1,
		"#work-page": 2,
		"#education-page": 3,
		"#projects-page": 4,
		"#photography-page": 5,
		"#contact": 6
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

	$('.nav-link').click(function() {

		var thishref = $(this).attr('href');

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
	});

	$("[id*=-page]").waypoint(function(direction) {
		$('nav a').removeClass("selected");
		activePage = "#" + $(this).attr('id');
		$("nav a[href=#" + $(this).attr('id') + "]").addClass("selected");
	});

	$("#contact").waypoint(function(event, direction) {
		$('nav a').removeClass("selected");
		activePage = "#contact";
		$("nav a[href=#contact]").addClass("selected");
	}, { offset: $(window).height() - parseInt($('#contact footer').css('height')) });

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
		var baseid = $(this).attr('id').substring(7);
		var galleryid = "#" + baseid + "-gallery";
		var coverimg = $("." + baseid + "-cover img");
		if ($(this).hasClass('collapsed')) {
			// $(galleryid).removeClass('hide');
			$(coverimg).attr('src', "./img/" + baseid + "title.png");
			$(galleryid).slideDown(function() {
				$('html, body').animate({
					scrollTop: $(galleryid).offset().top - 150
				 });
			});

			// });, 500, 'easeInOutExpo', function() {
			// 	$(galleryid).slideDown();
			// });
			$(this).removeClass('collapsed');
			$(this).html('–');
		} else {
			// $(galleryid).addClass('hide');
			$(galleryid).slideUp();
			$(this).addClass('collapsed');
			$(coverimg).attr('src', "./img/" + baseid + "cover.jpg");
			$(this).html('+');
		}

	});

});





/*

var NavBarView = Backbone.View.extend({

		template: _.template("<% _.each(items, function(item) { %> <a href='#<%= item.title.toLowerCase() %>-page'><%= item.title %></a><% }); %>"),

		//<% _.each(items, function(item) { %> <a href='#<%= item.title.toLowerCase() %>-page'><%= item.title %></a>});

		tagName: ".app-nav",

		events: {
			"click a": 		"navigate",
		},

		initialize: function() {
			console.log("initializing navbarview");
			console.log(this.$el);
			this.render();
		},

		navigate: function() {
			alert($(this).attr("href"));
		},

		render: function() {
			console.log("rendering navbar");
			this.$el.html(this.template({items: app.getNavItems()}));
			console.log(this.template({items: app.getNavItems()}));
			return this;
		}
	});

	var App = Backbone.Model.extend({

		initialize: function() {
			console.log("initializing app");
			//this.json = $.getJSON("../res/content.json");
			this.currentNav = null;
			this.json = {
				"NavTitles": [
					{"title": "ABOUT", "class": "first-item"},
					{"title": "WORK", "class": ""},
					{"title": "EDUCATION", "class": ""},
					{"title": "PROJECTS", "class": ""},
					{"title": "PHOTOGRAPHY", "class": ""},
					{"title": "CONTACT", "class": ""}
				]
			};
		},

		getJSON: function() {
			return this.json;
		},

		getNavItems: function() {
			return this.json.NavTitles;
		}
	});

	var AppView = Backbone.View.extend({
		el: $("#app"),

		initialize: function() {
			console.log("initializing appview");
			this.render();
		},

		render: function() {
			new NavBarView();
		}
	});

	$('nav a').click(function() {
		$('nav a').removeClass("selected");
		$(this).addClass("selected");
	});

	var app = new App;
	new AppView;
	Backbone.history.start();

*/