const fs = require('fs');
const axios = require('axios');

async function testExtract() {
    try {
        const { data } = await axios.get('https://www.feval.com/ficon/expositores-2024/');
        
        // Find blocks
        const colInnerBlocks = data.split('class="col-inner"');
        const records = [];
        
        for (let i = 1; i < colInnerBlocks.length; i++) {
            const block = colInnerBlocks[i];
            
            const hrefMatch = block.match(/<a[^>]+href=["']([^"']+)["']/i);
            const srcMatch = block.match(/<img[^>]+src=["']([^"']+)["']/i);
            
            if (hrefMatch && srcMatch) {
                const url = hrefMatch[1];
                const src = srcMatch[1];
                
                if (url.includes('feval.com') && !url.includes('ficon')) continue; // skip internal links that aren't exhibitors
                if (url.includes('wp-content')) continue; // skip file links
                
                let name = '';
                // Try to get name from src
                const filename = src.split('/').pop();
                const logoMatch = filename.match(/Logo-([a-zA-Z0-9_-]+)/i);
                if (logoMatch) {
                    name = logoMatch[1].replace(/[-_]/g, ' ').replace(/\d+x\d+/, '').trim().toUpperCase();
                } else {
                    // Fallback to domain
                    try {
                        const urlObj = new URL(url);
                        name = urlObj.hostname.replace('www.', '').split('.')[0].toUpperCase();
                    } catch(e) {
                        name = 'UNKNOWN';
                    }
                }
                
                records.push({ name, url });
            }
        }
        
        // Unique by URL
        const unique = [];
        const seen = new Set();
        for (let r of records) {
            if (!seen.has(r.url)) {
                seen.add(r.url);
                unique.push(r);
            }
        }
        
        console.log(`Found ${unique.length} companies.`);
        console.log(unique.slice(0, 10));
    } catch(e) {
        console.error(e.message);
    }
}
testExtract();
