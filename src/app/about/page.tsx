import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors mb-4"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 6.293V.5A.5.5 0 0 1 8 0z"/>
              <path d="M3 5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zM3.5 8a.5.5 0 1 0 0 1h9a.5.5 0 1 0 0-1h-9z"/>
            </svg>
            Back to Globe
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">
            About <span className="text-[color:var(--accent-blue)]">Orbital Atlas</span>
          </h1>
          
          <p className="text-xl text-[color:var(--text-secondary)] leading-relaxed">
            An interactive 3D globe for geopolitical data visualization, built to demonstrate the power of rapid AI-assisted development.
          </p>
        </div>

        {/* Project Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">🌍 Project Overview</h2>
          <div className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-white/10">
            <p className="text-[color:var(--text-secondary)] leading-relaxed mb-4">
              Orbital Atlas transforms complex geopolitical data into an engaging, interactive experience. 
              Users can explore countries, view real-time statistics, and control the globe's rotation with 
              intuitive orbital controls.
            </p>
            <p className="text-[color:var(--text-secondary)] leading-relaxed">
              The project showcases modern web technologies including Next.js 15, D3.js projections, 
              and responsive design principles, all wrapped in a cosmic-inspired user interface.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">✨ Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-[color:var(--accent-blue)]">🛰️ Orbital Controls</h3>
              <p className="text-[color:var(--text-secondary)]">
                Auto-rotating globe with zoom controls and variable speed dial. 
                Pause on interaction and resume automatically.
              </p>
            </div>
            <div className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-[color:var(--accent-blue)]">📊 Real-Time Data</h3>
              <p className="text-[color:var(--text-secondary)]">
                Click any country to view geopolitical statistics including GDP, 
                population, and life expectancy data.
              </p>
            </div>
            <div className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-[color:var(--accent-blue)]">🎨 Modern Design</h3>
              <p className="text-[color:var(--text-secondary)]">
                Cosmic-inspired UI with floating controls, smooth animations, 
                and responsive design for all devices.
              </p>
            </div>
            <div className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-[color:var(--accent-blue)]">⚡ High Performance</h3>
              <p className="text-[color:var(--text-secondary)]">
                Optimized D3.js projections with efficient rendering and 
                smooth 60fps animations.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">🚀 Technology Stack</h2>
          <div className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-white/10">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-[color:var(--accent-blue)]">Frontend</h3>
                <ul className="text-[color:var(--text-secondary)] space-y-1">
                  <li>• Next.js 15</li>
                  <li>• React & TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-[color:var(--accent-blue)]">Visualization</h3>
                <ul className="text-[color:var(--text-secondary)] space-y-1">
                  <li>• D3.js Projections</li>
                  <li>• GeoJSON Rendering</li>
                  <li>• Custom Animations</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-[color:var(--accent-blue)]">Deployment</h3>
                <ul className="text-[color:var(--text-secondary)] space-y-1">
                  <li>• Vercel Platform</li>
                  <li>• GitHub Integration</li>
                  <li>• Automated CI/CD</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AI Development Story */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">🤖 Built with AI in 45 Minutes</h2>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
            <p className="text-[color:var(--text-secondary)] leading-relaxed mb-4">
              This entire application was built in under 45 minutes using GPT-5 and Cursor IDE, 
              demonstrating the incredible potential of AI-assisted development for rapid prototyping 
              and MVP creation.
            </p>
            <p className="text-[color:var(--text-secondary)] leading-relaxed">
              From initial concept to deployed application, including debugging, feature additions, 
              and UI polish, the entire development cycle showcases how AI can accelerate the 
              creation of complex, interactive applications.
            </p>
          </div>
        </section>

        {/* About Born & Brand */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">🏢 Built by Born & Brand</h2>
          <div className="bg-[color:var(--bg-secondary)] rounded-lg p-8 border border-white/10">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                B&B
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[color:var(--accent-blue)]">Born & Brand</h3>
                <p className="text-[color:var(--text-secondary)] leading-relaxed">
                  Expert MVP development services for busy founders. We help entrepreneurs 
                  launch their apps in 14 days with fixed pricing and rapid iterations.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-[color:var(--bg-tertiary)] rounded-lg">
                <div className="text-2xl font-bold text-[color:var(--accent-blue)] mb-2">£950</div>
                <div className="text-sm font-semibold mb-1">MVP Builder</div>
                <div className="text-xs text-[color:var(--text-secondary)]">Ready in 5 days</div>
              </div>
              <div className="text-center p-4 bg-[color:var(--bg-tertiary)] rounded-lg border border-blue-500/30">
                <div className="text-2xl font-bold text-[color:var(--accent-blue)] mb-2">£9,999</div>
                <div className="text-sm font-semibold mb-1">Full-Scale App</div>
                <div className="text-xs text-[color:var(--text-secondary)]">Complete development</div>
                <div className="text-xs text-orange-400 mt-1">🔥 Most Popular</div>
              </div>
              <div className="text-center p-4 bg-[color:var(--bg-tertiary)] rounded-lg">
                <div className="text-2xl font-bold text-[color:var(--accent-blue)] mb-2">Custom</div>
                <div className="text-sm font-semibold mb-1">Bespoke Solutions</div>
                <div className="text-xs text-[color:var(--text-secondary)]">Let's chat</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://www.bornandbrand.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-[color:var(--accent-blue)] text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors"
              >
                Visit Born & Brand →
              </a>
              <a 
                href="https://www.bornandbrand.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 border border-[color:var(--accent-blue)] text-[color:var(--accent-blue)] px-6 py-3 rounded-lg text-center font-semibold hover:bg-[color:var(--accent-blue)] hover:text-white transition-colors"
              >
                Book Discovery Call
              </a>
            </div>
          </div>
        </section>

        {/* Project Links */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">🔗 Project Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://github.com/ArkMaster123/orbital-atlas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[color:var(--bg-secondary)] rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <div>
                <div className="font-semibold">Source Code</div>
                <div className="text-sm text-[color:var(--text-secondary)]">View on GitHub</div>
              </div>
            </a>
            <a 
              href="/" 
              className="flex items-center gap-3 p-4 bg-[color:var(--bg-secondary)] rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <div>
                <div className="font-semibold">Live Demo</div>
                <div className="text-sm text-[color:var(--text-secondary)]">Try the app</div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}