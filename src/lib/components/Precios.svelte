<script>
  import { pathFor, languages, languageLabels } from '$lib/siteData.js';
  import FlagIcon from './FlagIcon.svelte';

  export let data;
  $: lang = data.lang;
  $: copy = data.copy;
  $: canonical = data.canonical;

  let menuOpen = false;
  let isScrolled = false;

  // ⚠️ CIFRAS PROVISIONALES — sustituir por las estimaciones reales del usuario.
  // priceFrom en euros; se muestran como "desde X €" formateadas con separador de miles.
  const tiers = [
    { key: 'modular', priceFrom: 4900 },
    { key: 'medida', priceFrom: 9900 },
    { key: 'premium', priceFrom: 24000 },
    { key: 'singular', priceFrom: 60000 }
  ];
  const fmt = (n) => n.toLocaleString('es-ES');

  const texts = {
    es: {
      navPrecios: 'Precios', metaTitle: 'Precios de stands para ferias | Standarte', metaDesc: 'Precios orientativos de diseño y montaje de stands: desde stands modulares hasta proyectos premium llave en mano. Mostramos todo el rango con cifras desde.',
      heroTitle: 'Precios', from: 'desde',
      intro: 'Trabajamos todo el rango, del stand modular al gran proyecto llave en mano. Estos son precios orientativos «desde» para que te hagas una idea; el presupuesto final depende de los metros, el diseño y los servicios.',
      tiers: {
        modular: { name: 'Stand modular', desc: 'Sistemas reutilizables de montaje rápido. Ideal para ferias pequeñas y medianas o presencia recurrente.' },
        medida: { name: 'Stand a medida', desc: 'Diseño 100% personalizado fabricado en nuestro taller de carpintería, sin límites de catálogo.' },
        premium: { name: 'Stand premium', desc: 'Gran formato, doble altura, materiales nobles e iluminación de autor para máximo impacto.' },
        singular: { name: 'Proyectos singulares', desc: 'Stands singulares y grandes eventos con gestión integral, también en ferias internacionales.' }
      },
      disclaimer: 'Precios orientativos sin IVA. El presupuesto final se ajusta a tus metros cuadrados, al diseño y a los servicios contratados.',
      cta: 'Pídenos presupuesto a medida'
    },
    en: {
      navPrecios: 'Prices', metaTitle: 'Exhibition stand prices | Standarte', metaDesc: 'Indicative prices for exhibition stand design and assembly: from modular stands to premium turnkey projects. The full range with "from" figures.',
      heroTitle: 'Prices', from: 'from',
      intro: 'We cover the full range, from the modular stand to the large turnkey project. These are indicative "from" prices to give you an idea; the final quote depends on the square metres, the design and the services.',
      tiers: {
        modular: { name: 'Modular stand', desc: 'Reusable, quick-to-build systems. Ideal for small and medium fairs or recurring presence.' },
        medida: { name: 'Custom stand', desc: 'Fully bespoke design built in our own carpentry workshop, with no catalogue limits.' },
        premium: { name: 'Premium stand', desc: 'Large format, double height, fine materials and signature lighting for maximum impact.' },
        singular: { name: 'Signature projects', desc: 'One-off stands and large events with full project management, including international fairs.' }
      },
      disclaimer: 'Indicative prices, VAT not included. The final quote is adjusted to your square metres, the design and the contracted services.',
      cta: 'Ask us for a tailored quote'
    },
    de: {
      navPrecios: 'Preise', metaTitle: 'Preise für Messestände | Standarte', metaDesc: 'Richtpreise für Design und Montage von Messeständen: vom modularen Stand bis zum schlüsselfertigen Premium-Projekt. Die gesamte Bandbreite mit „ab"-Preisen.',
      heroTitle: 'Preise', from: 'ab',
      intro: 'Wir decken die gesamte Bandbreite ab, vom modularen Stand bis zum großen schlüsselfertigen Projekt. Dies sind unverbindliche „ab"-Preise zur Orientierung; das endgültige Angebot hängt von Quadratmetern, Design und Leistungen ab.',
      tiers: {
        modular: { name: 'Modularer Stand', desc: 'Wiederverwendbare Systeme mit schneller Montage. Ideal für kleine und mittlere Messen oder wiederkehrende Auftritte.' },
        medida: { name: 'Maßgefertigter Stand', desc: 'Vollständig individuelles Design aus unserer eigenen Tischlerei, ohne Katalogvorgaben.' },
        premium: { name: 'Premium-Stand', desc: 'Großformat, doppelte Höhe, edle Materialien und besondere Beleuchtung für maximale Wirkung.' },
        singular: { name: 'Sonderprojekte', desc: 'Einzigartige Stände und Großveranstaltungen mit Komplettmanagement, auch auf internationalen Messen.' }
      },
      disclaimer: 'Richtpreise zzgl. MwSt. Das endgültige Angebot richtet sich nach Ihren Quadratmetern, dem Design und den beauftragten Leistungen.',
      cta: 'Fordern Sie ein individuelles Angebot an'
    },
    pt: {
      navPrecios: 'Preços', metaTitle: 'Preços de stands para feiras | Standarte', metaDesc: 'Preços orientativos de design e montagem de stands: do stand modular ao projeto premium chave na mão. Todo o leque com valores "desde".',
      heroTitle: 'Preços', from: 'desde',
      intro: 'Trabalhamos todo o leque, do stand modular ao grande projeto chave na mão. Estes são preços orientativos «desde» para ter uma ideia; o orçamento final depende dos metros, do design e dos serviços.',
      tiers: {
        modular: { name: 'Stand modular', desc: 'Sistemas reutilizáveis de montagem rápida. Ideal para feiras pequenas e médias ou presença recorrente.' },
        medida: { name: 'Stand à medida', desc: 'Design 100% personalizado fabricado na nossa oficina de marcenaria, sem limites de catálogo.' },
        premium: { name: 'Stand premium', desc: 'Grande formato, dupla altura, materiais nobres e iluminação de autor para máximo impacto.' },
        singular: { name: 'Projetos singulares', desc: 'Stands singulares e grandes eventos com gestão integral, também em feiras internacionais.' }
      },
      disclaimer: 'Preços orientativos sem IVA. O orçamento final ajusta-se aos seus metros quadrados, ao design e aos serviços contratados.',
      cta: 'Peça-nos um orçamento à medida'
    },
    fr: {
      navPrecios: 'Tarifs', metaTitle: 'Tarifs de stands pour salons | Standarte', metaDesc: 'Tarifs indicatifs de conception et montage de stands : du stand modulaire au projet premium clé en main. Toute la gamme avec des prix « à partir de ».',
      heroTitle: 'Tarifs', from: 'à partir de',
      intro: 'Nous couvrons toute la gamme, du stand modulaire au grand projet clé en main. Voici des tarifs indicatifs « à partir de » pour vous donner une idée ; le devis final dépend des mètres carrés, du design et des services.',
      tiers: {
        modular: { name: 'Stand modulaire', desc: 'Systèmes réutilisables à montage rapide. Idéal pour les petits et moyens salons ou une présence récurrente.' },
        medida: { name: 'Stand sur mesure', desc: 'Design 100 % personnalisé fabriqué dans notre propre atelier de menuiserie, sans limites de catalogue.' },
        premium: { name: 'Stand premium', desc: 'Grand format, double hauteur, matériaux nobles et éclairage signature pour un impact maximal.' },
        singular: { name: 'Projets singuliers', desc: 'Stands uniques et grands événements avec gestion intégrale, y compris sur les salons internationaux.' }
      },
      disclaimer: 'Tarifs indicatifs hors TVA. Le devis final s\'ajuste à vos mètres carrés, au design et aux services retenus.',
      cta: 'Demandez un devis sur mesure'
    },
    it: {
      navPrecios: 'Prezzi', metaTitle: 'Prezzi di stand fieristici | Standarte', metaDesc: 'Prezzi indicativi di progettazione e montaggio di stand: dallo stand modulare al progetto premium chiavi in mano. Tutta la gamma con cifre "a partire da".',
      heroTitle: 'Prezzi', from: 'a partire da',
      intro: 'Copriamo tutta la gamma, dallo stand modulare al grande progetto chiavi in mano. Questi sono prezzi indicativi «a partire da» per darti un\'idea; il preventivo finale dipende dai metri, dal design e dai servizi.',
      tiers: {
        modular: { name: 'Stand modulare', desc: 'Sistemi riutilizzabili di rapido montaggio. Ideale per fiere piccole e medie o presenza ricorrente.' },
        medida: { name: 'Stand su misura', desc: 'Design 100% personalizzato realizzato nel nostro laboratorio di falegnameria, senza limiti di catalogo.' },
        premium: { name: 'Stand premium', desc: 'Grande formato, doppia altezza, materiali pregiati e illuminazione d\'autore per il massimo impatto.' },
        singular: { name: 'Progetti singolari', desc: 'Stand unici e grandi eventi con gestione integrale, anche in fiere internazionali.' }
      },
      disclaimer: 'Prezzi indicativi IVA esclusa. Il preventivo finale si adatta ai tuoi metri quadrati, al design e ai servizi richiesti.',
      cta: 'Richiedi un preventivo su misura'
    },
    nl: {
      navPrecios: 'Prijzen', metaTitle: 'Prijzen van beursstands | Standarte', metaDesc: 'Indicatieve prijzen voor ontwerp en montage van beursstands: van modulaire stand tot premium sleutelklaar project. Het volledige bereik met "vanaf"-bedragen.',
      heroTitle: 'Prijzen', from: 'vanaf',
      intro: 'We dekken het volledige bereik, van de modulaire stand tot het grote sleutelklare project. Dit zijn indicatieve "vanaf"-prijzen om u een idee te geven; de uiteindelijke offerte hangt af van de vierkante meters, het ontwerp en de diensten.',
      tiers: {
        modular: { name: 'Modulaire stand', desc: 'Herbruikbare, snel te bouwen systemen. Ideaal voor kleine en middelgrote beurzen of terugkerende aanwezigheid.' },
        medida: { name: 'Stand op maat', desc: 'Volledig op maat gemaakt ontwerp uit onze eigen timmerwerkplaats, zonder cataloguslimieten.' },
        premium: { name: 'Premium stand', desc: 'Groot formaat, dubbele hoogte, edele materialen en signatuurverlichting voor maximale impact.' },
        singular: { name: 'Bijzondere projecten', desc: 'Unieke stands en grote evenementen met volledig projectbeheer, ook op internationale beurzen.' }
      },
      disclaimer: 'Indicatieve prijzen, exclusief btw. De uiteindelijke offerte wordt afgestemd op uw vierkante meters, het ontwerp en de afgenomen diensten.',
      cta: 'Vraag een offerte op maat aan'
    },
    zh: {
      navPrecios: '价格', metaTitle: '展台价格 | Standarte', metaDesc: '展台设计与搭建的参考价格：从模块化展台到高端交钥匙项目，涵盖全部价位，以"起价"展示。',
      heroTitle: '价格', from: '起价',
      intro: '我们覆盖全部价位，从模块化展台到大型交钥匙项目。以下为参考"起价"，供您大致了解；最终报价取决于面积、设计与所含服务。',
      tiers: {
        modular: { name: '模块化展台', desc: '可重复使用、搭建快速的系统。适合中小型展会或经常参展。' },
        medida: { name: '定制展台', desc: '在我们自有木工厂完全定制，不受目录限制。' },
        premium: { name: '高端展台', desc: '大尺寸、双层结构、高级材料与专属灯光，营造最大冲击力。' },
        singular: { name: '特别项目', desc: '独特展台与大型活动，提供全程统筹，亦含国际展会。' }
      },
      disclaimer: '参考价格，不含增值税。最终报价将根据您的面积、设计与所选服务进行调整。',
      cta: '向我们索取定制报价'
    },
    hi: {
      navPrecios: 'मूल्य', metaTitle: 'स्टैंड के मूल्य | Standarte', metaDesc: 'स्टैंड डिज़ाइन और असेंबली के अनुमानित मूल्य: मॉड्यूलर स्टैंड से लेकर प्रीमियम टर्नकी प्रोजेक्ट तक—पूरी रेंज "से" आँकड़ों के साथ।',
      heroTitle: 'मूल्य', from: 'से',
      intro: 'हम पूरी रेंज पर काम करते हैं—मॉड्यूलर स्टैंड से लेकर बड़े टर्नकी प्रोजेक्ट तक। ये अनुमानित "से" मूल्य हैं ताकि आपको अंदाज़ा हो; अंतिम बजट वर्ग मीटर, डिज़ाइन और सेवाओं पर निर्भर करता है।',
      tiers: {
        modular: { name: 'मॉड्यूलर स्टैंड', desc: 'पुन: प्रयोज्य, जल्दी बनने वाले सिस्टम। छोटे-मध्यम मेलों या नियमित उपस्थिति के लिए आदर्श।' },
        medida: { name: 'कस्टम स्टैंड', desc: 'हमारी अपनी बढ़ईगीरी कार्यशाला में पूरी तरह कस्टम डिज़ाइन, बिना किसी कैटलॉग सीमा के।' },
        premium: { name: 'प्रीमियम स्टैंड', desc: 'बड़ा आकार, दोहरी ऊँचाई, उत्कृष्ट सामग्री और विशिष्ट प्रकाश—अधिकतम प्रभाव के लिए।' },
        singular: { name: 'विशेष परियोजनाएँ', desc: 'अनूठे स्टैंड और बड़े आयोजन, पूर्ण प्रबंधन के साथ, अंतरराष्ट्रीय मेलों सहित।' }
      },
      disclaimer: 'अनुमानित मूल्य, GST के बिना। अंतिम बजट आपके वर्ग मीटर, डिज़ाइन और चुनी गई सेवाओं के अनुसार समायोजित होता है।',
      cta: 'अनुकूलित बजट के लिए संपर्क करें'
    },
    ko: {
      navPrecios: '가격', metaTitle: '부스 가격 | Standarte', metaDesc: '부스 디자인 및 조립 참고 가격: 모듈형 부스부터 프리미엄 턴키 프로젝트까지 전 범위를 "부터" 금액으로 안내합니다.',
      heroTitle: '가격', from: '부터',
      intro: '모듈형 부스부터 대형 턴키 프로젝트까지 전 범위를 다룹니다. 다음은 참고용 "부터" 가격으로, 대략적인 감을 드리기 위한 것입니다. 최종 견적은 면적, 디자인, 서비스에 따라 달라집니다.',
      tiers: {
        modular: { name: '모듈형 부스', desc: '재사용 가능하고 빠르게 시공되는 시스템. 중소형 전시회나 정기 참가에 적합합니다.' },
        medida: { name: '맞춤형 부스', desc: '자체 목공 공장에서 100% 맞춤 제작, 카탈로그 제한이 없습니다.' },
        premium: { name: '프리미엄 부스', desc: '대형, 복층 구조, 고급 소재와 감각적인 조명으로 최대의 임팩트를 줍니다.' },
        singular: { name: '특별 프로젝트', desc: '국제 전시회를 포함해 전체 관리가 포함된 독창적 부스와 대형 이벤트.' }
      },
      disclaimer: '참고 가격이며 부가세 별도입니다. 최종 견적은 면적, 디자인, 계약 서비스에 따라 조정됩니다.',
      cta: '맞춤 견적 문의하기'
    },
    ja: {
      navPrecios: '料金', metaTitle: '展示会ブースの料金 | Standarte', metaDesc: '展示会ブースの設計・施工の目安料金：モジュール型ブースからプレミアムなターンキー案件まで、全範囲を「〜から」で掲載。',
      heroTitle: '料金', from: '',
      intro: 'モジュール型ブースから大型のターンキー案件まで、全範囲に対応します。以下はおおよその目安となる「〜から」の料金です。最終的なお見積りは、面積・デザイン・サービス内容によって異なります。',
      tiers: {
        modular: { name: 'モジュール型ブース', desc: '再利用可能で短時間に設営できるシステム。中小規模の展示会や定期出展に最適です。' },
        medida: { name: 'オーダーメイドブース', desc: '自社木工房による100%カスタム設計。カタログの制約はありません。' },
        premium: { name: 'プレミアムブース', desc: '大型・二層構造、上質な素材とこだわりの照明で、最大のインパクトを実現します。' },
        singular: { name: '特別プロジェクト', desc: '国際展示会を含め、一貫したマネジメントによる唯一無二のブースや大型イベント。' }
      },
      disclaimer: '目安料金（税抜）です。最終的なお見積りは、面積・デザイン・ご依頼内容に応じて調整します。',
      cta: 'オーダーメイドのお見積りを依頼する'
    }
  };

  $: t = texts[lang] || texts.es;
  // Sufijo de moneda: "X €" salvo en idiomas que anteponen (ja usa "から" tras la cifra).
  $: priceStr = (n) => lang === 'ja' ? `${fmt(n)} €から` : `${t.from} ${fmt(n)} €`.trim();

  const ctaLabels = {
    es: 'Presupuesto en 24h', en: 'Quote in 24h', de: 'Angebot in 24 Std.', pt: 'Orçamento em 24h', fr: 'Devis en 24h',
    it: 'Preventivo in 24h', nl: 'Offerte in 24u', zh: '24小时报价', hi: '24 घंटे में कोटेशन', ko: '24시간 내 견적', ja: '24時間で見積もり'
  };
