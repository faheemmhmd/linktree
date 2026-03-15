# Faheem's Social Links - Linktree Clone

A modern, responsive linktree page to showcase your social media handles and online profiles.

## 🎨 Features

### Design & UX
- **Modern Glass-morphism Design** - Sleek card-based layout with frosted glass effect
- **Smooth Animations** - Fade-in entrance animation and interactive hover effects
- **Color-coded Social Links** - Each platform has its own brand color gradient
- **Professional Typography** - System fonts for optimal readability across all devices

### Responsive Design
- **Mobile-First Approach** - Optimized for all screen sizes
- **Smart Grid Layout** - Adapts from 2 columns on mobile to 3 columns on tablet/desktop
- **Touch-Friendly** - Larger touch targets for mobile users (120px buttons on mobile, 140px on tablet)
- **Tested Breakpoints**:
  - Small phones (under 360px)
  - Mobile (360px - 767px) - 2 column layout
  - Tablet (768px - 1023px) - 3 column layout
  - Desktop (1024px+) - Enhanced spacing and larger elements

### Accessibility & Performance
- **Semantic HTML** - Proper use of heading hierarchy and semantic elements
- **ARIA Labels** - Accessibility labels for all social links
- **Alt Text** - Descriptive alt text for all images (important for screen readers)
- **Reduced Motion Support** - Respects users' motion preferences
- **Dark Mode Support** - Automatically adapts to system theme preference
- **Security** - Links open with `rel="noopener noreferrer"` for safety

### Technical Improvements
- ✅ Better HTML structure with semantic tags (`<main>`, `<nav>`)
- ✅ CSS Variables for maintainability (colors, shadows, transitions)
- ✅ Flexible box layout (flexbox & CSS Grid) instead of fixed widths
- ✅ Optimized box-shadow and transitions for smooth performance
- ✅ Proper meta tags for viewport and description
- ✅ No inline styles - pure CSS architecture

## 📱 Device Optimization

| Device | Layout | Columns | Profile Size |
|--------|--------|---------|--------------|
| Small Phone (<360px) | 2 columns | 2 | 100px |
| Mobile (360-767px) | 2 columns | 2 | 120px |
| Tablet (768-1023px) | 3 columns | 3 | 140px |
| Desktop (1024px+) | 3 columns | 3 | 150px |

## 🚀 How to Use

1. Replace `profile.jpg` with your profile picture
2. Ensure all social media icons are present:
   - `youtube.png`
   - `instagram.png`
   - `x.png`
   - `facebook.png`
   - `github.png`
   - `web.png`
3. Replace `bg.jpg` with your background image (or modify the background color)
4. Update the links in `index.html` with your actual social handles
5. Customize the bio text in the `<p class="bio">` tag

## 📝 Customization

### Colors
Edit the CSS variables in the `:root` selector to change the primary color scheme:
```css
:root {
    --primary-color: #30a1ec;
    --secondary-color: #00d6fc;
    --dark-text: #242527;
    --light-text: #ffffff;
}
```

### Individual Platform Colors
Each social link has its own gradient in the CSS:
- `.youtube-link` - Red gradient
- `.instagram-link` - Pink/Red gradient
- `.x-link` - Black gradient
- `.github-link` - Dark gray gradient
- `.facebook-link` - Blue gradient
- `.blog-link` - Orange gradient

### Typography
Modify font sizes and weights in the media queries to suit your preference.

## 🔧 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📊 Performance

- **Fast Load Time** - Minimal CSS, optimized images
- **No Dependencies** - Pure HTML/CSS (no frameworks or libraries)
- **Accessibility Score** - WCAG AAA compliant
- **Mobile Performance** - Lighthouse optimized

## 🎯 Future Enhancements

- Add copy-to-clipboard functionality for usernames
- Include view statistics
- Add theme switcher (light/dark mode toggle)
- Implement lazy loading for background images
- Add social link analytics