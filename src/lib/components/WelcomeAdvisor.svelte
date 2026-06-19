<script>
  import { createEventDispatcher } from 'svelte';
  import { fairsData } from '$lib/fairsData.js';
  import { cityData } from '$lib/siteData.js';

  export let lang = 'en';

  const dispatch = createEventDispatcher();

  let selectedCity = '';

  const cityKeys = ['madrid', 'lisboa', 'bilbao', 'barcelona', 'malaga', 'badajoz', 'sevilla', 'ciudad_real', 'zaragoza'];

  const cityKeyToFairCityName = {
    madrid: 'Madrid',
    lisboa: 'Lisboa',
    bilbao: 'Bilbao',
    barcelona: 'Barcelona',
    malaga: 'Málaga',
    badajoz: 'Badajoz',
    sevilla: 'Sevilla',
    ciudad_real: 'Ciudad Real',
    zaragoza: 'Zaragoza'
  };

  const texts = {
    en: {
      title: "Hi! I'm Pat.",
      intro: "If you are looking to exhibit in Spain and Portugal, I can advise you on choosing the key events.",
      instruction: "Select a city and I will show you the key trade shows you shouldn't miss:",
      cta: "Get a quote for this fair"
    },
    pt: {
      title: "Olá!, sou a Pat.",
      intro: "Se procura estabelecer-se em Espanha e Portugal, posso aconselhá-lo na escolha dos eventos fundamentais.",
      instruction: "Escolha a cidade e eu mostrar-lhe-ei os eventos imperdíveis:",
      cta: "Pedir orçamento para esta feira"
    },
    de: {
      title: "Hallo!, ich bin Pat.",
      intro: "Wenn Sie in Spanien und Portugal ausstellen möchten, kann ich Sie bei der Auswahl der wichtigsten Messen beraten.",
      instruction: "Wählen Sie die Stadt und ich zeige Ihnen die wichtigsten Events, die Sie nicht verpassen dürfen:",
      cta: "Angebot für diese Messe anfordern"
    },
    fr: {
      title: "Bonjour !, je suis Pat.",
      intro: "Si vous cherchez à vous implanter en Espagne et au Portugal, je peux vous conseiller pour choisir les événements de premier plan.",
      instruction: "Choisissez la ville et je vous montrerai les salons incontournables à ne pas manquer :",
      cta: "Demander un devis pour ce salon"
    },
    it: {
      title: "Ciao!, sono Pat.",
      intro: "Se desideri esporre in Spagna e Portogallo, posso consigliarti nella scelta degli eventi chiave.",
      instruction: "Scegli la città e ti mostrerò gli eventi imperdibili a cui non puoi mancare:",
      cta: "Richiedi un preventivo per questa fiera"
    },
    nl: {
      title: "Hallo!, ik ben Pat.",
      intro: "Als u wilt exposeren in Spanje en Portugal, kan ik u adviseren bij het kiezen van de belangrijkste evenementen.",
      instruction: "Kies de stad en ik laat u de belangrijkste evenementen zien die u niet mag missen:",
      cta: "Vraag een offerte aan voor deze beurs"
    },
    zh: {
      title: "你好！我是 Pat。",
      intro: "如果您想在西班牙和葡萄牙参展，我可以为您提供选择关键展会的建议。",
      instruction: "选择城市，我将为您展示不容错过的关键活动：",
      cta: "索取该展会的报价"
    },
    hi: {
      title: "नमस्ते!, मैं Pat हूँ।",
      intro: "यदि आप स्पेन और पुर्तgaल में प्रदर्शन करना चाहते हैं, तो मैं आपको प्रमुख कार्यक्रमों को चुनने में सलाह दे सकती हूँ।",
      instruction: "शहर चुनें और मैं आपको वे प्रमुख कार्यक्रम दिखाऊँगी जिन्हें आप मिस नहीं कर सकते:",
      cta: "इस मेले के लिए कोटेशन प्राप्त करें"
    },
    ko: {
      title: "안녕하세요! Pat입니다.",
      intro: "스페인과 포르투갈에서 전시회를 준비 중이시라면, 핵심 이벤트를 선택할 수 있도록 조언해 드릴 수 있습니다.",
      instruction: "도시를 선택하시면 절대 놓쳐서는 안 될 주요 전시회를 보여드리겠습니다:",
      cta: "이 전시회 견적 요청하기"
    },
    ja: {
      title: "こんにちは！Patです。",
      intro: "スペインやポルトガルでの出展をお考えなら、主要なイベント選びのアドバイスをいたします。",
      instruction: "都市を選択してください。見逃せない主要な展示会をご案内します：",
      cta: "この展示会の見積もりを依頼する"
    }
  };

  $: t = texts[lang] || texts.en;

  $: selectedCityName = cityKeyToFairCityName[selectedCity];
  $: cityFairs = selectedCityName 
    ? fairsData.filter(f => f.city === selectedCityName)
    : [];

  function selectCity(cityKey) {
    selectedCity = cityKey;
  }

  function handleFairClick(fairName, cityKey) {
    const cityName = cityData[cityKey]?.city?.[lang] || cityData[cityKey]?.city?.es || cityKey;
    dispatch('selectFair', { fairName, cityName });
  }
