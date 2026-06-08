<script>
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://standarte.es/#organization",
    "name": "Standarte",
    "description": "Diseño, fabricación y montaje de stands a medida para ferias en Madrid, Barcelona, Bilbao, Málaga, Badajoz, Ciudad Real y Lisboa.",
    "url": "https://standarte.es",
    "telephone": "+34637894819",
    "email": "hola@standarte.es",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. de Castilla 2",
      "addressLocality": "San Fernando de Henares",
      "addressRegion": "Madrid",
      "postalCode": "28830",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.4124",
      "longitude": "-3.6983"
    },
    "areaServed": [
      { "@type": "City", "name": "Madrid" },
      { "@type": "City", "name": "Barcelona" },
      { "@type": "City", "name": "Bilbao" },
      { "@type": "City", "name": "Málaga" },
      { "@type": "City", "name": "Badajoz" },
      { "@type": "City", "name": "Ciudad Real" },
      { "@type": "City", "name": "Lisboa" }
    ],
    "image": "https://standarte.es/img/logo_standarte_rectanular.png",
    "priceRange": "€€€",
    "sameAs": [
      "https://luzpavilion.es"
    ]
  };
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
