# Silas Silas - Portfolio Website

A modern, responsive portfolio website with a comprehensive three-theme system, enhanced user experience, and professional design.

## 🌟 Features

### 🎨 Theme System
- **Three Theme Modes**: Dark, Light, and Custom Light (Green/Grey/Orange)
- **Smooth Transitions**: All theme changes include smooth CSS transitions
- **Persistent Storage**: Theme preference is saved in localStorage
- **Keyboard Shortcut**: Press `Ctrl/Cmd + T` to cycle through themes
- **Accessible**: High contrast ratios and proper color schemes for all themes

### 🎯 Enhanced User Experience
- **Scroll-Linked Navigation**: Active navigation highlighting based on scroll position
- **Smooth Scrolling**: Smooth animations when navigating between sections
- **Responsive Design**: Fully responsive across all device sizes
- **Loading States**: Visual feedback for form submissions and interactions
- **Hover Effects**: Subtle animations and hover states throughout

### 📱 Modern Design
- **Typography Hierarchy**: Clear typographic system with consistent font weights
- **Consistent Spacing**: CSS custom properties for uniform spacing
- **Card-Based Layout**: Modern card design with subtle shadows and borders
- **Gradient Accents**: Beautiful gradient overlays and accent colors
- **Icon Integration**: Font Awesome icons throughout the interface

### 🔧 Technical Features
- **CSS Custom Properties**: Comprehensive variable system for easy theming
- **Modern JavaScript**: ES6+ features with proper error handling
- **Performance Optimized**: Debounced scroll events and efficient animations
- **Accessibility**: ARIA labels, skip links, and keyboard navigation
- **Cross-Browser Compatible**: Works on all modern browsers

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Or serve the files using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 🎨 Theme System Usage

### Theme Toggle Button
- Located in the top-right corner of every page
- Click to cycle through: Dark → Light → Custom Light → Dark
- Shows current theme with appropriate icon and label

### Theme Colors

#### Dark Theme (Default)
- Background: Deep charcoal (#1a1a1a)
- Text: Light gray (#f5f6fa)
- Accent: Blue (#4da8ff)

#### Light Theme
- Background: White (#ffffff)
- Text: Dark gray (#1e293b)
- Accent: Blue (#3b82f6)

#### Custom Light Theme
- Background: Light green (#f0f8f0)
- Text: Dark gray (#2d3748)
- Accent: Green (#38a169) with Orange (#ed8936)

## 📄 Page Structure

### Home Page (`index.html`)
- Hero section with call-to-action buttons
- About preview with feature cards
- Projects preview with project categories
- Skills overview with technology categories
- Contact CTA section

### About Page (`about.html`)
- Personal introduction
- Education information
- Skills and technologies
- Interests and passions

### Contact Page (`contact.html`)
- Enhanced contact form with validation
- Contact information cards
- Multiple contact methods
- Form submission feedback

### Other Pages
- **Projects**: Showcase of work
- **Services**: Offered services
- **Skills**: Detailed skills breakdown
- **Certificates**: Professional certifications
- **Resume**: Professional experience

## 🛠️ Customization

### Adding New Themes
1. Add new CSS variables in `style.css`:
   ```css
   body.new-theme {
     --bg-main: #your-color;
     --text-main: #your-color;
     /* ... other variables */
   }
   ```

2. Update the theme array in `theme-toggle.js`:
   ```javascript
   this.themes = ['dark', 'light', 'custom-light', 'new-theme'];
   ```

### Modifying Colors
All colors are defined as CSS custom properties in the `:root` selector. Simply update the values to change the entire color scheme.

### Adding New Pages
1. Create a new HTML file following the existing structure
2. Include the navbar and footer
3. Add the theme toggle script
4. Update navigation links in all pages

## 📱 Responsive Breakpoints

- **Mobile**: < 900px
- **Tablet**: 900px - 1024px
- **Desktop**: > 1024px

## 🎯 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📁 File Structure

```
Portfolio-1/
├── index.html              # Home page
├── about.html              # About page
├── contact.html            # Contact page
├── projects.html           # Projects page
├── services.html           # Services page
├── skills.html             # Skills page
├── certificates.html       # Certificates page
├── resume.html             # Resume page
├── style.css               # Main stylesheet with theme system
├── theme-toggle.js         # Theme management and functionality
├── navbar.html             # Navbar component
├── inject-navbar.js        # Navbar injection script
├── update-html-files.js    # HTML file updater
├── server.js               # Local development server
├── package.json            # Node.js dependencies
├── images/                 # Image assets
└── README.md               # This file
```

## 🔧 Development

### Local Development Server
```bash
npm install
npm start
```

### Building for Production
The website is static and ready for deployment. Simply upload all files to your web hosting service.

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)

### Netlify
1. Connect your GitHub repository
2. Deploy automatically on push
3. Custom domain configuration available

### Vercel
1. Import your GitHub repository
2. Automatic deployment setup
3. Preview deployments for pull requests

## 📞 Contact

- **Email**: silasilas32@gmail.com
- **GitHub**: [Silas-Ce](https://github.com/Silas-Ce)
- **LinkedIn**: [Silas Silas Ceaser](https://www.linkedin.com/in/silas-silas-ceaser/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Inter font family for clean, modern design
- CSS Grid and Flexbox for responsive layouts
