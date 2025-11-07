# Search Functionality Fixes

## Date
November 7, 2025

## Issues Fixed

### 1. ✅ Old Posts Not Being Found in Search

**Problem:**
Even though the API call used `limit=all`, many posts (especially the oldest ones) weren't appearing in search results. This was because the Ghost Content API doesn't truly support `limit=all` - it has a maximum limit of approximately 250 posts per request.

**Solution:**
Implemented proper pagination to fetch ALL posts from the Ghost API:

- Created a new `fetchAllPosts()` function that loops through all pages of posts
- Uses pagination with `limit=250` (Ghost's maximum) and increments the `page` parameter
- Continues fetching until all posts are retrieved
- Adds a console log showing how many posts were loaded: `Loaded X posts for search`

**Files Modified:**
- `assets/js/lib/search.js` - Updated `loadPosts()` function and added `fetchAllPosts()` helper

**Result:**
Now ALL posts from your Ghost blog will be searchable, regardless of how many posts you have (15, 100, 500, etc.).

---

### 2. 🟡 Browser Extension Error in Console (Mitigated)

**Problem:**
When opening the search modal, a JavaScript error appeared in the console:
```
Uncaught TypeError: Cannot read properties of undefined (reading 'control')
at content_script.js
```

This error came from a browser extension (likely 1Password, LastPass, Bitwarden, or Dashlane) trying to interact with the search input field.

**Solution:**
Added multiple defensive attributes to tell browser extensions to ignore the search field:

- Changed `type="text"` to `type="search"` - More semantic and less targeted by extensions
- `data-1p-ignore` - Tells 1Password to ignore the field
- `data-lpignore="true"` - Tells LastPass to ignore the field
- `data-bwignore` - Tells Bitwarden to ignore the field
- `data-dashlane-ignore` - Tells Dashlane to ignore the field
- `data-form-type="other"` - Generic flag for other extensions
- `role="searchbox"` - Proper ARIA role
- `aria-label="Search posts"` - Accessibility label

**Files Modified:**
- `default.hbs` - Updated the search input field with multiple defensive attributes

**Result:**
Browser extensions should be much less likely to interact with the search field. However, some aggressive extensions may still trigger this error - it's harmless and doesn't affect functionality. See `CONSOLE_ERRORS_EXPLAINED.md` for details.

---

## Testing

After deploying these changes to your Ghost blog:

1. **Test Search Coverage:**
   - Open the search modal (click search icon or press Cmd/Ctrl+K)
   - Check the browser console - you should see: `Loaded X posts for search`
   - Search for content from your oldest posts to verify they now appear

2. **Test Browser Extension Error:**
   - Open the search modal
   - Check the browser console - the `content_script.js` error should be gone

---

## Build Status

✅ Changes compiled successfully with `npm run dev`
✅ Built files are in `assets/built/main.min.js`

## Next Steps

1. Upload the theme to your Ghost blog or restart your local Ghost instance
2. Test the search functionality
3. If you have more than 250 posts, you should now see all of them in search results!

