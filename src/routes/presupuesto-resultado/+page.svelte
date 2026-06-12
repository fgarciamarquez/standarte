<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let status = 'superior';
  let lang = 'es';

  onMount(() => {
    status = $page.url.searchParams.get('status') || 'superior';
    lang = $page.url.searchParams.get('lang') || 'es';
    if (!['es', 'en', 'pt', 'de', 'fr'].includes(lang)) {
      lang = 'es';
    }
  });

  const texts = {
    es: {
      superior: {
        title: '¡Presupuesto Confirmado!',
        subtitle: 'Nos pondremos en contacto muy pronto',
        body: 'Hemos registrado tu respuesta con éxito. Un miembro de nuestro equipo comercial y de diseño se pondrá en contacto contigo en breve para dar forma a vuestro espacio.<br><br>Te recomendamos ir preparando un <strong>brief detallado</strong> de lo que deseas que tenga el stand, junto con <strong>ejemplos de stands que te gusten</strong>, y enviárnoslos a <a href="mailto:info@standarte.es" class="highlight">info@standarte.es</a> lo antes posible. Esto agilizará enormemente el proceso del diseño 3D.',
        badge: 'Cualificado'
      },
      inferior: {
        title: 'Agradecemos tu Interés',
        subtitle: 'Proceso de selección de solicitudes',
        body: 'Hemos recibido tu respuesta con éxito. Lamentablemente, debido al calendario de trabajo actual y a la capacidad limitada de nuestro taller creativo, no podemos llevar a cabo proyectos por debajo de la estimación de costes mínimos viables indicada.<br><br>Sinceramente deseamos que en un futuro podamos tener la ocasión de trabajar juntos y colaborar en proyectos que se ajusten a esta escala.',
        badge: 'Finalizado'
      },
      footer: 'Standarte — Diseño, fabricación y montaje premium de stands a medida.',
      back: 'Volver a la web'
    },
    en: {
      superior: {
        title: 'Budget Confirmed!',
        subtitle: 'We will be in touch very soon',
        body: 'Your response has been successfully recorded. A member of our commercial and design team will contact you shortly to start shaping your custom space.<br><br>We recommend preparing a <strong>detailed brief</strong> of your stand requirements, along with <strong>examples of stands you like</strong>, and sending them to <a href="mailto:info@standarte.es" class="highlight">info@standarte.es</a> as soon as possible. This will greatly speed up the 3D design process.',
        badge: 'Qualified'
      },
      inferior: {
        title: 'Thank You for Your Interest',
        subtitle: 'Application selection process',
        body: 'Your response has been successfully recorded. Unfortunately, due to our current workload and the limited capacity of our custom workshop, we cannot take on projects below the estimated minimum viable costs.<br><br>We sincerely hope that in the future we will have the opportunity to work together on projects that fit this scale.',
        badge: 'Completed'
      },
      footer: 'Standarte — Premium custom exhibition stand design, production, and installation.',
      back: 'Back to website'
    },
    pt: {
      superior: {
        title: 'Orçamento Confirmado!',
        subtitle: 'Entraremos em contacto muito em breve',
        body: 'A sua resposta foi registada com sucesso. Um membro da nossa equipa comercial e de design entrará em contacto consigo em breve para começar a planear o seu espaço.<br><br>Recomendamos que prepare um <strong>briefing detalhado</strong> do stand com os seus requisitos, juntamente com <strong>exemplos de stands que lhe agradem</strong>, e os envie para <a href="mailto:info@standarte.es" class="highlight">info@standarte.es</a> o mais rapidamente possível. Isso irá acelerar significativamente o processo de design 3D.',
        badge: 'Qualificado'
      },
      inferior: {
        title: 'Agradecemos o Seu Interesse',
        subtitle: 'Processo de seleção de candidaturas',
        body: 'A sua resposta foi registada com sucesso. Infelizmente, devido ao nosso volume de trabalho atual e à capacidade limitada da nossa oficina, não nos é possível realizar projetos abaixo do orçamento mínimo viável estimado.<br><br>Desejamos sinceramente que no futuro tenhamos a oportunidade de trabalhar juntos e colaborar em projetos que se adaptem a esta escala.',
        badge: 'Concluído'
      },
      footer: 'Standarte — Design, fabrico e montagem premium de stands personalizados.',
      back: 'Voltar ao site'
    },
    de: {
      superior: {
        title: 'Budget Bestätigt!',
        subtitle: 'Wir melden uns in Kürze bei Ihnen',
        body: 'Ihre Antwort wurde erfolgreich registriert. Ein Mitglied unseres Vertriebs- und Designteams wird sich in Kürze mit Ihnen in Verbindung setzen, um mit der Planung Ihres Standes zu beginnen.<br><br>Wir empfehlen Ihnen, ein <strong>detailliertes Briefing</strong> für Ihren Stand mit Beispielen vorzubereiten und diese so schnell wie möglich an <a href="mailto:info@standarte.es" class="highlight">info@standarte.es</a> zu senden. Dies wird den 3D-Designprozess erheblich beschleunigen.',
        badge: 'Qualifiziert'
      },
      inferior: {
        title: 'Vielen Dank für Ihr Interesse',
        subtitle: 'Vorauswahlverfahren für Anfragen',
        body: 'Ihre Antwort wurde erfolgreich registriert. Leider können wir aufgrund unserer aktuellen Auslastung und der begrenzten Kapazität unserer Manufaktur keine Projekte unter den angegebenen geschätzten Mindestkosten annehmen.<br><br>Wir hoffen aufrichtig, dass wir in Zukunft die Gelegenheit haben werden, bei Projekten dieser Größenordnung zusammenzuarbeiten.',
        badge: 'Beendet'
      },
      footer: 'Standarte — Premium-Design, Herstellung und Montage von maßgeschneiderten Messeständen.',
      back: 'Zurück zur Webseite'
    },
    fr: {
      superior: {
        title: 'Budget Confirmé !',
        subtitle: 'Nous vous contacterons très bientôt',
        body: 'Votre réponse a été enregistrée avec succès. Un membre de notre équipe commerciale et de design vous contactera sous peu pour commencer à concevoir votre espace.<br><br>Nous vous recommandons de préparer un <strong>brief détaillé</strong> du stand avec des exemples qui vous plaisent et de l\'envoyer à <a href="mailto:info@standarte.es" class="highlight">info@standarte.es</a> dès que possible. Cela accélérera grandement le processus de conception 3D.',
        badge: 'Qualifié'
      },
      inferior: {
        title: 'Merci pour Votre Intérêt',
        subtitle: 'Processus de sélection des demandes',
        body: 'Votre réponse a été enregistrée avec succès. Malheureusement, en raison de notre calendrier de travail actuel et de la capacité limitée de notre atelier de menuiserie, nous ne pouvons pas réaliser de projets inférieurs à l\'estimation des coûts minimaux viables indiquée.<br><br>Nous espérons sincèrement avoir l\'occasion de travailler ensemble à l\'avenir sur des projets adaptés à cette envergure.',
        badge: 'Terminé'
      },
      footer: 'Standarte — Conception, fabrication et installation haut de gamme de stands sur mesure.',
      back: 'Retour au site'
    }
  };

  $: t = texts[lang] || texts.es;
  $: content = status === 'inferior' ? t.inferior : t.superior;
