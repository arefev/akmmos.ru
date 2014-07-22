// MAIN JavaScript

$(function(){
	$(".b-furniture__link").click(function(){
		var top = $(".b-index-section_catalog").offset().top - 92;
		$("body, html").animate({ scrollTop: top }, 500);
		return false;
	});
	
	// MENU
	$(".b-top-menu__item > a").click(function(){
		var item = $(this).closest(".b-top-menu__item");
		if(item.find(".b-menu-sub").length)
		{
			item.find(".b-menu-sub").show();
			return false;
		}
	});
	
	$(window).click(function(e){
		if (!$(e.target).closest(".b-menu-sub").length && !$(e.target).is(".b-menu-sub"))
		{
			$(".b-menu-sub").hide();
		}
	});
	
	// CAROUSEL
	$('#carouselPopular .b-carousel-in').carouFredSel({
		responsive: true,
		auto: true,
		scroll: {
			timeoutDuration: 5000,
			items: 1
		},
		items: {
			width:300,
			visible: {
				min: 1,
				max: 3
			}
		},
		prev: "#carouselPopular .b-carousel__prev",
		next: "#carouselPopular .b-carousel__next",
		pagination  : "#carouselPopular .b-carousel__nav"
	});
	
	$('#carouselQuestions .b-carousel-in').carouFredSel({
		responsive: true,
		auto: false,
		scroll: 1,
		items: {
			width:330,
			visible: {
				min: 1,
				max: 3
			}
		},
		prev: "#carouselQuestions .b-carousel__prev",
		next: "#carouselQuestions .b-carousel__next"
	});
	
	$('#carouselShow .b-carousel-show-in').carouFredSel({
		responsive: true,
		auto: true,
		scroll: {
			timeoutDuration: 5000,
            duration: 1500,
			items: 1
		},
		items: {
			width: $('.b-main').width(),
			height:'50%',
			visible: 1
		},
		prev: "#carouselShow .b-carousel-show__prev",
		next: "#carouselShow .b-carousel-show__next",
		pagination: "#carouselShow .b-carousel-show__nav"
	});

    $('#carouselFactory .b-carousel-show-in').carouFredSel({
        responsive: true,
        auto: true,
        scroll: {
            timeoutDuration: 5000,
            duration: 1500,
            items: 1
        },
        items: {
            width: $('.b-main').width(),
            height:'50%',
            visible: 1
        },
        prev: "#carouselFactory .b-carousel-show__prev",
        next: "#carouselFactory .b-carousel-show__next",
        pagination: "#carouselFactory .b-carousel-show__nav"
    });
	
	$(".b-popup__close, #windowFill").click(function(){
		hidePopup($(this).closest(".b-popup"));
	});
	
	resizeIndexSections();
	
	// MAP
	ymaps.ready(initMap);
    var yandexMap,
        yandexPlacemark;

    function initMap(){     
        yandexMap = new ymaps.Map ("yandexMap", {
            center: [55.820165,37.781197],
            zoom: 15,
			controls: ["zoomControl"]
        });
		yandexMap.behaviors.disable("scrollZoom");

        yandexPlacemark = new ymaps.Placemark([55.820165,37.781197], { 
            hintContent: 'Москва, Иркутская 11 к.14', 
            balloonContent: 'АЛЕКСАНДРИЯ Корпусная Мебель' 
        });

        yandexMap.geoObjects.add(yandexPlacemark);
    }
	
	$(".b-map").on("click", ".b-map-show", function(){
		var headerHeight = $(".b-header_fixed").height();
		var height = $(window).height() - headerHeight;
		var scrollTop = $(".b-map").offset().top - headerHeight;
		var animateTime = 500;
		var changeText = $(this).attr("data-change-text");
		var currentText = $(this).text();
		
		$(this)
			.text(changeText)
			.attr("data-change-text", currentText)
			.removeClass("b-map-show")
			.addClass("b-map-hide");
		
		$(".b-map__hover, .b-map__title").hide();
		
		$("body, html").animate({ scrollTop: scrollTop }, animateTime);
		$(".b-map-in").height(height);
		$(".b-map").animate({ height: height }, animateTime);
		
		yandexMap.container.fitToViewport();
		return false;
	});
	
	$(".b-map").on("click", '.b-map-hide', function(e){
		
		var height = 450;
		var scrollTop = $(".b-map").offset().top;
		var changeText = $(this).attr("data-change-text");
		var currentText = $(this).text();
		
		$(this)
			.text(changeText)
			.attr("data-change-text", currentText)
			.removeClass("b-map-hide")
			.addClass("b-map-show");
			
		$(".b-map__hover, .b-map__title").show();
		
		$(".b-map, .b-map-in").height(height);
		
		yandexMap.container.fitToViewport();
		return false;
	});
	
});

$(window).resize(function(){
	centerPopup($(".b-popup"));
	
	resizeIndexSections();
});

$(window).scroll(function() {
	// ANIMATATE
	var windowHeight = $(window).height();
	var topOfWindow = $(window).scrollTop() + windowHeight;
    $('.g-animated').each(function(){
        var imagePos = $(this).offset().top;
		var animateName = $(this).data("animate-name");
 
		if (imagePos < topOfWindow) {
			$(this).addClass(animateName);
		}
	});

    // FIXED HEADER
    var furnitureLinkTop = $(".b-furniture .b-furniture__link").offset().top,
        furnitureHeight = $(".b-furniture .b-furniture__link").height(),
        mustScrollTop = furnitureLinkTop + furnitureHeight,
        scrollTop = $(window).scrollTop(),
        headerHeight = $(".b-header").height(),
        windowWidth = $(window).width();

    if (scrollTop > mustScrollTop && !$(".b-header").is(".b-header_fixed") && windowWidth > 400)
    {
        $(".b-header").addClass("b-header_fixed");

        var fixedHeaderHeight = $(".b-header").height();
        $(".b-header").css("top", -fixedHeaderHeight);
        $(".b-header").animate({
            top: 0
        }, 300);

        if (!$(".b-header-height-fix").is(":visible"))
            $(".b-header-height-fix").height(headerHeight).show();
    }
    else if (scrollTop <= mustScrollTop || windowWidth <= 400)
    {
        $(".b-header").removeClass("b-header_fixed");
        $(".b-header-height-fix").hide();
    }
});

function showPopup(element)
{
	element.show();
	$("#windowFill").show();
	
	if (element.is("#videoPopup"))
	{
		$("#videoPopup .b-video-play").html('<iframe width="100%" src="http://www.youtube.com/embed/kZVLEQDQWdY?&autoplay=1" frameborder="0" allowfullscreen></iframe>');
	}
	
	centerPopup(element);
}

function hidePopup(element)
{
	if (!element.length)
	{
		element = $(".b-popup:visible");
	}
	element.hide();
	$("#windowFill").hide();
	
	if (element.is("#videoPopup"))
	{
		$("#videoPopup iframe").remove();
	}
}

function centerPopup(element)
{
	var elWidth = element.width();
	var elHeight = element.height();
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var scrollTop = $(window).scrollTop();
	var left = windowWidth/2 - elWidth/2;
	var top = windowHeight/2 - elHeight/2 + scrollTop;
	
	if (left < 0) left = 0;
	if (top < 0) top = 0;
	
	element.css({
		left:left,
		top:top
	});
}

function resizeIndexSections()
{
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	
	if (windowHeight > 840 && windowWidth > 980)
	{
		$(".b-index-section_furniture").height(windowHeight - 22);
	}
	else
	{
		$(".b-index-section_furniture").removeAttr("style");
	}
}