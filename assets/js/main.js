var html = document.documentElement;
var body = document.body;
var timeout;
var st = 0;

cover();
featured();
pagination(false);
talksSlider();

window.addEventListener('scroll', function () {
    'use strict';
    if (body.classList.contains('home-template') && body.classList.contains('with-full-cover') && !document.querySelector('.cover').classList.contains('half')) {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(portalButton);
    }
});

if (document.querySelector('.cover') && document.querySelector('.cover').classList.contains('half')) {
    body.classList.add('portal-visible');
}

function portalButton() {
    'use strict';
    st = window.scrollY;

    if (st > 300) {
        body.classList.add('portal-visible');
    } else {
        body.classList.remove('portal-visible');
    }
}

function cover() {
    'use strict';
    var cover = document.querySelector('.cover');
    if (!cover) return;

    imagesLoaded(cover, function () {
        cover.classList.remove('image-loading');
    });

    document.querySelector('.cover-arrow').addEventListener('click', function () {
        var element = cover.nextElementSibling;
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
}

function featured() {
    'use strict';
    var feed = document.querySelector('.featured-feed');
    if (!feed) return;

    tns({
        container: feed,
        controlsText: [
            '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M20.547 22.107L14.44 16l6.107-6.12L18.667 8l-8 8 8 8 1.88-1.893z"></path></svg>',
            '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M11.453 22.107L17.56 16l-6.107-6.12L13.333 8l8 8-8 8-1.88-1.893z"></path></svg>',
        ],
        gutter: 30,
        loop: false,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    });
}

function talksSlider() {
    'use strict';
    var slider = document.querySelector('.talks-testimonial-slider');
    if (!slider) return;
    
    var quotes = slider.querySelectorAll('.talks-quote');
    var dots = slider.querySelectorAll('.slider-dot');
    var prevArrow = slider.querySelector('.slider-arrow-prev');
    var nextArrow = slider.querySelector('.slider-arrow-next');
    var currentSlide = 0;
    
    function showSlide(index) {
        // Remove active class from all quotes and dots
        quotes.forEach(function(quote) {
            quote.classList.remove('active');
        });
        dots.forEach(function(dot) {
            dot.classList.remove('active');
        });
        
        // Add active class to current slide and dot
        quotes[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        var next = (currentSlide + 1) % quotes.length;
        showSlide(next);
    }
    
    function prevSlide() {
        var prev = (currentSlide - 1 + quotes.length) % quotes.length;
        showSlide(prev);
    }
    
    // Arrow click handlers
    if (prevArrow) {
        prevArrow.addEventListener('click', prevSlide);
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', nextSlide);
    }
    
    // Dot click handlers
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Keyboard navigation
    slider.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}