</script>

<div class="result-page">
  <header class="header">
    <div class="logo-container">
      <a href="/">
        <img src="/img/logo_stand-arte_blanco.svg" alt="Standarte Logo" class="logo" />
      </a>
    </div>
  </header>

  <main class="main-content">
    <div class="card" class:card-success={status === 'superior'} class:card-info={status === 'inferior'}>
      <div class="badge-wrapper">
        <span class="status-badge">{content.badge}</span>
      </div>

      <div class="icon-circle">
        {#if status === 'superior'}
          <!-- Modern Checkmark SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        {:else}
          <!-- Elegant Info/Envelope SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        {/if}
      </div>

      <h1 class="title">{content.title}</h1>
      <h2 class="subtitle">{content.subtitle}</h2>
      
      <div class="divider"></div>

      <p class="description">{@html content.body}</p>

      <div class="actions">
        <a href="/" class="btn-back">{t.back}</a>
      </div>
    </div>
  </main>

  <footer class="footer">
    <p>{t.footer}</p>
  </footer>
</div>

<style>
  :global(body) {
    background-color: #1a1e22 !important;
    margin: 0;
    font-family: 'Outfit', 'Inter', sans-serif;
  }

  .result-page {
    background-color: #1a1e22;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: #ffffff;
    position: relative;
    overflow: hidden;
  }

  /* Premium Background Gradients */
  .result-page::before {
    content: '';
    position: absolute;
    top: -20%;
    left: -10%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(255, 200, 0, 0.05) 0%, rgba(0,0,0,0) 70%);
    pointer-events: none;
  }

  .result-page::after {
    content: '';
    position: absolute;
    bottom: -10%;
    right: -10%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, rgba(0,0,0,0) 70%);
    pointer-events: none;
  }

  .header {
    background-color: #292f35;
    padding: 20px 0;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }

  .logo {
    height: 38px;
    transition: transform 0.3s ease;
  }

  .logo:hover {
    transform: scale(1.02);
  }

  .main-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    z-index: 5;
  }

  .card {
    background: rgba(41, 47, 53, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    width: 100%;
    max-width: 580px;
    padding: 45px 35px;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    position: relative;
    transition: border-color 0.4s ease;
  }

  .card-success {
    border-top: 4px solid #ffc800;
  }

  .card-info {
    border-top: 4px solid rgba(255, 255, 255, 0.3);
  }

  .badge-wrapper {
    margin-bottom: 20px;
  }

  .status-badge {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 6px 16px;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .card-success .status-badge {
    color: #ffc800;
    background: rgba(255, 200, 0, 0.06);
    border-color: rgba(255, 200, 0, 0.15);
  }

  .icon-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto 25px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  .card-success .icon-circle {
    background: #ffc800;
    color: #000000;
  }

  .card-info .icon-circle {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .icon {
    width: 38px;
    height: 38px;
  }

  .title {
    font-family: 'Outfit', sans-serif;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
    letter-spacing: -0.01em;
    color: #ffffff;
  }

  .subtitle {
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 0 25px 0;
  }

  .divider {
    height: 1px;
    background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0));
    margin-bottom: 25px;
  }

  .description {
    font-size: 16px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.85);
    margin: 0 0 35px 0;
    text-align: left;
  }

  /* Clickable Highlights */
  :global(.description strong) {
    color: #ffffff;
    font-weight: 600;
  }

  :global(.description .highlight) {
    color: #ffc800;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px dotted #ffc800;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  :global(.description .highlight:hover) {
    color: #ffffff;
    border-color: #ffffff;
  }

  .actions {
    display: flex;
    justify-content: center;
  }

  .btn-back {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #ffc800;
    color: #000000;
    text-decoration: none;
    padding: 12px 36px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 700;
    box-shadow: 0 4px 15px rgba(255, 200, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .card-info .btn-back {
    background: rgba(255, 255, 255, 0.9);
    color: #000000;
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  }

  .btn-back:hover {
    transform: translateY(-2px);
  }

  .card-success .btn-back:hover {
    background: #e6b400;
    box-shadow: 0 6px 20px rgba(255, 200, 0, 0.3);
  }

  .card-info .btn-back:hover {
    background: #ffffff;
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
  }

  .footer {
    background-color: #13161a;
    padding: 25px 20px;
    text-align: center;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
    border-top: 1px solid rgba(255, 255, 255, 0.03);
  }

  @media (max-width: 580px) {
    .card {
      padding: 35px 20px;
    }
    .title {
      font-size: 24px;
    }
    .description {
      font-size: 15px;
    }
  }
</style>