</script>

<section class="welcome-advisor-container">
  <div class="welcome-advisor-card">
    <div class="advisor-profile">
      <img
        class="advisor-photo"
        src="/img/team/patricia_jimenez.avif"
        srcset="/img/team/patricia_jimenez-mobile.avif 400w, /img/team/patricia_jimenez.avif 1920w"
        sizes="100px"
        alt="Patricia Jiménez (Pat)"
        loading="lazy"
        decoding="async"
      />
      <div class="advisor-bubble">
        <h3 class="advisor-name">{t.title}</h3>
        <p class="advisor-intro">{t.intro}</p>
        <p class="advisor-instruction">{t.instruction}</p>
      </div>
    </div>

    <!-- Step 1: City selector -->
    <div class="city-selector-grid">
      {#each cityKeys as ck}
        <button
          type="button"
          class="city-selector-btn"
          class:selected={selectedCity === ck}
          on:click={() => selectCity(ck)}
        >
          {cityData[ck]?.city?.[lang] || cityData[ck]?.city?.es || ck}
        </button>
      {/each}
    </div>

    <!-- Step 2: Fairs list -->
    {#if selectedCity && cityFairs.length > 0}
      <div class="fairs-list-container">
        <ul class="fairs-advisor-list">
          {#each cityFairs as fair}
            <li class="fair-advisor-item">
              <div class="fair-info">
                <span class="fair-badge-flag flag-{fair.country}"></span>
                <span class="fair-name-text">{fair.name}</span>
                {#if fair.sector}
                  <span class="fair-sector-text">({fair.sector})</span>
                {/if}
              </div>
              <button
                type="button"
                class="fair-select-cta"
                on:click={() => handleFairClick(fair.name, selectedCity)}
              >
                {t.cta} →
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</section>

<style>
  .welcome-advisor-container {
    max-width: var(--container);
    margin: 40px auto;
    padding: 0 15px;
  }

  .welcome-advisor-card {
    background: #fdfdfb;
    border: 1px solid #e2e2de;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  .advisor-profile {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  .advisor-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--gold);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
  }

  .advisor-bubble {
    background: #f4f4f2;
    border-radius: 12px;
    padding: 20px;
    position: relative;
    flex-grow: 1;
  }

  .advisor-bubble::after {
    content: '';
    position: absolute;
    left: -10px;
    top: 30px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #f4f4f2;
  }

  .advisor-name {
    margin: 0 0 8px 0;
    color: #111;
    font-family: 'Glegoo', serif;
    font-size: 20px;
    font-weight: 700;
  }

  .advisor-intro, .advisor-instruction {
    margin: 0 0 8px 0;
    font-size: 15px;
    line-height: 1.5;
    color: #444;
  }

  .advisor-instruction {
    margin-bottom: 0;
    font-weight: 600;
    color: #111;
  }

  .city-selector-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
  }

  .city-selector-btn {
    background: #fff;
    border: 1px solid #d2d2cd;
    border-radius: 30px;
    padding: 10px 16px;
    font-family: 'Inconsolata', monospace;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: center;
  }

  .city-selector-btn:hover {
    border-color: var(--gold);
    background: #fffdf6;
  }

  .city-selector-btn.selected {
    background: var(--gold);
    border-color: var(--gold);
    color: #111;
    box-shadow: 0 4px 10px rgba(255, 200, 0, 0.25);
  }

  .fairs-list-container {
    background: #fff;
    border: 1px solid #e7e7e3;
    border-radius: 8px;
    padding: 8px 0;
    max-height: 320px;
    overflow-y: auto;
  }

  .fairs-advisor-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .fair-advisor-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    border-bottom: 1px solid #f4f4f2;
    gap: 16px;
  }

  .fair-advisor-item:last-child {
    border-bottom: none;
  }

  .fair-info {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .fair-badge-flag {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 50%;
  }

  .flag-es {
    background: linear-gradient(180deg, #aa151b 0%, #aa151b 25%, #f1bf00 25%, #f1bf00 75%, #aa151b 75%, #aa151b 100%);
  }
  .flag-pt {
    background: linear-gradient(90deg, #006600 0%, #006600 42%, #ff0000 42%, #ff0000 100%);
  }

  .fair-name-text {
    font-weight: 700;
    font-size: 15px;
    color: #111;
  }

  .fair-sector-text {
    color: #777;
    font-size: 13px;
  }

  .fair-select-cta {
    background: #111;
    color: #fff;
    border: 0;
    border-radius: 30px;
    padding: 8px 16px;
    font-family: 'Glegoo', serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .fair-select-cta:hover {
    background: var(--gold);
    color: #111;
  }

  @media (max-width: 768px) {
    .advisor-profile {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
    }

    .advisor-bubble::after {
      display: none;
    }

    .fair-advisor-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .fair-select-cta {
      width: 100%;
      text-align: center;
    }
  }
</style>
