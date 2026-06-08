const fs = require('fs');
const axios = require('axios');

async function testExtract() {
    try {
        const { data } = await axios.get('https://www.feval.com/fial/expositores/');
        
        // Strategy 1: Grid of col-inner
        const colInnerBlocks = data.split('class="col-inner"');
        const recordsGrid = [];
        for (let i = 1; i < colInnerBlocks.length; i++) {
            const block = colInnerBlocks[i];
            const hrefMatch = block.match(/<a[^>]+href=["']([^"']+)["']/i);
            const srcMatch = block.match(/<img[^>]+src=["']([^"']+)["']/i);
            if (hrefMatch && srcMatch) {
                const url = hrefMatch[1];
                if (url.includes('feval.com') && !url.includes('fial')) continue; 
                if (url.includes('wp-content')) continue; 
                recordsGrid.push(url);
            }
        }
        
        // Strategy 2: List of sectors
        const sectorRegex = /<a class="plain" href="([^"]+)"\s*>/g;
        let match;
        const sectors = [];
        while ((match = sectorRegex.exec(data)) !== null) {
            if (!sectors.includes(match[1])) {
                sectors.push(match[1]);
            }
        }
        
        // Strategy 3: Just links inside content?
        // Like FIO
        
        console.log(`Grid links found: ${recordsGrid.length}`);
        console.log(`Sectors found: ${sectors.length}`);
    } catch(e) {
        console.error(e.message);
    }
}
testExtract();