</script>

<svelte:head>
  <title>{t.metaTitle}</title>
  <meta name="description" content={t.metaDesc} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <link rel="canonical" href={canonical} />
  {#each languages as alt}
    <link rel="alternate" hreflang={alt} href={`https://standarte.es${pathFor(alt, 'precios')}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`https://standarte.es${pathFor('es', 'precios')}`} />
</svelte:head>

<header class="site-header static-header">
  <nav class="nav" class:scrolled={isScrolled}>
    <a class="brand" href={pathFor(lang, 'home')} aria-label="Standarte"></a>
    <div class="nav-right">
      <div class="lang-menu lang-menu-mobile">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a href={pathFor(option, 'precios')} class:active={option === lang} style="display:flex;align-items:center;gap:8px;">
              <FlagIcon langCode={option} size={16} /><span>{languageLabels[option]}</span>
            </a>
          {/each}
        </div>
      </div>
      <button class="menu-toggle" type="button" aria-label="Menu" on:click={() => (menuOpen = !menuOpen)}>☰</button>
    </div>
    <div class:open={menuOpen} class="nav-links">
      <a href={pathFor(lang, 'home')}>{copy.nav.home}</a>
      <a href={pathFor(lang, 'services')}>{copy.nav.services}</a>
      <a href={pathFor(lang, 'custom')}>{copy.nav.custom}</a>
      <a href={pathFor(lang, 'precios')} class="active">{t.navPrecios}</a>
      <a href={pathFor(lang, 'noticias')}>{copy.nav.noticias}</a>
      <div class="lang-menu lang-menu-desktop">
        <span role="button" tabindex="0" aria-haspopup="true" aria-label="Language selector"><FlagIcon langCode={lang} size={20} /></span>
        <div>
          {#each languages as option}
            <a href={pathFor(option, 'precios')} class:active={option === lang} style="display:flex;align-items:center;gap:8px;">
              <FlagIcon langCode={option} size={16} /><span>{languageLabels[option]}</span>
            </a>
          {/each}
        </div>
      </div>
      <a href={pathFor(lang, 'contact')} class="nav-cta-btn">{ctaLabels[lang] || ctaLabels.es}</a>
    </div>
  </nav>
  <div class="hero-subpage">
    <div class="hero-contents">
      <h1>{t.heroTitle}</h1>
    </div>
  </div>
</header>

<main class="precios-page">
  <p class="precios-intro">{t.intro}</p>

  <div class="precios-grid">
    {#each tiers as tier}
      <article class="precio-card">
        <h2>{t.tiers[tier.key].name}</h2>
        <p class="precio-amount">{priceStr(tier.priceFrom)}</p>
        <p class="precio-desc">{t.tiers[tier.key].desc}</p>
      </article>
    {/each}
  </div>

  <p class="precios-disclaimer">{t.disclaimer}</p>
  <div class="precios-cta">
    <a href={pathFor(lang, 'contact')} class="btn-cta-gold">{t.cta}</a>
  </div>
</main>

<footer class="footer">
  <div class="footer-bottom">
    <p>&copy; {new Date().getFullYear()} {copy.footer}</p>
    <div class="footer-links">
      <a href="/legal">{copy.legal.legalNotice}</a>
      <a href="/privacidad">{copy.legal.privacy}</a>
      <a href="/cookies">{copy.legal.cookies}</a>
    </div>
  </div>
</footer>

<style>
  .precios-page {
    max-width: var(--container);
    margin: 0 auto;
    padding: 50px 15px 90px;
    background-color: #f7f6f1;
  }
  .precios-intro {
    max-width: 760px;
    margin: 0 auto 40px;
    text-align: center;
    font-size: 17px;
    line-height: 1.6;
    color: #444;
  }
  .precios-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 22px;
  }
  @media (max-width: 1024px) { .precios-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .precios-grid { grid-template-columns: 1fr; } }
  .precio-card {
    background: #fff;
    border: 1px solid rgba(22, 25, 28, 0.06);
    border-radius: 12px;
    padding: 30px 24px;
    box-shadow: 0 8px 24px rgba(22, 25, 28, 0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .precio-card h2 {
    margin: 0;
    color: #444;
    font-family: 'Francois One', serif;
    font-weight: 400;
    font-size: 22px;
  }
  .precio-amount {
    margin: 0;
    color: #111;
    font-family: 'Francois One', serif;
    font-size: 26px;
  }
  .precio-desc {
    margin: 0;
    color: #555;
    font-size: 15px;
    line-height: 1.55;
  }
  .precios-disclaimer {
    max-width: 760px;
    margin: 34px auto 24px;
    text-align: center;
    font-size: 13px;
    color: #888;
    line-height: 1.5;
  }
  .precios-cta {
    text-align: center;
  }
  .btn-cta-gold {
    display: inline-block;
    background-color: var(--gold);
    color: #111;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 15px;
    padding: 14px 32px;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(255, 200, 0, 0.2);
    transition: all 0.25s ease;
  }
  .btn-cta-gold:hover { background-color: #e6b400; transform: translateY(-2px); }
</style>
