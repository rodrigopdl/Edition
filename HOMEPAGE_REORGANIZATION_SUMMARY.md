# Homepage Reorganization Summary

## Changes Made

### 1. New Handpicked Posts Section
Created a new section to showcase 3+ handpicked posts for new visitors, positioned right after the hero section.

**Files Created:**
- `partials/handpicked-posts.hbs` - New partial for displaying handpicked posts
- `assets/css/site/handpicked.css` - Styling based on the related-posts design

**Visual Style:**
- Dark background (#222535) with subtle noise texture
- 3-column grid layout (responsive to 2 columns on tablets, 1 column on mobile)
- Blue-bordered cards with hover effects
- Similar aesthetic to the related-posts section at the end of post pages

### 2. Section Reorganization
Reordered homepage sections for better user flow:

**New Order:**
1. **Hero Section** (Newsletter signup)
2. **Handpicked Posts** ← NEW - Shows featured posts as a curated selection
3. **About Section** (Introduction to Rodri)
4. **Latest Post Section** ← MOVED - Now appears after the about section
5. **Content Sections** (Latest posts and community favorites)
6. **Bottom CTA**

### 3. Content Strategy
- The handpicked section uses `filter="featured:true" limit="3"` to display featured posts
- This gives you control over which posts to showcase by marking them as "featured" in Ghost admin
- You can increase the limit to show more than 3 posts if desired

### 4. CSS Integration
- Added `@import "site/handpicked.css";` to `assets/css/screen.css`
- The styling maintains consistency with your existing design system

## How to Use

### To Select Posts for the Handpicked Section:
1. Go to Ghost Admin → Posts
2. Edit any post you want to feature
3. In the post settings, toggle "Feature this post" to ON
4. The first 3 featured posts will automatically appear in the handpicked section

### To Show More Posts:
Edit line 53 in `partials/home.hbs`:
```handlebars
{{#get "posts" filter="featured:true" limit="3" as |handpicked|}}
```
Change `limit="3"` to `limit="6"` (or any number you prefer)

### To Customize the Section Title:
Edit line 8 in `partials/handpicked-posts.hbs`:
```html
<h3 class="handpicked-title">Te recomiendo estos bocados</h3>
```

## Next Steps

1. **Build the theme** - Run `gulp` to compile the CSS changes
2. **Mark posts as featured** - Select 3+ posts to feature in Ghost admin
3. **Test responsiveness** - View the homepage on mobile, tablet, and desktop
4. **Adjust as needed** - You can easily modify the section title, limit, or styling

## Notes

- The handpicked section only shows if there are featured posts (uses `{{#if handpicked}}`)
- All responsive breakpoints are handled automatically
- The section uses lazy loading for images to maintain performance
- Maintains the same blue accent color (#5271FF) as the rest of your site

