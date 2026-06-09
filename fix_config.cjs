const fs = require('fs');
let content = fs.readFileSync('C:/MAMP/htdocs/STANDARTE_SVELTE/admin/email_campaing/config.php', 'utf8');

content = content.replace(/'cta' => 'DISEÑAR MI STAND',/g, "'cta' => 'PRESUPUESTO EN 24 H',");
content = content.replace(/'cta' => 'DESIGN MY STAND'/g, "'cta' => 'QUOTE IN 24 H'");
content = content.replace(/'cta' => 'MESSESTAND ENTWERFEN'/g, "'cta' => 'ANGEBOT IN 24 H'");
content = content.replace(/'cta' => 'PROJETAR O MEU STAND'/g, "'cta' => 'ORÇAMENTO EM 24 H'");

// Use regex replacement for the garbled ones
content = content.replace(/'zh' => array\([\s\S]*?'cta' => '.*?'\n\s*\)/g, match => {
    return match.replace(/'cta' => '.*?'/, "'cta' => '24小时内报价'");
});

content = content.replace(/'hi' => array\([\s\S]*?'cta' => '.*?'\n\s*\)/g, match => {
    return match.replace(/'cta' => '.*?'/, "'cta' => '24 घंटे में कोटेशन'");
});

fs.writeFileSync('C:/MAMP/htdocs/STANDARTE_SVELTE/admin/email_campaing/config.php', content, 'utf8');
console.log('Updated config.php with correct CTA translations');
