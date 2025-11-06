# Custom Search Setup Guide

## Overview

Your Ghost theme now includes a powerful custom search feature that searches through:
- **Post titles** 
- **Post content** (full text search)
- **Post excerpts**
- **Tags**

The search uses fuzzy matching, so it finds relevant results even with typos or partial matches.

## Features

✨ **Instant search** - Results appear as you type  
🔍 **Full content search** - Searches inside post content, not just titles  
🏷️ **Tag search** - Find posts by tags  
⚡ **Fast & responsive** - Powered by Fuse.js fuzzy search  
🎨 **Beautiful UI** - Modern, clean search modal  
⌨️ **Keyboard shortcuts** - ESC to close, Cmd/Ctrl+K to open  

## Setup Instructions

### Step 1: Create a Ghost Content API Integration

1. Log in to your **Ghost Admin** panel
2. Go to **Settings** → **Integrations**
3. Click **Add custom integration**
4. Give it a name like "Search Integration"
5. Copy the **Content API Key** (it looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Step 2: Add the API Key to Your Theme

1. Open the file `default.hbs` in your theme
2. Find this section (near the top, around line 14-20):

```javascript
<script>
    window.ghostConfig = {
        apiUrl: '{{@site.url}}/ghost/api/content',
        apiKey: 'YOUR_CONTENT_API_KEY'  // TODO: Replace with your Content API key
    };
</script>
```

3. Replace `'YOUR_CONTENT_API_KEY'` with your actual Content API key:

```javascript
<script>
    window.ghostConfig = {
        apiUrl: '{{@site.url}}/ghost/api/content',
        apiKey: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'  // Your actual key here
    };
</script>
```

### Step 3: Upload the Theme

1. Rebuild the theme if you made changes:
   ```bash
   npm run zip
   ```

2. Upload the theme to Ghost:
   - Go to **Ghost Admin** → **Settings** → **Design**
   - Click **Change theme**
   - Upload the new theme zip file
   - Click **Activate**

### Step 4: Test the Search

1. Click the search icon 🔍 in your site header
2. A beautiful search modal should appear
3. Start typing to search through all your posts
4. Results will appear instantly as you type

## Usage

### Opening Search

- **Click** the search icon in the header
- **Keyboard shortcut**: `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)

### Closing Search

- Click the **X** button
- Click outside the modal (on the dark overlay)
- Press **ESC** key

### Search Tips

- The search is **fuzzy** - it's forgiving of typos
- It searches through **titles, content, excerpts, and tags**
- Results show **highlighted matching text**
- **Matched tags** are highlighted in blue
- Results are sorted by **relevance**

## Customization

### Changing the Search Modal Appearance

Edit `assets/css/misc/search-modal.css` to customize:
- Colors
- Font sizes
- Modal size
- Animations

### Changing Spanish Text to Another Language

Edit `assets/js/lib/search.js` and search for these strings:

- `"Buscar en el blog..."` - Search placeholder
- `"Cargando posts..."` - Loading message
- `"No se encontraron resultados"` - No results message
- `"Intenta con otros términos de búsqueda"` - Try other terms message
- etc.

### Adjusting Search Behavior

In `assets/js/lib/search.js`, you can modify:

```javascript
const MIN_SEARCH_LENGTH = 2;  // Minimum characters before searching
```

And in the `fuseOptions` object:
```javascript
threshold: 0.4,  // Lower = more strict matching (0.0 to 1.0)
```

## Troubleshooting

### "Búsqueda no configurada" Error

**Problem**: API key is not configured  
**Solution**: Follow Step 1 and Step 2 above to add your Content API key

### "Error al cargar los posts" Error

**Problem**: API key is invalid or API endpoint is incorrect  
**Solution**: 
1. Verify your API key is correct
2. Make sure you copied the **Content API Key**, not the Admin API Key
3. Check browser console for detailed error messages

### Search Icon Doesn't Open Modal

**Problem**: JavaScript not loaded properly  
**Solution**:
1. Clear your browser cache
2. Rebuild the theme: `npx gulp build`
3. Check browser console for JavaScript errors

### No Results Appearing

**Problem**: Posts not loading from API  
**Solution**:
1. Open browser developer console (F12)
2. Check the Network tab for API requests
3. Verify the API endpoint is accessible
4. Check for CORS errors

## Technical Details

### Architecture

- **Frontend Framework**: Vanilla JavaScript (no jQuery)
- **Search Library**: Fuse.js v7.x (fuzzy search)
- **API**: Ghost Content API v5.x
- **Styling**: Custom CSS with modern design

### Performance

- Posts are loaded once when search is first opened
- All searches are performed client-side (instant results)
- Approximately ~100KB additional JavaScript (Fuse.js)
- Minimal impact on page load time

### Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Files Modified/Added

### Added Files
- `assets/css/misc/search-modal.css` - Search modal styling
- `assets/js/lib/search.js` - Search functionality
- `assets/js/lib/fuse.js` - Fuse.js library
- `SEARCH_SETUP.md` - This documentation

### Modified Files
- `default.hbs` - Added search modal HTML and API configuration
- `assets/css/screen.css` - Added import for search-modal.css
- `package.json` - Added fuse.js dependency

## Support

If you encounter any issues:

1. Check the browser console for errors (F12 → Console tab)
2. Verify your Ghost version is 5.0 or higher
3. Ensure your Content API key is valid
4. Try rebuilding the theme: `npx gulp build`

## Credits

- Search powered by [Fuse.js](https://fusejs.io/)
- Icons from [Heroicons](https://heroicons.com/)
- Built for [Ghost CMS](https://ghost.org/)

---

**Enjoy your powerful new search! 🎉**

