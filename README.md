# 🌤️ Weather Forecast App

A modern, responsive weather application featuring glassmorphism design, dynamic animations, and comprehensive weather information. Built with vanilla HTML, CSS, and JavaScript.

![Weather App Preview](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎨 Design & UI
- **Glassmorphism Design**: Modern glass-like interface with backdrop blur effects
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Purple Gradient Theme**: Sleek dark purple to black gradient background
- **Golden Accents**: Eye-catching yellow accent colors for highlights

### 🌦️ Weather Features
- **Real-time Weather Data**: Powered by OpenWeatherMap API
- **Location-based Forecasts**: Automatic geolocation detection
- **Manual City Search**: Search weather for any city worldwide
- **Comprehensive Weather Info**: Temperature, humidity, wind speed, cloudiness
- **Dynamic Weather Icons**: Animated SVG icons that respond to conditions
- **Temperature Units**: Switch between Celsius and Fahrenheit

### 🎬 Animations & Effects
- **Weather Particle System**: Animated raindrops, snow, and floating debris
- **Interactive Elements**: Hover effects and smooth transitions
- **Landing Page Animation**: Hero weather icon with floating motion
- **Click Ripple Effects**: Golden ripple feedback on interactions
- **Staggered Animations**: Sequential element appearances

### 📱 User Experience
- **Progressive Web App**: Installable on mobile devices
- **Offline Support**: Cached data for better performance
- **Touch-friendly**: Optimized touch targets for mobile
- **Accessibility**: Proper contrast ratios and focus indicators

## 🚀 Demo

Experience the live demo: [Weather App Live](https://your-demo-link.com)

## 📋 Prerequisites

- Modern web browser with ES6+ support
- Internet connection for weather data
- Optional: Local web server for development

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/priyanshu-creates/Weather-App.git
cd Weather-App
```

### 2. API Key Setup
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `index.js`
3. Replace the API key on line 17:
```javascript
const API_KEY = "your_api_key_here";
```

### 3. Run the Application

#### Option A: Live Server (Recommended)
```bash
# Using Python
python -m http.server 8002

# Using Node.js (if you have live-server installed)
npx live-server --port=8002
```

#### Option B: Direct File Access
- Simply open `index.html` in your web browser
- Note: Some features may be limited due to CORS restrictions

### 4. Access the App
Open your browser and navigate to:
- Local server: `http://localhost:8002`
- Direct file: Open `index.html` directly

## 🏗️ Project Structure

```
Weather-App/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── index.js            # JavaScript functionality
├── weatherapp-icon.png # Hero weather icon
├── design.json         # Design system specifications
├── README.md           # Project documentation
└── .vscode/            # VS Code settings
    └── settings.json
```

## 🎯 Key Components

### HTML Structure
- **Landing Page**: Welcome screen with hero icon
- **Weather Container**: Main weather display area
- **Location Services**: Geolocation permission handling
- **Search Interface**: Manual city search functionality
- **Settings Panel**: Theme and unit preferences

### CSS Architecture
- **Design System**: Custom properties for consistent styling
- **Responsive Breakpoints**: 6 breakpoints for all devices
- **Animation System**: Comprehensive keyframe animations
- **Glassmorphism Effects**: Backdrop blur and transparency
- **Particle System**: Weather-specific atmospheric effects

### JavaScript Features
- **Weather API Integration**: OpenWeatherMap data fetching
- **Geolocation Services**: Automatic location detection
- **Theme Management**: Dark/light mode with persistence
- **Animation Controllers**: Dynamic particle and UI animations
- **Local Storage**: Settings and preferences persistence

## 🌈 Responsive Design

### Breakpoints
- **Large Desktop**: > 1024px
- **Desktop**: ≤ 1024px
- **Tablet Portrait**: ≤ 768px
- **Mobile Large**: ≤ 640px
- **Mobile Medium**: ≤ 480px
- **Mobile Small**: ≤ 360px

### Mobile Optimizations
- Touch-friendly button sizes (min 44px)
- Optimized glassmorphism for performance
- Reduced animation complexity
- Improved scrolling behavior

## 🎨 Color Palette

### Dark Mode (Default)
- **Primary**: `#1a0d2e` to `#000000` (gradient)
- **Accent**: `#F5C842` (golden yellow)
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `rgba(255,255,255,0.8)`
- **Glass Effect**: `rgba(255,255,255,0.1)`

### Light Mode
- **Primary**: `#e8f4fd` to `#a8d0f0` (gradient)
- **Accent**: `#F5C842` (golden yellow)
- **Text Primary**: `#2c3e50`
- **Text Secondary**: `rgba(44,62,80,0.8)`
- **Glass Effect**: `rgba(44,62,80,0.1)`

## ⚡ Performance Features

- **Lazy Loading**: Efficient resource loading
- **Optimized Animations**: Hardware-accelerated transforms
- **Minimal Dependencies**: Pure vanilla JavaScript
- **Compressed Assets**: Optimized images and icons
- **Caching Strategy**: Local storage for user preferences


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap**: Weather data API
- **Google Fonts**: Merriweather Sans typography
- **Glassmorphism**: Design inspiration from modern UI trends
- **CSS Tricks**: Animation and layout techniques

## 📞 Contact

**Priyanshu** - [GitHub Profile](https://github.com/priyanshu-creates)

Project Link: [https://github.com/priyanshu-creates/Weather-App](https://github.com/priyanshu-creates/Weather-App)

---

⭐ **Star this repository if you found it helpful!** ⭐
