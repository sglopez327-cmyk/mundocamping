/**
 * JSON-LD dinámico: WebSite (inicio), Article, BreadcrumbList y FAQPage (guías).
 */
(function () {
  'use strict';

  var SITE = 'https://www.mundocamping.net';

  function injectSchema(data) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function getMeta(name) {
    var el = document.querySelector('meta[name="' + name + '"]');
    return el ? el.getAttribute('content') || '' : '';
  }

  function getCanonical() {
    var link = document.querySelector('link[rel="canonical"]');
    return link ? link.getAttribute('href') || '' : '';
  }

  function getOg(prop) {
    var el = document.querySelector('meta[property="' + prop + '"]');
    return el ? el.getAttribute('content') || '' : '';
  }

  function isHomePage() {
    var path = window.location.pathname.replace(/\/+$/, '') || '/';
    return path === '' || path === '/' || /\/index\.html$/i.test(path);
  }

  function injectWebSiteSchema() {
    if (!isHomePage()) {
      return;
    }

    injectSchema({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Mundo Camping',
      url: SITE + '/',
      description: getMeta('description'),
      inLanguage: 'es-ES',
      publisher: {
        '@type': 'Organization',
        name: 'Mundo Camping',
        url: SITE + '/',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: SITE + '/resultados.html?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    });
  }

  function findArticleRoot() {
    return (
      document.querySelector('article[itemtype*="Article"]') ||
      document.querySelector('article[itemscope]') ||
      document.querySelector('main article')
    );
  }

  function injectArticleSchema() {
    var article = findArticleRoot();
    if (!article) {
      return;
    }

    var headlineEl = article.querySelector('h1');
    var headline = headlineEl ? headlineEl.textContent.trim() : document.title.replace(/^Mundo Camping \| /, '');
    var canonical = getCanonical() || window.location.href;
    var description = getMeta('description');
    var image = getOg('og:image') || SITE + '/Fondo.jpg';
    var modified = document.querySelector('meta[property="article:modified_time"]');
    var dateModified = modified ? modified.getAttribute('content') : '';

    var articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: headline,
      description: description,
      image: [image],
      inLanguage: 'es-ES',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical,
      },
      author: {
        '@type': 'Person',
        name: 'Mundo Camping',
        url: SITE + '/sobre-mi',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Mundo Camping',
        url: SITE + '/',
        logo: {
          '@type': 'ImageObject',
          url: SITE + '/favicon-48.png',
        },
      },
    };
    if (dateModified) {
      articleSchema.dateModified = dateModified;
    }
    injectSchema(articleSchema);
  }

  function findBreadcrumbNav() {
    var labelled = document.querySelectorAll('nav[aria-label]');
    for (var i = 0; i < labelled.length; i++) {
      var label = labelled[i].getAttribute('aria-label') || '';
      if (/miga/i.test(label)) {
        return labelled[i];
      }
    }

    return document.querySelector('.about-page__breadcrumb') || null;
  }

  function injectBreadcrumbSchema() {
    var nav = findBreadcrumbNav();

    if (!nav) {
      return;
    }

    var links = nav.querySelectorAll('a[href]');
    if (!links.length) {
      return;
    }

    var items = [];
    links.forEach(function (link, index) {
      var href = link.getAttribute('href') || '';
      var absolute = href.indexOf('http') === 0 ? href : new URL(href, SITE + '/').href.replace(/\.html(?=([?#]|$))/, '');

      items.push({
        '@type': 'ListItem',
        position: index + 1,
        name: link.textContent.trim(),
        item: absolute,
      });
    });

    if (!items.length) {
      return;
    }

    injectSchema({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    });
  }

  function injectFaqSchema() {
    var faqSection = document.querySelector('.article-faq, #faq');
    if (!faqSection) {
      return;
    }

    var details = faqSection.querySelectorAll('details');
    if (!details.length) {
      return;
    }

    var entities = [];
    details.forEach(function (detail) {
      var questionEl = detail.querySelector('summary');
      var answerEl = detail.querySelector('p');
      if (!questionEl || !answerEl) {
        return;
      }

      entities.push({
        '@type': 'Question',
        name: questionEl.textContent.trim(),
        acceptedAnswer: {
          '@type': 'Answer',
          text: answerEl.textContent.trim(),
        },
      });
    });

    if (!entities.length) {
      return;
    }

    injectSchema({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: entities,
    });
  }

  function init() {
    injectWebSiteSchema();
    injectArticleSchema();
    injectBreadcrumbSchema();
    injectFaqSchema();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
