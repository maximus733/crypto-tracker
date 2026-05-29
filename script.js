const assetSelector = document.getElementById('cryptoSelect');
const livePriceEl = document.getElementById('livePrice');
const marketCapEl = document.getElementById('marketCap');
const timestampEl = document.getElementById('timestamp');
const assetLogo = document.getElementById('assetLogo');
const priceCard = document.getElementById('priceCard');
const trendBadge = document.getElementById('trendBadge');
const timeframeButtons = document.querySelectorAll('.tf-btn');

let previousPrice = 0;
let myChart = null;

let currentDays = "1";
let currentInterval = "hourly";

// EXPANDED ASSET LOGO DICTIONARY
const assetLogos = {
    bitcoin: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    ethereum: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    solana: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    cardano: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    ripple: "https://assets.coingecko.com/coins/images/44/large/xrp.png",
    polkadot: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    binancecoin: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
    chainlink: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    "avalanche-2": "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_Red.png",
    dogecoin: "https://assets.coingecko.com/coins/images/325/large/dogecoin.png",
    "shiba-inu": "https://assets.coingecko.com/coins/images/11939/large/shiba.png",
    pepe: "https://assets.coingecko.com/coins/images/31386/large/pepe.png"
};

// Create an array string of all object keys to bundle our network request seamlessly
const allAssetsQueryParam = Object.keys(assetLogos).join(',');

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2
});

async function renderHistoricalChart(assetId, days, interval) {
    const historyUrl = `https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`;
    
    try {
        const response = await fetch(historyUrl);
        const data = await response.json();
        const pricesArray = data.prices;
        
        const labels = pricesArray.map(item => {
            const date = new Date(item[0]);
            if (days === "1") {
                return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            } else {
                return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
            }
        });
        
        const prices = pricesArray.map(item => item[1]);

        if (myChart) {
            myChart.destroy();
        }

        const ctx = document.getElementById('cryptoChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Market Spot Index`,
                    data: prices,
                    borderColor: 'crimson',
                    backgroundColor: 'rgba(220, 20, 60, 0.03)',
                    borderWidth: 2.5,
                    tension: 0.15,
                    fill: true,
                    pointRadius: days === "1" ? 0 : 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#475569', maxTicksLimit: 7 } },
                    y: { grid: { color: 'rgba(255, 255, 255, 0.02)' }, ticks: { color: '#475569' } }
                }
            }
        });
    } catch (err) {
        console.error("Chart network stream blocked:", err);
    }
}

async function fetchMarketRates() {
    const activeAsset = assetSelector.value;
    
    // SCALED PIPELINE: We request pricing indices for ALL 12 items in one single query packet
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${allAssetsQueryParam}&vs_currencies=usd&include_market_cap=true`;
    
    assetLogo.src = assetLogos[activeAsset];

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Isolate our active selected dropdown item data stream cleanly
        const metrics = data[activeAsset];
        const currentPrice = metrics.usd;
        const currentMarketCap = metrics.usd_market_cap;

        livePriceEl.textContent = usdFormatter.format(currentPrice);
        marketCapEl.textContent = usdFormatter.format(Math.round(currentMarketCap));

        if (previousPrice !== 0) {
            priceCard.classList.remove('flash-green', 'flash-red');
            if (currentPrice > previousPrice) {
                priceCard.classList.add('flash-green');
                trendBadge.textContent = "▲ GAINING";
                trendBadge.style.color = "#10b981";
            } else if (currentPrice < previousPrice) {
                priceCard.classList.add('flash-red');
                trendBadge.textContent = "▼ DROPPING";
                trendBadge.style.color = "#ef4444";
            }
        } else {
            trendBadge.textContent = "● INITIALIZED";
        }

        previousPrice = currentPrice;
        const currentTime = new Date().toLocaleTimeString();
        timestampEl.textContent = `Live Feed Active • Last sync at ${currentTime}`;
        
    } catch (error) {
        console.error("Data tracking node disconnect:", error);
    }
}

timeframeButtons.forEach(button => {
    button.addEventListener('click', () => {
        timeframeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentDays = button.getAttribute('data-days');
        currentInterval = button.getAttribute('data-interval');
        renderHistoricalChart(assetSelector.value, currentDays, currentInterval);
    });
});

assetSelector.addEventListener('change', () => {
    previousPrice = 0;
    priceCard.classList.remove('flash-green', 'flash-red');
    fetchMarketRates();
    renderHistoricalChart(assetSelector.value, currentDays, currentInterval);
});

fetchMarketRates();
renderHistoricalChart(assetSelector.value, currentDays, currentInterval);
setInterval(fetchMarketRates, 25000);