# 🔍 Quick Start: Powerful Search Setup

## What's New?

Your Ghost theme now has **powerful full-text search** that searches through:
- ✅ Post titles
- ✅ Full post content 
- ✅ Excerpts
- ✅ Tags

Instead of Ghost's basic title-only search, users can now find any text within your posts!

---

## 🚀 Quick Setup (5 minutes)

### 1️⃣ Get Your API Key

```
Ghost Admin → Settings → Integrations → Add custom integration
```

Name it "Search" and copy the **Content API Key**

### 2️⃣ Add Key to Theme

Open `default.hbs` (around line 19) and replace `YOUR_CONTENT_API_KEY`:

```javascript
window.ghostConfig = {
    apiUrl: '{{@site.url}}/ghost/api/content',
    apiKey: 'paste_your_key_here'  // 👈 Replace this
};
```

### 3️⃣ Upload Theme

```bash
# The theme is already built and zipped at:
dist/custom-edition.zip
```

Upload this zip to: `Ghost Admin → Settings → Design → Change theme`

### 4️⃣ Test It! 

Click the 🔍 search icon in your header or press `Cmd+K` (Mac) / `Ctrl+K` (Windows)

---

## ⌨️ Keyboard Shortcuts

- **Cmd/Ctrl + K** - Open search
- **ESC** - Close search
- **Type to search** - Instant results!

---

## 🎨 What Your Users Will See

1. Click the search icon (same location as before)
2. Beautiful modal appears with search input
3. Start typing → instant results with highlighted matches
4. See matching content snippets, dates, and tags
5. Click any result to go to that post

---

## 📁 Files Changed

**Added:**
- `assets/css/misc/search-modal.css` - Beautiful search UI
- `assets/js/lib/search.js` - Search logic
- `assets/js/lib/fuse.js` - Fuzzy search library
- `SEARCH_SETUP.md` - Full documentation
- `SEARCH_QUICK_START.md` - This file

**Modified:**
- `default.hbs` - Added modal HTML & API config
- `assets/css/screen.css` - Imported search styles
- `package.json` - Added Fuse.js dependency

---

## 🐛 Troubleshooting

**Search shows "not configured" error?**
→ Add your Content API key in `default.hbs` (see step 2 above)

**No results showing?**
→ Check browser console (F12) for errors
→ Verify API key is correct

**Modal doesn't open?**
→ Clear browser cache
→ Check JavaScript console for errors

---

## 📚 Need More Help?

See `SEARCH_SETUP.md` for detailed documentation, customization options, and advanced troubleshooting.

---

**Your search icon stays exactly where it is, but now it's 100x more powerful! 🎉**

