// Search functionality for blog posts
// Filters blog posts in real-time as user types in the search bar
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.input-search-sidebar2');
    const searchButton = document.querySelector('.btn-search-sidebar2');
    const blogPosts = document.querySelectorAll('.blo4');
    
    // Exit if required elements are not found
    if (!searchInput || !blogPosts.length) return;
    
    /**
     * Filters blog posts based on search term
     * @param {string} searchTerm - The term to search for
     */
    function filterBlogPosts(searchTerm) {
        // Convert search term to lowercase for case-insensitive comparison
        const term = searchTerm.trim().toLowerCase();
        
        blogPosts.forEach(post => {
            // Get all text content from the post
            const titleElement = post.querySelector('.tit9');
            const descriptionElement = post.querySelector('.text-blo4 p');
            const metaElements = post.querySelectorAll('.txt32 span');
            const dateElement = post.querySelector('.txt31');
            
            // Collect all searchable text
            const titleText = titleElement ? titleElement.textContent : '';
            const descriptionText = descriptionElement ? descriptionElement.textContent : '';
            
            // Extract text from meta spans (excluding separators)
            let metaText = '';
            metaElements.forEach(span => {
                // Get text content and remove separator characters
                const spanText = span.textContent.replace(/[\|]/g, '').trim();
                if (spanText) metaText += ' ' + spanText;
            });
            
            const dateText = dateElement ? dateElement.textContent : '';
            
            // Combine all text for searching
            const fullText = (titleText + ' ' + descriptionText + ' ' + metaText + ' ' + dateText).toLowerCase();
            
            // Show/hide post based on whether it contains the search term
            if (term === '' || fullText.includes(term)) {
                post.style.display = '';
                // Optional: Add fade-in effect
                post.style.opacity = '1';
                post.style.transition = 'opacity 0.3s ease';
            } else {
                // Optional: Add fade-out effect
                post.style.opacity = '0';
                post.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    post.style.display = 'none';
                }, 300); // Match transition duration
            }
        });
    }
    
    // Event listener for input changes (real-time filtering)
    searchInput.addEventListener('input', function() {
        filterBlogPosts(this.value);
    });
    
    // Event listener for button click
    searchButton.addEventListener('click', function() {
        filterBlogPosts(searchInput.value);
    });
    
    // Optional: Handle Enter key press
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission if any
            filterBlogPosts(this.value);
        }
    });
    
    // Set initial focus on search input for better UX
    searchInput.focus();
});