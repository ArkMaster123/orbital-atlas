# 🌍 Orbital Atlas

An interactive 3D globe for geopolitical data visualization with orbital controls, auto-rotation, and real-time statistics.

![Orbital Atlas Demo](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Orbital+Atlas+Demo)

## ✨ Features

- **🛰️ Auto-Rotating Globe** - Smooth planetary rotation with intelligent pause on user interaction
- **🔍 Zoom Controls** - Zoom in/out for detailed exploration of regions
- **🎛️ Variable Speed Dial** - Adjust rotation speed from turtle-slow to rocket-fast
- **📊 Real-Time Country Statistics** - Click any country to view live geopolitical data
- **🎨 Elegant UI** - Modern design with orbital-themed controls
- **⚡ High Performance** - Built with Next.js 15 and optimized D3.js projections

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Visualization**: D3.js for globe projections and GeoJSON rendering
- **Styling**: Tailwind CSS with custom design tokens
- **Data**: Mock geopolitical indicators (GDP, Population, Life Expectancy)
- **Deployment**: Vercel-ready configuration

## 🎮 Interactive Controls

### Orbital Controls
- **Zoom In/Out**: Scale the globe for detailed exploration
- **Auto-Rotation Toggle**: Start/stop planetary spinning
- **Speed Dial**: Adjust rotation speed with real-time feedback
- **Drag Interaction**: Manual globe rotation with mouse/touch

### Data Exploration
- **Country Selection**: Click countries to view statistics
- **Dataset Switching**: Toggle between different indicators
- **Year Navigation**: Explore historical data trends
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Quick Start

```bash
# Clone the repository
git clone https://github.com/ArkMaster123/orbital-atlas.git
cd orbital-atlas

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── api/            # API routes for data fetching
│   ├── globals.css     # Global styles and imports
│   └── page.tsx        # Main application page
├── components/         # React components
│   ├── globe.tsx       # Interactive 3D globe component
│   ├── world-map.tsx   # Alternative 2D map view
│   └── data-panel.tsx  # Statistics display panel
├── data/              # Data utilities and mock datasets
│   ├── mock-data.ts   # Sample geopolitical indicators
│   └── data-utils.ts  # Data processing utilities
└── styles/            # Design tokens and styling
    └── tokens.css     # CSS custom properties
```

## 🌐 Data Sources

Currently uses mock data for demonstration. The application is designed to integrate with real geopolitical APIs:

- **GDP Data**: Economic indicators by country
- **Population Statistics**: Demographic information
- **Life Expectancy**: Health and development metrics

## 🎨 Design System

The application uses a cosmic-inspired design language with:

- **Dark Theme**: Space-like background for immersive experience
- **Orbital Controls**: Floating UI elements positioned like satellite controls
- **Smooth Animations**: Planetary rotation and seamless transitions
- **Responsive Layout**: Adapts to all screen sizes

## 🚀 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ArkMaster123/orbital-atlas)

Or deploy manually:

```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Performance

- **Optimized Rendering**: Efficient D3.js projections with requestAnimationFrame
- **Lazy Loading**: Components and data loaded on demand
- **Responsive Images**: Optimized assets for all device sizes
- **Fast Navigation**: Client-side routing with Next.js

## 🔧 Built With AI

This project was built in under 45 minutes using:
- **GPT-5** for code generation and problem solving
- **Cursor IDE** for AI-assisted development
- **[Born & Brand](https://www.bornandbrand.com/)** development methodology

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 About the Creator

Built by [Born & Brand](https://www.bornandbrand.com/) - Expert MVP development services for busy founders. We help entrepreneurs launch their apps in 14 days with fixed pricing and rapid iterations.

**Services:**
- 🚀 MVP Builder (£950) - Ready in 5 days
- 🔥 Full-Scale App (£9,999) - Complete development
- 💬 Custom Solutions - Bespoke development

[Book a Discovery Call](https://www.bornandbrand.com/) | [View Portfolio](https://www.bornandbrand.com/)

---

⭐ If you found this project helpful, please give it a star on GitHub!