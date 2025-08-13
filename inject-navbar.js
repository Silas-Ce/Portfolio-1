const fs = require('fs');
const path = require('path');

const navbar = fs.readFileSync('navbar-snippet.html', 'utf8');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'navbar-snippet.html' && f !== 'navbar.html');

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Replace dynamic include or old header with navbar
  content = content.replace(
    /<header id="navbar"><\/header>[\s\S]*?<script>[\s\S]*?<\/script>/,
    navbar
  );
  // If not found, try to replace any <header class="navbar">...</header>
  content = content.replace(
    /<header class="navbar">[\s\S]*?<\/header>/,
    navbar
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});