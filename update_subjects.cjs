const fs = require('fs');

function updateConfig() {
    const file = 'C:/MAMP/htdocs/STANDARTE_SVELTE/admin/email_campaing/config.php';
    let content = fs.readFileSync(file, 'utf8');

    // Global
    content = content.replace(/'subject'\s*=>\s*'[^']*\{\s*EMPRESA\s*\}[^']*',/g, "'subject' => 'Hola {EMPRESA}. Te ofrecemos un stand diferencial y un presupuesto en 24 H.',");

    // English
    content = content.replace(/'en'\s*=>\s*array\([\s\S]*?'subject'\s*=>\s*'[^']*',/g, match => {
        return match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'Hello {EMPRESA}. We offer you a distinctive stand and a quote in 24 H.'");
    });

    // German
    content = content.replace(/'de'\s*=>\s*array\([\s\S]*?'subject'\s*=>\s*'[^']*',/g, match => {
        return match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'Hallo {EMPRESA}. Wir bieten Ihnen einen einzigartigen Messestand und ein Angebot in 24 H.'");
    });

    // Portuguese
    content = content.replace(/'pt'\s*=>\s*array\([\s\S]*?'subject'\s*=>\s*'[^']*',/g, match => {
        return match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'Olá {EMPRESA}. Oferecemos-lhe um stand diferenciado e um orçamento em 24 H.'");
    });

    // Chinese
    content = content.replace(/'zh'\s*=>\s*array\([\s\S]*?'subject'\s*=>\s*'[^']*',/g, match => {
        return match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => '您好 {EMPRESA}。我们为您提供与众不同的展台和24小时内的报价。'");
    });

    // Hindi
    content = content.replace(/'hi'\s*=>\s*array\([\s\S]*?'subject'\s*=>\s*'[^']*',/g, match => {
        return match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'नमस्ते {EMPRESA}. हम आपको एक विशिष्ट स्टैंड और 24 घंटे में कोटेशन प्रदान करते हैं।'");
    });

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated config.php');
}

function updateCronDrip() {
    const file = 'C:/MAMP/htdocs/STANDARTE_SVELTE/admin/email_campaing/cron_drip.php';
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(/'es'\s*=>\s*array\(\s*'subject'\s*=>\s*'[^']*',/g, match => match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'Hola {{COMPANY}}. Te ofrecemos un stand diferencial y un presupuesto en 24 H.'"));
    
    content = content.replace(/'en'\s*=>\s*array\(\s*'subject'\s*=>\s*'[^']*',/g, match => match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'Hello {{COMPANY}}. We offer you a distinctive stand and a quote in 24 H.'"));
    
    content = content.replace(/'fr'\s*=>\s*array\(\s*'subject'\s*=>\s*'[^']*',/g, match => match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'Bonjour {{COMPANY}}. Nous vous offrons un stand différenciant et un devis en 24 H.'"));
    
    content = content.replace(/'pt'\s*=>\s*array\(\s*'subject'\s*=>\s*'[^']*',/g, match => match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'Olá {{COMPANY}}. Oferecemos-lhe um stand diferenciado e um orçamento em 24 H.'"));
    
    content = content.replace(/'de'\s*=>\s*array\(\s*'subject'\s*=>\s*'[^']*',/g, match => match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'Hallo {{COMPANY}}. Wir bieten Ihnen einen einzigartigen Messestand und ein Angebot in 24 H.'"));
    
    content = content.replace(/'it'\s*=>\s*array\(\s*'subject'\s*=>\s*'[^']*',/g, match => match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'Ciao {{COMPANY}}. Ti offriamo uno stand distintivo e un preventivo in 24 H.'"));
    
    content = content.replace(/'default'\s*=>\s*array\(\s*'subject'\s*=>\s*'[^']*',/g, match => match.replace(/'subject'\s*=>\s*'[^']*'/, "'subject' => 'Hello {{COMPANY}}. We offer you a distinctive stand and a quote in 24 H.'"));

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated cron_drip.php');
}

updateConfig();
updateCronDrip();
