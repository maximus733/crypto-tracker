# crypto tracker
track ur crypto
# Global Crypto Asset Stream Terminal 📈

A real-time, responsive financial tracking dashboard engineered with a completely decoupled architecture. This application hooks into external Web API data streams to pull live telemetry for 12 major cryptocurrency assets and maps historical pricing trends onto an interactive vector chart canvas.

## 🔗 Live Production Deployment
Experience the live application here: **[https://maximus733.github.io/crypto-tracker/](https://maximus733.github.io/crypto-tracker/)**

---

## 🛠️ System Architecture & Features
- **Separation of Concerns (SoC):** Built using decoupled files—HTML5 for semantic skeleton layout, CSS3 for structural design, and Vanilla JavaScript for logical execution.
- **Advanced Layout Engine:** Engineered using a sleek, dark-themed landscape layout driven by **CSS Flexbox** and a **2-Column Responsive CSS Grid**.
- **Unified Asynchronous Pipeline:** Reconfigured JavaScript `fetch()` routines to bundle data for all 12 assets into a single network payload request, preventing client thread throttling.
- **Dynamic Delta Trend Engine:** Tracks previous memory states to instantly flash the UI green (gaining) or red (dropping) based on price delta fluctuations.
- **Multi-Timeframe Charting:** Integrated **Chart.js** via CDN to smoothly render 1D (hourly data streams), 1W, and 1M historical lookbacks on a canvas element.

---

## 💻 Tech Stack Modules Used

| Layer | Technology / Engine | Purpose |
| :--- | :--- | :--- |
| **Structure** | HTML5 | Component scaffolding & data routing bindings |
| **Presentation** | CSS3 / Flexbox / Grid | Landscape alignment, Glassmorphism, animations |
| **Logic** | Vanilla JavaScript (ES6+) | DOM Manipulation, async event triggers, memory caching |
| **Networking** | REST API (Open-Meteo & CoinGecko) | Live financial telemetry streaming |
| **Visualization**| Chart.js Engine | Vector graph generation & compilation |
| **Hosting** | Git / GitHub Pages | Cloud version control & production deployment |

---

## 🚀 How to Run Locally

If you want to clone this workspace architecture and run it on your own machine:

1. Clone the repository repository files:
   ```bash
   git clone [https://github.com/maximus733/crypto-tracker.git](https://github.com/maximus733/crypto-tracker.git)
