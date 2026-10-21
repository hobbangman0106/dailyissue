/**
 * Daily Market Data Updater (Option A)
 * Runs on weekdays at 17:30 KST (after market close).
 * Fetches real-time closing prices, market caps, PER, PBR from Naver Finance API
 * and updates industry_data.js automatically.
 */

const fs = require('fs');
const axios = require('axios');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchNaverStock(code) {
    try {
        const url = `https://m.stock.naver.com/api/stock/${code}/integration`;
        const res = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            timeout: 5000
        });
        const infos = res.data && res.data.totalInfos;
        if (!infos || !Array.isArray(infos)) return null;

        const findVal = (key) => {
            const item = infos.find(x => x.key === key || x.code === key);
            return item ? item.value : null;
        };

        const mcap = findVal('시총') || findVal('marketValue');
        const perRaw = findVal('PER') || findVal('per');
        const pbrRaw = findVal('PBR') || findVal('pbr');
        const divRaw = findVal('배당수익률') || findVal('dividendYieldRatio');

        const per = perRaw ? parseFloat(perRaw.replace(/[^0-9.]/g, '')) || 0 : null;
        const pbr = pbrRaw ? parseFloat(pbrRaw.replace(/[^0-9.]/g, '')) || 0 : null;
        const divYield = divRaw ? parseFloat(divRaw.replace(/[^0-9.]/g, '')) || 0 : null;

        return { mcap, per, pbr, divYield };
    } catch (e) {
        return null;
    }
}

async function updateMarketData() {
    console.log('=== Starting Daily Market Data Update ===');
    const startTime = Date.now();

    // 1. Read industry_data.js
    let content = fs.readFileSync('industry_data.js', 'utf8');

    // Parse REGIONAL_INDUSTRY_DATA safely
    global.window = global;
    require('./industry_data.js');
    const regData = window.REGIONAL_INDUSTRY_DATA;
    if (!regData || !regData['국내']) {
        console.error('Failed to load REGIONAL_INDUSTRY_DATA');
        process.exit(1);
    }

    const krIndustries = regData['국내'] || [];
    let updatedCount = 0;
    let failedCount = 0;

    // 2. Iterate through domestic industries & update representative stocks
    for (const ind of krIndustries) {
        const companies = ind.companies || [];
        // Update top 3 representative companies per industry to ensure reliable execution within 2 minutes
        const targetCompanies = companies.slice(0, 3);

        for (const comp of targetCompanies) {
            if (!comp.code || !comp.code.match(/^\d{6}$/)) continue;

            const liveData = await fetchNaverStock(comp.code);
            if (liveData) {
                if (liveData.mcap) comp.marketCap = liveData.mcap;
                if (liveData.per !== null && liveData.per > 0) comp.per = liveData.per;
                if (liveData.pbr !== null && liveData.pbr > 0) comp.pbr = liveData.pbr;
                if (liveData.divYield !== null) comp.dividendYield = liveData.divYield;
                updatedCount++;
            } else {
                failedCount++;
            }
            await sleep(30); // polite rate limit
        }
    }

    console.log(`Updated ${updatedCount} domestic stocks (Failed/Skipped: ${failedCount})`);

    // 3. Serialize back to industry_data.js
    const newContent = `/**
 * Core Global & Domestic Industry & Corporate Analysis Dataset
 * Markets: 국내 (KR - 78 Naver Industries, all 2,867 stocks), 미국 (US), 유럽 (EU), 일본 (JP), 중국 (CN)
 * Auto-updated by Daily Market Updater (Option A) at ${new Date().toISOString()}
 */

window.REGIONAL_INDUSTRY_DATA = ${JSON.stringify(regData, null, 2)};

// Backward-compatibility default
window.INDUSTRY_DATA = window.REGIONAL_INDUSTRY_DATA['국내'];

console.log("Unified Industry Data loaded for: 국내, 미국, 유럽, 일본, 중국.");
`;

    fs.writeFileSync('industry_data.js', newContent, 'utf8');
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`=== Market Data Update Finished in ${elapsed}s ===`);
}

if (require.main === module) {
    updateMarketData().catch(err => {
        console.error('Daily market update failed:', err);
        process.exit(1);
    });
}

module.exports = { updateMarketData };
