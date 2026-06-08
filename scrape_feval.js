import fs from 'fs';

async function scrape() {
  const baseUrl = 'https://www.feval.com/agroexpo/expositores-2026-por-sectores-2/';
  const mainBase = 'https://www.feval.com/agroexpo/';
  
  console.log('Fetching main page...');
  const res = await fetch(baseUrl);
  const html = await res.text();
  
  // Extract sector links
  const sectorRegex = /<a class="plain" href="([^"]+)"\s*>/g;
  let match;
  const sectors = [];
  while ((match = sectorRegex.exec(html)) !== null) {
    if (!sectors.includes(match[1])) {
      sectors.push(match[1]);
    }
  }
  
  console.log(`Found ${sectors.length} sectors.`);
  
  let csvContent = "Name,Website,Group Membership\n";
  const groupName = "AGROEXPO FEVAL DON DENITO ::: 28 Ene";
  
  for (const sectorPath of sectors) {
    const sectorUrl = sectorPath.startsWith('http') ? sectorPath : mainBase + sectorPath;
    console.log(`Fetching sector: ${sectorUrl}`);
    try {
        const sectorRes = await fetch(sectorUrl);
        const sectorHtml = await sectorRes.text();
        
        // Match <div class="col-inner"> ... <a href="WEBSITE"> ... <p>COMPANY NAME</p>
        // Regex to find blocks of col-inner
        const colInnerBlocks = sectorHtml.split('class="col-inner"');
        for (let i = 1; i < colInnerBlocks.length; i++) {
            const block = colInnerBlocks[i];
            
            let website = "";
            const hrefMatch = block.match(/href="([^"]+)"/);
            if (hrefMatch) {
                website = hrefMatch[1];
            }
            
            let name = "";
            // Find text in <p> or <span> after the link
            const pMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/);
            if (pMatch) {
                name = pMatch[1].replace(/<[^>]+>/g, '').trim().replace(/&nbsp;/g, ' ').replace(/\n/g, ' ');
            }
            
            if (name && website && !website.includes('wp-content/uploads')) {
                // Ensure escaping of CSV fields
                const safeName = `"${name.replace(/"/g, '""')}"`;
                const safeWebsite = `"${website.replace(/"/g, '""')}"`;
                const safeGroup = `"${groupName} ::: ${sectorPath}"`;
                csvContent += `${safeName},${safeWebsite},${safeGroup}\n`;
            }
        }
    } catch(e) {
        console.error(e);
    }
  }
  
  fs.writeFileSync('contactos_agroexpo.csv', csvContent);
  console.log('Saved to contactos_agroexpo.csv');
}

scrape();
