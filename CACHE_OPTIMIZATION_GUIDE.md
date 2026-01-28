# Cache Lifetime Optimization Guide

## The Problem

PageSpeed Insights is reporting **635 KiB of resources with short cache lifetimes**. These are third-party resources that we don't directly control:

### 1. Ghost CDN Resources (514 KiB - 10 min cache)
- `portal.min.js` - 430 KiB (Ghost member portal)
- `sodo-search.min.js` - 85 KiB (Ghost search functionality)

### 2. PostHog Analytics (198 KiB - various short caches)
- `/static/array.js` - 63 KiB (5 min cache)
- `/static/posthog-recorder.js` - 88 KiB (4 hour cache)
- `/static/surveys.js` - 32 KiB (5 min cache)
- `/static/web-vitals.js` - 7 KiB (5 min cache)
- Other PostHog scripts - 8 KiB

---

## What I've Optimized in the Theme

### ✅ 1. Preconnect to JSDelivr CDN
```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
```
- Establishes early connection to Ghost's CDN
- Reduces connection time by ~100-200ms

### ✅ 2. Defer Non-Critical Analytics
- Added script to defer PostHog loading until after page is interactive
- Analytics load 1 second after the `load` event
- Prevents blocking critical rendering

### ✅ 3. Deferred Ghost Portal CSS
- Portal CSS loads asynchronously (from previous fix)
- Doesn't block initial render

---

## What YOU Need to Do

### 🎯 Priority 1: Evaluate PostHog Usage (High Impact)

**PostHog is costing you 198 KiB with poor caching.**

**Options:**
1. **Remove PostHog** (if not actively using analytics)
   - Go to Ghost Admin → Settings → Code Injection
   - Remove PostHog scripts from Header/Footer
   - **Savings: 198 KiB, better cache score**

2. **Use a lighter alternative:**
   - **Plausible Analytics**: ~1 KiB, privacy-focused
   - **Fathom Analytics**: ~1-2 KiB, simple analytics
   - **Google Analytics 4**: ~45 KiB, but better caching
   - **Cloudflare Web Analytics**: Free, ~10 KiB

3. **Keep PostHog but optimize:**
   - Load it only on specific pages
   - Use PostHog's "snippet" version instead of full SDK

---

### 🎯 Priority 2: Ghost Resources (Medium Impact)

These are harder to optimize since they're managed by Ghost:

**Option A: Accept the Trade-off** (Recommended)
- Ghost CDN resources update frequently (hence short cache)
- The 10-minute cache ensures users get updates quickly
- This is a Ghost platform limitation

**Option B: Self-Host (Advanced)**
- Download `portal.min.js` and `sodo-search.min.js`
- Host them in your `assets/js/` folder
- Set long cache headers on your server
- **Downside**: Manual updates needed when Ghost releases changes

---

## Expected Results After Changes

### If you remove PostHog:
- ✅ **~200 KiB less data transfer**
- ✅ **Faster page load by 300-500ms**
- ✅ **Better cache score in PageSpeed**
- ✅ **Improved LCP and TBT metrics**

### If you keep everything:
- ✅ **Faster initial connection** (preconnect)
- ✅ **Non-blocking analytics** (deferred loading)
- ⚠️ **Cache warning will persist** (third-party limitation)

---

## How to Remove PostHog

1. Log into your Ghost Admin panel
2. Go to **Settings → Code Injection**
3. Look in the **Site Header** or **Site Footer** for PostHog code
4. Remove any `<script>` tags containing "posthog.com"
5. Save changes

Example of what to remove:
```html
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e...
</script>
```

---

## Testing Your Changes

1. Remove PostHog (if decided)
2. Upload the updated theme (already built with optimizations)
3. Test in PageSpeed Insights
4. Expected improvements:
   - Cache warning reduced by ~200 KiB
   - LCP improvement: 200-400ms
   - Overall performance score: +5-10 points

---

## Summary

**Theme optimizations completed:**
- ✅ Preconnect to CDN for faster loading
- ✅ Deferred analytics to not block rendering  
- ✅ Optimized Ghost Portal CSS loading

**Your action required:**
- 🎯 **High impact**: Review PostHog usage and consider removing/replacing
- 🎯 **Medium impact**: Accept Ghost CDN cache limitations (or self-host advanced)

**Bottom line:** The biggest win is removing unnecessary PostHog scripts. Ghost's resources are well-optimized given the platform constraints.

