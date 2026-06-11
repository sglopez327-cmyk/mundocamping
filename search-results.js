(function () {
  const CATALOG_SOURCES = [
    './data/tiendas-productos.json',
    './data/sacos-productos.json',
    './data/esterillas-productos.json',
    './data/baterias-productos.json',
    './data/iluminacion-productos.json',
    './data/herramientas-productos.json',
    './data/accesorios-productos.json',
  ];

  const FIELD_TITLE = ['Título', 'titulo', 'title', 'nombre', 'name'];
  const FIELD_IMAGE = ['Image Url', 'image', 'imagen', 'image_url', 'imageUrl', 'img'];
  const FIELD_IMAGES = ['Imágenes', 'imagenes', 'images', 'Images'];
  const FIELD_URL = ['amazonLink', 'URL de compra', 'url_compra', 'link', 'product_url', 'amazon_url', 'url', 'href'];
  const FIELD_DESCRIPTION = ['Descripción', 'descripcion', 'description', 'desc'];
  const FIELD_RATING = ['rating', 'Rating', 'valoracion', 'Valoración', 'estrellas'];
  const FIELD_RATING_COUNT = ['ratingCount', 'rating_count', 'num_reviews', 'opiniones', 'reviewCount'];
  const AMAZON_CTA_LABEL = 'Más información en Amazon';

  const THUMB_BASE =
    'product-modal-thumb shrink-0 overflow-hidden rounded-xl border border-white/15 bg-zinc-800 transition hover:border-emerald-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#deff9a]';

  let productsCatalog = [];

  function pickField(item, keys) {
    for (const key of keys) {
      if (item[key] != null && String(item[key]).trim() !== '') {
        return String(item[key]).trim();
      }
    }
    return '';
  }

  function collectImages(merged) {
    const urls = [];
    const add = (value) => {
      const url = typeof value === 'string' ? value.trim() : pickField(value, FIELD_IMAGE);
      if (url && !urls.includes(url)) {
        urls.push(url);
      }
    };

    for (const key of FIELD_IMAGES) {
      const list = merged[key];
      if (Array.isArray(list)) {
        list.forEach(add);
      }
    }

    add(pickField(merged, FIELD_IMAGE));
    return urls;
  }

  function parseRatingValue(item) {
    for (const key of FIELD_RATING) {
      if (item[key] != null && item[key] !== '') {
        const value = parseFloat(String(item[key]).replace(',', '.'));
        if (Number.isFinite(value)) {
          return Math.min(5, Math.max(0, Math.round(value * 10) / 10));
        }
      }
    }
    return null;
  }

  function parseRatingCountValue(item) {
    for (const key of FIELD_RATING_COUNT) {
      if (item[key] != null && item[key] !== '') {
        const value = String(item[key]).trim();
        if (value) {
          return value;
        }
      }
    }
    return null;
  }

  function mapItemToProduct(item, meta) {
    const merged = meta ? { ...meta, ...item } : item;
    const title = pickField(merged, FIELD_TITLE);
    const buyUrl = pickField(merged, FIELD_URL);
    const description = pickField(merged, FIELD_DESCRIPTION);
    const images = collectImages(merged);
    const image = images[0] || '';

    if (!title && !image) {
      return null;
    }

    return {
      title: title || 'Producto recomendado',
      image,
      images,
      buyUrl,
      description,
      rating: parseRatingValue(merged),
      ratingCount: parseRatingCountValue(merged),
    };
  }

  function normalizeCatalog(payload) {
    if (!payload || typeof payload !== 'object') {
      return [];
    }

    if (Array.isArray(payload)) {
      return payload.map((item) => mapItemToProduct(item)).filter(Boolean);
    }

    if (payload.meta || payload.productos) {
      const meta = payload.meta || {};
      const list = Array.isArray(payload.productos) ? payload.productos : [];
      if (list.length) {
        return list.map((item) => mapItemToProduct(item, meta)).filter(Boolean);
      }
      const single = mapItemToProduct(meta);
      return single ? [single] : [];
    }

    const single = mapItemToProduct(payload);
    return single ? [single] : [];
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderAmazonCta(buyUrl, variant) {
    const baseClass =
      'product-cta-amazon inline-flex items-center justify-center gap-2 rounded-full font-bold text-white transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#deff9a] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';
    const sizeClass =
      variant === 'compact'
        ? 'product-cta-amazon--compact w-full px-4 py-2.5 text-xs sm:text-sm'
        : 'mt-5 w-full px-5 py-3.5 text-sm sm:text-base';

    if (!buyUrl) {
      return `<p class="${variant === 'compact' ? 'mt-3' : 'mt-5'} text-center text-xs text-white/45">Enlace de Amazon no disponible</p>`;
    }

    return `<a
      href="${escapeHtml(buyUrl)}"
      target="_blank"
      rel="noopener noreferrer"
      class="${baseClass} ${sizeClass}"
      data-amazon-cta="true"
    >
      <span>${AMAZON_CTA_LABEL}</span>
      <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 12h13M14 8l4 4-4 4M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </a>`;
  }

  function formatDescription(text) {
    if (!text) {
      return '';
    }

    const blocks = String(text)
      .trim()
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);

    return blocks
      .map((block) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((line) => /^[-*•]\s+/.test(line));

        if (isList) {
          const items = lines
            .map((line) => `<li>${escapeHtml(line.replace(/^[-*•]\s+/, ''))}</li>`)
            .join('');
          return `<ul class="mb-3 list-disc space-y-1.5 pl-5 marker:text-emerald-300">${items}</ul>`;
        }

        const paragraph = lines.map((line) => escapeHtml(line)).join('<br />');
        return `<p class="mb-3 last:mb-0">${paragraph}</p>`;
      })
      .join('');
  }

  function renderProductRating(rating, ratingCount) {
    const modalRating = document.getElementById('product-modal-rating');
    if (!modalRating) {
      return;
    }

    if (rating == null) {
      modalRating.innerHTML = '';
      modalRating.classList.add('hidden');
      return;
    }

    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      let starClass = 'product-rating-star';
      if (rating >= i - 0.25) {
        starClass += ' is-full';
      } else if (rating >= i - 0.75) {
        starClass += ' is-half';
      }
      stars.push(`<span class="${starClass}" aria-hidden="true">★</span>`);
    }

    const valueText = rating.toFixed(1).replace('.', ',');
    const countHtml = ratingCount
      ? `<span class="product-rating-count">(${escapeHtml(ratingCount)} opiniones)</span>`
      : '';

    modalRating.innerHTML = `
      <div class="product-rating" role="img" aria-label="Valoración ${valueText} de 5 estrellas">
        <span class="product-rating-stars">${stars.join('')}</span>
        <span class="product-rating-value">${escapeHtml(valueText)}</span>
        <span class="product-rating-label">de 5</span>
        ${countHtml}
      </div>`;
    modalRating.classList.remove('hidden');
  }

  function renderCard(product, index) {
    const title = escapeHtml(product.title);
    const image = escapeHtml(product.image);
    const ctaHtml = renderAmazonCta(product.buyUrl, 'compact');

    return `
      <article
        class="product-card glass-card flex h-full flex-col cursor-pointer rounded-2xl transition"
        data-product-index="${index}"
        role="button"
        tabindex="0"
        aria-label="Ver detalles de ${title}"
      >
        <div class="product-card-image relative flex aspect-[4/3] shrink-0 items-center justify-center bg-zinc-900 p-1.5">
          ${
            product.image
              ? `<img src="${image}" alt="${title}" class="max-h-full max-w-full object-contain transition duration-500 hover:scale-[1.03]" loading="lazy" />`
              : `<div class="flex h-full w-full items-center justify-center text-xs text-white/40">Sin imagen</div>`
          }
        </div>
        <div class="product-card-actions flex min-h-0 flex-1 flex-col px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
          <div class="product-card-title-box mt-auto w-full rounded-lg bg-zinc-800 p-2">
            <h3 class="product-card-title line-clamp-2 text-sm font-semibold leading-snug text-white sm:text-base">${title}</h3>
          </div>
          <div class="product-card-cta-wrap mt-2 w-full shrink-0">${ctaHtml}</div>
        </div>
      </article>
    `;
  }

  function getSearchQuery() {
    return new URLSearchParams(window.location.search).get('q')?.trim() || '';
  }

  function getSearchVariants(query) {
    const normalized = query.toLowerCase().trim();
    const variants = new Set([normalized]);

    if (normalized.endsWith('s') && normalized.length > 3) {
      variants.add(normalized.slice(0, -1));
    } else if (normalized.length > 2) {
      variants.add(`${normalized}s`);
    }

    normalized.split(/\s+/).filter(Boolean).forEach((word) => {
      variants.add(word);
      if (word.endsWith('s') && word.length > 3) {
        variants.add(word.slice(0, -1));
      } else if (word.length > 2) {
        variants.add(`${word}s`);
      }
    });

    return Array.from(variants).filter(Boolean);
  }

  function filterProductsByQuery(products, query) {
    const variants = getSearchVariants(query);
  const haystackFor = (product) =>
      `${product.title} ${product.description || ''}`.toLowerCase();

    return products.filter((product) => {
      const haystack = haystackFor(product);
      return variants.some((term) => haystack.includes(term));
    });
  }

  async function loadAllProducts() {
    if (Array.isArray(window.MUNDO_CAMPING_CATALOG) && window.MUNDO_CAMPING_CATALOG.length) {
      return window.MUNDO_CAMPING_CATALOG;
    }

    const responses = await Promise.all(
      CATALOG_SOURCES.map(async (source) => {
        try {
          const response = await fetch(source);
          if (!response.ok) {
            return [];
          }
          const payload = await response.json();
          return normalizeCatalog(payload);
        } catch {
          return [];
        }
      })
    );

    const fromFetch = responses.flat();
    if (fromFetch.length) {
      return fromFetch;
    }

    return Array.isArray(window.MUNDO_CAMPING_CATALOG) ? window.MUNDO_CAMPING_CATALOG : [];
  }

  function initSearchForm() {
    const form = document.getElementById('results-search-form');
    const input = document.getElementById('results-search-input');
    if (!form || !input) {
      return;
    }

    const currentQuery = getSearchQuery();
    if (currentQuery) {
      input.value = currentQuery;
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = input.value.trim();
      if (!query) {
        input.focus();
        return;
      }
      window.location.href = `resultados.html?q=${encodeURIComponent(query)}`;
    });
  }

  function bindModal() {
    const grid = document.getElementById('resultados-grid');
    const modal = document.getElementById('product-modal');
    const modalBackdrop = document.getElementById('product-modal-backdrop');
    const modalCloseBtn = document.getElementById('product-modal-close');
    const modalGallery = document.getElementById('product-modal-gallery');
    const modalImageWrap = document.getElementById('product-modal-image-wrap');
    const modalImage = document.getElementById('product-modal-image');
    const modalThumbnails = document.getElementById('product-modal-thumbnails');
    const modalTitle = document.getElementById('product-modal-title');
    const modalDescription = document.getElementById('product-modal-description');
    const modalBuy = document.getElementById('product-modal-buy');
    const modalBuyUnavailable = document.getElementById('product-modal-buy-unavailable');

    function setActiveThumbnail(index) {
      modalThumbnails.querySelectorAll('.product-modal-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('is-active', i === index);
        thumb.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }

    function setMainImage(src, index) {
      if (!src) {
        modalImage.removeAttribute('src');
        modalImage.alt = '';
        modalImage.classList.add('hidden');
        modalImageWrap.classList.add('hidden');
        modalGallery.classList.add('hidden');
        return;
      }

      modalImage.src = src;
      modalImage.alt = modalTitle.textContent || 'Imagen del producto';
      modalImage.classList.remove('hidden');
      modalImageWrap.classList.remove('hidden');
      modalGallery.classList.remove('hidden');
      setActiveThumbnail(index);
    }

    function updateGallery(images) {
      modalThumbnails.innerHTML = '';
      modalThumbnails.classList.remove('flex');
      modalThumbnails.classList.add('hidden');

      if (!images.length) {
        setMainImage('', 0);
        return;
      }

      setMainImage(images[0], 0);

      if (images.length <= 1) {
        return;
      }

      const fragment = document.createDocumentFragment();

      images.forEach((src, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `${THUMB_BASE}${index === 0 ? ' is-active' : ''}`;
        button.dataset.thumbIndex = String(index);
        button.dataset.thumbSrc = src;
        button.setAttribute('role', 'listitem');
        button.setAttribute('aria-label', `Ver imagen ${index + 1}`);
        button.setAttribute('aria-current', index === 0 ? 'true' : 'false');

        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        img.loading = 'lazy';
        img.className = 'h-14 w-14 object-cover sm:h-16 sm:w-16';
        button.appendChild(img);
        fragment.appendChild(button);
      });

      modalThumbnails.appendChild(fragment);
      modalThumbnails.classList.remove('hidden');
      modalThumbnails.classList.add('flex');
    }

    function closeProductModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('overflow-hidden');
    }

    function openProduct(productIndex) {
      const product = productsCatalog[productIndex];
      if (!product) {
        return;
      }

      modalTitle.textContent = product.title;
      renderProductRating(product.rating, product.ratingCount);

      const descriptionHtml = formatDescription(product.description);
      if (descriptionHtml) {
        modalDescription.innerHTML = descriptionHtml;
        modalDescription.classList.remove('hidden');
      } else {
        modalDescription.innerHTML = '';
        modalDescription.classList.add('hidden');
      }

      const images = product.images?.length ? product.images : product.image ? [product.image] : [];
      updateGallery(images);
      modalImage.alt = product.title;

      if (product.buyUrl) {
        modalBuy.href = product.buyUrl;
        modalBuy.classList.remove('hidden');
        modalBuyUnavailable.classList.add('hidden');
      } else {
        modalBuy.href = '#';
        modalBuy.classList.add('hidden');
        modalBuyUnavailable.classList.remove('hidden');
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('overflow-hidden');
      modalCloseBtn.focus();
    }

    grid?.querySelectorAll('.product-card').forEach((card) => {
      const index = Number(card.dataset.productIndex);

      card.addEventListener('click', (event) => {
        if (event.target.closest('[data-amazon-cta]')) {
          return;
        }
        openProduct(index);
      });

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProduct(index);
        }
      });
    });

    modalThumbnails?.addEventListener('click', (event) => {
      const button = event.target.closest('.product-modal-thumb');
      if (!button) {
        return;
      }
      setMainImage(button.dataset.thumbSrc, Number(button.dataset.thumbIndex));
    });

    modalCloseBtn?.addEventListener('click', closeProductModal);
    modalBackdrop?.addEventListener('click', closeProductModal);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeProductModal();
      }
    });
  }

  function renderResults(query, products) {
    const grid = document.getElementById('resultados-grid');
    const emptyBox = document.getElementById('resultados-empty');
    const summary = document.getElementById('resultados-summary');
    const errorBox = document.getElementById('resultados-error');

    if (!grid || !emptyBox || !summary) {
      return;
    }

    errorBox?.classList.add('hidden');

    if (!query) {
      summary.textContent = 'Escribe un término en el buscador para ver productos.';
      grid.innerHTML = '';
      emptyBox.classList.add('hidden');
      return;
    }

    productsCatalog = filterProductsByQuery(products, query);

    if (!productsCatalog.length) {
      summary.textContent = `Resultados para «${query}»`;
      grid.innerHTML = '';
      emptyBox.classList.remove('hidden');
      return;
    }

    emptyBox.classList.add('hidden');
    summary.textContent = `${productsCatalog.length} producto${productsCatalog.length === 1 ? '' : 's'} para «${query}»`;
    grid.innerHTML = productsCatalog.map((product, index) => renderCard(product, index)).join('');
    bindModal();
  }

  async function init() {
    initSearchForm();

    const query = getSearchQuery();
    const status = document.getElementById('resultados-loading');
    const errorBox = document.getElementById('resultados-error');

    try {
      const allProducts = await loadAllProducts();
      status?.classList.add('hidden');
      renderResults(query, allProducts);
    } catch {
      status?.classList.add('hidden');
      errorBox?.classList.remove('hidden');
      if (errorBox) {
        errorBox.textContent = 'No se pudo cargar el catálogo. Inténtalo de nuevo más tarde.';
      }
    }
  }

  init();
})();
