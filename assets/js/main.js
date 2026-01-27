var html = document.documentElement;
var body = document.body;
var timeout;
var st = 0;

cover();
featured();
pagination(false);
talksSlider();
copyToClipboard();
randomPostButton();

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

function copyToClipboard() {
    'use strict';
    var copyButtons = document.querySelectorAll('.share-link-copy');
    if (!copyButtons.length) return;

    copyButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var url = this.getAttribute('data-url');
            var textElement = this.querySelector('.copy-text');
            var originalText = textElement.textContent;

            // Try to copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(function() {
                    // Success feedback
                    button.classList.add('copied');
                    textElement.textContent = '¡Copiado!';

                    // Reset after 2 seconds
                    setTimeout(function() {
                        button.classList.remove('copied');
                        textElement.textContent = originalText;
                    }, 2000);
                }).catch(function() {
                    // Fallback if clipboard API fails
                    fallbackCopy(url, button, textElement, originalText);
                });
            } else {
                // Fallback for older browsers
                fallbackCopy(url, button, textElement, originalText);
            }
        });
    });

    function fallbackCopy(text, button, textElement, originalText) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            var successful = document.execCommand('copy');
            if (successful) {
                button.classList.add('copied');
                textElement.textContent = '¡Copiado!';

                setTimeout(function() {
                    button.classList.remove('copied');
                    textElement.textContent = originalText;
                }, 2000);
            }
        } catch (err) {
            console.error('Failed to copy:', err);
        }

        document.body.removeChild(textarea);
    }
}

function randomPostButton() {
    'use strict';
    var button = document.getElementById('randomPostButton');
    if (!button) return;

    button.addEventListener('click', function() {
        // Add loading state
        button.classList.add('loading');
        
        // Get the RSS feed to fetch all posts
        fetch('/rss/')
            .then(function(response) {
                return response.text();
            })
            .then(function(str) {
                // Parse RSS XML
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(str, 'text/xml');
                var items = xmlDoc.querySelectorAll('item');
                
                if (items.length === 0) {
                    console.error('No posts found');
                    button.classList.remove('loading');
                    return;
                }
                
                // Get current post URL to avoid redirecting to the same post
                var currentUrl = window.location.href;
                
                // Filter out current post and get all post URLs
                var postUrls = [];
                items.forEach(function(item) {
                    var link = item.querySelector('link').textContent;
                    if (link !== currentUrl) {
                        postUrls.push(link);
                    }
                });
                
                if (postUrls.length === 0) {
                    console.error('No other posts found');
                    button.classList.remove('loading');
                    return;
                }
                
                // Pick a random post
                var randomIndex = Math.floor(Math.random() * postUrls.length);
                var randomPostUrl = postUrls[randomIndex];
                
                // Navigate to the random post
                window.location.href = randomPostUrl;
            })
            .catch(function(error) {
                console.error('Error fetching posts:', error);
                button.classList.remove('loading');
            });
    });
}
