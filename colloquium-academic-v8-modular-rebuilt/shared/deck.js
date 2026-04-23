(() => {
  const DECK_OPTIONS = {
    hash: false,
    slideNumber: false,
    width: 1400,
    height: 875,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2.5,
    controls: false,
    progress: false,
    center: false,
    transition: 'none',
    pdfSeparateFragments: false
  };
  const CACHE_BUST_PARAM = 'cb';

  function enableSnapshotMode() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('snapshot')) {
      document.body.classList.add('snapshot-mode');
    }
  }

  const MACROS = {
    "\\R": "\\mathbb{R}",
    "\\E": "\\mathbb{E}",
    "\\N": "\\mathcal{N}",
    "\\supp": "\\operatorname{supp}",
    "\\conv": "\\operatorname{conv}",
    "\\proj": "\\operatorname{proj}",
    "\\nn": "\\operatorname{NN}"
  };

  function renderAllMath(root = document.body) {
    if (typeof renderMathInElement !== 'function') return;
    renderMathInElement(root, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
      throwOnError: false,
      macros: MACROS
    });
  }

  function restartAnimations(root = document) {
    root.querySelectorAll('.pair-animation, .continuity-animation, .vector-build-animation').forEach((container) => {
      const svg = container.querySelector('svg');
      if (!svg) return;
      const fresh = svg.cloneNode(true);
      svg.replaceWith(fresh);
    });
  }

  function relayout() {
    if (window.Reveal && typeof window.Reveal.layout === 'function') {
      window.Reveal.layout();
    }
  }

  function initReveal() {
    if (!window.Reveal || typeof window.Reveal.initialize !== 'function') return Promise.resolve();
    return window.Reveal.initialize(DECK_OPTIONS);
  }

  function isLocalHtmlUrl(url) {
    if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('javascript:')) {
      return false;
    }
    try {
      const resolved = new URL(url, window.location.href);
      return resolved.origin === window.location.origin && resolved.pathname.endsWith('.html');
    } catch {
      return false;
    }
  }

  function withCacheBust(url, token) {
    if (!isLocalHtmlUrl(url)) return url;
    const resolved = new URL(url, window.location.href);
    resolved.searchParams.set(CACHE_BUST_PARAM, token);
    return resolved.href;
  }

  function buildPreviewUrl(url, token) {
    if (!isLocalHtmlUrl(url)) return '';
    const resolved = new URL(url, window.location.href);
    const filename = resolved.pathname.split('/').pop();
    if (!filename) return '';
    const previewName = filename.replace(/\.html$/i, '.png');
    resolved.pathname = resolved.pathname.replace(/[^/]+$/, `previews/${previewName}`);
    resolved.search = '';
    resolved.searchParams.set(CACHE_BUST_PARAM, token);
    return resolved.href;
  }

  function installCacheBustedNav() {
    const token = String(Date.now());

    document.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href');
      const rewritten = withCacheBust(href, token);
      if (rewritten !== href) {
        anchor.href = rewritten;
      }
    });

    ['prev', 'next', 'home'].forEach((key) => {
      const current = document.body.dataset[key] || '';
      const rewritten = withCacheBust(current, token);
      if (rewritten !== current) {
        document.body.dataset[key] = rewritten;
      }
    });
  }

  function installIndexPreviews() {
    if (!document.body.classList.contains('modular-index')) return;
    const token = String(Date.now());

    document.querySelectorAll('a.index-card').forEach((card) => {
      if (card.querySelector('.index-card__preview')) return;

      const previewUrl = buildPreviewUrl(card.href || card.getAttribute('href') || '', token);
      if (!previewUrl) return;

      const preview = document.createElement('div');
      preview.className = 'index-card__preview';
      preview.setAttribute('aria-hidden', 'true');

      const image = document.createElement('img');
      image.className = 'index-card__image';
      image.src = previewUrl;
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('error', () => {
        preview.classList.add('is-missing');
      });

      preview.append(image);
      card.prepend(preview);
    });
  }

  function navigate(url) {
    if (!url) return;
    window.location.href = url;
  }

  function installKeyboardNav() {
    const prev = document.body.dataset.prev || '';
    const next = document.body.dataset.next || '';
    const home = document.body.dataset.home || 'index.html';

    document.addEventListener('keydown', (event) => {
      const target = event.target;
      const isEditable = target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      );
      if (isEditable) return;

      if ((event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') && next) {
        event.preventDefault();
        navigate(next);
        return;
      }

      if ((event.key === 'ArrowLeft' || event.key === 'PageUp' || event.key === 'Backspace') && prev) {
        event.preventDefault();
        navigate(prev);
        return;
      }

      if ((event.key === 'Home' || event.key === 'Escape') && home) {
        event.preventDefault();
        navigate(home);
      }
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    enableSnapshotMode();
    installCacheBustedNav();
    installIndexPreviews();
    installKeyboardNav();
    initReveal().then(() => {
      renderAllMath();
      relayout();
      restartAnimations(document);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => relayout());
      }
      window.addEventListener('resize', relayout);
    });
  });
})();
