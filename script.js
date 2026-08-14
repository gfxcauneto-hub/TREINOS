/* ==========================================================================
   TREINOS COM ELÁSTICO - JAVASCRIPT
   Lógica responsiva, VSL 9:16, UTMs, Modal Upsell e Carrossel
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initUrgencyDate();
  initFaqAccordion();
  initTestimonialCarousel();
  initLazyTestimonials();
  initModalListeners();
});

/* --------------------------------------------------------------------------
   1. DATA DINÂMICA NA BARRA DE URGÊNCIA & RODAPÉ
   -------------------------------------------------------------------------- */
function initUrgencyDate() {
  const dataHojeEl = document.getElementById('dataHoje');
  if (dataHojeEl) {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    dataHojeEl.textContent = `${dia}/${mes}/${ano}`;
  }

  const anoAtualEl = document.getElementById('anoAtual');
  if (anoAtualEl) {
    anoAtualEl.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   2. REPRODUÇÃO E CONTROLE DA VSL 9:16 (ÁREA SUPERIOR)
   -------------------------------------------------------------------------- */


/* --------------------------------------------------------------------------
   3. PERGUNTAS FREQUENTES (FAQ ACCORDION)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Fecha todos os outros itens para um efeito sanfona limpo
      document.querySelectorAll('.faq-item').forEach(function (item) {
        item.classList.remove('active');
      });

      // Se não estava ativo, ativa o atual
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. CARROSSEL DE DEPOIMENTOS EM VÍDEO
   -------------------------------------------------------------------------- */
function initTestimonialCarousel() {
  const container = document.getElementById('carouselContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = 300;

  prevBtn.addEventListener('click', function () {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', function () {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

function initLazyTestimonials() {
  const facades = document.querySelectorAll('.testimonial-video-facade');
  facades.forEach(function (facade) {
    facade.addEventListener('click', function () {
      const embedUrl = this.getAttribute('data-embed');
      if (!embedUrl || this.classList.contains('loaded')) return;

      this.classList.add('loaded');
      this.innerHTML = `<iframe
        loading="lazy"
        title="Gumlet video player"
        src="${embedUrl}"
        style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
        referrerpolicy="origin"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write">
      </iframe>`;
    });
  });
}

/* --------------------------------------------------------------------------
   5. UPSELL MODAL (LÓGICA E INTERAÇÕES)
   -------------------------------------------------------------------------- */
function abrirUpsell() {
  const modal = document.getElementById('upsellModal');
  if (modal) {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function fecharUpsell() {
  const modal = document.getElementById('upsellModal');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function aceitarUpsell() {
  // Redireciona para o plano completo com valor promocional de R$ 19,90 preservando UTMs
  irParaCheckout('oferta-upsell-1990');
}

function recusarUpsell() {
  // Redireciona para o plano básico de R$ 10,00 preservando UTMs
  irParaCheckout('oferta-basica-10');
}

function initModalListeners() {
  window.addEventListener('click', function (e) {
    const modal = document.getElementById('upsellModal');
    if (e.target === modal) {
      fecharUpsell();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      fecharUpsell();
    }
  });
}

/* --------------------------------------------------------------------------
   6. REDIRECIONAMENTO DIRETO PARA CHECKOUT
   -------------------------------------------------------------------------- */

const CHECKOUT_URLS = {
  'oferta-basica-10': './checkout/index.html?plan=basico&price=10',
  'oferta-completa': './checkout/index.html?plan=completo&price=26.90',
  'oferta-upsell-1990': './checkout/index.html?plan=completo_promo&price=19.90'
};

function irParaCheckout(ofertaKey) {
  const targetUrl = CHECKOUT_URLS[ofertaKey] || './checkout/index.html';
  window.location.href = targetUrl;
}
