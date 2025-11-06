/**
 * Custom Search Functionality
 * Uses Ghost Content API and Fuse.js for powerful fuzzy searching
 */

(function() {
    'use strict';

    // Configuration
    const POSTS_LIMIT = 'all';
    const MIN_SEARCH_LENGTH = 2;
    
    // Cache
    let allPosts = [];
    let fuse = null;
    let isLoading = false;
    let isInitialized = false;

    // DOM Elements
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchLoading = document.getElementById('search-loading');
    const searchEmpty = document.getElementById('search-empty');
    const searchInitial = document.getElementById('search-initial');
    const searchClose = document.getElementById('search-close');
    const searchOverlay = document.getElementById('search-modal-overlay');
    const searchTriggers = document.querySelectorAll('.search-trigger');

    // Initialize search
    function init() {
        if (!searchModal) return;

        // Attach event listeners
        searchTriggers.forEach(trigger => {
            trigger.addEventListener('click', openModal);
        });

        searchClose.addEventListener('click', closeModal);
        searchOverlay.addEventListener('click', closeModal);
        searchInput.addEventListener('input', handleSearch);

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboard);
    }

    // Open modal
    function openModal(e) {
        if (e) e.preventDefault();
        
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus input
        setTimeout(() => {
            searchInput.focus();
        }, 100);

        // Load posts if not loaded yet
        if (!isInitialized && !isLoading) {
            loadPosts();
        }
    }

    // Close modal
    function closeModal() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        showInitialState();
    }

    // Handle keyboard shortcuts
    function handleKeyboard(e) {
        // ESC to close
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeModal();
        }
        
        // CMD/CTRL + K to open
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (!searchModal.classList.contains('active')) {
                openModal();
            }
        }
    }

    // Load all posts from Ghost Content API
    async function loadPosts() {
        isLoading = true;
        showLoadingState();

        try {
            // Get Ghost API configuration from window.ghostConfig
            if (!window.ghostConfig || !window.ghostConfig.apiKey || window.ghostConfig.apiKey === 'YOUR_CONTENT_API_KEY') {
                console.error('Ghost Content API key not configured');
                showError('Búsqueda no configurada. Por favor, configura tu Content API key en default.hbs');
                isLoading = false;
                return;
            }

            const apiUrl = window.ghostConfig.apiUrl;
            const key = window.ghostConfig.apiKey;

            const url = `${apiUrl}/posts/?key=${key}&limit=${POSTS_LIMIT}&fields=id,title,slug,excerpt,published_at,feature_image,custom_excerpt,html&include=tags`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            allPosts = data.posts || [];

            // Process posts for better searching
            allPosts = allPosts.map(post => ({
                ...post,
                // Strip HTML tags from content for better search
                plainContent: stripHTML(post.html || ''),
                // Use custom excerpt if available, otherwise use excerpt
                searchableExcerpt: post.custom_excerpt || post.excerpt || '',
                // Get tag names
                tagNames: post.tags ? post.tags.map(tag => tag.name).join(' ') : ''
            }));

            // Initialize Fuse.js
            initializeFuse();
            isInitialized = true;
            showInitialState();

        } catch (error) {
            console.error('Error loading posts:', error);
            showError('Error al cargar los posts. Verifica tu Content API key.');
        } finally {
            isLoading = false;
        }
    }

    // Initialize Fuse.js for fuzzy searching
    function initializeFuse() {
        // Fuse.js configuration
        const fuseOptions = {
            keys: [
                { name: 'title', weight: 3 },
                { name: 'searchableExcerpt', weight: 2 },
                { name: 'plainContent', weight: 1.5 },
                { name: 'tagNames', weight: 2 }
            ],
            threshold: 0.4,
            includeScore: true,
            includeMatches: true,
            minMatchCharLength: 2,
            ignoreLocation: true,
            useExtendedSearch: false
        };

        fuse = new Fuse(allPosts, fuseOptions);
    }

    // Handle search input
    function handleSearch(e) {
        const query = e.target.value.trim();

        if (query.length === 0) {
            showInitialState();
            return;
        }

        if (query.length < MIN_SEARCH_LENGTH) {
            return;
        }

        performSearch(query);
    }

    // Perform search
    function performSearch(query) {
        if (!fuse) {
            showError('El buscador aún está cargando...');
            return;
        }

        const results = fuse.search(query);

        if (results.length === 0) {
            showEmptyState();
        } else {
            displayResults(results, query);
        }
    }

    // Display search results
    function displayResults(results, query) {
        hideAllStates();
        
        searchResults.innerHTML = results.slice(0, 20).map(result => {
            const post = result.item;
            const matches = result.matches || [];
            
            // Get highlighted excerpt
            let excerpt = getHighlightedExcerpt(post, matches, query);
            
            // Format date
            const date = new Date(post.published_at);
            const formattedDate = formatDate(date);
            
            // Get matched tags
            const matchedTags = getMatchedTags(post, matches);
            
            return `
                <a href="/${post.slug}/" class="search-result-item">
                    <div class="search-result-header">
                        <h3 class="search-result-title">${highlightText(post.title, query)}</h3>
                        <span class="search-result-date">${formattedDate}</span>
                    </div>
                    ${excerpt ? `<p class="search-result-excerpt">${excerpt}</p>` : ''}
                    ${matchedTags.length > 0 ? `
                        <div class="search-result-tags">
                            ${matchedTags.map(tag => `<span class="search-result-tag ${tag.matched ? 'matched' : ''}">${tag.name}</span>`).join('')}
                        </div>
                    ` : ''}
                </a>
            `;
        }).join('');

        searchResults.style.display = 'flex';
    }

    // Get highlighted excerpt based on matches
    function getHighlightedExcerpt(post, matches, query) {
        // Prioritize content matches
        const contentMatch = matches.find(m => m.key === 'plainContent');
        
        if (contentMatch && contentMatch.value) {
            // Find the best matching section
            const content = contentMatch.value;
            const queryLower = query.toLowerCase();
            const index = content.toLowerCase().indexOf(queryLower);
            
            if (index !== -1) {
                const start = Math.max(0, index - 60);
                const end = Math.min(content.length, index + query.length + 80);
                let excerpt = content.substring(start, end);
                
                if (start > 0) excerpt = '...' + excerpt;
                if (end < content.length) excerpt = excerpt + '...';
                
                return highlightText(excerpt, query);
            }
        }
        
        // Fallback to excerpt
        const excerpt = post.searchableExcerpt || post.plainContent.substring(0, 150);
        return highlightText(excerpt, query);
    }

    // Get matched tags
    function getMatchedTags(post, matches) {
        if (!post.tags || post.tags.length === 0) return [];
        
        const tagMatch = matches.find(m => m.key === 'tagNames');
        const matchedTagNames = tagMatch ? tagMatch.value.toLowerCase().split(' ') : [];
        
        return post.tags.slice(0, 3).map(tag => ({
            name: tag.name,
            matched: matchedTagNames.includes(tag.name.toLowerCase())
        }));
    }

    // Highlight matching text
    function highlightText(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Strip HTML tags
    function stripHTML(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    // Escape regex special characters
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Format date
    function formatDate(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
        if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
        
        return date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // UI State Management
    function showLoadingState() {
        hideAllStates();
        searchLoading.style.display = 'flex';
    }

    function showEmptyState() {
        hideAllStates();
        searchEmpty.style.display = 'flex';
    }

    function showInitialState() {
        hideAllStates();
        searchInitial.style.display = 'flex';
    }

    function showError(message) {
        hideAllStates();
        searchEmpty.style.display = 'flex';
        searchEmpty.querySelector('p').textContent = message;
    }

    function hideAllStates() {
        searchLoading.style.display = 'none';
        searchEmpty.style.display = 'none';
        searchInitial.style.display = 'none';
        searchResults.style.display = 'none';
        searchResults.innerHTML = '';
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for manual initialization if needed
    window.CustomSearch = { init, openModal, closeModal };

})();

