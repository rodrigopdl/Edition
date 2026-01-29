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
archiveLoadMore();
shuffleRelatedPosts();

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
        
        // Use Ghost Content API to get ALL posts
        var apiUrl = window.ghostConfig ? window.ghostConfig.apiUrl : '/ghost/api/content';
        var apiKey = window.ghostConfig ? window.ghostConfig.apiKey : '';
        
        // Fetch all posts using the Content API (limit=all gets everything)
        fetch(apiUrl + '/posts/?key=' + apiKey + '&limit=all&fields=url')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var posts = data.posts;
                
                if (!posts || posts.length === 0) {
                    console.error('No posts found');
                    button.classList.remove('loading');
                    return;
                }
                
                console.log('Total posts found:', posts.length);
                
                // Get current page pathname (normalized without trailing slash)
                var currentPath = window.location.pathname.replace(/\/$/, '');
                
                // Filter out current post by comparing normalized paths
                var otherPosts = posts.filter(function(post) {
                    // Extract pathname from post URL and normalize
                    var postPath = post.url.replace(/^https?:\/\/[^\/]+/, '').replace(/\/$/, '');
                    return postPath !== currentPath;
                });
                
                console.log('Posts after filtering current:', otherPosts.length);
                
                if (otherPosts.length === 0) {
                    // If we're on a non-post page or filtering failed, just use all posts
                    otherPosts = posts;
                }
                
                // Pick a random post from all available posts
                var randomIndex = Math.floor(Math.random() * otherPosts.length);
                var randomPost = otherPosts[randomIndex];
                
                console.log('Navigating to:', randomPost.url);
                
                // Navigate to the random post
                window.location.href = randomPost.url;
            })
            .catch(function(error) {
                console.error('Error fetching posts:', error);
                button.classList.remove('loading');
            });
    });
}

function archiveLoadMore() {
    'use strict';
    var button = document.getElementById('loadMoreButton');
    var grid = document.getElementById('archiveGrid');
    
    if (!button || !grid) return;
    
    var currentPage = parseInt(grid.getAttribute('data-page')) || 1;
    var perPage = parseInt(grid.getAttribute('data-per-page')) || 18;
    var loading = false;
    var hasMore = true;
    
    // Check on page load if there are more posts available
    function checkIfMorePostsExist() {
        var apiUrl = window.ghostConfig ? window.ghostConfig.apiUrl : '/ghost/api/content';
        var apiKey = window.ghostConfig ? window.ghostConfig.apiKey : '';
        
        // Get pagination info for the next page
        var url = apiUrl + '/posts/?key=' + apiKey + 
                  '&limit=' + perPage + 
                  '&page=' + (currentPage + 1) +
                  '&fields=id';
        
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (!data.posts || data.posts.length === 0) {
                    hasMore = false;
                    button.classList.add('hidden');
                }
            })
            .catch(function(error) {
                console.error('Error checking for more posts:', error);
            });
    }
    
    // Check immediately on page load
    checkIfMorePostsExist();
    
    button.addEventListener('click', function() {
        if (loading || !hasMore) return;
        
        loading = true;
        button.classList.add('loading');
        
        var nextPage = currentPage + 1;
        
        // Use Ghost Content API to get next batch of posts
        var apiUrl = window.ghostConfig ? window.ghostConfig.apiUrl : '/ghost/api/content';
        var apiKey = window.ghostConfig ? window.ghostConfig.apiKey : '';
        
        var url = apiUrl + '/posts/?key=' + apiKey + 
                  '&limit=' + perPage + 
                  '&page=' + nextPage +
                  '&include=tags' +
                  '&fields=id,title,url,feature_image,feature_image_alt';
        
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var posts = data.posts;
                var meta = data.meta;
                
                if (!posts || posts.length === 0) {
                    hasMore = false;
                    button.classList.add('hidden');
                    loading = false;
                    return;
                }
                
                // Add new posts to the grid
                posts.forEach(function(post) {
                    var card = createArchiveCard(post);
                    grid.appendChild(card);
                });
                
                // Update page number
                currentPage = nextPage;
                grid.setAttribute('data-page', currentPage);
                
                // Check if there are more pages
                if (meta && meta.pagination) {
                    hasMore = currentPage < meta.pagination.pages;
                    if (!hasMore) {
                        button.classList.add('hidden');
                    }
                } else {
                    // If no meta, assume no more posts
                    hasMore = false;
                    button.classList.add('hidden');
                }
                
                loading = false;
                button.classList.remove('loading');
            })
            .catch(function(error) {
                console.error('Error loading more posts:', error);
                loading = false;
                button.classList.remove('loading');
            });
    });
}

function createArchiveCard(post) {
    'use strict';
    
    // Create article element
    var article = document.createElement('article');
    article.className = 'archive-card';
    
    // Create link
    var link = document.createElement('a');
    link.href = post.url;
    link.className = 'archive-card-link';
    
    // Create image container
    var imageDiv = document.createElement('div');
    imageDiv.className = 'archive-card-image';
    
    // Create image inner container
    var imageInner = document.createElement('div');
    imageInner.className = 'archive-card-image-inner';
    
    // Create image if available
    if (post.feature_image) {
        var img = document.createElement('img');
        
        // Generate srcset for responsive images
        var baseUrl = post.feature_image;
        var smallUrl = baseUrl.replace(/\/content\/images\//, '/content/images/size/w400/');
        var mediumUrl = baseUrl.replace(/\/content\/images\//, '/content/images/size/w750/');
        
        img.srcset = smallUrl + ' 400w, ' + mediumUrl + ' 750w';
        img.sizes = '(min-width: 1200px) 360px, (min-width: 768px) 45vw, 90vw';
        img.src = mediumUrl;
        img.alt = post.feature_image_alt || post.title;
        img.loading = 'lazy';
        
        imageInner.appendChild(img);
    }
    
    imageDiv.appendChild(imageInner);
    
    // Create overlay with title
    var overlay = document.createElement('div');
    overlay.className = 'archive-card-overlay';
    
    var title = document.createElement('h3');
    title.className = 'archive-card-title';
    title.textContent = post.title;
    
    overlay.appendChild(title);
    imageDiv.appendChild(overlay);
    
    // Assemble the card
    link.appendChild(imageDiv);
    article.appendChild(link);
    
    return article;
}

function shuffleRelatedPosts() {
    'use strict';
    
    // Wait for DOM to be ready
    function initShuffle() {
        var grid = document.querySelector('.related-grid[data-shuffle="true"]');
        
        if (!grid) return;
        
        var cards = Array.from(grid.querySelectorAll('[data-related-post]'));
        
        if (cards.length === 0) return;
        
        // If there are 3 or fewer cards, show them all
        if (cards.length <= 3) {
            cards.forEach(function(card) {
                card.classList.add('show');
            });
            return;
        }
        
        // Fisher-Yates shuffle algorithm
        function shuffle(array) {
            var currentIndex = array.length;
            var temporaryValue, randomIndex;
            
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            
            return array;
        }
        
        // Shuffle the cards
        var shuffled = shuffle(cards);
        
        // Show only the first 3 shuffled cards by adding 'show' class
        for (var i = 0; i < Math.min(3, shuffled.length); i++) {
            shuffled[i].classList.add('show');
        }
    }
    
    // Run immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShuffle);
    } else {
        initShuffle();
    }
}
