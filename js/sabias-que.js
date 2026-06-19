/**
 * ¿Sabías que...? — consejo diario de camping (días 1–30/31).
 * Muestra un hecho curioso, un consejo práctico y enlace afiliado Amazon.
 */
(function initSabiasQue() {
  const TIPS = [
    {
      fact: "La condensación dentro de la tienda no siempre significa que gotee: muchas veces es el vapor de tu respiración al chocar con el techo frío.",
      tip: "Ventila un poco por la mañana y elige una tienda con doble techo y buena circulación de aire.",
      product: "tienda doble techo",
      amazonUrl: "https://www.amazon.es/dp/B0D6DWCMM2",
      cta: "Ver tiendas con buena ventilación en Amazon",
    },
    {
      fact: "La temperatura indicada en un saco de dormir es una referencia de supervivencia, no la de confort real para dormir bien.",
      tip: "Elige un saco con unos 5 °C por debajo de la mínima nocturna prevista y complementa con ropa térmica fina.",
      product: "saco de dormir",
      amazonUrl: "https://www.amazon.es/dp/B0BPSKF656",
      cta: "Ver sacos de dormir en Amazon",
    },
    {
      fact: "El suelo del bosque puede estar a 10 °C menos que el aire ambiente: pierdes calor por conducción aunque no haga mucho frío.",
      tip: "Combina esterilla aislante con buen R-value y, si acampas a menudo, valora una autoinflable para más confort.",
      product: "esterilla aislante",
      amazonUrl: "https://www.amazon.es/dp/B07X6RCM9M",
      cta: "Ver esterillas en Amazon",
    },
    {
      fact: "La linterna frontal libera las manos y reduce el riesgo de tropezar al moverte por el campamento de noche.",
      tip: "Lleva siempre una frontal con al menos 200 lúmenes y modo rojo para no deslumbrar a otros campistas.",
      product: "linterna frontal",
      amazonUrl: "https://www.amazon.es/dp/B0BYRN75WT",
      cta: "Ver linternas frontales en Amazon",
    },
    {
      fact: "Un móvil sin batería en montaña puede dejarte sin mapas, linterna y contacto de emergencia en pocas horas.",
      tip: "Guarda un power bank cargado y, si acampas varios días, valora una batería de mayor capacidad o panel solar compacto.",
      product: "power bank",
      amazonUrl: "https://www.amazon.es/dp/B0DCHZT4XZ",
      cta: "Ver baterías portátiles en Amazon",
    },
    {
      fact: "La columna de agua (mm) indica resistencia al agua: por encima de 3.000 mm la tienda aguanta lluvia intensa sostenida.",
      tip: "Si acampas con frecuencia bajo lluvia, prioriza tiendas con flysheet ≥3.000 mm y costuras termoselladas.",
      product: "tienda impermeable",
      amazonUrl: "https://www.amazon.es/dp/B077Y8DLSN",
      cta: "Ver tiendas impermeables en Amazon",
    },
    {
      fact: "El viento puede levantar una tienda mal anclada en segundos, incluso con poco peso aparente en las cuerdas.",
      tip: "Tensa bien los vientos, usa estacas según el terreno y refuerza los puntos de anclación en zonas abiertas.",
      product: "kit de estacas",
      amazonUrl: "https://www.amazon.es/dp/B0CB7H4R2Q",
      cta: "Ver tiendas resistentes al viento en Amazon",
    },
    {
      fact: "Dormir con ropa muy gruesa dentro del saco puede comprimir el aislamiento y reducir su eficacia térmica.",
      tip: "Usa capas finas y secas; si sigues pasando frío, añade un forro de saco o una esterilla más gruesa.",
      product: "forro de saco",
      amazonUrl: "https://www.amazon.es/dp/B082R6KJJ7",
      cta: "Ver sacos y forros en Amazon",
    },
    {
      fact: "La humedad en el saco de dormir acelera la pérdida de calor y favorece olores y bacterias con el tiempo.",
      tip: "Airea el saco cada mañana, evita dormir con ropa mojada y guarda un kit de primeros auxilios siempre accesible.",
      product: "kit primeros auxilios",
      amazonUrl: "https://www.amazon.es/dp/B0751D8TP9",
      cta: "Ver kits de primeros auxilios en Amazon",
    },
    {
      fact: "Una navaja multiusos resuelve cuerdas, comida y pequeñas reparaciones sin cargar herramientas sueltas.",
      tip: "Elige una con al menos tenaza y sierra; guárdala seco y revisa el bloqueo antes de cada salida.",
      product: "navaja multiusos",
      amazonUrl: "https://www.amazon.es/dp/B08YDPVYXP",
      cta: "Ver multiherramientas en Amazon",
    },
    {
      fact: "Cocinar bajo la lona exterior de la tienda con gas puede acumular monóxido de carbono en espacios cerrados.",
      tip: "Cocina siempre al aire libre o bajo un toldo muy ventilado; una hornilla estable y compacta marca la diferencia.",
      product: "hornilla de camping",
      amazonUrl: "https://www.amazon.es/dp/B0F9Y97D7V",
      cta: "Ver cocina de camping en Amazon",
    },
    {
      fact: "En verano, la tienda expuesta al sol puede superar los 40 °C por dentro antes del mediodía.",
      tip: "Monta a la sombra, abre ventilaciones y valora un toldo o tienda con buen mesh para días calurosos.",
      product: "tienda ventilada",
      amazonUrl: "https://www.amazon.es/dp/B09S5TPRL9",
      cta: "Ver tiendas para verano en Amazon",
    },
    {
      fact: "Los mosquitos detectan el CO₂ que exhalas: cuanto más cerca duermas de agua o vegetación, más picaduras.",
      tip: "Usa mosquitera en la tienda, ropa de manga larga al atardecer y mantén el interior sin restos de comida.",
      product: "tienda con mosquitera",
      amazonUrl: "https://www.amazon.es/dp/B0D13Z6GRB",
      cta: "Ver tiendas con mosquitera en Amazon",
    },
    {
      fact: "A mayor altitud, el agua hierve a menor temperatura y la cocción tarda más en completarse.",
      tip: "Planifica comidas de cocción rápida en montaña y lleva suficiente combustible para tu hornilla.",
      product: "combustible y hornilla",
      amazonUrl: "https://www.amazon.es/dp/B086XH9XYJ",
      cta: "Ver hornillas de montaña en Amazon",
    },
    {
      fact: "La regla de las tres capas no es moda outdoor: cada capa cumple una función distinta de temperatura y humedad.",
      tip: "Base transpirable, capa intermedia térmica y cortavientos impermeable; evita algodón en días húmedos.",
      product: "chaqueta cortavientos",
      amazonUrl: "https://www.amazon.es/dp/B096SBXHR7",
      cta: "Ver equipamiento térmico en Amazon",
    },
    {
      fact: "Dormir con los pies más fríos que el resto del cuerpo es habitual: la circulación baja al acostarte.",
      tip: "Usa calcetines secos de lana o sintético y, si hace frío, una botella de agua caliente al pie del saco.",
      product: "saco de invierno",
      amazonUrl: "https://www.amazon.es/dp/B09PV7HC72",
      cta: "Ver sacos para frío en Amazon",
    },
    {
      fact: "Organizar la mochila por acceso frecuente ahorra tiempo y evita sacar todo el contenido bajo la lluvia.",
      tip: "Arriba: linterna, chubasquero y snacks. Abajo: saco y ropa de abrigo. Usa bolsas estancas para lo esencial.",
      product: "bolsas estancas",
      amazonUrl: "https://www.amazon.es/dp/B0DZ6WHPZK",
      cta: "Ver esterillas y accesorios en Amazon",
    },
    {
      fact: "Beber agua de río sin tratar puede parecer limpia y aun así contener bacterias o parásitos invisibles.",
      tip: "Hiérvela, filtrala o usa pastillas purificadoras; lleva siempre más agua de la que crees necesitar.",
      product: "filtro de agua",
      amazonUrl: "https://www.amazon.es/dp/B08ZM2KC49",
      cta: "Ver filtros de agua en Amazon",
    },
    {
      fact: "Una fogata mal apagada puede reactivarse con el viento horas después de irte del campamento.",
      tip: "Apaga con agua, remueve las brasas y comprueba que no quede calor. Lleva una linterna potente para volver de noche.",
      product: "linterna potente",
      amazonUrl: "https://www.amazon.es/dp/B0DMFFFYDC",
      cta: "Ver linternas en Amazon",
    },
    {
      fact: "Cada kilo extra en la mochila se nota más en subida que en llano: el peso se multiplica con la pendiente.",
      tip: "Prioriza equipo ultraligero en rutas largas: tienda compacta, saco comprimible y esterilla de espuma fina.",
      product: "tienda ultraligera",
      amazonUrl: "https://www.amazon.es/dp/B0CB15T3SF",
      cta: "Ver tiendas ligeras en Amazon",
    },
    {
      fact: "Los sacos tipo momia ajustan mejor el volumen de aire caliente alrededor del cuerpo que los rectangulares.",
      tip: "Si acampas en frío, elige momia con capucha; si buscas libertad de movimiento, valora un saco rectangular.",
      product: "saco momia",
      amazonUrl: "https://www.amazon.es/dp/B0CXPPNL5C",
      cta: "Ver sacos momia en Amazon",
    },
    {
      fact: "Las esterillas de espuma no se pinchan, pero las autoinflables suelen ofrecer más confort y mejor aislamiento.",
      tip: "Para mochila, combina espuma fina + inflable; revisa siempre que no pierda aire antes de salir.",
      product: "esterilla autoinflable",
      amazonUrl: "https://www.amazon.es/dp/B08NH7Y5VL",
      cta: "Ver esterillas autoinflables en Amazon",
    },
    {
      fact: "Un panel solar pequeño puede recargar el móvil en días soleados, pero rara vez alimenta hornillas o neveras.",
      tip: "Úsalo como complemento del power bank en travesías de varios días con buena exposición al sol.",
      product: "panel solar portátil",
      amazonUrl: "https://www.amazon.es/dp/B0DY7GVBR8",
      cta: "Ver energía portátil en Amazon",
    },
    {
      fact: "La luz blanca intensa por la noche reduce tu visión adaptada a la oscuridad durante varios minutos.",
      tip: "Usa modo rojo en la frontal dentro del campamento y reserva la luz blanca para senderos o emergencias.",
      product: "frontal con modo rojo",
      amazonUrl: "https://www.amazon.es/dp/B071Z1Y34D",
      cta: "Ver frontales en Amazon",
    },
    {
      fact: "Las costuras de una tienda son el punto débil frente a lluvia prolongada si no están bien selladas.",
      tip: "Revisa el flysheet, renueva el tratamiento hidrófugo si hace falta y seca la tienda por completo en casa.",
      product: "spray impermeabilizante",
      amazonUrl: "https://www.amazon.es/dp/B00TFEAIOA",
      cta: "Ver tiendas y cuidado en Amazon",
    },
    {
      fact: "Acampar en playa o lago expone la tienda a brisa húmeda constante que enfría el interior por evaporación.",
      tip: "Busca resguardo natural, orienta la puerta lejos del viento dominante y refuerza todos los anclajes.",
      product: "tienda para viento",
      amazonUrl: "https://www.amazon.es/dp/B0DDSFMC23",
      cta: "Ver tiendas resistentes en Amazon",
    },
    {
      fact: "Montar la tienda con poca luz multiplica el tiempo de montaje y los errores de tensado.",
      tip: "Llega con al menos una hora de luz, practica el montaje en casa y lleva una frontal cargada en la mochila.",
      product: "frontal recargable",
      amazonUrl: "https://www.amazon.es/dp/B0BYRN75WT",
      cta: "Ver linternas frontales en Amazon",
    },
    {
      fact: "La lluvia horizontal moja el interior si entras con ropa empapada o dejas la puerta abierta demasiado tiempo.",
      tip: "Ten un espacio de transición, cuelga la ropa mojada fuera del dormir y usa una tienda con buen avance delante.",
      product: "tienda con avance",
      amazonUrl: "https://www.amazon.es/dp/B09PH1H31X",
      cta: "Ver tiendas con avance en Amazon",
    },
    {
      fact: "Dormir mal por frío o ruido arruina la jornada siguiente más que casi cualquier otro fallo de equipamiento.",
      tip: "Invierte en saco adecuado, esterilla cómoda y tapones si acampas cerca de rutas con tráfico nocturno.",
      product: "saco confort",
      amazonUrl: "https://www.amazon.es/dp/B0CPPGZVDD",
      cta: "Ver sacos de confort en Amazon",
    },
    {
      fact: "No hay mal tiempo, solo mal equipamiento: la frase resume que la preparación marca la diferencia entre sufrir y disfrutar.",
      tip: "Revisa el parte meteorológico, adapta capas y refugio al pronóstico y lleva siempre plan B para lluvia y frío.",
      product: "equipo completo de camping",
      amazonUrl: "https://www.amazon.es/dp/B0D6DWCMM2",
      cta: "Ver equipamiento esencial en Amazon",
    },
  ];

  const AMAZON_ICON =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6h14l-1.2 7.2H7.4L6 6Z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/><path d="M6 6 5 3H2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" stroke="currentColor" stroke-width="1.75"/><path d="M13 12h5M15.5 9.5v5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>';

  function getDayIndex() {
    const day = new Date().getDate();
    return Math.min(day, 30) - 1;
  }

  function formatDayLabel(day) {
    return `Consejo del día ${day}`;
  }

  function render() {
    const root = document.getElementById("sabias-que");
    if (!root) return;

    const day = Math.min(new Date().getDate(), 30);
    const tip = TIPS[getDayIndex()];
    if (!tip) return;

    const meta = root.querySelector(".sabias-que__meta");
    const fact = root.querySelector(".sabias-que__fact");
    const tipEl = root.querySelector(".sabias-que__tip-text");
    const cta = root.querySelector(".sabias-que__cta");

    if (meta) meta.textContent = formatDayLabel(day);
    if (fact) fact.textContent = tip.fact;
    if (tipEl) tipEl.textContent = tip.tip;

    if (cta) {
      cta.href = tip.amazonUrl;
      cta.setAttribute("aria-label", `${tip.cta} — ${tip.product}`);
      cta.innerHTML = `<span>${tip.cta}</span>${AMAZON_ICON}`;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
