<script>
  import Site from '$lib/components/Site.svelte';
  export let data;

  const faqs = [
    {
      q: "¿Cuánto cuesta un stand a medida en IFEMA Madrid?",
      a: "El precio depende de la superficie, el diseño y los materiales. Tras una consulta inicial elaboramos un presupuesto cerrado sin sobrecostes, gestionando directamente todo el proceso para ajustarnos al presupuesto acordado."
    },
    {
      q: "¿Os encargáis de las validaciones y permisos en IFEMA?",
      a: "Sí. Gestionamos directamente los boletines eléctricos oficiales de la Comunidad de Madrid, las certificaciones de prevención de riesgos y la validación de estructuras colgantes (rigging) según la normativa del recinto."
    },
    {
      q: "¿Con cuánta antelación hay que contratar el stand?",
      a: "Recomendamos contactar con la mayor antelación posible, especialmente para ferias de alta demanda como FITUR o Fruit Attraction. Nuestro taller propio nos permite responder con flexibilidad a plazos ajustados."
    },
    {
      q: "¿Trabajáis solo en IFEMA o también en otros recintos de Madrid?",
      a: "Construimos en IFEMA Madrid y también en otras localizaciones como el Palacio de Congresos de la Castellana o la Caja Mágica, adaptando la carpintería y la logística a cada entorno."
    },
    {
      q: "¿Ofrecéis diseño 3D antes de fabricar?",
      a: "Sí. Elaboramos un diseño 3D personalizado 100% fidedigno al resultado final, que el cliente puede explorar y revisar antes de comenzar la fabricación."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>

<Site {...data} />
